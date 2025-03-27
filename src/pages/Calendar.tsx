
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarPlus, Mail, CalendarRange, CalendarClock } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
import AppointmentList from "@/components/dashboard/AppointmentList";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { emailData } from "@/data/emailData";
import { useCalendarEmailIntegration } from "@/hooks/useCalendarEmailIntegration";
import type { Appointment } from "@/types/appointment";

// Import refactored components
import CalendarView from "@/components/calendar/CalendarView";
import DailyAppointments from "@/components/calendar/DailyAppointments";
import EmailIntegrationSection from "@/components/calendar/EmailIntegrationSection";
import AppointmentForm from "@/components/calendar/AppointmentForm";
import BatchAppointmentCreator from "@/components/calendar/BatchAppointmentCreator";
import RecurringAppointmentSetup from "@/components/calendar/RecurringAppointmentSetup";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [isBatchModeOpen, setIsBatchModeOpen] = useState(false);
  const [isRecurringModeOpen, setIsRecurringModeOpen] = useState(false);
  const [editAppointmentId, setEditAppointmentId] = useState<string | null>(null);
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
      id: editAppointmentId || `app-${Date.now()}`,
      title: formData.get('title') as string,
      date: selectedDate,
      time: formData.get('time') as string,
      type: formData.get('type') as string,
      name: formData.get('name') as string,
      status: editAppointmentId ? 
        (appointments.find(a => a.id === editAppointmentId)?.status || "upcoming") : 
        "upcoming",
      notes: formData.get('notes') as string,
      emailThreadId: formData.get('emailThread') as string || undefined,
      reminderSent: editAppointmentId ? 
        appointments.find(a => a.id === editAppointmentId)?.reminderSent || false : 
        false
    };
    
    if (editAppointmentId) {
      setAppointments(prevAppointments => 
        prevAppointments.map(app => 
          app.id === editAppointmentId ? newAppointment : app
        )
      );
      
      toast({
        title: "Appointment updated",
        description: `Appointment with ${newAppointment.name} updated for ${format(selectedDate, 'PPP')} at ${newAppointment.time}`,
        variant: "success"
      });
      
      setEditAppointmentId(null);
    } else {
      setAppointments([...appointments, newAppointment]);
      
      toast({
        title: "Appointment created",
        description: `Appointment with ${newAppointment.name} scheduled for ${format(selectedDate, 'PPP')} at ${newAppointment.time}`,
        variant: "success"
      });
    }
    
    setIsAddAppointmentOpen(false);
  };

  const handleBatchAppointmentsCreated = (newAppointments: Appointment[]) => {
    setAppointments(prev => [...prev, ...newAppointments]);
  };

  const handleEditAppointment = (id: string) => {
    const appointmentToEdit = appointments.find(app => app.id === id);
    if (appointmentToEdit) {
      setSelectedDate(appointmentToEdit.date);
      setEditAppointmentId(id);
      setIsAddAppointmentOpen(true);
    }
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id));
    toast({
      title: "Appointment deleted",
      description: "The appointment has been deleted",
      variant: "destructive"
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
            
            {/* Batch Appointment Dialog */}
            <Dialog open={isBatchModeOpen} onOpenChange={setIsBatchModeOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <CalendarRange className="h-4 w-4 mr-2" />
                  Batch Create
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Multiple Appointments</DialogTitle>
                  <DialogDescription>
                    Schedule multiple appointments for the same day
                  </DialogDescription>
                </DialogHeader>
                <BatchAppointmentCreator 
                  onAppointmentsCreated={handleBatchAppointmentsCreated}
                  onClose={() => setIsBatchModeOpen(false)}
                />
              </DialogContent>
            </Dialog>
            
            {/* Recurring Appointment Dialog */}
            <Dialog open={isRecurringModeOpen} onOpenChange={setIsRecurringModeOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <CalendarClock className="h-4 w-4 mr-2" />
                  Recurring
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Recurring Appointments</DialogTitle>
                  <DialogDescription>
                    Schedule a series of appointments with regular intervals
                  </DialogDescription>
                </DialogHeader>
                <RecurringAppointmentSetup 
                  onAppointmentsCreated={handleBatchAppointmentsCreated}
                  onClose={() => setIsRecurringModeOpen(false)}
                />
              </DialogContent>
            </Dialog>
            
            {/* Regular Appointment Dialog */}
            <Dialog open={isAddAppointmentOpen} onOpenChange={setIsAddAppointmentOpen}>
              <DialogTrigger asChild>
                <Button>
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editAppointmentId ? "Edit Appointment" : "Add New Appointment"}
                  </DialogTitle>
                  <DialogDescription>
                    {editAppointmentId 
                      ? "Update the appointment details" 
                      : `Create a new appointment for ${format(selectedDate, 'PPP')}`}
                  </DialogDescription>
                </DialogHeader>
                <AppointmentForm
                  selectedDate={selectedDate}
                  editAppointmentId={editAppointmentId}
                  appointments={appointments}
                  emails={emails}
                  onSubmit={handleAddAppointment}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CalendarView
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            appointments={appointments}
            onDateSelect={handleDateSelect}
            onMonthChange={setCurrentMonth}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
          />
          
          <DailyAppointments
            selectedDate={selectedDate}
            appointments={appointments}
            emails={emails}
            onAddAppointment={() => setIsAddAppointmentOpen(true)}
            onEditAppointment={handleEditAppointment}
            onDeleteAppointment={handleDeleteAppointment}
            onReminderSent={handleSendReminder}
            onViewEmail={navigateToEmail}
            findRelatedEmails={findRelatedEmails}
          />
        </div>
        
        <EmailIntegrationSection onGoToEmail={handleGoToEmail} />
        
        <div className="mt-6">
          <AppointmentList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
