
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Workflow, WorkflowStatus } from "@/types/workflow";
import { Play, Pause, RotateCcw, AlertCircle, CheckCircle, Clock, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useExecutionHistory } from "../hooks/useExecutionHistory";
import WorkflowExecutionEmpty from "./WorkflowExecutionEmpty";
import WorkflowExecutionHistory from "./WorkflowExecutionHistory";
import WorkflowExecutionCard from "./WorkflowExecutionCard";
import { useToast } from "@/hooks/use-toast";

interface WorkflowExecutionMonitorProps {
  workflows: Workflow[];
  onActivate: (id: string) => void;
  onPause: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const WorkflowExecutionMonitor: React.FC<WorkflowExecutionMonitorProps> = ({
  workflows,
  onActivate,
  onPause,
  onViewDetails
}) => {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [filterStatus, setFilterStatus] = useState<WorkflowStatus | "all">("all");
  const { toast } = useToast();
  
  const { executionHistory, clearHistory, addExecutionRecord } = useExecutionHistory();
  
  const activeWorkflows = workflows.filter(w => w.status === "active");
  
  const filteredWorkflows = filterStatus === "all" 
    ? activeWorkflows 
    : activeWorkflows.filter(w => w.status === filterStatus);

  // Simulate workflow events for demo purposes
  useEffect(() => {
    const simulateWorkflowEvent = () => {
      if (activeWorkflows.length > 0) {
        const randomWorkflow = activeWorkflows[Math.floor(Math.random() * activeWorkflows.length)];
        const events = [
          { type: "step_complete", success: true, message: "Email notification sent successfully" },
          { type: "step_complete", success: true, message: "Task created for follow-up" },
          { type: "warning", success: true, message: "Waiting for external system response" },
          { type: "error", success: false, message: "Failed to connect to external API" }
        ];
        
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        
        // Add to execution history
        addExecutionRecord({
          workflowId: randomWorkflow.id,
          workflowName: randomWorkflow.name,
          success: randomEvent.success,
          message: randomEvent.message
        });
        
        // Show toast notification based on event type
        if (randomEvent.type === "error") {
          toast({
            title: "Workflow Error",
            description: `${randomWorkflow.name}: ${randomEvent.message}`,
            variant: "destructive"
          });
        } else if (randomEvent.type === "warning") {
          toast({
            title: "Workflow Warning",
            description: `${randomWorkflow.name}: ${randomEvent.message}`,
            variant: "warning"
          });
        } else {
          toast({
            title: "Workflow Update",
            description: `${randomWorkflow.name}: ${randomEvent.message}`,
            variant: "success"
          });
        }
      }
    };
    
    // Simulate events every 30 seconds if there are active workflows
    if (activeWorkflows.length > 0) {
      const timer = setTimeout(simulateWorkflowEvent, 30000);
      return () => clearTimeout(timer);
    }
  }, [activeWorkflows, addExecutionRecord, toast]);
  
  // Handle restart workflow
  const handleRestartWorkflow = (id: string) => {
    // Simulate restarting the workflow
    addExecutionRecord({
      workflowId: id,
      workflowName: workflows.find(w => w.id === id)?.name || "Unknown workflow",
      success: true,
      message: "Workflow restarted successfully"
    });
    
    // Ensure the workflow is active
    onActivate(id);
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Workflow Execution Monitor</CardTitle>
            <CardDescription>Track and manage active workflow executions</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setFilterStatus("all")}>
              <Filter className="h-4 w-4 mr-1" />
              {filterStatus === "all" ? "All" : `Filter: ${filterStatus}`}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "active" | "history")}>
          <TabsList className="mb-4">
            <TabsTrigger value="active" className="flex items-center">
              <Play className="h-4 w-4 mr-2" />
              Active Executions
              {activeWorkflows.length > 0 && (
                <Badge variant="secondary" className="ml-2">{activeWorkflows.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Execution History
              {executionHistory.length > 0 && (
                <Badge variant="secondary" className="ml-2">{executionHistory.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="m-0">
            {filteredWorkflows.length === 0 ? (
              <WorkflowExecutionEmpty />
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredWorkflows.map(workflow => (
                  <WorkflowExecutionCard 
                    key={workflow.id}
                    workflow={workflow}
                    onPause={onPause}
                    onViewDetails={onViewDetails}
                    onRestart={handleRestartWorkflow}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="m-0">
            <WorkflowExecutionHistory 
              history={executionHistory}
              onClear={clearHistory}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WorkflowExecutionMonitor;
