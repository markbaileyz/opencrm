
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PrescriptionSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const PrescriptionSearchBar: React.FC<PrescriptionSearchBarProps> = ({ 
  searchQuery, 
  setSearchQuery 
}) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search prescriptions..."
        className="pl-10"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default PrescriptionSearchBar;
