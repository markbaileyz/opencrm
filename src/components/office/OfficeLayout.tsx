
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Room } from "@/types/office";
import { Plus } from "lucide-react";

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Office Layout</h2>
        
        <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="room-name">Room Name</Label>
                <Input 
                  id="room-name" 
                  value={newRoom.name || ""}
                  onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                  placeholder="Enter room name" 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="room-type">Room Type</Label>
                <Select 
                  value={newRoom.type || "appointment"}
                  onValueChange={(value) => setNewRoom({...newRoom, type: value as Room["type"]})}
                >
                  <SelectTrigger id="room-type">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="waiting">Waiting Room</SelectItem>
                    <SelectItem value="appointment">Appointment Room</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="restroom">Restroom</SelectItem>
                    <SelectItem value="break">Break Room</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="room-capacity">Capacity</Label>
                <Input 
                  id="room-capacity" 
                  type="number" 
                  min="1"
                  value={newRoom.capacity || 1}
                  onChange={(e) => setNewRoom({...newRoom, capacity: parseInt(e.target.value)})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="room-status">Status</Label>
                <Select 
                  value={newRoom.status || "available"}
                  onValueChange={(value) => setNewRoom({...newRoom, status: value as Room["status"]})}
                >
                  <SelectTrigger id="room-status">
                    <SelectValue placeholder="Select status" />
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
            
            <Button onClick={handleAddRoom}>Add Room</Button>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
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
              <Button variant="outline" size="sm" className={room.status === "available" ? "bg-red-50 text-red-700 hover:bg-red-100" : "bg-green-50 text-green-700 hover:bg-green-100"}>
                {room.status === "available" ? "Mark Occupied" : "Mark Available"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OfficeLayout;
