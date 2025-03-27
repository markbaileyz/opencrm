
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Plus, Menu, Filter } from "lucide-react";
import { useEmailContext } from "@/context/EmailContext";
import { useEmailManager } from "@/hooks/useEmailManager";
import EmailDetail from "@/components/email/EmailDetail";
import ComposeEmail from "@/components/email/ComposeEmail";
import MobileEmailFilters from "./MobileEmailFilters";
import EmailList from "@/components/email/EmailList";
import { Email } from "@/types/email";

const MobileEmailView: React.FC = () => {
  const { activeFolder, setActiveFolder, selectedEmail, setSelectedEmail } = useEmailContext();
  const { 
    emails, 
    loading, 
    error, 
    handleSelectEmail, 
    handleStarEmail, 
    handleDeleteEmail, 
    handleArchiveEmail 
  } = useEmailManager(activeFolder);
  
  const [showComposer, setShowComposer] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredEmails = emails.filter(email => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !email.read;
    if (activeTab === "flagged") return email.starred;
    return true;
  });
  
  const handleBackToList = () => {
    setSelectedEmail(null);
  };
  
  useEffect(() => {
    // Reset selected email when changing folders
    setSelectedEmail(null);
  }, [activeFolder, setSelectedEmail]);

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-2 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setShowSidebar(true)}>
          <Menu className="h-5 w-5" />
        </Button>
        
        <h1 className="text-lg font-medium">
          {activeFolder.charAt(0).toUpperCase() + activeFolder.slice(1)}
        </h1>
        
        <div className="flex">
          <Button variant="ghost" size="icon" onClick={() => setShowComposer(true)}>
            <Plus className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {!selectedEmail ? (
        <>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-4 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                <TabsTrigger value="flagged" className="flex-1">Flagged</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0 flex-1">
              <EmailList 
                emails={filteredEmails}
                loading={loading}
                error={error}
                onSelectEmail={(email: Email) => handleSelectEmail(email)}
                onStarEmail={handleStarEmail}
                onDeleteEmail={handleDeleteEmail}
                onArchiveEmail={handleArchiveEmail}
                folder={activeFolder}
              />
            </TabsContent>
            
            <TabsContent value="unread" className="mt-0 flex-1">
              <EmailList 
                emails={filteredEmails}
                loading={loading}
                error={error}
                onSelectEmail={(email: Email) => handleSelectEmail(email)}
                onStarEmail={handleStarEmail}
                onDeleteEmail={handleDeleteEmail}
                onArchiveEmail={handleArchiveEmail}
                folder={activeFolder}
              />
            </TabsContent>
            
            <TabsContent value="flagged" className="mt-0 flex-1">
              <EmailList 
                emails={filteredEmails}
                loading={loading}
                error={error}
                onSelectEmail={(email: Email) => handleSelectEmail(email)}
                onStarEmail={handleStarEmail}
                onDeleteEmail={handleDeleteEmail}
                onArchiveEmail={handleArchiveEmail}
                folder={activeFolder}
              />
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div className="flex-1 overflow-hidden">
          <EmailDetail 
            email={selectedEmail}
            onBackToList={handleBackToList}
            onDelete={() => {
              handleDeleteEmail(selectedEmail.id);
              handleBackToList();
            }}
            onArchive={() => {
              handleArchiveEmail(selectedEmail.id);
              handleBackToList();
            }}
            onStar={() => handleStarEmail(selectedEmail.id)}
          />
        </div>
      )}
      
      {showComposer && (
        <ComposeEmail
          isOpen={showComposer}
          onClose={() => setShowComposer(false)}
          onSend={() => {
            // Handle send email
            setShowComposer(false);
          }}
        />
      )}
      
      <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
        <SheetContent side="left">
          <MobileEmailFilters
            activeFolder={activeFolder}
            onSelectFolder={(folder) => {
              setActiveFolder(folder);
              setShowSidebar(false);
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileEmailView;
