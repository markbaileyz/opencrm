
import React from "react";
import { Star, StarOff } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { TableRow, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Email } from "@/types/email";

interface EmailListItemProps {
  email: Email;
  isSelected: boolean;
  isBulkMode?: boolean;
  isHovered?: boolean;
  onSelect?: (id: string) => void;
  onStarClick: (e: React.MouseEvent, id: string) => void;
  onClick: (email: Email) => void;
  onDelete: () => void;
  onArchive: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const EmailListItem: React.FC<EmailListItemProps> = ({
  email,
  isSelected,
  isBulkMode = false,
  isHovered = false,
  onSelect,
  onStarClick,
  onClick,
  onDelete,
  onArchive,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <TableRow 
      className={cn(
        "cursor-pointer hover:bg-muted/50",
        !email.read && "font-medium bg-muted/20",
        isSelected && "bg-muted/40"
      )}
      onClick={() => onClick(email)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <TableCell className="py-2">
        {isBulkMode && onSelect && (
          <Checkbox 
            checked={isSelected} 
            onCheckedChange={() => onSelect(email.id)}
            onClick={(e) => e.stopPropagation()}
          />
        )}
        {!isBulkMode && (
          email.starred ? (
            <Star 
              className="h-4 w-4 text-yellow-400 fill-yellow-400" 
              onClick={(e) => onStarClick(e, email.id)}
            />
          ) : (
            isHovered && (
              <StarOff 
                className="h-4 w-4 text-muted-foreground" 
                onClick={(e) => onStarClick(e, email.id)}
              />
            )
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
  );
};

export default EmailListItem;
