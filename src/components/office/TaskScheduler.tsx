
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Calendar, CheckCircle2, AlertCircle, Clock, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { ScheduledTask } from "@/types/office";
import { addDays, format, isPast, isThisWeek, isToday, isWithinInterval, subDays } from "date-fns";

const TaskScheduler: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<ScheduledTask | null>(null);
  const [tasks, setTasks] = useState<ScheduledTask[]>([
    {
      id: "1",
      title: "Clean Waiting Room",
      description: "Vacuum the floor, sanitize all surfaces, and organize magazines",
      frequency: "daily",
      assignedTo: "Cleaning Staff",
      lastCompleted: subDays(new Date(), 1).toISOString(),
      nextDue: new Date().toISOString(),
      priority: "medium",
      status: "pending",
      category: "cleaning"
    },
    {
      id: "2",
      title: "Order Medical Supplies",
      description: "Check inventory and order gloves, masks, and sanitizer",
      frequency: "weekly",
      assignedTo: "Office Manager",
      lastCompleted: subDays(new Date(), 8).toISOString(),
      nextDue: addDays(new Date(), 1).toISOString(),
      priority: "high",
      status: "pending",
      category: "ordering"
    },
    {
      id: "3",
      title: "Calibrate Medical Equipment",
      description: "Calibrate blood pressure monitors and scales",
      frequency: "monthly",
      assignedTo: "Maintenance Tech",
      lastCompleted: subDays(new Date(), 31).toISOString(),
      nextDue: addDays(new Date(), 3).toISOString(),
      priority: "low",
      status: "pending",
      category: "maintenance"
    },
    {
      id: "4",
      title: "Patient Records Audit",
      description: "Audit recent patient files for completeness",
      frequency: "monthly",
      assignedTo: "Records Admin",
      lastCompleted: subDays(new Date(), 25).toISOString(),
      nextDue: addDays(new Date(), 5).toISOString(),
      priority: "medium",
      status: "in-progress",
      category: "administrative"
    },
    {
      id: "5",
      title: "Deep Clean Treatment Rooms",
      description: "Perform deep cleaning and sanitization of all treatment rooms",
      frequency: "weekly",
      assignedTo: "Cleaning Staff",
      lastCompleted: subDays(new Date(), 10).toISOString(),
      nextDue: subDays(new Date(), 2).toISOString(),
      priority: "high",
      status: "overdue",
      category: "cleaning"
    }
  ]);

  const handleAddTask = () => {
    setCurrentTask({
      id: String(Date.now()),
      title: "",
      description: "",
      frequency: "weekly",
      assignedTo: "",
      nextDue: new Date().toISOString(),
      priority: "medium",
      status: "pending",
      category: "maintenance"
    });
    setIsDialogOpen(true);
  };

  const handleEditTask = (task: ScheduledTask) => {
    setCurrentTask(task);
    setIsDialogOpen(true);
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const now = new Date();
        let nextDueDate: Date;
        
        // Calculate next due date based on frequency
        switch (task.frequency) {
          case "daily":
            nextDueDate = addDays(now, 1);
            break;
          case "weekly":
            nextDueDate = addDays(now, 7);
            break;
          case "monthly":
            nextDueDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
            break;
          case "quarterly":
            nextDueDate = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());
            break;
          case "yearly":
            nextDueDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
            break;
          default:
            nextDueDate = addDays(now, 7); // Default to weekly
        }
        
        return {
          ...task,
          status: "completed",
          lastCompleted: now.toISOString(),
          nextDue: nextDueDate.toISOString()
        };
      }
      return task;
    }));
    
    toast({
      title: "Task completed",
      description: "The task has been marked as completed and rescheduled",
      variant: "default"
    });
  };

  const handleSaveTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentTask) return;

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const frequency = formData.get("frequency") as ScheduledTask["frequency"];
    const assignedTo = formData.get("assignedTo") as string;
    const nextDue = formData.get("nextDue") as string;
    const priority = formData.get("priority") as ScheduledTask["priority"];
    const category = formData.get("category") as ScheduledTask["category"];
    
    // Determine status based on next due date
    let status: ScheduledTask["status"] = "pending";
    const nextDueDate = new Date(nextDue);
    if (isPast(nextDueDate) && !isToday(nextDueDate)) {
      status = "overdue";
    }
    
    const updatedTask: ScheduledTask = {
      ...currentTask,
      title,
      description,
      frequency,
      assignedTo,
      nextDue: nextDueDate.toISOString(),
      priority,
      status,
      category
    };

    const isNewTask = !tasks.some(task => task.id === currentTask.id);
    
    if (isNewTask) {
      setTasks([...tasks, updatedTask]);
      toast({
        title: "Task created",
        description: `Task "${title}" has been created`,
        variant: "default"
      });
    } else {
      setTasks(tasks.map(task => 
        task.id === currentTask.id ? updatedTask : task
      ));
      toast({
        title: "Task updated",
        description: `Task "${title}" has been updated`,
        variant: "default"
      });
    }

    setIsDialogOpen(false);
    setCurrentTask(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "cleaning":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300";
      case "maintenance":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "ordering":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "administrative":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-300";
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.assignedTo?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Filter tasks based on the active tab
  const filteredTasksByTab = filteredTasks.filter(task => {
    const nextDueDate = new Date(task.nextDue);
    
    switch(activeTab) {
      case "upcoming":
        return !isPast(nextDueDate) || isToday(nextDueDate);
      case "overdue":
        return task.status === "overdue" || (isPast(nextDueDate) && !isToday(nextDueDate));
      case "today":
        return isToday(nextDueDate);
      case "thisWeek":
        return isWithinInterval(nextDueDate, { 
          start: new Date(), 
          end: addDays(new Date(), 7) 
        });
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Task Scheduler</h2>
          <p className="text-muted-foreground">
            Manage recurring tasks and maintenance schedules
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddTask}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 sm:grid-cols-5 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="thisWeek">This Week</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              {statusFilter === "all" ? "All Statuses" : 
                statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
              <DropdownMenuRadioItem value="all">All Statuses</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="in-progress">In Progress</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="completed">Completed</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="overdue">Overdue</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              {categoryFilter === "all" ? "All Categories" : 
                categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup value={categoryFilter} onValueChange={setCategoryFilter}>
              <DropdownMenuRadioItem value="all">All Categories</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="cleaning">Cleaning</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="maintenance">Maintenance</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="ordering">Ordering</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="administrative">Administrative</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="other">Other</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Next Due</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasksByTab.length > 0 ? (
                filteredTasksByTab.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(task.category)}>
                        {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{task.frequency}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                        {format(new Date(task.nextDue), 'MMM d, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell>{task.assignedTo || "Unassigned"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {task.status !== "completed" && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8"
                            onClick={() => handleCompleteTask(task.id)}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                            Complete
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8"
                          onClick={() => handleEditTask(task)}
                        >
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center h-32">
                    <div className="flex flex-col items-center justify-center">
                      <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No tasks found</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={handleAddTask}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Task
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{currentTask?.title ? 'Edit Task' : 'Add New Task'}</DialogTitle>
            <DialogDescription>
              {currentTask?.title 
                ? 'Update the task details below.'
                : 'Fill in the details for the new scheduled task.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveTask}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter task title"
                  defaultValue={currentTask?.title}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter task description"
                  defaultValue={currentTask?.description}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue={currentTask?.category}>
                    <SelectTrigger>
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

                <div className="grid gap-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select name="frequency" defaultValue={currentTask?.frequency}>
                    <SelectTrigger>
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nextDue">Next Due Date</Label>
                  <Input
                    id="nextDue"
                    name="nextDue"
                    type="date"
                    defaultValue={currentTask?.nextDue 
                      ? new Date(currentTask.nextDue).toISOString().split('T')[0]
                      : new Date().toISOString().split('T')[0]
                    }
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select name="priority" defaultValue={currentTask?.priority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Input
                  id="assignedTo"
                  name="assignedTo"
                  placeholder="Who is responsible for this task?"
                  defaultValue={currentTask?.assignedTo}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskScheduler;
