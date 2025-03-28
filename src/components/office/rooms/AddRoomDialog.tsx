
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { type Room } from "@/types/office";

interface AddRoomDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  newRoom: Partial<Room>;
  setNewRoom: (room: Partial<Room>) => void;
  onAddRoom: () => void;
}

const AddRoomDialog: React.FC<AddRoomDialogProps> = ({ 
  isOpen, 
  setIsOpen, 
  newRoom, 
  setNewRoom, 
  onAddRoom 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
        
        <Button onClick={onAddRoom}>Add Room</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoomDialog;
