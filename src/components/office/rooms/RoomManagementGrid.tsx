
import React from "react";
import { Home } from "lucide-react";
import RoomManagementCard from "./RoomManagementCard";
import { Room } from "@/types/office";

interface RoomManagementGridProps {
  rooms: Room[];
  loading: boolean;
  onUpdateStatus: (roomId: string, status: Room['status']) => void;
}

const RoomManagementGrid: React.FC<RoomManagementGridProps> = ({ rooms, loading, onUpdateStatus }) => {
  if (loading) {
    return <div className="text-center py-10">Loading rooms...</div>;
  }
  
  if (rooms.length === 0) {
    return (
      <div className="text-center py-10">
        <Home className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No rooms found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map(room => (
        <RoomManagementCard 
          key={room.id} 
          room={room} 
          onUpdateStatus={onUpdateStatus} 
        />
      ))}
    </div>
  );
};

export default RoomManagementGrid;
