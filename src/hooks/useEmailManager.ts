
import { useState } from "react";
import type { Email } from "@/types/email";
import { useToast } from "@/hooks/use-toast";

export function useEmailManager(initialEmails: Email[]) {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const { toast } = useToast();

  const handleSelectEmail = (email: Email) => {
    // Mark email as read if it wasn't
    if (!email.read) {
      markEmailAsRead(email.id);
    }
    setSelectedEmail(email);
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  const handleStarEmail = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, starred: !email.starred } : email
    ));
  };

  const handleDeleteEmail = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, folder: 'trash' } : email
    ));
    
    if (selectedEmail && selectedEmail.id === id) {
      setSelectedEmail(null);
    }
    
    toast({
      title: "Email deleted",
      description: "The email has been moved to trash.",
      variant: "default",
    });
  };

  const handleArchiveEmail = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, folder: 'archive' } : email
    ));
    
    if (selectedEmail && selectedEmail.id === id) {
      setSelectedEmail(null);
    }
    
    toast({
      title: "Email archived",
      description: "The email has been archived.",
      variant: "default",
    });
  };

  const markEmailAsRead = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, read: true } : email
    ));
  };
  
  const handleSendEmail = (data: any) => {
    // Create a new email and add it to the sent folder
    const newEmail: Email = {
      id: `email-${Date.now()}`,
      senderName: "You",
      senderEmail: "you@example.com",
      recipient: data.to,
      subject: data.subject,
      preview: data.message.substring(0, 50),
      body: data.message,
      date: new Date().toISOString(),
      read: true,
      starred: false,
      folder: 'sent',
      hasAttachments: data.attachments.length > 0,
    };
    
    setEmails([newEmail, ...emails]);
    
    toast({
      title: "Email sent",
      description: "Your email has been sent successfully.",
      variant: "success",
    });
    
    return true;
  };

  return {
    emails,
    selectedEmail,
    handleSelectEmail,
    handleBackToList,
    handleStarEmail,
    handleDeleteEmail,
    handleArchiveEmail,
    handleSendEmail
  };
}
