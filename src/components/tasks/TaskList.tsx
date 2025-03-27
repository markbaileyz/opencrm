
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientTask } from "@/types/patient";
import { PlusCircle, CheckCircle, Calendar, AlertCircle } from "lucide-react";

interface TaskListProps {
  tasks: PatientTask[];
  onAddTask: () => void;
  onCompleteTask: (task: PatientTask) => void;
  onEditTask: (task: PatientTask) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onAddTask,
  onCompleteTask,
  onEditTask,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesFilter = filter === "all" || task.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Tasks & Follow-ups</CardTitle>
          <Button size="sm" onClick={onAddTask}>
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Task
          </Button>
        </div>
        <div className="mt-2 space-y-3">
          <Input 
            placeholder="Search tasks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <Tabs defaultValue="all" value={filter} onValueChange={(value) => setFilter(value as any)}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      
      <CardContent className="max-h-[400px] overflow-y-auto">
        {filteredTasks.length > 0 ? (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <div 
                key={task.id} 
                className={`p-3 border rounded-md ${
                  task.status === "completed" ? "bg-muted/50" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="font-medium flex items-center gap-2">
                      {task.status === "completed" ? (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      ) : (
                        <span className={`h-3 w-3 rounded-full ${getPriorityColor(task.priority)} inline-block`} />
                      )}
                      {task.title}
                    </div>
                    
                    {task.description && (
                      <div className="text-sm text-muted-foreground">
                        {task.description}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                      
                      {task.assignedTo && (
                        <span className="text-sm text-muted-foreground">
                          Assigned to: {task.assignedTo}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      task.status === "completed" ? "success" :
                      task.status === "in-progress" ? "default" : "outline"
                    }>
                      {task.status.replace(/-/g, ' ')}
                    </Badge>
                    
                    <div className="flex gap-1">
                      {task.status !== "completed" && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2"
                          onClick={() => onCompleteTask({...task, status: "completed"})}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2"
                        onClick={() => onEditTask(task)}
                      >
                        <span className="text-xs">Edit</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-1">No tasks found</p>
            <p className="text-sm text-muted-foreground mb-4">
              {filter !== "all" 
                ? `No ${filter} tasks match your search`
                : "No tasks match your search criteria"}
            </p>
            <Button variant="outline" size="sm" onClick={onAddTask}>
              <PlusCircle className="h-4 w-4 mr-1" />
              Create New Task
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
