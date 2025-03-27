
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Settings } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import EmailList from "@/components/email/EmailList";
import EmailDetail from "@/components/email/EmailDetail";
import ComposeEmail from "@/components/email/ComposeEmail";
import MobileEmailFilters from "@/components/email/mobile/MobileEmailFilters";
import { useEmailContext } from "@/context/EmailContext";
import { useEmailManager } from "@/hooks/useEmailManager";
import { Email } from "@/types/email";

const DesktopEmailView: React.FC = () => {
  const { selectedEmail, setSelectedEmail, activeFolder, setActiveFolder } = useEmailContext();
  const { emails, loading, error, handleStarEmail, handleDeleteEmail, handleArchiveEmail } = useEmailManager(activeFolder);
  const [showCompose, setShowCompose] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredEmails = emails.filter(email => 
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };
  
  const handleSendEmail = () => {
    setShowCompose(false);
    // In a real app, we would update the emails list here
  };
  
  const folders = [
    { id: 'inbox', name: 'Inbox' },
    { id: 'starred', name: 'Starred' },
    { id: 'sent', name: 'Sent' },
    { id: 'drafts', name: 'Drafts' },
    { id: 'archive', name: 'Archive' },
    { id: 'trash', name: 'Trash' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-5 h-full border rounded-md overflow-hidden">
        {/* Sidebar */}
        <div className="col-span-1 border-r bg-muted/20">
          <div className="p-4">
            <Button 
              className="w-full" 
              onClick={() => setShowCompose(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Compose
            </Button>
          </div>
          
          <div className="space-y-1 px-2">
            {folders.map(folder => (
              <Button
                key={folder.id}
                variant={activeFolder === folder.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveFolder(folder.id)}
              >
                {folder.name}
                {folder.id === 'inbox' && (
                  <span className="ml-auto bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                    {filteredEmails.filter(e => !e.read).length}
                  </span>
                )}
              </Button>
            ))}
          </div>
          
          <div className="mt-6 px-4">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setShowFilters(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
        
        {/* Email List */}
        <div className={`${selectedEmail ? 'hidden md:block' : ''} col-span-5 md:col-span-2 border-r`}>
          <div className="p-4 border-b flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search emails"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="icon" className="ml-2">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
          
          <EmailList 
            emails={filteredEmails}
            loading={loading}
            error={error}
            selectedEmailId={selectedEmail?.id}
            onSelectEmail={handleSelectEmail}
            onStarEmail={handleStarEmail}
            onDeleteEmail={handleDeleteEmail}
            onArchiveEmail={handleArchiveEmail}
          />
        </div>
        
        {/* Email Detail */}
        <div className={`${!selectedEmail ? 'hidden md:block' : ''} col-span-5 md:col-span-2`}>
          {selectedEmail ? (
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
          ) : (
            <div className="h-full flex items-center justify-center text-center p-8">
              <div>
                <h3 className="text-lg font-medium mb-2">Select an email to view</h3>
                <p className="text-muted-foreground">Choose an email from the list to view its contents</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {showCompose && (
        <ComposeEmail
          onClose={() => setShowCompose(false)}
          onSend={handleSendEmail}
        />
      )}
      
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="left">
          <MobileEmailFilters
            activeFolder={activeFolder}
            onSelectFolder={(folder) => {
              setActiveFolder(folder);
              setShowFilters(false);
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DesktopEmailView;
