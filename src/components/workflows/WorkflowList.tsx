
import React, { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  PlusCircle, 
  MoreHorizontal, 
  Activity,
  Pause,
  Edit,
  Copy,
  Trash
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Workflow, WorkflowStatus } from "@/types/workflow";
import { format, formatDistanceToNow } from "date-fns";

interface WorkflowListProps {
  workflows: Workflow[];
  onCreateWorkflow: () => void;
  onEditWorkflow: (workflowId: string) => void;
  onDeleteWorkflow: (workflowId: string) => void;
  onDuplicateWorkflow: (workflowId: string) => void;
  onToggleWorkflowStatus: (workflowId: string, newStatus: WorkflowStatus) => void;
}

const WorkflowList: React.FC<WorkflowListProps> = ({
  workflows,
  onCreateWorkflow,
  onEditWorkflow,
  onDeleteWorkflow,
  onDuplicateWorkflow,
  onToggleWorkflowStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredWorkflows = workflows.filter((workflow) => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      workflow.name.toLowerCase().includes(searchLower) ||
      workflow.description?.toLowerCase().includes(searchLower) ||
      workflow.trigger.toLowerCase().includes(searchLower)
    );
  });

  const getStatusBadge = (status: WorkflowStatus) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return null;
    }
  };

  const formatTriggerName = (trigger: string): string => {
    return trigger
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={onCreateWorkflow}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {filteredWorkflows.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkflows.map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{workflow.name}</div>
                      {workflow.description && (
                        <div className="text-sm text-muted-foreground">{workflow.description}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatTriggerName(workflow.trigger)}</TableCell>
                  <TableCell>{getStatusBadge(workflow.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {format(new Date(workflow.createdAt), 'MMM d, yyyy')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      by {workflow.createdBy}
                    </div>
                  </TableCell>
                  <TableCell>
                    {workflow.lastRunAt ? (
                      <div className="text-sm">
                        {formatDistanceToNow(new Date(workflow.lastRunAt), { addSuffix: true })}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Never</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEditWorkflow(workflow.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDuplicateWorkflow(workflow.id)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        {workflow.status === "active" ? (
                          <DropdownMenuItem onClick={() => onToggleWorkflowStatus(workflow.id, "inactive")}>
                            <Pause className="h-4 w-4 mr-2" />
                            Deactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => onToggleWorkflowStatus(workflow.id, "active")}>
                            <Activity className="h-4 w-4 mr-2" />
                            Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onDeleteWorkflow(workflow.id)} className="text-destructive">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border rounded-md p-8 bg-muted/10">
          <Activity className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">No workflows found</h3>
          <p className="text-muted-foreground text-center mb-4 max-w-md">
            {searchQuery 
              ? "No workflows match your search criteria. Try different keywords or clear your search."
              : "There are no workflows created yet. Start by creating a new workflow."}
          </p>
          <Button onClick={onCreateWorkflow}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkflowList;
