
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { CallRecord } from "@/types/call";

interface CallFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (call: CallRecord) => void;
  initialData: CallRecord | null;
}

const CallForm: React.FC<CallFormProps> = ({ 
  open, 
  onClose, 
  onSave, 
  initialData 
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState<"incoming" | "outgoing" | "missed">("incoming");
  const [duration, setDuration] = useState<number>(0);
  const [notes, setNotes] = useState("");
  
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPhone(initialData.phone);
      setType(initialData.type);
      setDuration(initialData.duration);
      setNotes(initialData.notes || "");
    } else {
      setName("");
      setPhone("");
      setType("incoming");
      setDuration(0);
      setNotes("");
    }
  }, [initialData]);
  
  const handleSubmit = () => {
    const callData: CallRecord = {
      id: initialData?.id || "",
      name,
      phone,
      type,
      duration,
      notes,
      date: initialData?.date || new Date().toISOString()
    };
    
    onSave(callData);
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Call" : "Add Call"}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="Contact name"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="col-span-3"
              placeholder="Phone number"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Call Type
            </Label>
            <Select 
              value={type} 
              onValueChange={(value) => setType(value as "incoming" | "outgoing" | "missed")}
            >
              <SelectTrigger id="type" className="col-span-3">
                <SelectValue placeholder="Call type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="incoming">Incoming</SelectItem>
                <SelectItem value="outgoing">Outgoing</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration (s)
            </Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="col-span-3"
              placeholder="Call duration in seconds"
              min={0}
              disabled={type === "missed"}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="col-span-3"
              placeholder="Call notes"
              rows={4}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CallForm;
