
import { useToast } from "@/hooks/use-toast";
import type { Email } from "@/types/email";

export function useEmailSend() {
  const { toast } = useToast();
  
  const handleSendEmail = (emails: Email[], data: any) => {
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
      labels: data.labels || [],
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
