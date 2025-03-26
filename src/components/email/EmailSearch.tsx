
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EmailSearchProps {
  onSearch: (query: string) => void;
}

const EmailSearch: React.FC<EmailSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search emails..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-10"
        />
        {searchQuery && (
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={handleClear}
            className="absolute right-8 top-0 h-full px-2"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button 
          type="submit" 
          variant="ghost" 
          size="sm" 
          className="absolute right-0 top-0 h-full px-3"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default EmailSearch;
