
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

export const useOfficeResources = () => {
  const [rooms, setRooms] = useState<Room[]>(sampleRooms);
  const [supplies, setSupplies] = useState<SupplyItem[]>(sampleSupplies);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter options
  const roomTypes = Array.from(new Set(rooms.map(room => room.type)));
  const roomStatuses = Array.from(new Set(rooms.map(room => room.status)));
  const supplyCategories = Array.from(new Set(supplies.map(supply => supply.category)));

  // In a real app, these would fetch from an API
  useEffect(() => {
    setLoading(true);
    
    // Simulate API response
    setTimeout(() => {
      setRooms(sampleRooms);
      setSupplies(sampleSupplies);
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

  // Calculate low stock supplies
  const lowStockSupplies = supplies.filter(supply => 
    supply.currentStock <= supply.minStock
  );

  return {
    rooms,
    supplies,
    loading,
    error,
    roomTypes,
    roomStatuses,
    supplyCategories,
    lowStockSupplies,
    updateRoomStatus,
    updateSupplyStock,
    reorderSupply
  };
};
