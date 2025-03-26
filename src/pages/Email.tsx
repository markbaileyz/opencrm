
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
  const [editingDraftId, setEditingDraftId] = useState<string | undefined>(undefined);
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
    handleRemoveLabel,
    handleEditDraft,
    refreshDrafts
  } = useEmailManager(emailData);

  const {
    handleReplyEmail,
    handleForwardEmail,
    refreshEmails,
    getDrafts
  } = useEmailActions();

  // Periodically refresh drafts
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (activeTab === 'drafts') {
        refreshDrafts();
      }
    }, 10000); // Refresh every 10 seconds when on drafts tab
    
    return () => clearInterval(refreshInterval);
  }, [activeTab]);

  // Refresh drafts when switching to drafts tab
  useEffect(() => {
    if (activeTab === 'drafts') {
      refreshDrafts();
    }
  }, [activeTab]);

  const unreadCounts = calculateUnreadCounts(emails);
  
  const allLabels = getAllLabels(emails);

  const handleComposeOpen = () => {
    setEditingDraftId(undefined);
    setIsComposeOpen(true);
  };
  
  const handleComposeSend = (data: any) => {
    console.log("Email sent:", data);
    const success = handleSendEmail(data);
    if (success) {
      setIsComposeOpen(false);
      setEditingDraftId(undefined);
      
      // Refresh drafts after sending in case we sent a draft
      refreshDrafts();
    }
  };
  
  const handleComposeClose = () => {
    setIsComposeOpen(false);
    setEditingDraftId(undefined);
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

  const handleOpenDraft = (email: Email) => {
    setEditingDraftId(email.id);
    setIsComposeOpen(true);
  };

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

  // Special handling for drafts folder
  const handleSelectEmailWrapper = (email: Email) => {
    if (email.folder === 'drafts') {
      handleOpenDraft(email);
    } else {
      handleSelectEmail(email);
    }
  };

  let filteredEmails = filterEmails(emails, activeTab, searchQuery, activeFilters);
  
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
              onSelectEmail={handleSelectEmailWrapper}
              onBackToList={handleBackToList}
              onStarEmail={handleStarEmail}
              onDeleteEmail={handleDeleteEmail}
              onArchiveEmail={handleArchiveEmail}
              onReplyEmail={(email) => handleReplyEmail(email, setIsComposeOpen)}
              onForwardEmail={(email) => handleForwardEmail(email, setIsComposeOpen)}
              onComposeClick={handleComposeOpen}
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
        draftId={editingDraftId}
      />
    </DashboardLayout>
  );
};

export default Email;
