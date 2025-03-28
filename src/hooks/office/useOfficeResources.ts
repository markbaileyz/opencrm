
import { useState } from 'react';
import { useRooms } from './useRooms';
import { useSupplies } from './useSupplies';
import { useScheduledTasks } from './useScheduledTasks';

export const useOfficeResources = () => {
  const [error, setError] = useState<string | null>(null);
  
  // Use individual hooks
  const { 
    rooms, 
    loading: roomsLoading, 
    roomTypes, 
    roomStatuses, 
    updateRoomStatus 
  } = useRooms();
  
  const { 
    supplies, 
    loading: suppliesLoading, 
    supplyCategories, 
    lowStockSupplies, 
    updateSupplyStock, 
    reorderSupply 
  } = useSupplies();
  
  const { 
    scheduledTasks, 
    loading: tasksLoading, 
    taskCategories, 
    overdueTasks, 
    updateTaskStatus, 
    addTask 
  } = useScheduledTasks();

  // Combine loading states
  const loading = roomsLoading || suppliesLoading || tasksLoading;

  return {
    // Data
    rooms,
    supplies,
    scheduledTasks,
    
    // Loading and error states
    loading,
    error,
    
    // Filter options
    roomTypes,
    roomStatuses,
    supplyCategories,
    taskCategories,
    
    // Calculated values
    lowStockSupplies,
    overdueTasks,
    
    // Room management functions
    updateRoomStatus,
    
    // Supply management functions
    updateSupplyStock,
    reorderSupply,
    
    // Task management functions
    updateTaskStatus,
    addTask
  };
};
