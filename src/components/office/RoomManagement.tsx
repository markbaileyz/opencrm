
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Home, Search, Users } from "lucide-react";
import { Room } from '@/types/office';
import { useOfficeResources } from '@/hooks/useOfficeResources';

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

  const getRoomTypeDisplay = (type: Room['type']) => {
    switch (type) {
      case 'waiting': return 'Waiting Room';
      case 'appointment': return 'Appointment Room';
      case 'office': return 'Office';
      case 'restroom': return 'Restroom';
      case 'break': return 'Break Room';
      default: return 'Other';
    }
  };

  const getStatusBadgeColor = (status: Room['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'occupied': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'reserved': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Room Management</CardTitle>
        <CardDescription>
          Manage office rooms and their availability
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-col sm:flex-row">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {roomTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {getRoomTypeDisplay(type)}
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
                {roomStatuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading rooms...</div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-10">
            <Home className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No rooms found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="overflow-hidden">
                <div className={`h-2 ${
                  room.status === 'available' ? 'bg-green-500' :
                  room.status === 'occupied' ? 'bg-blue-500' :
                  room.status === 'maintenance' ? 'bg-yellow-500' : 
                  'bg-purple-500'
                }`} />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <Badge variant="outline" className={getStatusBadgeColor(room.status)}>
                      {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>{getRoomTypeDisplay(room.type)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <Users className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-sm">Capacity: {room.capacity}</span>
                  </div>
                  
                  {room.equipment && room.equipment.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-1">Equipment:</p>
                      <div className="flex flex-wrap gap-1">
                        {room.equipment.map((item, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button 
                      variant={room.status === 'available' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateRoomStatus(room.id, 'available')}
                      className="flex-1"
                    >
                      {room.status === 'available' && <Check className="h-3 w-3 mr-1" />}
                      Available
                    </Button>
                    <Button 
                      variant={room.status === 'occupied' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateRoomStatus(room.id, 'occupied')}
                      className="flex-1"
                    >
                      {room.status === 'occupied' && <Check className="h-3 w-3 mr-1" />}
                      Occupied
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomManagement;
