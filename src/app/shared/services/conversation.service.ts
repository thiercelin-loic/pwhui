import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants';
import { Conversation, Message, MessageItem } from '../models';

interface MessagePayload {
  messages: MessageItem[];
}

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private http = inject(HttpClient);

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(API_ENDPOINTS.INBOX);
  }

  createConversation(conversation: Partial<Conversation>): Observable<Conversation> {
    return this.http.post<Conversation>(API_ENDPOINTS.INBOX, conversation);
  }

  getMessages(conversationId: string): Observable<Message> {
    return this.http.get<Message>(`${API_ENDPOINTS.MESSAGES}/${conversationId}`);
  }

  sendMessage(conversationId: string, messageData: MessagePayload): Observable<Message> {
    return this.http.post<Message>(`${API_ENDPOINTS.MESSAGES}`, { ...messageData, id: conversationId });
  }

  updateMessage(messageId: string, messageData: MessagePayload): Observable<Message> {
    return this.http.patch<Message>(`${API_ENDPOINTS.MESSAGES}/${messageId}`, messageData);
  }
}
