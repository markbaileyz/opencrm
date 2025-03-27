
import { useToast } from "@/hooks/use-toast";
import type { Email } from "@/types/email";

export function useEmailReplyForward() {
  const { toast } = useToast();

  const handleReplyEmail = (email: Email, setIsComposeOpen: (value: boolean) => void) => {
    // Pre-fill reply data
    const replyData = {
      to: email.senderEmail,
      subject: `Re: ${email.subject}`,
      message: `\n\n\n-------- Original Message --------\nFrom: ${email.senderName} <${email.senderEmail}>\nDate: ${new Date(email.date).toLocaleString()}\nSubject: ${email.subject}\n\n${email.body}`,
      isReply: true,
      originalEmail: email
    };
    
    // Store in sessionStorage to persist during compose modal opening
    sessionStorage.setItem('emailCompose', JSON.stringify(replyData));
    setIsComposeOpen(true);
    
    toast({
      title: "Reply started",
      description: `Replying to: ${email.senderName}`,
      variant: "default",
    });
  };

  const handleForwardEmail = (email: Email, setIsComposeOpen: (value: boolean) => void) => {
    // Pre-fill forward data
    const forwardData = {
      to: '',
      subject: `Fwd: ${email.subject}`,
      message: `\n\n\n-------- Forwarded Message --------\nFrom: ${email.senderName} <${email.senderEmail}>\nDate: ${new Date(email.date).toLocaleString()}\nSubject: ${email.subject}\n\n${email.body}`,
      isForward: true,
      originalEmail: email
    };
    
    // Store in sessionStorage to persist during compose modal opening
    sessionStorage.setItem('emailCompose', JSON.stringify(forwardData));
    setIsComposeOpen(true);
    
    toast({
      title: "Forward started",
      description: `Forwarding email from: ${email.senderName}`,
      variant: "default",
    });
  };

  return {
    handleReplyEmail,
    handleForwardEmail
  };
}
