
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, PlusCircle } from 'lucide-react';

interface ForumSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ForumSearch: React.FC<ForumSearchProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search forum discussions..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        New Discussion
      </Button>
    </div>
  );
};

export default ForumSearch;
