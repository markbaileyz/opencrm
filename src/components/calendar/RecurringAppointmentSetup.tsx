
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, addWeeks, addMonths } from "date-fns";
import { CalendarRange, CalendarRepeat, CalendarX2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Appointment } from "@/types/appointment";

interface RecurringAppointmentSetupProps {
  initialData?: Partial<Appointment>;
  onAppointmentsCreated: (appointments: Appointment[]) => void;
  onClose: () => void;
}

const RecurringAppointmentSetup = ({
  initialData,
  onAppointmentsCreated,
  onClose
}: RecurringAppointmentSetupProps) => {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [title, setTitle] = useState(initialData?.title || "");
  const [clientName, setClientName] = useState(initialData?.name || "");
  const [appointmentType, setAppointmentType] = useState(initialData?.type || "consultation");
  const [time, setTime] = useState(initialData?.time || "09:00");
  const [frequency, setFrequency] = useState("weekly");
  const [occurrences, setOccurrences] = useState("4");
  
  const generateAppointmentDates = (): Date[] => {
    const dates: Date[] = [new Date(startDate)];
    const count = parseInt(occurrences, 10);
    
    for (let i = 1; i < count; i++) {
      const lastDate = new Date(dates[dates.length - 1]);
      
      if (frequency === "daily") {
        dates.push(addDays(lastDate, 1));
      } else if (frequency === "weekly") {
        dates.push(addWeeks(lastDate, 1));
      } else if (frequency === "biweekly") {
        dates.push(addWeeks(lastDate, 2));
      } else if (frequency === "monthly") {
        dates.push(addMonths(lastDate, 1));
      }
    }
    
    return dates;
  };
  
  const handleCreateAppointments = () => {
    // Validate fields
    if (!title || !clientName || !time) {
      toast({
        title: "Incomplete information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const dates = generateAppointmentDates();
    const newAppointments: Appointment[] = dates.map((date, index) => ({
      id: `recurring-${Date.now()}-${index}`,
      title,
      date,
      time,
      type: appointmentType,
      name: clientName,
      status: "upcoming"
    }));
    
    onAppointmentsCreated(newAppointments);
    
    toast({
      title: "Recurring appointments created",
      description: `${newAppointments.length} ${frequency} appointments have been scheduled`,
      variant: "success"
    });
    
    onClose();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Set Up Recurring Appointments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Appointment Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Therapy Session"
              />
            </div>
            
            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client name"
              />
            </div>
            
            <div>
              <Label htmlFor="appointmentType">Appointment Type</Label>
              <Select
                value={appointmentType}
                onValueChange={setAppointmentType}
              >
                <SelectTrigger id="appointmentType">
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
            
            <div>
              <Label htmlFor="appointmentTime">Time</Label>
              <Input
                id="appointmentTime"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Start Date</Label>
              <div className="border rounded-md p-2 mt-2">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => date && setStartDate(date)}
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 pt-4">
          <Label>Recurrence Pattern</Label>
          <RadioGroup
            value={frequency}
            onValueChange={setFrequency}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily">Daily</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly">Weekly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="biweekly" id="biweekly" />
              <Label htmlFor="biweekly">Bi-weekly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly">Monthly</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="occurrences">Number of Occurrences</Label>
          <Select
            value={occurrences}
            onValueChange={setOccurrences}
          >
            <SelectTrigger id="occurrences">
              <SelectValue placeholder="Select number" />
            </SelectTrigger>
            <SelectContent>
              {[2, 3, 4, 5, 6, 8, 10, 12, 16, 20].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} appointments
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="p-3 bg-muted rounded-md mt-4">
          <h4 className="text-sm font-medium flex items-center">
            <CalendarRange className="h-4 w-4 mr-2" />
            Preview
          </h4>
          <div className="mt-2 space-y-1 text-sm">
            {generateAppointmentDates().map((date, index) => (
              <div key={index} className="flex items-center">
                <span className="text-muted-foreground mr-2">{index + 1}.</span>
                <span>{format(date, 'PPP')} at {time}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreateAppointments}>
          <CalendarRepeat className="h-4 w-4 mr-2" />
          Create Recurring Appointments
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecurringAppointmentSetup;
