
import React, { useState } from "react";
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
import { useEmailActions } from "@/hooks/useEmailActions";
import type { Email } from "@/types/email";
import { useToast } from "@/hooks/use-toast";
import { 
  filterEmails, 
  sortEmails, 
  calculateUnreadCounts,
  getAllLabels,
  SortOption 
} from "@/utils/emailUtils";

const Email = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const { toast } = useToast();
  
  const {
    emails,
    selectedEmail,
    handleSelectEmail,
    handleBackToList,
    handleStarEmail,
    handleDeleteEmail,
    handleArchiveEmail,
    handleSendEmail,
    handleAddLabel,
    handleRemoveLabel
  } = useEmailManager(emailData);

  const {
    handleReplyEmail,
    handleForwardEmail,
    refreshEmails
  } = useEmailActions();

  // Calculate unread counts for each folder
  const unreadCounts = calculateUnreadCounts(emails);
  
  // Get all unique labels from emails
  const allLabels = getAllLabels(emails);

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    toast({
      title: "Sort order changed",
      description: `Emails sorted by ${option}`,
      variant: "default",
    });
  };

  // Set up keyboard shortcuts
  const { availableShortcuts } = useEmailKeyboardShortcuts({
    isDetailView: !!selectedEmail,
    onBackToList: handleBackToList,
    onComposeNew: handleComposeOpen,
    onReply: selectedEmail ? () => handleReplyEmail(selectedEmail, setIsComposeOpen) : undefined,
    onForward: selectedEmail ? () => handleForwardEmail(selectedEmail, setIsComposeOpen) : undefined,
    onArchive: selectedEmail ? () => handleArchiveEmail(selectedEmail.id) : undefined,
    onDelete: selectedEmail ? () => handleDeleteEmail(selectedEmail.id) : undefined,
    onRefresh: refreshEmails,
    onStar: selectedEmail ? () => handleStarEmail(selectedEmail.id) : undefined,
    selectedId: selectedEmail?.id
  });

  // Apply filtering and sorting to emails
  let filteredEmails = filterEmails(emails, activeTab, searchQuery, activeFilters);
  
  // Apply sorting to the filtered emails
  filteredEmails = sortEmails(filteredEmails, sortOption);
  
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
            availableLabels={allLabels}
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
              onReplyEmail={(email) => handleReplyEmail(email, setIsComposeOpen)}
              onForwardEmail={(email) => handleForwardEmail(email, setIsComposeOpen)}
              onAddLabel={handleAddLabel}
              onRemoveLabel={handleRemoveLabel}
              allLabels={allLabels}
              keyboardShortcuts={availableShortcuts}
              sortOption={sortOption}
              onSortChange={handleSortChange}
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
