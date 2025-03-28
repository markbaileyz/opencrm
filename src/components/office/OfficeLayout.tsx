
import React, { useState } from "react";
import { type Room } from "@/types/office";
import AddRoomDialog from "./rooms/AddRoomDialog";
import RoomsList from "./rooms/RoomsList";

const OfficeLayout: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "room-1",
      name: "Main Waiting Room",
      type: "waiting",
      capacity: 15,
      status: "available"
    },
    {
      id: "room-2",
      name: "Appointment Room 1",
      type: "appointment",
      capacity: 3,
      status: "occupied",
      equipment: ["Examination table", "Computer", "Medical supplies"]
    },
    {
      id: "room-3",
      name: "Appointment Room 2",
      type: "appointment",
      capacity: 3,
      status: "available",
      equipment: ["Examination table", "Computer", "Medical supplies"]
    },
    {
      id: "room-4",
      name: "Break Room",
      type: "break",
      capacity: 5,
      status: "available"
    },
  ]);
  
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [newRoom, setNewRoom] = useState<Partial<Room>>({
    name: "",
    type: "appointment",
    capacity: 1,
    status: "available"
  });
  
  const handleAddRoom = () => {
    const roomToAdd: Room = {
      id: `room-${Date.now()}`,
      name: newRoom.name || "New Room",
      type: newRoom.type || "appointment",
      capacity: newRoom.capacity || 1,
      status: newRoom.status || "available",
      equipment: newRoom.equipment || []
    };
    
    setRooms([...rooms, roomToAdd]);
    setIsAddRoomOpen(false);
    setNewRoom({
      name: "",
      type: "appointment",
      capacity: 1,
      status: "available"
    });
  };
  
  const handleStatusChange = (roomId: string, status: Room["status"]) => {
    setRooms(rooms.map(room => 
      room.id === roomId ? { ...room, status } : room
    ));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Office Layout</h2>
        
        <AddRoomDialog
          isOpen={isAddRoomOpen}
          setIsOpen={setIsAddRoomOpen}
          newRoom={newRoom}
          setNewRoom={setNewRoom}
          onAddRoom={handleAddRoom}
        />
      </div>
      
      <RoomsList rooms={rooms} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default OfficeLayout;
