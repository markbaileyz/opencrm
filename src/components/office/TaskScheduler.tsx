
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ScheduledTask } from "@/types/office";

const TaskScheduler: React.FC = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);
  
  const [tasks, setTasks] = useState<ScheduledTask[]>([
    {
      id: "task-1",
      title: "Clean Waiting Room",
      description: "Vacuum, sanitize surfaces, and empty trash",
      frequency: "daily",
      assignedTo: "Cleaning Staff",
      lastCompleted: today.toISOString(),
      nextDue: tomorrow.toISOString(),
      priority: "medium",
      status: "pending",
      category: "cleaning"
    },
    {
      id: "task-2",
      title: "Order Office Supplies",
      description: "Check inventory and reorder paper, pens, and other supplies",
      frequency: "monthly",
      assignedTo: "Office Manager",
      lastCompleted: new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()).toISOString(),
      nextDue: nextMonth.toISOString(),
      priority: "low",
      status: "pending",
      category: "ordering"
    },
    {
      id: "task-3",
      title: "Maintenance Check",
      description: "Check all equipment and facilities for any issues",
      frequency: "weekly",
      assignedTo: "Maintenance",
      lastCompleted: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toISOString(),
      nextDue: nextWeek.toISOString(),
      priority: "high",
      status: "pending",
      category: "maintenance"
    },
    {
      id: "task-4",
      title: "Deep Clean Examination Rooms",
      description: "Thorough cleaning and sanitizing of all exam rooms",
      frequency: "weekly",
      assignedTo: "Cleaning Staff",
      lastCompleted: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6).toISOString(),
      nextDue: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString(),
      priority: "high",
      status: "pending",
      category: "cleaning"
    },
  ]);
  
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [newTask, setNewTask] = useState<Partial<ScheduledTask>>({
    title: "",
    description: "",
    frequency: "weekly",
    assignedTo: "",
    priority: "medium",
    status: "pending",
    category: "cleaning"
  });
  const [dueDate, setDueDate] = useState<Date | undefined>(tomorrow);
  
  const handleAddTask = () => {
    if (!dueDate) return;
    
    const taskToAdd: ScheduledTask = {
      id: `task-${Date.now()}`,
      title: newTask.title || "New Task",
      description: newTask.description || "",
      frequency: newTask.frequency || "weekly",
      assignedTo: newTask.assignedTo,
      nextDue: dueDate.toISOString(),
      priority: newTask.priority || "medium",
      status: "pending",
      category: newTask.category || "cleaning"
    };
    
    setTasks([...tasks, taskToAdd]);
    setIsAddTaskOpen(false);
    setNewTask({
      title: "",
      description: "",
      frequency: "weekly",
      assignedTo: "",
      priority: "medium",
      status: "pending",
      category: "cleaning"
    });
    setDueDate(tomorrow);
  };
  
  const handleMarkAsCompleted = (taskId: string) => {
    const today = new Date();
    
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          // Calculate next due date based on frequency
          let nextDue = new Date(today);
          
          switch (task.frequency) {
            case "daily":
              nextDue.setDate(today.getDate() + 1);
              break;
            case "weekly":
              nextDue.setDate(today.getDate() + 7);
              break;
            case "monthly":
              nextDue.setMonth(today.getMonth() + 1);
              break;
            case "quarterly":
              nextDue.setMonth(today.getMonth() + 3);
              break;
            case "yearly":
              nextDue.setFullYear(today.getFullYear() + 1);
              break;
            default:
              nextDue.setDate(today.getDate() + 7);
          }
          
          return {
            ...task,
            status: "completed",
            lastCompleted: today.toISOString(),
            nextDue: nextDue.toISOString()
          };
        }
        return task;
      })
    );
  };
  
  const getPriorityBadge = (priority: ScheduledTask["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };
  
  const getStatusBadge = (status: ScheduledTask["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };
  
  const isTaskOverdue = (nextDue: string) => {
    const dueDate = new Date(nextDue);
    const today = new Date();
    return dueDate < today;
  };
  
  // Update any overdue tasks
  const updatedTasks = tasks.map(task => {
    if (task.status !== "completed" && isTaskOverdue(task.nextDue)) {
      return { ...task, status: "overdue" };
    }
    return task;
  });
  
  // Filter tasks based on active tab
  const filteredTasks = updatedTasks.filter(task => {
    if (activeTab === "upcoming") {
      return task.status === "pending" || task.status === "in-progress" || task.status === "overdue";
    } else if (activeTab === "completed") {
      return task.status === "completed";
    } else if (activeTab === "daily") {
      return task.frequency === "daily";
    } else if (activeTab === "cleaning") {
      return task.category === "cleaning";
    }
    return true;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Scheduled Tasks</h2>
        
        <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="task-title">Title</Label>
                <Input 
                  id="task-title" 
                  value={newTask.title || ""}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Enter task title" 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="task-description">Description</Label>
                <Textarea 
                  id="task-description" 
                  value={newTask.description || ""}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Enter task description" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="task-frequency">Frequency</Label>
                  <Select 
                    value={newTask.frequency || "weekly"}
                    onValueChange={(value) => setNewTask({...newTask, frequency: value as ScheduledTask["frequency"]})}
                  >
                    <SelectTrigger id="task-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="task-category">Category</Label>
                  <Select 
                    value={newTask.category || "cleaning"}
                    onValueChange={(value) => setNewTask({...newTask, category: value as ScheduledTask["category"]})}
                  >
                    <SelectTrigger id="task-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="ordering">Ordering</SelectItem>
                      <SelectItem value="administrative">Administrative</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="task-assigned">Assigned To (Optional)</Label>
                <Input 
                  id="task-assigned" 
                  value={newTask.assignedTo || ""}
                  onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                  placeholder="Enter person or role" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="task-priority">Priority</Label>
                  <Select 
                    value={newTask.priority || "medium"}
                    onValueChange={(value) => setNewTask({...newTask, priority: value as ScheduledTask["priority"]})}
                  >
                    <SelectTrigger id="task-priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !dueDate && "text-muted-foreground"
                        )}
                      >
                        {dueDate ? (
                          format(dueDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 sm:w-1/2 w-full mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="cleaning">Cleaning</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "upcoming" && "Upcoming Tasks"}
                {activeTab === "completed" && "Completed Tasks"}
                {activeTab === "daily" && "Daily Tasks"}
                {activeTab === "cleaning" && "Cleaning Tasks"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">
                        <div className="font-medium">{task.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{task.description}</div>
                      </TableCell>
                      <TableCell>{task.category.charAt(0).toUpperCase() + task.category.slice(1)}</TableCell>
                      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell>{formatDate(task.nextDue)}</TableCell>
                      <TableCell>{task.assignedTo || "—"}</TableCell>
                      <TableCell className="text-right">
                        {task.status !== "completed" && (
                          <Button 
                            size="sm" 
                            onClick={() => handleMarkAsCompleted(task.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredTasks.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                        No tasks found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskScheduler;
