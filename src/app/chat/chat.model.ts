export interface MessageItem {
    sender: string;
    content: string;
    timestamp: Date;
}

export interface Message {
    id: string;
    messages: MessageItem[];
}

export interface Conversation {
    id: string;
    listing: string;
    participants: string[];
    subject: string;
}
