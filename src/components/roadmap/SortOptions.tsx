
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownAZ, ArrowUpZA, Filter, ThumbsUp, Clock, Check } from "lucide-react";
import { SortType } from "@/components/CRMFeaturesList";

interface SortOptionsProps {
  sortOption: SortType;
  setSortOption: (option: SortType) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ sortOption, setSortOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getSortIcon = () => {
    switch (sortOption) {
      case "popular":
        return <ThumbsUp className="h-4 w-4" />;
      case "az":
        return <ArrowDownAZ className="h-4 w-4" />;
      case "za":
        return <ArrowUpZA className="h-4 w-4" />;
      case "implemented":
        return <Check className="h-4 w-4" />;
      case "coming-soon":
        return <Clock className="h-4 w-4" />;
      default:
        return <Filter className="h-4 w-4" />;
    }
  };
  
  const getSortLabel = () => {
    switch (sortOption) {
      case "popular":
        return "Most Popular";
      case "az":
        return "A to Z";
      case "za":
        return "Z to A";
      case "implemented":
        return "Implemented First";
      case "coming-soon":
        return "Coming Soon First";
      default:
        return "Sort";
    }
  };
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          {getSortIcon()}
          {getSortLabel()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem 
          className="flex items-center gap-2"
          onClick={() => setSortOption("popular")}
        >
          <ThumbsUp className="h-4 w-4" />
          <span>Most Popular</span>
          {sortOption === "popular" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-2"
          onClick={() => setSortOption("az")}
        >
          <ArrowDownAZ className="h-4 w-4" />
          <span>A to Z</span>
          {sortOption === "az" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-2"
          onClick={() => setSortOption("za")}
        >
          <ArrowUpZA className="h-4 w-4" />
          <span>Z to A</span>
          {sortOption === "za" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-2"
          onClick={() => setSortOption("implemented")}
        >
          <Check className="h-4 w-4" />
          <span>Implemented</span>
          {sortOption === "implemented" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-2"
          onClick={() => setSortOption("coming-soon")}
        >
          <Clock className="h-4 w-4" />
          <span>Coming Soon</span>
          {sortOption === "coming-soon" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptions;
