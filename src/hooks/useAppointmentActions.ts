
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import type { Appointment } from "@/types/appointment";
import type { Email } from "@/types/email";

interface UseAppointmentActionsProps {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  selectedDate: Date;
  setIsAddAppointmentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editAppointmentId: string | null;
  setEditAppointmentId: React.Dispatch<React.SetStateAction<string | null>>;
}

export function useAppointmentActions({
  appointments,
  setAppointments,
  selectedDate,
  setIsAddAppointmentOpen,
  editAppointmentId,
  setEditAppointmentId
}: UseAppointmentActionsProps) {
  const { toast } = useToast();
  const navigate = useNavigate();

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
      location: formData.get('location') as string,
      emailThreadId: (formData.get('emailThread') as string) !== "none" ? 
                    (formData.get('emailThread') as string) : 
                    undefined,
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
      setAppointments(prev => [...prev, newAppointment]);
      
      toast({
        title: "Appointment created",
        description: `Appointment with ${newAppointment.name} scheduled for ${format(selectedDate, 'PPP')} at ${newAppointment.time}`,
        variant: "success"
      });
    }
    
    setIsAddAppointmentOpen(false);
  };

  const handleQuickAddAppointment = (appointmentData: Partial<Appointment>) => {
    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      title: appointmentData.title || "New Appointment",
      date: appointmentData.date || selectedDate,
      time: appointmentData.time || "9:00 AM",
      type: appointmentData.type || "consultation",
      name: appointmentData.name || "Client",
      status: "upcoming",
      notes: appointmentData.notes || "",
      location: appointmentData.location || "",
      reminderSent: false
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    
    toast({
      title: "Quick appointment created",
      description: `Appointment with ${newAppointment.name} scheduled for ${format(newAppointment.date, 'PPP')} at ${newAppointment.time}`,
      variant: "success"
    });
  };

  const handleBatchAppointmentsCreated = (newAppointments: Appointment[]) => {
    setAppointments(prev => [...prev, ...newAppointments]);
  };

  const handleEditAppointment = (id: string) => {
    const appointmentToEdit = appointments.find(app => app.id === id);
    if (appointmentToEdit) {
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

  return {
    handleAddAppointment,
    handleQuickAddAppointment,
    handleBatchAppointmentsCreated,
    handleEditAppointment,
    handleDeleteAppointment,
    handleSendReminder,
    handleGoToEmail,
    navigateToEmail
  };
}
