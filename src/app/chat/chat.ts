import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@app/auth/auth.service';
import { ToastService } from '@app/toast/toast.service';
import { Conversation, Message } from './chat.model';
import { Listings } from '@app/landing/landing.model';
import { 
  DateFormatterService,
  ListingService,
  ConversationService 
} from '@shared/services';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@shared/constants';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit {
  private dateFormatter = inject(DateFormatterService);
  private listingService = inject(ListingService);
  private conversationService = inject(ConversationService);
  
  auth = inject(AuthService);
  toast = inject(ToastService);

  public date: Date = this.dateFormatter.getCurrentDate();
  public today: number = this.dateFormatter.getToday();
  public month: string = this.dateFormatter.getMonth();
  public year: number = this.dateFormatter.getYear();
  public conversations: Conversation[] = [];
  public messages: Message[] = [];
  public previews: Map<string, string> = new Map<string, string>();
  public listings: Listings[] = [];
  public selectedConversation: Conversation | null = null;
  public newMessage = '';

  ngOnInit(): void {
    this.auth.getMe().subscribe(() => {
      this.loadConversations();
    });
    this.loadListings();
  }

  private loadListings(): void {
    this.listingService.getListings().subscribe({
      next: (data) => { this.listings = data; },
      error: (error) => {
        console.error('Failed to load listings', error);
      }
    });
  }

  private loadConversations(): void {
    const userId = this.auth.current?.id;

    if (userId) {
      this.conversationService.getConversations().subscribe({
        next: (data) => {
          this.conversations = data.filter(c => c.participants.includes(userId));
          this.loadMessagePreviews();
        },
        error: (error) => {
          console.error('Failed to load conversations', error);
        }
      });
    }
  }

  private loadMessagePreviews(): void {
    this.conversations.forEach(conversation => {
      this.conversationService.getMessages(conversation.id).subscribe({
        next: (message) => {
          const lastMsg = message.messages.length > 0 
            ? message.messages[message.messages.length - 1] 
            : null;
          const preview = lastMsg ? lastMsg.content : conversation.subject;
          this.previews.set(conversation.id, preview);
        },
        error: (error) => {
          console.error('Failed to load message preview', error);
        }
      });
    });
  }

  public getMessages(conversationId: string): void {
    this.conversationService.getMessages(conversationId).subscribe({
      next: (data) => { this.messages = [data]; },
      error: (error) => {
        console.error('Failed to load messages', error);
      }
    });
  }

  public getListingById(id: number | string): Listings | undefined {
    return this.listingService.getListingById(this.listings, id);
  }

  public getLastMessage(conversation: Conversation): string {
    return this.previews.get(conversation.id) || conversation.subject;
  }

  public selectConversation(conversation: Conversation): void {
    this.selectedConversation = conversation;
    this.getMessages(conversation.id);
  }

  public sendMessage(): void {
    if (!this.validateMessage()) {
      return;
    }

    const messageToUpdate = this.messages.find(
      m => m.id === this.selectedConversation!.id
    );

    if (messageToUpdate) {
      const newMessageItem = {
        sender: this.auth.current!.id!,
        content: this.newMessage,
        timestamp: new Date()
      };

      const updatePayload = {
        messages: [newMessageItem]
      };

      this.conversationService.updateMessage(messageToUpdate.id, updatePayload).subscribe({
        next: () => {
          messageToUpdate.messages.push(newMessageItem);
          
          if (this.selectedConversation) {
            this.previews.set(this.selectedConversation.id, this.newMessage);
          }

          this.newMessage = '';
          this.toast.show({ 
            message: SUCCESS_MESSAGES.MESSAGE_SENT, 
            classname: 'bg-success text-light' 
          });
        },
        error: () => {
          this.toast.show({ 
            message: ERROR_MESSAGES.MESSAGE_SEND_FAILED, 
            classname: 'bg-danger text-light' 
          });
        }
      });
    }
  }

  private validateMessage(): boolean {
    if (!this.selectedConversation || !this.newMessage.trim()) {
      return false;
    }

    const currentUserId = this.auth.current?.id;
    if (!currentUserId) {
      this.toast.show({ 
        message: ERROR_MESSAGES.SEND_MESSAGE_LOGGED_OUT, 
        classname: 'bg-danger text-light' 
      });
      return false;
    }

    return true;
  }
}