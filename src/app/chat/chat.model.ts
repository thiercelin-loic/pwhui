export interface Message {
    id: string
    timestamp: Date    
    subject: string
    sender: string
    recipient: string
    ping: string[]
    pong: string[]
}

export interface Conversation {
    id: string;
    listing: string;
    participants: string[];
    subject: string;
}
