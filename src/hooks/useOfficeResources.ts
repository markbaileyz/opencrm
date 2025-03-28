
import { useState, useEffect } from 'react';
import { Room, SupplyItem, ScheduledTask } from '@/types/office';

// Sample office resources data
const sampleRooms: Room[] = [
  {
    id: '1',
    name: 'Reception',
    type: 'waiting',
    capacity: 10,
    status: 'available',
    equipment: ['TV', 'Water Cooler', 'Coffee Machine']
  },
  {
    id: '2',
    name: 'Exam Room 101',
    type: 'appointment',
    capacity: 3,
    status: 'occupied',
    equipment: ['Exam Table', 'Blood Pressure Monitor', 'Computer']
  },
  {
    id: '3',
    name: 'Exam Room 102',
    type: 'appointment',
    capacity: 3,
    status: 'available',
    equipment: ['Exam Table', 'Blood Pressure Monitor', 'Computer']
  },
  {
    id: '4',
    name: 'Dr. Smith Office',
    type: 'office',
    capacity: 4,
    status: 'occupied',
    equipment: ['Desk', 'Computer', 'Bookshelf']
  },
  {
    id: '5',
    name: 'Break Room',
    type: 'break',
    capacity: 8,
    status: 'available',
    equipment: ['Refrigerator', 'Microwave', 'Coffee Machine']
  }
];

const sampleSupplies: SupplyItem[] = [
  {
    id: '1',
    name: 'Examination Gloves',
    category: 'medical',
    currentStock: 450,
    minStock: 200,
    unit: 'boxes',
    lastOrdered: '2023-10-15',
    supplier: 'Medical Supplies Inc.',
    reorderAmount: 100,
    location: 'Storage Room A'
  },
  {
    id: '2',
    name: 'Printer Paper',
    category: 'office',
    currentStock: 15,
    minStock: 10,
    unit: 'reams',
    lastOrdered: '2023-11-02',
    supplier: 'Office Depot',
    reorderAmount: 20,
    location: 'Reception Cabinet'
  },
  {
    id: '3',
    name: 'Disinfectant Wipes',
    category: 'cleaning',
    currentStock: 12,
    minStock: 10,
    unit: 'containers',
    lastOrdered: '2023-10-28',
    supplier: 'CleanCo',
    reorderAmount: 24,
    location: 'Supply Closet'
  },
  {
    id: '4',
    name: 'Coffee',
    category: 'kitchen',
    currentStock: 5,
    minStock: 3,
    unit: 'bags',
    lastOrdered: '2023-11-05',
    supplier: 'Coffee Beans Co.',
    reorderAmount: 10,
    location: 'Break Room'
  },
  {
    id: '5',
    name: 'Face Masks',
    category: 'medical',
    currentStock: 120,
    minStock: 100,
    unit: 'boxes',
    lastOrdered: '2023-10-10',
    supplier: 'Medical Supplies Inc.',
    reorderAmount: 50,
    location: 'Storage Room A'
  }
];

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

export const useOfficeResources = () => {
  const [rooms, setRooms] = useState<Room[]>(sampleRooms);
  const [supplies, setSupplies] = useState<SupplyItem[]>(sampleSupplies);
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTask[]>(sampleScheduledTasks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter options
  const roomTypes = Array.from(new Set(rooms.map(room => room.type)));
  const roomStatuses = Array.from(new Set(rooms.map(room => room.status)));
  const supplyCategories = Array.from(new Set(supplies.map(supply => supply.category)));
  const taskCategories = Array.from(new Set(scheduledTasks.map(task => task.category)));

  // In a real app, these would fetch from an API
  useEffect(() => {
    setLoading(true);
    
    // Simulate API response
    setTimeout(() => {
      setRooms(sampleRooms);
      setSupplies(sampleSupplies);
      setScheduledTasks(sampleScheduledTasks);
      setLoading(false);
    }, 500);
  }, []);

  // Room management functions
  const updateRoomStatus = (roomId: string, status: Room['status']) => {
    setRooms(current => 
      current.map(room => 
        room.id === roomId ? { ...room, status } : room
      )
    );
  };

  // Supply management functions
  const updateSupplyStock = (supplyId: string, newStock: number) => {
    setSupplies(current => 
      current.map(supply => 
        supply.id === supplyId ? { ...supply, currentStock: newStock } : supply
      )
    );
  };

  const reorderSupply = (supplyId: string) => {
    setSupplies(current => 
      current.map(supply => {
        if (supply.id === supplyId && supply.reorderAmount) {
          return {
            ...supply,
            currentStock: supply.currentStock + supply.reorderAmount,
            lastOrdered: new Date().toISOString().split('T')[0]
          };
        }
        return supply;
      })
    );
  };

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

  // Calculate low stock supplies
  const lowStockSupplies = supplies.filter(supply => 
    supply.currentStock <= supply.minStock
  );

  // Calculate overdue tasks
  const overdueTasks = scheduledTasks.filter(task => {
    const today = new Date();
    const dueDate = new Date(task.nextDue);
    return dueDate < today && task.status !== 'completed';
  });

  return {
    rooms,
    supplies,
    scheduledTasks,
    loading,
    error,
    roomTypes,
    roomStatuses,
    supplyCategories,
    taskCategories,
    lowStockSupplies,
    overdueTasks,
    updateRoomStatus,
    updateSupplyStock,
    reorderSupply,
    updateTaskStatus,
    addTask
  };
};
