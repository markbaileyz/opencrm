
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Email } from '@/types/email';
import { useToast } from "@/components/ui/toast";
import { useEmailManager } from '@/hooks/useEmailManager';

interface EmailContextType {
  selectedEmail: Email | null;
  setSelectedEmail: (email: Email | null) => void;
  showMobileComposer: boolean;
  setShowMobileComposer: (show: boolean) => void;
  activeFolder: string;
  setActiveFolder: (folder: string) => void;
}

const EmailContext = createContext<EmailContextType>({
  selectedEmail: null,
  setSelectedEmail: () => {},
  showMobileComposer: false,
  setShowMobileComposer: () => {},
  activeFolder: 'inbox',
  setActiveFolder: () => {},
});

export const useEmailContext = () => useContext(EmailContext);

export const EmailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showMobileComposer, setShowMobileComposer] = useState(false);
  const [activeFolder, setActiveFolder] = useState('inbox');
  
  return (
    <EmailContext.Provider
      value={{
        selectedEmail,
        setSelectedEmail,
        showMobileComposer,
        setShowMobileComposer,
        activeFolder,
        setActiveFolder,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};
