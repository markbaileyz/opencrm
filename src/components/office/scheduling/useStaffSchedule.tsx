
import { useState } from "react";
import { StaffMember } from "@/types/office";
import { useToast } from "@/hooks/use-toast";

// Sample events data structure
type ScheduleEvent = {
  id: string;
  title: string;
  staffId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: "confirmed" | "tentative" | "cancelled";
  notes?: string;
};

export const useStaffSchedule = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState<string>("day");
  const [selectedStaffId, setSelectedStaffId] = useState<string>("all");
  const [isAddEventOpen, setIsAddEventOpen] = useState<boolean>(false);
  
  // In a real app, this would come from a store or API
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: "staff-1",
      name: "Dr. Jane Smith",
      role: "doctor",
      department: "primary-care",
      status: "active",
      availability: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "Off",
        sunday: "Off"
      },
      contact: {
        email: "jane.smith@example.com",
        phone: "123-456-7890"
      },
      specialty: "Family Medicine"
    },
    {
      id: "staff-2",
      name: "Nurse Robert Johnson",
      role: "nurse",
      department: "pediatrics",
      status: "active",
      availability: {
        monday: "8:00 AM - 4:00 PM",
        tuesday: "8:00 AM - 4:00 PM",
        wednesday: "8:00 AM - 4:00 PM",
        thursday: "Off",
        friday: "8:00 AM - 4:00 PM",
        saturday: "10:00 AM - 2:00 PM",
        sunday: "Off"
      },
      contact: {
        email: "robert.johnson@example.com",
        phone: "123-456-7891"
      }
    },
    {
      id: "staff-3",
      name: "Sarah Williams",
      role: "receptionist",
      department: "front-desk",
      status: "active",
      availability: {
        monday: "8:00 AM - 4:00 PM",
        tuesday: "8:00 AM - 4:00 PM",
        wednesday: "8:00 AM - 4:00 PM",
        thursday: "8:00 AM - 4:00 PM",
        friday: "8:00 AM - 4:00 PM",
        saturday: "Off",
        sunday: "Off"
      },
      contact: {
        email: "sarah.williams@example.com",
        phone: "123-456-7892"
      }
    },
  ]);
  
  // Sample schedule events - in a real app, this would come from an API
  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: "event-1",
      title: "Morning Rounds",
      staffId: "staff-1",
      date: new Date(),
      startTime: "9:00 AM",
      endTime: "10:30 AM",
      status: "confirmed"
    },
    {
      id: "event-2",
      title: "Patient Consultations",
      staffId: "staff-1",
      date: new Date(),
      startTime: "11:00 AM",
      endTime: "1:00 PM",
      status: "confirmed"
    },
    {
      id: "event-3",
      title: "Lunch Break",
      staffId: "staff-1",
      date: new Date(),
      startTime: "1:00 PM",
      endTime: "2:00 PM",
      status: "confirmed"
    },
    {
      id: "event-4",
      title: "Team Meeting",
      staffId: "staff-2",
      date: new Date(),
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      status: "tentative"
    },
    {
      id: "event-5",
      title: "Front Desk Coverage",
      staffId: "staff-3",
      date: new Date(),
      startTime: "8:00 AM",
      endTime: "12:00 PM",
      status: "confirmed"
    }
  ]);
  
  // Filter events based on selected date and staff
  const scheduleEvents = events.filter(event => {
    const sameDate = event.date.toDateString() === selectedDate.toDateString();
    const staffMatch = selectedStaffId === "all" || event.staffId === selectedStaffId;
    return sameDate && staffMatch;
  });
  
  // Function to add a new event
  const addEvent = (newEvent: Omit<ScheduleEvent, "id">) => {
    const event: ScheduleEvent = {
      ...newEvent,
      id: `event-${Date.now()}`
    };
    
    setEvents([...events, event]);
    toast({
      title: "Event Added",
      description: `${event.title} has been scheduled.`,
      variant: "success",
    });
  };
  
  return {
    staffMembers,
    selectedDate,
    setSelectedDate,
    selectedView,
    setSelectedView,
    selectedStaffId,
    setSelectedStaffId,
    scheduleEvents,
    addEvent,
    isAddEventOpen,
    setIsAddEventOpen
  };
};
