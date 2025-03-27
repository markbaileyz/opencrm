
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Email } from '@/types/email';
import { useToast } from "@/hooks/use-toast";
import { emailData } from '@/data/emailData';

interface EmailContextType {
  selectedEmail: Email | null;
  setSelectedEmail: (email: Email | null) => void;
  showMobileComposer: boolean;
  setShowMobileComposer: (show: boolean) => void;
  activeFolder: string;
  setActiveFolder: (folder: string) => void;
  emails: Email[];
  loading: boolean;
  error: string | null;
}

const EmailContext = createContext<EmailContextType>({
  selectedEmail: null,
  setSelectedEmail: () => {},
  showMobileComposer: false,
  setShowMobileComposer: () => {},
  activeFolder: 'inbox',
  setActiveFolder: () => {},
  emails: [],
  loading: false,
  error: null
});

export const useEmailContext = () => useContext(EmailContext);

export const EmailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showMobileComposer, setShowMobileComposer] = useState(false);
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading emails
    setLoading(true);
    setError(null);
    
    try {
      // Filter emails based on active folder
      const filteredEmails = emailData.filter(email => {
        if (activeFolder === 'starred') return email.starred;
        return email.folder === activeFolder;
      });
      
      // Simulate network delay
      setTimeout(() => {
        setEmails(filteredEmails);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("Failed to load emails");
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to load emails. Please try again.",
        variant: "destructive"
      });
    }
  }, [activeFolder, toast]);
  
  return (
    <EmailContext.Provider
      value={{
        selectedEmail,
        setSelectedEmail,
        showMobileComposer,
        setShowMobileComposer,
        activeFolder,
        setActiveFolder,
        emails,
        loading,
        error
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};
