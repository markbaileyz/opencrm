
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOfficeResources } from '@/hooks/office/useOfficeResources';
import { Room } from '@/types/office';
import RoomFilters from './rooms/RoomFilters';
import RoomManagementGrid from './rooms/RoomManagementGrid';

const RoomManagement: React.FC = () => {
  const { rooms, roomTypes, roomStatuses, updateRoomStatus, loading } = useOfficeResources();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || room.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Room Management</CardTitle>
        <CardDescription>
          Monitor and manage office rooms and spaces
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RoomFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          roomTypes={roomTypes}
          roomStatuses={roomStatuses}
        />

        <RoomManagementGrid 
          rooms={filteredRooms}
          loading={loading}
          onUpdateStatus={updateRoomStatus}
        />
      </CardContent>
    </Card>
  );
};

export default RoomManagement;
