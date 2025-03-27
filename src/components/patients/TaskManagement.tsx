
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PatientTask } from "@/types/patient";
import { 
  CheckCircle, 
  Clock, 
  ClipboardList, 
  Plus, 
  CalendarClock,
  AlertTriangle,
  User,
  Trash,
  Edit
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { format } from "date-fns";

interface TaskManagementProps {
  tasks: PatientTask[];
  patientId: string;
  onAddTask: (task: PatientTask) => void;
  onUpdateTask: (taskId: string, updates: Partial<PatientTask>) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskManagement: React.FC<TaskManagementProps> = ({
  tasks,
  patientId,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<PatientTask | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState<PatientTask["priority"]>("medium");
  const [status, setStatus] = useState<PatientTask["status"]>("pending");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openAddTaskDialog = () => {
    setCurrentTask(null);
    resetTaskForm();
    setTaskDialogOpen(true);
  };

  const openEditTaskDialog = (task: PatientTask) => {
    setCurrentTask(task);
    setTitle(task.title);
    setDescription(task.description || "");
    setDueDate(task.dueDate);
    setAssignedTo(task.assignedTo || "");
    setPriority(task.priority);
    setStatus(task.status);
    setTaskDialogOpen(true);
  };

  const resetTaskForm = () => {
    setTitle("");
    setDescription("");
    setDueDate(format(new Date(), "yyyy-MM-dd"));
    setAssignedTo("");
    setPriority("medium");
    setStatus("pending");
  };

  const handleSaveTask = () => {
    if (!title || !dueDate) return;

    if (currentTask) {
      // Update existing task
      onUpdateTask(currentTask.id, {
        title,
        description,
        dueDate,
        assignedTo,
        priority,
        status
      });
    } else {
      // Create new task
      const newTask: PatientTask = {
        id: new Date().getTime().toString(),
        patientId,
        title,
        description: description || undefined,
        dueDate,
        assignedTo: assignedTo || undefined,
        priority,
        status
      };
      onAddTask(newTask);
    }

    setTaskDialogOpen(false);
    resetTaskForm();
  };

  const getStatusIcon = (status: PatientTask["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "pending":
      default:
        return <ClipboardList className="h-4 w-4 text-amber-500" />;
    }
  };

  const getPriorityBadge = (priority: PatientTask["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="default">Medium</Badge>;
      case "low":
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  const handleStatusChange = (taskId: string, newStatus: PatientTask["status"]) => {
    onUpdateTask(taskId, { status: newStatus });
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Patient Tasks</CardTitle>
            <Button size="sm" onClick={openAddTaskDialog}>
              <Plus className="h-4 w-4 mr-1" />
              Add Task
            </Button>
          </div>
          <div className="mt-2">
            <Input 
              placeholder="Search tasks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        
        <CardContent className="max-h-[400px] overflow-y-auto">
          {filteredTasks.length > 0 ? (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`p-3 border rounded-md transition-colors ${
                    task.status === "completed" 
                      ? "bg-muted/30 border-muted" 
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getStatusIcon(task.status)}
                      </div>
                      <div>
                        <div className={`font-medium ${
                          task.status === "completed" ? "line-through text-muted-foreground" : ""
                        }`}>
                          {task.title}
                        </div>
                        
                        {task.description && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {task.description}
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <CalendarClock className="h-3 w-3 mr-1" />
                            {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          
                          {task.assignedTo && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <User className="h-3 w-3 mr-1" />
                              {task.assignedTo}
                            </div>
                          )}
                          
                          <div>{getPriorityBadge(task.priority)}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-1">
                      {task.status !== "completed" && (
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleStatusChange(task.id, "completed")}
                          title="Mark as completed"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                      )}
                      
                      {task.status === "completed" && (
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleStatusChange(task.id, "pending")}
                          title="Mark as pending"
                        >
                          <ClipboardList className="h-4 w-4 text-amber-500" />
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => openEditTaskDialog(task)}
                        title="Edit task"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() => onDeleteTask(task.id)}
                        title="Delete task"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <ClipboardList className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-muted-foreground mb-1">No tasks found</p>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery 
                  ? "No tasks match your search criteria"
                  : "No tasks have been created for this patient"}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={openAddTaskDialog}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Task Dialog */}
      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentTask ? "Edit Task" : "Add Task"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid w-full gap-1.5">
              <label htmlFor="title" className="text-sm font-medium">
                Title*
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
              />
            </div>

            <div className="grid w-full gap-1.5">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
              />
            </div>

            <div className="grid w-full gap-1.5">
              <label htmlFor="dueDate" className="text-sm font-medium">
                Due Date*
              </label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="grid w-full gap-1.5">
              <label htmlFor="assignedTo" className="text-sm font-medium">
                Assigned To
              </label>
              <Input
                id="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Name of assignee"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid w-full gap-1.5">
                <label htmlFor="priority" className="text-sm font-medium">
                  Priority
                </label>
                <select
                  id="priority"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as PatientTask["priority"])}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="grid w-full gap-1.5">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <select
                  id="status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PatientTask["status"])}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                resetTaskForm();
                setTaskDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleSaveTask} 
              disabled={!title || !dueDate}
            >
              {currentTask ? "Update" : "Create"} Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskManagement;
