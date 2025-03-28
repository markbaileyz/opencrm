
import { useState, useEffect } from 'react';
import { Room } from '@/types/office';

// Sample rooms data
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

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    
    // Simulate API response
    setTimeout(() => {
      setRooms(sampleRooms);
      setLoading(false);
    }, 500);
  }, []);

  // Room types and statuses
  const roomTypes = Array.from(new Set(rooms.map(room => room.type)));
  const roomStatuses = Array.from(new Set(rooms.map(room => room.status)));

  // Room management functions
  const updateRoomStatus = (roomId: string, status: Room['status']) => {
    setRooms(current => 
      current.map(room => 
        room.id === roomId ? { ...room, status } : room
      )
    );
  };

  return {
    rooms,
    loading,
    error,
    roomTypes,
    roomStatuses,
    updateRoomStatus
  };
};
