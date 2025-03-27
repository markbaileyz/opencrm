
import { useToast } from "@/hooks/use-toast";
import type { Email } from "@/types/email";

export function useEmailSend() {
  const { toast } = useToast();
  
  const handleSendEmail = (emails: Email[], data: any) => {
    // Create a new email and add it to the sent folder
    const newEmail: Email = {
      id: `email-${Date.now()}`,
      sender: "you@example.com",
      senderName: "You",
      senderEmail: "you@example.com",
      recipient: data.to,
      recipientName: data.to.split('@')[0],
      subject: data.subject,
      preview: data.message.substring(0, 50),
      body: data.message,
      date: new Date().toISOString(),
      read: true,
      starred: false,
      labels: data.labels || [],
      replied: false,
      forwarded: false,
      important: false,
      deleted: false,
      archived: false,
      folder: 'sent',
      hasAttachments: data.attachments ? data.attachments.length > 0 : false,
    };
    
    const updatedEmails = [newEmail, ...emails];
    
    toast({
      title: "Email sent",
      description: "Your email has been sent successfully.",
      variant: "success",
    });
    
    return updatedEmails;
  };

  return {
    handleSendEmail
  };
}
