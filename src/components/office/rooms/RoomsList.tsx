
import React from "react";
import RoomCard from "./RoomCard";
import { type Room } from "@/types/office";

interface RoomsListProps {
  rooms: Room[];
  onStatusChange: (roomId: string, status: Room["status"]) => void;
}

const RoomsList: React.FC<RoomsListProps> = ({ rooms, onStatusChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <RoomCard 
          key={room.id} 
          room={room} 
          onStatusChange={onStatusChange} 
        />
      ))}
    </div>
  );
};

export default RoomsList;
