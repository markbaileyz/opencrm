
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Mail, Archive, Trash, Star } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import EmailListItemCompact from "../EmailListItemCompact";
import MobileEmailFilters from "./MobileEmailFilters";
import MobileEmailComposer from "./MobileEmailComposer";
import { Email } from "@/types/email";
import { useEmailManager } from "@/hooks/useEmailManager";

const MobileEmailView: React.FC = () => {
  const { emails, loading, activeFolder } = useEmailManager();
  const [searchQuery, setSearchQuery] = useState("");
  const [showComposer, setShowComposer] = useState(false);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  
  // Filter emails based on search query
  const filteredEmails = emails.filter(email => 
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex flex-col h-full">
      {/* Header with search */}
      <div className="p-4 border-b flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search emails..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] sm:w-[385px]">
            <MobileEmailFilters />
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Email tabs */}
      <Tabs defaultValue="inbox" className="flex-1 flex flex-col">
        <div className="border-b overflow-x-auto scrollbar-hide">
          <TabsList className="px-1 h-12">
            <TabsTrigger value="inbox" className="flex items-center gap-1.5">
              <Mail className="h-4 w-4" />
              <span>Inbox</span>
              <Badge variant="secondary" className="ml-1">
                {emails.filter(e => !e.read).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="starred" className="flex items-center gap-1.5">
              <Star className="h-4 w-4" />
              <span>Starred</span>
            </TabsTrigger>
            <TabsTrigger value="archived" className="flex items-center gap-1.5">
              <Archive className="h-4 w-4" />
              <span>Archived</span>
            </TabsTrigger>
            <TabsTrigger value="trash" className="flex items-center gap-1.5">
              <Trash className="h-4 w-4" />
              <span>Trash</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="inbox" className="flex-1 overflow-auto p-0">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">Loading emails...</div>
          ) : filteredEmails.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              {searchQuery ? "No emails match your search" : "No emails in this folder"}
            </div>
          ) : (
            <ul className="divide-y">
              {filteredEmails.map((email: Email) => (
                <EmailListItemCompact 
                  key={email.id} 
                  email={email} 
                  onClick={() => setSelectedEmailId(email.id)} 
                  selected={selectedEmailId === email.id}
                />
              ))}
            </ul>
          )}
        </TabsContent>
        
        <TabsContent value="starred" className="flex-1 p-0">
          <div className="p-4 text-center text-muted-foreground">
            Starred emails will appear here
          </div>
        </TabsContent>
        
        <TabsContent value="archived" className="flex-1 p-0">
          <div className="p-4 text-center text-muted-foreground">
            Archived emails will appear here
          </div>
        </TabsContent>
        
        <TabsContent value="trash" className="flex-1 p-0">
          <div className="p-4 text-center text-muted-foreground">
            Deleted emails will appear here
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Floating action button for compose */}
      <Button
        className="fixed bottom-16 right-4 rounded-full w-14 h-14 shadow-lg"
        onClick={() => setShowComposer(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>
      
      {/* Mobile email composer */}
      {showComposer && (
        <MobileEmailComposer 
          onClose={() => setShowComposer(false)}
          onSend={() => setShowComposer(false)}
        />
      )}
    </div>
  );
};

export default MobileEmailView;
