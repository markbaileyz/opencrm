
export interface Email {
  id: string;
  senderName: string;
  senderEmail: string;
  recipient: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  read: boolean;
  starred: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'trash' | 'archive';
  hasAttachments: boolean;
  labels?: string[];
}
