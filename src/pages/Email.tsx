
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ComposeEmail from "@/components/email/ComposeEmail";
import { emailData } from "@/data/emailData";
import EmailHeader from "@/components/email/EmailHeader";
import EmailTabs from "@/components/email/EmailTabs";
import EmailContent from "@/components/email/EmailContent";
import EmailSearch from "@/components/email/EmailSearch";
import { useEmailManager } from "@/hooks/useEmailManager";
import { useEmailKeyboardShortcuts } from "@/hooks/useEmailKeyboardShortcuts";
import type { Email } from "@/types/email";
import { useToast } from "@/hooks/use-toast";

const Email = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { toast } = useToast();
  
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

  // Calculate unread counts for each folder
  const unreadCounts = emails.reduce((counts, email) => {
    if (!email.read) {
      counts[email.folder] = (counts[email.folder] || 0) + 1;
    }
    return counts;
  }, {} as Record<string, number>);

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  const refreshEmails = () => {
    toast({
      title: "Refreshing emails",
      description: "Checking for new emails...",
      variant: "default",
    });
    // In a real application, this would fetch new emails from the server
    // For now, we'll just show a toast message
    setTimeout(() => {
      toast({
        title: "Emails refreshed",
        description: "Your inbox is up to date",
        variant: "success",
      });
    }, 1000);
  };

  // Set up keyboard shortcuts
  const { availableShortcuts } = useEmailKeyboardShortcuts({
    isDetailView: !!selectedEmail,
    onBackToList: handleBackToList,
    onComposeNew: handleComposeOpen,
    onReply: selectedEmail ? () => handleReplyEmail(selectedEmail) : undefined,
    onForward: selectedEmail ? () => handleForwardEmail(selectedEmail) : undefined,
    onArchive: selectedEmail ? () => handleArchiveEmail(selectedEmail.id) : undefined,
    onDelete: selectedEmail ? () => handleDeleteEmail(selectedEmail.id) : undefined,
    onRefresh: refreshEmails,
    onStar: selectedEmail ? () => handleStarEmail(selectedEmail.id) : undefined,
    selectedId: selectedEmail?.id
  });

  // Filter emails based on the active tab, search query, and active filters
  const filteredEmails = emails.filter(email => {
    // First filter by folder (tab)
    if (email.folder !== activeTab) return false;
    
    // Then apply search query if present
    if (searchQuery && !emailMatchesSearch(email, searchQuery)) return false;
    
    // Then apply active filters
    if (activeFilters.includes("starred") && !email.starred) return false;
    if (activeFilters.includes("unread") && email.read) return false;
    if (activeFilters.includes("attachments") && !email.hasAttachments) return false;
    
    return true;
  });

  // Helper function to check if an email matches the search query
  const emailMatchesSearch = (email: Email, query: string): boolean => {
    const lowerCaseQuery = query.toLowerCase();
    return (
      email.subject.toLowerCase().includes(lowerCaseQuery) ||
      email.senderName.toLowerCase().includes(lowerCaseQuery) ||
      email.senderEmail.toLowerCase().includes(lowerCaseQuery) ||
      email.preview.toLowerCase().includes(lowerCaseQuery) ||
      email.body.toLowerCase().includes(lowerCaseQuery)
    );
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <EmailHeader onComposeClick={handleComposeOpen} />
          <EmailSearch onSearch={handleSearch} />
        </div>
        
        <Tabs defaultValue="inbox" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <EmailTabs 
            activeTab={activeTab} 
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
            unreadCounts={unreadCounts}
          />
          
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
              keyboardShortcuts={availableShortcuts}
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
