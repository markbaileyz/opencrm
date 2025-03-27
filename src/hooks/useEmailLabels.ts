
import { useToast } from "@/hooks/use-toast";
import type { Email } from "@/types/email";

export function useEmailLabels() {
  const { toast } = useToast();

  const handleAddLabel = (emails: Email[], id: string, label: string) => {
    const updatedEmails = emails.map(email => {
      if (email.id === id) {
        const existingLabels = email.labels || [];
        if (!existingLabels.includes(label)) {
          return { ...email, labels: [...existingLabels, label] };
        }
      }
      return email;
    });
    
    toast({
      title: "Label added",
      description: `The label "${label}" has been added to the email.`,
      variant: "default",
    });

    return updatedEmails;
  };

  const handleRemoveLabel = (emails: Email[], id: string, label: string) => {
    const updatedEmails = emails.map(email => {
      if (email.id === id && email.labels) {
        return { 
          ...email, 
          labels: email.labels.filter(l => l !== label) 
        };
      }
      return email;
    });
    
    toast({
      title: "Label removed",
      description: `The label "${label}" has been removed from the email.`,
      variant: "default",
    });

    return updatedEmails;
  };

  return {
    handleAddLabel,
    handleRemoveLabel
  };
}
