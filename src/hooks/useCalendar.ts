
import { useState, useEffect } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { emailData } from "@/data/emailData";
import type { Appointment } from "@/types/appointment";

export function useCalendar() {
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

  return {
    currentMonth,
    setCurrentMonth,
    selectedDate,
    setSelectedDate,
    isAddAppointmentOpen,
    setIsAddAppointmentOpen,
    isBatchModeOpen,
    setIsBatchModeOpen,
    isRecurringModeOpen,
    setIsRecurringModeOpen,
    editAppointmentId,
    setEditAppointmentId,
    appointments,
    setAppointments,
    emails,
    navigate,
    toast,
    nextMonth,
    prevMonth,
    handleDateSelect
  };
}
