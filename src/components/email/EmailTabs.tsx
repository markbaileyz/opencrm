
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Inbox, Send, MailOpen, Trash, Archive } from "lucide-react";

interface EmailTabsProps {
  activeTab: string;
}

const EmailTabs: React.FC<EmailTabsProps> = ({ activeTab }) => {
  return (
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
  );
};

export default EmailTabs;
