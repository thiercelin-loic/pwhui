import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ToastService } from '../toast/toast.service';
import { Conversation, Message } from './chat.model';
import { Listings } from '../landing/landing.model';
import { path } from '../../server';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit {
  private http = inject(HttpClient);
  auth = inject(AuthService);
  toast = inject(ToastService);

  private option = { month: 'long' } as const;
  public date: Date = new Date();
  public today: number = this.date.getDate();
  public month: string = this.date.toLocaleString('default', this.option);
  public year: number = this.date.getFullYear();
  public conversations: Conversation[] = [];
  public messages: Message[] = [];
  public allMessages: Message[] = [];
  public listings: Listings[] = [];
  public selectedConversation: Conversation | null = null;
  public newMessage = '';

  ngOnInit(): void {
    this.auth.getMe().subscribe(() => {
      this.getConversations();
      this.getAllMessages();
    });
    this.getListings();
  }

  private getListings(): void {
    this.http.get<Listings[]>(`${path.booking}/listings`).subscribe(data => {
      this.listings = data;
    });
  }

  private getAllMessages(): void {
    this.http.get<Message[]>(`${path.chat}/messages`).subscribe(data => {
      this.allMessages = data;
    });
  }

  private getConversations(): void {
    const id = this.auth.current?.id

    if (id) {
      this.http.get<Conversation[]>(`${path.chat}/inbox`).subscribe(data => {
        this.conversations = data.filter(c => c.participants.includes(id));
      });
    }
  }

  public getMessages(conversationId: string): void {
    this.http.get<Message[]>(`${path.chat}/messages`).subscribe(data => {
      this.messages = data.filter(m => m.id === conversationId);
    });
  }

  public getListingById(id: number | string): Listings | undefined {
    return this.listings.find(listing => listing.id === Number(id));
  }

  public get isPingOwner(): boolean {
    return this.selectedConversation?.participants[0] === this.auth.current?.id;
  }

  public getLastMessage(conversation: Conversation): string {
    const message = this.allMessages.find(m => m.id === conversation.participants[0]);
    if (!message) return conversation.subject;

    const lastPing = message.ping.length > 0 ? message.ping[message.ping.length - 1] : null;
    const lastPong = message.pong.length > 0 ? message.pong[message.pong.length - 1] : null;

    return lastPong || lastPing || conversation.subject;
  }

  public selectConversation(conversation: Conversation): void {
    this.selectedConversation = conversation;
    this.getMessages(conversation.participants[0]);
  }

  public sendMessage(): void {
    if (!this.selectedConversation || !this.newMessage.trim()) {
      return;
    }

    const currentUserId = this.auth.current?.id;
    if (!currentUserId) {
      this.toast.show({ message: 'You must be logged in to send messages', classname: 'bg-danger text-light' });
      return;
    }

    // Determine if current user is sender or recipient
    const isSender = this.selectedConversation.participants[0] === currentUserId;
    
    // Find the message object for this conversation
    const messageToUpdate = this.messages.find(
      m => m.id === this.selectedConversation!.participants[0]
    );

    if (messageToUpdate) {
      // Prepare the update payload
      const updatePayload = {
        ...messageToUpdate,
        [isSender ? 'ping' : 'pong']: [
          ...(isSender ? messageToUpdate.ping : messageToUpdate.pong),
          this.newMessage
        ],
        timestamp: new Date()
      };

      // Send PATCH request to update the message
      this.http.patch(`${path.chat}/messages/${messageToUpdate.id}`, updatePayload)
        .subscribe({
          next: () => {
            // Update local messages array
            if (isSender) {
              messageToUpdate.ping.push(this.newMessage);
            } else {
              messageToUpdate.pong.push(this.newMessage);
            }

            // Update allMessages as well to reflect changes in the list view
            const messageInAll = this.allMessages.find(m => m.id === messageToUpdate.id);
            if (messageInAll) {
              if (isSender) {
                messageInAll.ping.push(this.newMessage);
              } else {
                messageInAll.pong.push(this.newMessage);
              }
            }

            this.newMessage = ''; // Clear input
            this.toast.show({ message: 'Message sent successfully', classname: 'bg-success text-light' });
          },
          error: () => {
            this.toast.show({ message: 'Failed to send message', classname: 'bg-danger text-light' });
          }
        });
    }
  }
}