
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Inbox, 
  Send, 
  MailOpen, 
  Trash, 
  Archive, 
  Star, 
  Filter
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EmailTabsProps {
  activeTab: string;
  onFilterChange?: (filters: string[]) => void;
  activeFilters?: string[];
  unreadCounts?: Record<string, number>;
}

const EmailTabs: React.FC<EmailTabsProps> = ({ 
  activeTab,
  onFilterChange = () => {},
  activeFilters = [],
  unreadCounts = {}
}) => {
  const handleFilterToggle = (value: string) => {
    if (activeFilters.includes(value)) {
      onFilterChange(activeFilters.filter(filter => filter !== value));
    } else {
      onFilterChange([...activeFilters, value]);
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <TabsList>
        <TabsTrigger value="inbox" className="gap-2">
          <Inbox className="h-4 w-4" />
          <span className="hidden sm:inline">Inbox</span>
          {unreadCounts.inbox > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 px-1.5">
              {unreadCounts.inbox}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="sent" className="gap-2">
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Sent</span>
        </TabsTrigger>
        <TabsTrigger value="drafts" className="gap-2">
          <MailOpen className="h-4 w-4" />
          <span className="hidden sm:inline">Drafts</span>
          {unreadCounts.drafts > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 px-1.5">
              {unreadCounts.drafts}
            </Badge>
          )}
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilters.length > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                {activeFilters.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            checked={activeFilters.includes("starred")}
            onCheckedChange={() => handleFilterToggle("starred")}
          >
            <Star className="h-4 w-4 mr-2 text-yellow-400" />
            Starred
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={activeFilters.includes("unread")}
            onCheckedChange={() => handleFilterToggle("unread")}
          >
            <MailOpen className="h-4 w-4 mr-2" />
            Unread
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={activeFilters.includes("attachments")}
            onCheckedChange={() => handleFilterToggle("attachments")}
          >
            <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
            </svg>
            With Attachments
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EmailTabs;
