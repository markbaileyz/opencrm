
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Room } from "@/types/office";

const getRoomTypeColor = (type: string) => {
  switch (type) {
    case "waiting":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    case "appointment":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "office":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
    case "restroom":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300";
    case "break":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-300";
  }
};

const getRoomStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "occupied":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    case "maintenance":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
    case "reserved":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-300";
  }
};

const RoomManagement: React.FC = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "1",
      name: "Waiting Room",
      type: "waiting",
      capacity: 15,
      status: "available",
      equipment: ["TV", "Water Dispenser", "Magazines"]
    },
    {
      id: "2",
      name: "Exam Room 1",
      type: "appointment",
      capacity: 3,
      status: "occupied",
      equipment: ["Exam Table", "Blood Pressure Monitor", "Scale"]
    },
    {
      id: "3",
      name: "Doctor's Office",
      type: "office",
      capacity: 4,
      status: "available",
      equipment: ["Computer", "Desk", "Chairs"]
    },
    {
      id: "4",
      name: "Break Room",
      type: "break",
      capacity: 8,
      status: "available",
      equipment: ["Microwave", "Refrigerator", "Coffee Machine"]
    }
  ]);

  const handleAddRoom = () => {
    setCurrentRoom({
      id: String(Date.now()),
      name: "",
      type: "appointment",
      capacity: 1,
      status: "available",
      equipment: []
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEditRoom = (room: Room) => {
    setCurrentRoom(room);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDeleteRoom = (roomId: string) => {
    setRooms(rooms.filter(room => room.id !== roomId));
    toast({
      title: "Room deleted",
      description: "The room has been removed from the system",
      variant: "default"
    });
  };

  const handleSaveRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentRoom) return;

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const type = formData.get("type") as Room["type"];
    const capacity = parseInt(formData.get("capacity") as string, 10);
    const status = formData.get("status") as Room["status"];
    const equipmentStr = formData.get("equipment") as string;
    const equipment = equipmentStr.split(",").map(item => item.trim()).filter(Boolean);

    const updatedRoom: Room = {
      ...currentRoom,
      name,
      type,
      capacity,
      status,
      equipment
    };

    if (isEditMode) {
      setRooms(rooms.map(room => room.id === currentRoom.id ? updatedRoom : room));
      toast({
        title: "Room updated",
        description: `Room "${name}" has been updated successfully`,
        variant: "default"
      });
    } else {
      setRooms([...rooms, updatedRoom]);
      toast({
        title: "Room added",
        description: `Room "${name}" has been added successfully`,
        variant: "default"
      });
    }

    setIsDialogOpen(false);
    setCurrentRoom(null);
  };

  const handleStatusChange = (roomId: string, newStatus: Room["status"]) => {
    setRooms(rooms.map(room => 
      room.id === roomId ? { ...room, status: newStatus } : room
    ));
    
    const statusMessages = {
      available: "Room marked as available",
      occupied: "Room marked as occupied",
      maintenance: "Room marked for maintenance",
      reserved: "Room marked as reserved"
    };
    
    toast({
      title: statusMessages[newStatus],
      description: `Room status has been updated`,
      variant: "default"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Room Management</h3>
        <Button onClick={handleAddRoom}>
          <Plus className="h-4 w-4 mr-2" />
          Add Room
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{room.name}</CardTitle>
                  <CardDescription>
                    Capacity: {room.capacity} {room.capacity === 1 ? 'person' : 'people'}
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEditRoom(room)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteRoom(room.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Badge className={getRoomTypeColor(room.type)}>
                    {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                  </Badge>
                  <Badge className={getRoomStatusColor(room.status)}>
                    {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                  </Badge>
                </div>
                {room.equipment && room.equipment.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1">Equipment:</p>
                    <div className="flex flex-wrap gap-1">
                      {room.equipment.map((item, index) => (
                        <Badge variant="outline" key={index} className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex gap-2 justify-end">
              {room.status !== "available" && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7"
                  onClick={() => handleStatusChange(room.id, "available")}
                >
                  <Check className="h-3.5 w-3.5 mr-1" />
                  Set Available
                </Button>
              )}
              {room.status !== "occupied" && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7"
                  onClick={() => handleStatusChange(room.id, "occupied")}
                >
                  <X className="h-3.5 w-3.5 mr-1" />
                  Set Occupied
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Room' : 'Add New Room'}</DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? 'Update the room details below.'
                : 'Fill in the details for the new room.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveRoom}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Room Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter room name"
                  defaultValue={currentRoom?.name}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Room Type</Label>
                  <Select name="type" defaultValue={currentRoom?.type}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="waiting">Waiting</SelectItem>
                      <SelectItem value="appointment">Appointment</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="restroom">Restroom</SelectItem>
                      <SelectItem value="break">Break</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="1"
                    defaultValue={currentRoom?.capacity}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={currentRoom?.status}>
                  <SelectTrigger>
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

              <div className="grid gap-2">
                <Label htmlFor="equipment">Equipment (Comma separated)</Label>
                <Input
                  id="equipment"
                  name="equipment"
                  placeholder="Chair, Table, Computer, etc."
                  defaultValue={currentRoom?.equipment?.join(", ")}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomManagement;
