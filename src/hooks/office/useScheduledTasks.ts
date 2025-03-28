
import { useState, useEffect } from 'react';
import { ScheduledTask } from '@/types/office';

// Sample scheduled tasks
const sampleScheduledTasks: ScheduledTask[] = [
  {
    id: '1',
    title: 'Clean Exam Rooms',
    description: 'Deep clean and sanitize all examination rooms',
    frequency: 'daily',
    assignedTo: 'Cleaning Staff',
    lastCompleted: '2023-11-14',
    nextDue: '2023-11-15',
    priority: 'high',
    status: 'pending',
    category: 'cleaning'
  },
  {
    id: '2',
    title: 'Restock Medical Supplies',
    description: 'Check and restock all exam rooms with necessary medical supplies',
    frequency: 'weekly',
    assignedTo: 'Medical Assistant',
    lastCompleted: '2023-11-08',
    nextDue: '2023-11-15',
    priority: 'medium',
    status: 'pending',
    category: 'ordering'
  },
  {
    id: '3',
    title: 'Equipment Maintenance',
    description: 'Perform routine maintenance on all medical equipment',
    frequency: 'monthly',
    assignedTo: 'Maintenance Team',
    lastCompleted: '2023-10-15',
    nextDue: '2023-11-15',
    priority: 'medium',
    status: 'in-progress',
    category: 'maintenance'
  },
  {
    id: '4',
    title: 'Staff Meeting',
    description: 'Weekly staff meeting to discuss operations and patient care',
    frequency: 'weekly',
    assignedTo: 'All Staff',
    lastCompleted: '2023-11-08',
    nextDue: '2023-11-15',
    priority: 'medium',
    status: 'pending',
    category: 'administrative'
  },
  {
    id: '5',
    title: 'Update Patient Records',
    description: 'Review and update electronic patient records',
    frequency: 'daily',
    assignedTo: 'Admin Staff',
    lastCompleted: '2023-11-14',
    nextDue: '2023-11-15',
    priority: 'high',
    status: 'completed',
    category: 'administrative'
  },
  {
    id: '6',
    title: 'Order Office Supplies',
    description: 'Check inventory and order necessary office supplies',
    frequency: 'monthly',
    assignedTo: 'Office Manager',
    lastCompleted: '2023-10-20',
    nextDue: '2023-11-20',
    priority: 'low',
    status: 'pending',
    category: 'ordering'
  },
  {
    id: '7',
    title: 'Clean Break Room',
    description: 'Clean refrigerator, microwave, and coffee machine',
    frequency: 'weekly',
    assignedTo: 'All Staff',
    lastCompleted: '2023-11-07',
    nextDue: '2023-11-14',
    priority: 'low',
    status: 'overdue',
    category: 'cleaning'
  }
];

export const useScheduledTasks = () => {
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    
    // Simulate API response
    setTimeout(() => {
      setScheduledTasks(sampleScheduledTasks);
      setLoading(false);
    }, 500);
  }, []);

  // Task categories
  const taskCategories = Array.from(new Set(scheduledTasks.map(task => task.category)));

  // Calculate overdue tasks
  const overdueTasks = scheduledTasks.filter(task => {
    const today = new Date();
    const dueDate = new Date(task.nextDue);
    return dueDate < today && task.status !== 'completed';
  });

  // Task management functions
  const updateTaskStatus = (taskId: string, status: ScheduledTask['status']) => {
    setScheduledTasks(current => 
      current.map(task => {
        if (task.id === taskId) {
          const updates: Partial<ScheduledTask> = { status };
          
          // If task is being completed, update lastCompleted and calculate next due date
          if (status === 'completed') {
            const today = new Date().toISOString().split('T')[0];
            updates.lastCompleted = today;
            
            // Calculate next due date based on frequency
            const nextDue = new Date();
            switch (task.frequency) {
              case 'daily':
                nextDue.setDate(nextDue.getDate() + 1);
                break;
              case 'weekly':
                nextDue.setDate(nextDue.getDate() + 7);
                break;
              case 'monthly':
                nextDue.setMonth(nextDue.getMonth() + 1);
                break;
              case 'quarterly':
                nextDue.setMonth(nextDue.getMonth() + 3);
                break;
              case 'yearly':
                nextDue.setFullYear(nextDue.getFullYear() + 1);
                break;
            }
            
            updates.nextDue = nextDue.toISOString().split('T')[0];
          }
          
          return { ...task, ...updates };
        }
        return task;
      })
    );
  };

  const addTask = (task: Omit<ScheduledTask, 'id'>) => {
    const newTask: ScheduledTask = {
      ...task,
      id: Math.random().toString(36).substring(2, 11)
    };
    
    setScheduledTasks(current => [...current, newTask]);
  };

  return {
    scheduledTasks,
    loading,
    error,
    taskCategories,
    overdueTasks,
    updateTaskStatus,
    addTask
  };
};
