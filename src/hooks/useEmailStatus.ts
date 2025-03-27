
import type { Email } from "@/types/email";

export function useEmailStatus() {
  const handleStarEmail = (emails: Email[], id: string) => {
    return emails.map(email => 
      email.id === id ? { ...email, starred: !email.starred } : email
    );
  };

  const markEmailAsRead = (emails: Email[], id: string) => {
    return emails.map(email => 
      email.id === id ? { ...email, read: true } : email
    );
  };

  return {
    handleStarEmail,
    markEmailAsRead
  };
}
