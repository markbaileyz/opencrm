
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Mail, MailOpen, Send, Trash, Archive, Inbox } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EmailList from "@/components/email/EmailList";
import EmailDetail from "@/components/email/EmailDetail";
import ComposeEmail from "@/components/email/ComposeEmail";
import type { Email } from "@/types/email";
import { emailData } from "@/data/emailData";

const Email = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emails, setEmails] = useState(emailData);
  const { toast } = useToast();

  const handleComposeOpen = () => {
    setIsComposeOpen(true);
  };
  
  const handleComposeSend = (data: any) => {
    console.log("Email sent:", data);
    
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
    };
    
    setEmails([newEmail, ...emails]);
    setIsComposeOpen(false);
    
    toast({
      title: "Email sent",
      description: "Your email has been sent successfully.",
      variant: "success",
    });
  };
  
  const handleComposeClose = () => {
    setIsComposeOpen(false);
  };

  const handleSelectEmail = (email: Email) => {
    // Mark email as read if it wasn't
    if (!email.read) {
      markEmailAsRead(email.id);
    }
    setSelectedEmail(email);
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  const handleStarEmail = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, starred: !email.starred } : email
    ));
  };

  const handleDeleteEmail = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, folder: 'trash' } : email
    ));
    
    if (selectedEmail && selectedEmail.id === id) {
      setSelectedEmail(null);
    }
    
    toast({
      title: "Email deleted",
      description: "The email has been moved to trash.",
      variant: "default",
    });
  };

  const handleArchiveEmail = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, folder: 'archive' } : email
    ));
    
    if (selectedEmail && selectedEmail.id === id) {
      setSelectedEmail(null);
    }
    
    toast({
      title: "Email archived",
      description: "The email has been archived.",
      variant: "default",
    });
  };

  const markEmailAsRead = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, read: true } : email
    ));
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Email</h1>
            <p className="text-muted-foreground">
              Manage your email communications with contacts
            </p>
          </div>
          <Button onClick={handleComposeOpen} className="gap-2">
            <Plus className="h-4 w-4" />
            Compose
          </Button>
        </div>
        
        <Tabs defaultValue="inbox" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="inbox" className="gap-2">
                <Inbox className="h-4 w-4" />
                <span className="hidden sm:inline">Inbox</span>
              </TabsTrigger>
              <TabsTrigger value="sent" className="gap-2">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Sent</span>
              </TabsTrigger>
              <TabsTrigger value="drafts" className="gap-2">
                <MailOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Drafts</span>
              </TabsTrigger>
              <TabsTrigger value="trash" className="gap-2">
                <Trash className="h-4 w-4" />
                <span className="hidden sm:inline">Trash</span>
              </TabsTrigger>
              <TabsTrigger value="archive" className="gap-2">
                <Archive className="h-4 w-4" />
                <span className="hidden sm:inline">Archive</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          {activeTab && !selectedEmail ? (
            <div className="mt-0">
              <EmailList 
                emails={filteredEmails}
                folder={activeTab}
                onSelectEmail={handleSelectEmail}
                onStarEmail={handleStarEmail}
                onDeleteEmail={handleDeleteEmail}
                onArchiveEmail={handleArchiveEmail}
              />
            </div>
          ) : null}
          
          {selectedEmail && (
            <div className="mt-0">
              <EmailDetail 
                email={selectedEmail}
                onBack={handleBackToList}
                onStar={handleStarEmail}
                onDelete={handleDeleteEmail}
                onArchive={handleArchiveEmail}
                onReply={handleReplyEmail}
                onForward={handleForwardEmail}
              />
            </div>
          )}
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
