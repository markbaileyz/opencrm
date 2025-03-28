
import React, { useState } from "react";
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
  
  const { executionHistory, clearHistory } = useExecutionHistory();
  
  const activeWorkflows = workflows.filter(w => w.status === "active");
  
  const filteredWorkflows = filterStatus === "all" 
    ? activeWorkflows 
    : activeWorkflows.filter(w => w.status === filterStatus);
  
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
