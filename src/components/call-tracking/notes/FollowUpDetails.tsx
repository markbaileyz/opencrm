
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FollowUpDetailsProps {
  date: string;
  status: 'pending' | 'completed';
  notes?: string;
  onComplete: () => void;
}

const FollowUpDetails: React.FC<FollowUpDetailsProps> = ({
  date,
  status,
  notes,
  onComplete
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>
            {new Date(date).toLocaleDateString()} 
            ({formatDistanceToNow(new Date(date), { addSuffix: true })})
          </span>
          <Badge variant={status === 'completed' ? 'outline' : 'default'}>
            {status === 'completed' ? 'Completed' : 'Pending'}
          </Badge>
        </div>
        
        {status === 'pending' && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onComplete}
            className="h-8 px-2"
          >
            <CheckCircle2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {notes && (
        <Collapsible
          open={!isCollapsed}
          onOpenChange={setIsCollapsed}
          className="w-full"
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {isCollapsed ? "Show notes" : "Hide notes"}
              </span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="p-3 bg-muted/40 rounded-md text-sm">
              {notes}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default FollowUpDetails;
