
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { FileCheck, Plus, Filter, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface ComplianceTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed" | "overdue";
  assignee: string;
}

const ComplianceTasksList: React.FC = () => {
  const { toast } = useToast();
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  // Sample compliance tasks
  const complianceTasks: ComplianceTask[] = [
    {
      id: "task-1",
      title: "HIPAA Risk Assessment",
      description: "Complete the annual HIPAA risk assessment documentation",
      dueDate: "2023-12-15",
      category: "HIPAA",
      priority: "high",
      status: "in-progress",
      assignee: "Dr. Smith"
    },
    {
      id: "task-2",
      title: "Security Training",
      description: "Complete mandatory security training for all staff",
      dueDate: "2023-11-30",
      category: "Training",
      priority: "medium",
      status: "overdue",
      assignee: "HR Department"
    },
    {
      id: "task-3",
      title: "Privacy Policy Review",
      description: "Annual review of privacy policies and procedures",
      dueDate: "2023-12-20",
      category: "Policy",
      priority: "medium",
      status: "pending",
      assignee: "Legal Team"
    },
    {
      id: "task-4",
      title: "Security Audit",
      description: "External security audit of systems and infrastructure",
      dueDate: "2024-01-15",
      category: "Security",
      priority: "high",
      status: "pending",
      assignee: "IT Department"
    },
    {
      id: "task-5",
      title: "Access Review",
      description: "Quarterly review of user access permissions",
      dueDate: "2023-12-01",
      category: "Security",
      priority: "low",
      status: "completed",
      assignee: "System Administrator"
    }
  ];

  const handleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleMarkComplete = () => {
    toast({
      title: "Tasks Updated",
      description: `${selectedTasks.length} task(s) marked as completed`,
      variant: "success"
    });
    setSelectedTasks([]);
  };

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: "pending" | "in-progress" | "completed" | "overdue") => {
    switch (status) {
      case "pending": return "bg-blue-100 text-blue-800";
      case "in-progress": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-green-100 text-green-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          <div className="flex items-center">
            <FileCheck className="h-5 w-5 mr-2" />
            <span>Compliance Tasks</span>
          </div>
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2">
                  <Checkbox 
                    checked={complianceTasks.length > 0 && selectedTasks.length === complianceTasks.length} 
                    onCheckedChange={() => {
                      if (selectedTasks.length === complianceTasks.length) {
                        setSelectedTasks([]);
                      } else {
                        setSelectedTasks(complianceTasks.map(task => task.id));
                      }
                    }}
                  />
                </th>
                <th className="text-left p-2">
                  <div className="flex items-center">
                    Task
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </div>
                </th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Due Date</th>
                <th className="text-left p-2">Priority</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Assignee</th>
              </tr>
            </thead>
            <tbody>
              {complianceTasks.map((task) => (
                <tr key={task.id} className="border-b hover:bg-muted/50">
                  <td className="p-2">
                    <Checkbox 
                      checked={selectedTasks.includes(task.id)}
                      onCheckedChange={() => handleTaskSelection(task.id)}
                    />
                  </td>
                  <td className="p-2 font-medium">{task.title}</td>
                  <td className="p-2">{task.category}</td>
                  <td className="p-2">{format(new Date(task.dueDate), "MMM d, yyyy")}</td>
                  <td className="p-2">
                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </td>
                  <td className="p-2">
                    <Badge variant="outline" className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </td>
                  <td className="p-2">{task.assignee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {selectedTasks.length > 0 && (
          <div className="flex justify-between items-center mt-4 p-2 bg-muted rounded-md">
            <span>{selectedTasks.length} task(s) selected</span>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedTasks([])}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleMarkComplete}>
                Mark as Complete
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplianceTasksList;
