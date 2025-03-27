
import React from "react";
import { Search, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface KnowledgeHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleAiSearch: () => void;
  isFetchingAi: boolean;
}

const KnowledgeHeader: React.FC<KnowledgeHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  handleAiSearch,
  isFetchingAi,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Knowledge Base</h1>
        <p className="text-muted-foreground">
          Find answers to common questions, guides, and resources.
        </p>
      </div>
      
      <div className="relative max-w-md mx-auto w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search knowledge base..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-24"
        />
        {searchQuery && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2"
            onClick={() => setSearchQuery("")}
          >
            Clear
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          className="absolute right-16 top-1/2 -translate-y-1/2 h-7"
          onClick={handleAiSearch}
          disabled={!searchQuery.trim() || isFetchingAi}
        >
          <Bot className="h-3.5 w-3.5 mr-1" />
          Ask AI
        </Button>
      </div>
    </div>
  );
};

export default KnowledgeHeader;
