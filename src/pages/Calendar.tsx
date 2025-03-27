
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarPlus, CalendarClock, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
import AppointmentList from "@/components/dashboard/AppointmentList";
import AppointmentItem from "@/components/dashboard/AppointmentItem";
import { useToast } from "@/hooks/use-toast";

// Appointment type definition
interface Appointment {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: string;
  name: string;
  status: "upcoming" | "completed" | "canceled";
  notes?: string;
}

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      title: "Initial Consultation",
      date: new Date(),
      time: "9:00 AM",
      type: "Check-in",
      name: "Sarah Johnson",
      status: "completed"
    },
    {
      id: "2",
      title: "Follow-up Meeting",
      date: new Date(),
      time: "10:30 AM",
      type: "Follow-up",
      name: "Robert Chen",
      status: "completed"
    },
    {
      id: "3",
      title: "New Client Consultation",
      date: new Date(),
      time: "1:15 PM",
      type: "Consultation",
      name: "Emily Davis",
      status: "upcoming"
    },
    {
      id: "4",
      title: "Project Discussion",
      date: new Date(),
      time: "3:00 PM",
      type: "New Client",
      name: "Michael Williams",
      status: "upcoming"
    },
    {
      id: "5",
      title: "Quarterly Review",
      date: new Date(),
      time: "4:30 PM",
      type: "Review",
      name: "Jessica Brown",
      status: "upcoming"
    }
  ]);
  
  // Moved the useToast hook inside the component function
  const { toast } = useToast();

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleAddAppointment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      title: formData.get('title') as string,
      date: selectedDate,
      time: formData.get('time') as string,
      type: formData.get('type') as string,
      name: formData.get('name') as string,
      status: "upcoming",
      notes: formData.get('notes') as string
    };
    
    setAppointments([...appointments, newAppointment]);
    setIsAddAppointmentOpen(false);
    
    toast({
      title: "Appointment created",
      description: `Appointment with ${newAppointment.name} scheduled for ${format(selectedDate, 'PPP')} at ${newAppointment.time}`,
      variant: "success"
    });
  };

  // Filter appointments for the selected date
  const selectedDateAppointments = appointments.filter(
    (appointment) => format(appointment.date, 'PP') === format(selectedDate, 'PP')
  );

  // Function to determine if a date has appointments
  const dateHasAppointment = (date: Date) => {
    return appointments.some(
      (appointment) => format(appointment.date, 'PP') === format(date, 'PP')
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Calendar</h1>
            <p className="text-muted-foreground">
              Manage appointments and schedule follow-ups
            </p>
          </div>
          <Dialog open={isAddAppointmentOpen} onOpenChange={setIsAddAppointmentOpen}>
            <DialogTrigger asChild>
              <Button>
                <CalendarPlus className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Appointment</DialogTitle>
                <DialogDescription>
                  Create a new appointment for {format(selectedDate, 'PPP')}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddAppointment}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input id="title" name="title" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Client Name
                    </Label>
                    <Input id="name" name="name" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Time
                    </Label>
                    <Input id="time" name="time" type="time" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select name="type" defaultValue="consultation">
                      <SelectTrigger className="col-span-3">
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Notes
                    </Label>
                    <Textarea id="notes" name="notes" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save Appointment</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar Navigation and Display */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Calendar</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-semibold">
                    {format(currentMonth, 'MMMM yyyy')}
                  </span>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  className="rounded-md p-3 w-full"
                  modifiers={{
                    hasAppointment: (date) => dateHasAppointment(date),
                  }}
                  modifiersClassNames={{
                    hasAppointment: "bg-primary/20 font-bold text-primary",
                  }}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Appointments for Selected Date */}
          <Card>
            <CardHeader>
              <CardTitle>Appointments for {format(selectedDate, 'PPP')}</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateAppointments.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateAppointments.map((appointment) => (
                    <Popover key={appointment.id}>
                      <PopoverTrigger asChild>
                        <div className="cursor-pointer">
                          <AppointmentItem
                            name={appointment.name}
                            time={appointment.time}
                            type={appointment.type}
                            status={appointment.status}
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{appointment.title}</h3>
                          <div className="grid grid-cols-3 gap-1">
                            <p className="text-muted-foreground text-sm">Client:</p>
                            <p className="col-span-2 text-sm">{appointment.name}</p>
                            
                            <p className="text-muted-foreground text-sm">Date:</p>
                            <p className="col-span-2 text-sm">{format(appointment.date, 'PPP')}</p>
                            
                            <p className="text-muted-foreground text-sm">Time:</p>
                            <p className="col-span-2 text-sm">{appointment.time}</p>
                            
                            <p className="text-muted-foreground text-sm">Type:</p>
                            <p className="col-span-2 text-sm">{appointment.type}</p>
                            
                            <p className="text-muted-foreground text-sm">Status:</p>
                            <p className="col-span-2 text-sm capitalize">{appointment.status}</p>
                          </div>
                          {appointment.notes && (
                            <>
                              <p className="text-muted-foreground text-sm">Notes:</p>
                              <p className="text-sm">{appointment.notes}</p>
                            </>
                          )}
                          <div className="flex justify-end space-x-2 pt-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => {
                                setAppointments(appointments.filter(a => a.id !== appointment.id));
                                toast({
                                  title: "Appointment deleted",
                                  description: "The appointment has been deleted",
                                  variant: "destructive"
                                });
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CalendarClock className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No appointments for this date</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setIsAddAppointmentOpen(true)}
                  >
                    <CalendarPlus className="h-4 w-4 mr-2" />
                    Add Appointment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Today's Meetings Section */}
        <div className="mt-6">
          <AppointmentList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
