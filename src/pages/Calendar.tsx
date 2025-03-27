import React, { useState, useEffect } from "react";
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
import { CalendarPlus, CalendarClock, ChevronLeft, ChevronRight, Mail, MoveRight } from "lucide-react";
import { format, addMonths, subMonths, isToday, isFuture } from "date-fns";
import AppointmentList from "@/components/dashboard/AppointmentList";
import AppointmentItem from "@/components/dashboard/AppointmentItem";
import AppointmentRelatedEmails from "@/components/calendar/AppointmentRelatedEmails";
import AppointmentReminder from "@/components/calendar/AppointmentReminder";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { emailData } from "@/data/emailData";
import type { Appointment } from "@/types/appointment";
import { useCalendarEmailIntegration } from "@/hooks/useCalendarEmailIntegration";

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
  const [emails] = useState(emailData);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { findRelatedEmails } = useCalendarEmailIntegration();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailId = params.get('emailId');
    
    if (emailId) {
      const email = emails.find(e => e.id === emailId);
      if (email) {
        setIsAddAppointmentOpen(true);
        toast({
          title: "Email imported",
          description: "Creating an appointment from email: " + email.subject,
          variant: "default"
        });
        
        navigate('/calendar', { replace: true });
      }
    }
  }, []);

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
      notes: formData.get('notes') as string,
      emailThreadId: formData.get('emailThread') as string || undefined,
      reminderSent: false
    };
    
    setAppointments([...appointments, newAppointment]);
    setIsAddAppointmentOpen(false);
    
    toast({
      title: "Appointment created",
      description: `Appointment with ${newAppointment.name} scheduled for ${format(selectedDate, 'PPP')} at ${newAppointment.time}`,
      variant: "success"
    });
  };

  const handleSendReminder = (appointmentId: string) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(app => 
        app.id === appointmentId 
          ? { ...app, reminderSent: true } 
          : app
      )
    );
  };

  const handleGoToEmail = () => {
    navigate('/email');
  };

  const navigateToEmail = (emailId: string) => {
    navigate(`/email?emailId=${emailId}`);
  };

  const selectedDateAppointments = appointments.filter(
    (appointment) => format(appointment.date, 'PP') === format(selectedDate, 'PP')
  );

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
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleGoToEmail}>
              <Mail className="h-4 w-4 mr-2" />
              Go to Email
            </Button>
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
                          <SelectItem value="email-followup">Email Follow-up</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="notes" className="text-right">
                        Notes
                      </Label>
                      <Textarea id="notes" name="notes" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="emailThread" className="text-right">
                        Email Thread
                      </Label>
                      <Select name="emailThread">
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Related email (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          {emails.slice(0, 5).map(email => (
                            <SelectItem key={email.id} value={email.id}>
                              {email.subject.substring(0, 30)}...
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    today: (date) => isToday(date),
                  }}
                  modifiersClassNames={{
                    hasAppointment: "bg-primary/20 font-bold text-primary",
                    today: "border border-primary ring-2 ring-primary/20"
                  }}
                />
              </div>
            </CardContent>
          </Card>
          
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
                          <div className="flex items-center pt-2 space-x-2">
                            {isFuture(appointment.date) && (
                              <AppointmentReminder 
                                appointment={appointment}
                                onReminderSent={handleSendReminder}
                              />
                            )}
                            <AppointmentRelatedEmails
                              emails={findRelatedEmails(emails, appointment)}
                              onViewEmail={navigateToEmail}
                            />
                          </div>
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
        
        <Card>
          <CardHeader>
            <CardTitle>Email & Calendar Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Create appointments from emails</h3>
                  <p className="text-sm text-muted-foreground">
                    Schedule follow-up meetings directly from your email inbox
                  </p>
                </div>
                <Button onClick={handleGoToEmail}>
                  Go to Email
                  <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Send email reminders</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically send email reminders for upcoming appointments
                  </p>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Reminder emails sent",
                      description: "Reminder emails have been sent for tomorrow's appointments",
                      variant: "success"
                    });
                  }}
                >
                  Send All Reminders
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6">
          <AppointmentList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
