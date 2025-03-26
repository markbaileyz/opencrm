
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ComposeEmail from "@/components/email/ComposeEmail";
import { emailData } from "@/data/emailData";
import EmailHeader from "@/components/email/EmailHeader";
import EmailTabs from "@/components/email/EmailTabs";
import EmailContent from "@/components/email/EmailContent";
import { useEmailManager } from "@/hooks/useEmailManager";
import type { Email } from "@/types/email";

const Email = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  
  const {
    emails,
    selectedEmail,
    handleSelectEmail,
    handleBackToList,
    handleStarEmail,
    handleDeleteEmail,
    handleArchiveEmail,
    handleSendEmail
  } = useEmailManager(emailData);

  const handleComposeOpen = () => {
    setIsComposeOpen(true);
  };
  
  const handleComposeSend = (data: any) => {
    console.log("Email sent:", data);
    const success = handleSendEmail(data);
    if (success) {
      setIsComposeOpen(false);
    }
  };
  
  const handleComposeClose = () => {
    setIsComposeOpen(false);
  };

  const handleReplyEmail = (email: Email) => {
    setIsComposeOpen(true);
    // Implementation for pre-filling reply can be added later
  };

  const handleForwardEmail = (email: Email) => {
    setIsComposeOpen(true);
    // Implementation for pre-filling forward can be added later
  };

  const filteredEmails = emails.filter(email => email.folder === activeTab);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <EmailHeader onComposeClick={handleComposeOpen} />
        
        <Tabs defaultValue="inbox" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <EmailTabs activeTab={activeTab} />
          
          <TabsContent value={activeTab}>
            <EmailContent 
              activeTab={activeTab}
              selectedEmail={selectedEmail}
              filteredEmails={filteredEmails}
              onSelectEmail={handleSelectEmail}
              onBackToList={handleBackToList}
              onStarEmail={handleStarEmail}
              onDeleteEmail={handleDeleteEmail}
              onArchiveEmail={handleArchiveEmail}
              onReplyEmail={handleReplyEmail}
              onForwardEmail={handleForwardEmail}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <ComposeEmail 
        isOpen={isComposeOpen} 
        onClose={handleComposeClose} 
        onSend={handleComposeSend} 
      />
    </DashboardLayout>
  );
};

export default Email;
