
import React from "react";
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Inbox, Star, Send, File, Archive, Trash } from "lucide-react";

interface MobileEmailFiltersProps {
  activeFolder: string;
  onSelectFolder: (folder: string) => void;
}

const MobileEmailFilters: React.FC<MobileEmailFiltersProps> = ({ 
  activeFolder, 
  onSelectFolder 
}) => {
  const folders = [
    { id: 'inbox', name: 'Inbox', icon: <Inbox className="h-4 w-4 mr-2" /> },
    { id: 'starred', name: 'Starred', icon: <Star className="h-4 w-4 mr-2" /> },
    { id: 'sent', name: 'Sent', icon: <Send className="h-4 w-4 mr-2" /> },
    { id: 'drafts', name: 'Drafts', icon: <File className="h-4 w-4 mr-2" /> },
    { id: 'archive', name: 'Archive', icon: <Archive className="h-4 w-4 mr-2" /> },
    { id: 'trash', name: 'Trash', icon: <Trash className="h-4 w-4 mr-2" /> },
  ];

  return (
    <div className="py-4">
      <SheetHeader className="mb-5">
        <SheetTitle>Email Folders</SheetTitle>
      </SheetHeader>
      
      <div className="space-y-1">
        {folders.map((folder) => (
          <Button
            key={folder.id}
            variant={activeFolder === folder.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onSelectFolder(folder.id)}
          >
            {folder.icon}
            {folder.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MobileEmailFilters;
