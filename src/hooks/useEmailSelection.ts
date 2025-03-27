
import { useState } from "react";
import type { Email } from "@/types/email";

export function useEmailSelection() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const handleSelectEmail = (email: Email) => {
    // Mark email as read if it wasn't
    if (!email.read) {
      return { ...email, read: true };
    }
    setSelectedEmail(email);
    return email;
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  return {
    selectedEmail,
    setSelectedEmail,
    handleSelectEmail,
    handleBackToList
  };
}
