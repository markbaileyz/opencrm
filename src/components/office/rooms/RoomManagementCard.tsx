
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from "lucide-react";
import { Room } from "@/types/office";
import { useToast } from "@/hooks/use-toast";

interface RoomManagementCardProps {
  room: Room;
  onUpdateStatus: (roomId: string, status: Room['status']) => void;
}

const RoomManagementCard: React.FC<RoomManagementCardProps> = ({ room, onUpdateStatus }) => {
  const { toast } = useToast();

  const getStatusColor = (status: Room['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'reserved':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateStatus = (status: Room['status']) => {
    onUpdateStatus(room.id, status);
    toast({
      title: "Room Status Updated",
      description: "The room status has been updated successfully."
    });
  };

  return (
    <Card className="overflow-hidden border-t-4" style={{
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
            <Select value={room.status} onValueChange={(status) => handleUpdateStatus(status as Room['status'])}>
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
  );
};

export default RoomManagementCard;
