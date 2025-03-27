
export interface Email {
  id: string;
  subject: string;
  sender: string;
  senderName: string;
  senderEmail?: string;
  recipient: string;
  recipientName?: string;
  cc?: string[];
  bcc?: string[];
  date: string;
  body: string;
  preview: string;
  read: boolean;
  starred: boolean;
  labels: string[];
  replied: boolean;
  forwarded: boolean;
  important: boolean;
  deleted: boolean;
  archived: boolean;
  folder: string;
  hasAttachments: boolean;
  attachments?: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }>;
  threadId?: string;
  emailThreadId?: string;
}

export interface EmailFolder {
  id: string;
  name: string;
  count: number;
  unreadCount: number;
}

export interface EmailLabel {
  id: string;
  name: string;
  color: string;
}

export type SortOption = 'date-newest' | 'date-oldest' | 'sender-az' | 'sender-za' | 'subject-az' | 'subject-za';

export interface EmailDraft {
  id: string;
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  message: string;
  attachments?: File[];
  lastSaved: Date;
}
