
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Inbox, Search, Plus, Filter, ArrowLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import EmailListItemCompact from "../EmailListItemCompact";
import MobileEmailComposer from "./MobileEmailComposer";
import MobileEmailFilters from "./MobileEmailFilters";
import { useEmailContext } from "@/context/EmailContext";
import { useEmailManager } from "@/hooks/useEmailManager";
import { Email } from "@/types/email";

const MobileEmailView: React.FC = () => {
  const { selectedEmail, setSelectedEmail, showMobileComposer, setShowMobileComposer, activeFolder, setActiveFolder } = useEmailContext();
  const { emails, loading, error, handleStarEmail } = useEmailManager(activeFolder);
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
    setShowMobileComposer(false);
    // In a real app, we would update the emails list here
  };
  
  return (
    <div className="h-full flex flex-col">
      {!selectedEmail ? (
        // Email list view
        <>
          <div className="border-b p-4 sticky top-0 bg-background z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Inbox className="h-5 w-5" />
                <h1 className="text-xl font-semibold">Inbox</h1>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="ghost" onClick={() => setShowFilters(true)}>
                  <Filter className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => setShowMobileComposer(true)}>
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search emails"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-muted-foreground">Loading emails...</div>
            ) : error ? (
              <div className="p-4 text-center text-destructive">Failed to load emails</div>
            ) : filteredEmails.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No emails found</div>
            ) : (
              filteredEmails.map(email => (
                <EmailListItemCompact
                  key={email.id}
                  email={email}
                  isSelected={false}
                  onClick={() => handleSelectEmail(email)}
                  onStar={() => handleStarEmail(email.id)}
                />
              ))
            )}
          </div>
        </>
      ) : (
        // Email detail view
        <div className="flex flex-col h-full">
          <div className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
            <Button size="icon" variant="ghost" onClick={handleBackToList} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-medium truncate">{selectedEmail.subject}</h2>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-medium">{selectedEmail.senderName}</p>
                <p className="text-sm text-muted-foreground">{selectedEmail.senderEmail || (selectedEmail as any).from?.email}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(selectedEmail.date).toLocaleString()}
              </p>
            </div>
            
            <div className="mt-4 prose prose-sm max-w-none">
              {selectedEmail.body}
            </div>
          </div>
        </div>
      )}
      
      {showMobileComposer && (
        <MobileEmailComposer
          onClose={() => setShowMobileComposer(false)}
          onSend={handleSendEmail}
          replyToEmail={selectedEmail ? {
            id: selectedEmail.id,
            subject: selectedEmail.subject,
            from: {
              email: selectedEmail.senderEmail || (selectedEmail as any).from?.email || '',
              name: selectedEmail.senderName
            }
          } : undefined}
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

export default MobileEmailView;
