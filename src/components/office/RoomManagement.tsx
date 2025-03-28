
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Home, Users } from "lucide-react";
import { useOfficeResources } from '@/hooks/useOfficeResources';
import { useToast } from '@/hooks/use-toast';
import { Room } from '@/types/office';

const RoomManagement: React.FC = () => {
  const { rooms, roomTypes, roomStatuses, updateRoomStatus, loading } = useOfficeResources();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || room.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleUpdateStatus = (roomId: string, status: Room['status']) => {
    updateRoomStatus(roomId, status);
    toast({
      title: "Room Status Updated",
      description: "The room status has been updated successfully."
    });
  };

  const getStatusColor = (status: Room['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'occupied':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'reserved':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTypeDisplay = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Room Management</CardTitle>
        <CardDescription>
          Monitor and manage office rooms and spaces
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
                <SelectValue placeholder="Room Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {roomTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {getTypeDisplay(type)}
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
            {filteredRooms.map(room => (
              <Card key={room.id} className="overflow-hidden border-t-4" style={{
                borderTopColor: room.status === 'available' ? 'hsl(var(--success))' :
                                room.status === 'occupied' ? 'hsl(var(--primary))' :
                                room.status === 'maintenance' ? 'hsl(var(--warning))' :
                                'hsl(var(--secondary))'
              }}>
                <CardContent className="p-4">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{room.name}</h3>
                    <Badge variant="outline" className={getStatusColor(room.status)}>
                      {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Capacity: {room.capacity}</span>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium">Type: </span>
                      <span className="capitalize">{room.type}</span>
                    </div>
                    
                    {room.equipment && room.equipment.length > 0 && (
                      <div className="text-sm">
                        <span className="font-medium">Equipment: </span>
                        <span>{room.equipment.join(', ')}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mt-4 pt-2 border-t">
                      <span className="text-sm text-muted-foreground">Change status:</span>
                      <Select value={room.status} onValueChange={(status) => handleUpdateStatus(room.id, status as Room['status'])}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="occupied">Occupied</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="reserved">Reserved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
