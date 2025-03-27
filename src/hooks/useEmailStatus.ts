
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

  const markEmailAsUnread = (emails: Email[], id: string) => {
    return emails.map(email => 
      email.id === id ? { ...email, read: false } : email
    );
  };

  const markAllAsRead = (emails: Email[]) => {
    return emails.map(email => ({ ...email, read: true }));
  };

  return {
    handleStarEmail,
    markEmailAsRead,
    markEmailAsUnread,
    markAllAsRead
  };
}
