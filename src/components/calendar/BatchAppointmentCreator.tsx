
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import type { Appointment } from "@/types/appointment";

interface BatchAppointmentCreatorProps {
  onAppointmentsCreated: (appointments: Appointment[]) => void;
  onClose: () => void;
}

const BatchAppointmentCreator = ({ 
  onAppointmentsCreated,
  onClose 
}: BatchAppointmentCreatorProps) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Array<{ time: string; name: string; type: string }>>([
    { time: "09:00", name: "", type: "consultation" }
  ]);

  const addAppointmentSlot = () => {
    setAppointments([...appointments, { time: "", name: "", type: "consultation" }]);
  };

  const removeAppointmentSlot = (index: number) => {
    const newAppointments = [...appointments];
    newAppointments.splice(index, 1);
    setAppointments(newAppointments);
  };

  const updateAppointment = (index: number, field: string, value: string) => {
    const newAppointments = [...appointments];
    newAppointments[index] = { ...newAppointments[index], [field]: value };
    setAppointments(newAppointments);
  };

  const handleCreateAppointments = () => {
    // Validate appointments
    const incompleteAppointments = appointments.filter(app => !app.time || !app.name);
    if (incompleteAppointments.length > 0) {
      toast({
        title: "Incomplete information",
        description: "Please fill in all required fields for each appointment",
        variant: "destructive"
      });
      return;
    }

    // Create appointment objects
    const newAppointments = appointments.map((app, index) => ({
      id: `batch-${Date.now()}-${index}`,
      title: `${app.type} with ${app.name}`,
      date: selectedDate,
      time: app.time,
      type: app.type,
      name: app.name,
      status: "upcoming" as const
    }));

    onAppointmentsCreated(newAppointments);
    
    toast({
      title: "Appointments created",
      description: `${newAppointments.length} appointments scheduled for ${format(selectedDate, 'PPP')}`,
      variant: "success"
    });
    
    onClose();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Batch Appointment Creation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Select Date</Label>
          <div className="border rounded-md p-2 mt-2">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="mx-auto"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Appointments for {format(selectedDate, 'PPP')}</h3>
            <Button variant="outline" size="sm" onClick={addAppointmentSlot}>
              <Plus className="h-4 w-4 mr-2" />
              Add Slot
            </Button>
          </div>
          
          {appointments.map((appointment, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-center p-3 border rounded-md">
              <div className="col-span-2">
                <Label htmlFor={`time-${index}`}>Time</Label>
                <Input
                  id={`time-${index}`}
                  type="time"
                  value={appointment.time}
                  onChange={(e) => updateAppointment(index, "time", e.target.value)}
                />
              </div>
              <div className="col-span-5">
                <Label htmlFor={`name-${index}`}>Client Name</Label>
                <Input
                  id={`name-${index}`}
                  value={appointment.name}
                  onChange={(e) => updateAppointment(index, "name", e.target.value)}
                  placeholder="Client name"
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor={`type-${index}`}>Type</Label>
                <Select
                  value={appointment.type}
                  onValueChange={(value) => updateAppointment(index, "type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="check-in">Check-in</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="new-client">New Client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1 flex items-end justify-end h-full">
                {appointments.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeAppointmentSlot(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreateAppointments}>
          <CalendarIcon className="h-4 w-4 mr-2" />
          Create {appointments.length} Appointments
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BatchAppointmentCreator;
