
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Star, StarOff, Trash, Archive, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Email } from "@/types/email";

interface EmailListProps {
  emails: Email[];
  folder: string;
}

const EmailList = ({ emails, folder }: EmailListProps) => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [hoveredEmail, setHoveredEmail] = useState<string | null>(null);
  
  const handleSelectEmail = (id: string) => {
    if (selectedEmails.includes(id)) {
      setSelectedEmails(selectedEmails.filter(emailId => emailId !== id));
    } else {
      setSelectedEmails([...selectedEmails, id]);
    }
  };
  
  const handleSelectAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map(email => email.id));
    }
  };
  
  const handleRowClick = (email: Email) => {
    console.log("Email clicked:", email);
    // Will implement email viewing functionality later
  };
  
  if (emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-3 bg-muted/30 rounded-lg border border-dashed border-muted">
        <Mail className="h-12 w-12 text-muted-foreground/50" />
        <p className="text-muted-foreground">No emails in this folder</p>
      </div>
    );
  }
  
  return (
    <div className="bg-card rounded-md border shadow-sm">
      <div className="p-2 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox 
            checked={emails.length > 0 && selectedEmails.length === emails.length} 
            onCheckedChange={handleSelectAll}
          />
          {selectedEmails.length > 0 && (
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm">
                <Archive className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="w-[30px]"></TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emails.map((email) => (
            <TableRow 
              key={email.id}
              className={cn(
                "cursor-pointer hover:bg-muted/50",
                !email.read && "font-medium bg-muted/20"
              )}
              onClick={() => handleRowClick(email)}
              onMouseEnter={() => setHoveredEmail(email.id)}
              onMouseLeave={() => setHoveredEmail(null)}
            >
              <TableCell className="py-2">
                <Checkbox 
                  checked={selectedEmails.includes(email.id)} 
                  onCheckedChange={() => handleSelectEmail(email.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </TableCell>
              <TableCell className="py-2">
                {email.starred ? (
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ) : (
                  hoveredEmail === email.id && (
                    <StarOff className="h-4 w-4 text-muted-foreground" />
                  )
                )}
              </TableCell>
              <TableCell className="py-2 font-medium">
                {email.senderName}
              </TableCell>
              <TableCell className="py-2 max-w-[400px] truncate">
                <div className="flex space-x-2">
                  <span>{email.subject}</span>
                  <span className="text-muted-foreground truncate">
                    - {email.preview}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-2 text-right text-muted-foreground text-sm">
                {formatDistanceToNow(new Date(email.date), { addSuffix: true })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmailList;
