
import React, { useState } from "react";
import { Search } from "lucide-react";
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

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Search emails..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
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
