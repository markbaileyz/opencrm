
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Room } from "@/types/office";

interface RoomCardProps {
  room: Room;
  onStatusChange: (roomId: string, status: Room["status"]) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onStatusChange }) => {
  const getRoomTypeLabel = (type: Room["type"]) => {
    switch (type) {
      case "waiting": return "Waiting Room";
      case "appointment": return "Appointment Room";
      case "office": return "Office";
      case "restroom": return "Restroom";
      case "break": return "Break Room";
      default: return "Other";
    }
  };
  
  const getStatusColor = (status: Room["status"]) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "occupied": return "bg-red-100 text-red-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      case "reserved": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card key={room.id}>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{getRoomTypeLabel(room.type)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Capacity: {room.capacity}</span>
          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(room.status)}`}>
            {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
          </span>
        </div>
        
        {room.equipment && room.equipment.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-1">Equipment:</h4>
            <ul className="text-sm text-muted-foreground">
              {room.equipment.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" size="sm">Edit</Button>
        <Button 
          variant="outline" 
          size="sm" 
          className={room.status === "available" ? "bg-red-50 text-red-700 hover:bg-red-100" : "bg-green-50 text-green-700 hover:bg-green-100"}
          onClick={() => onStatusChange(room.id, room.status === "available" ? "occupied" : "available")}
        >
          {room.status === "available" ? "Mark Occupied" : "Mark Available"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
