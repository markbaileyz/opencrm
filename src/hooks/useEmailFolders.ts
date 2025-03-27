
import { useToast } from "@/hooks/use-toast";
import type { Email } from "@/types/email";

export function useEmailFolders() {
  const { toast } = useToast();

  const handleDeleteEmail = (emails: Email[], id: string, selectedEmailId: string | null) => {
    const targetEmail = emails.find(email => email.id === id);
    
    const updatedEmails = emails.map(email => 
      email.id === id ? { ...email, folder: 'trash' as const } : email
    );
    
    toast({
      title: "Email deleted",
      description: "The email has been moved to trash.",
      variant: "default",
    });

    return {
      emails: updatedEmails,
      shouldDeselectEmail: selectedEmailId === id
    };
  };

  const handleArchiveEmail = (emails: Email[], id: string, selectedEmailId: string | null) => {
    const updatedEmails = emails.map(email => 
      email.id === id ? { ...email, folder: 'archive' as const } : email
    );
    
    toast({
      title: "Email archived",
      description: "The email has been archived.",
      variant: "default",
    });

    return {
      emails: updatedEmails,
      shouldDeselectEmail: selectedEmailId === id
    };
  };

  return {
    handleDeleteEmail,
    handleArchiveEmail
  };
}
