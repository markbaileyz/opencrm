
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Clock, CheckSquare, CalendarClock, AlertCircle } from "lucide-react";
import { useOfficeResources } from '@/hooks/office/useOfficeResources';
import { useToast } from '@/hooks/use-toast';
import { ScheduledTask } from '@/types/office';

const ScheduledTasksManagement: React.FC = () => {
  const { scheduledTasks, taskCategories, updateTaskStatus, addTask, loading } = useOfficeResources();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTasks = scheduledTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCompleteTask = (taskId: string) => {
    updateTaskStatus(taskId, 'completed');
    toast({
      title: "Task Completed",
      description: "The task has been marked as completed."
    });
  };

  const handleStartTask = (taskId: string) => {
    updateTaskStatus(taskId, 'in-progress');
    toast({
      title: "Task Started",
      description: "The task has been marked as in progress."
    });
  };

  const getStatusBadgeColor = (status: ScheduledTask['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPriorityBadgeColor = (priority: ScheduledTask['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const getCategoryDisplay = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const isTaskOverdue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Scheduled Tasks</CardTitle>
        <CardDescription>
          Manage recurring and one-time office tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-col sm:flex-row">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {taskCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {getCategoryDisplay(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading tasks...</div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-10">
            <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No tasks found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const isOverdue = isTaskOverdue(task.nextDue) && task.status !== 'completed';
              const actualStatus = isOverdue && task.status !== 'completed' ? 'overdue' : task.status;
              
              return (
                <Card key={task.id} className="overflow-hidden">
                  <div className={`h-1 ${
                    actualStatus === 'completed' ? 'bg-green-500' :
                    actualStatus === 'in-progress' ? 'bg-blue-500' :
                    actualStatus === 'overdue' ? 'bg-red-500' : 
                    'bg-yellow-500'
                  }`} />
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {task.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className={getStatusBadgeColor(actualStatus)}>
                          {actualStatus.charAt(0).toUpperCase() + actualStatus.slice(1).replace(/-/g, ' ')}
                        </Badge>
                        <Badge variant="outline" className={getPriorityBadgeColor(task.priority)}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-2">
                        <div className="flex items-center gap-1">
                          <CalendarClock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            Due: <span className={isOverdue && task.status !== 'completed' ? "text-red-600 font-medium" : ""}>
                              {task.nextDue}
                            </span>
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Frequency: {task.frequency}</span>
                        </div>
                        
                        {task.assignedTo && (
                          <div>
                            <span>Assigned to: {task.assignedTo}</span>
                          </div>
                        )}
                      </div>
                      
                      {isOverdue && task.status !== 'completed' && (
                        <div className="flex items-center gap-1 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>This task is overdue!</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-4">
                        <Badge className="capitalize">
                          {getCategoryDisplay(task.category)}
                        </Badge>
                        
                        <div className="flex gap-2">
                          {task.status !== 'completed' && (
                            <>
                              {task.status !== 'in-progress' && (
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center gap-1"
                                  onClick={() => handleStartTask(task.id)}
                                >
                                  <Clock className="h-4 w-4" />
                                  Start Task
                                </Button>
                              )}
                              
                              <Button 
                                variant="default"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => handleCompleteTask(task.id)}
                              >
                                <CheckSquare className="h-4 w-4" />
                                Complete
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScheduledTasksManagement;
