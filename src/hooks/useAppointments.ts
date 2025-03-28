
import { useState, useEffect } from "react";

interface Appointment {
  id: string;
  date: string;
  time: string;
  reason: string;
  provider: string;
  location: string;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  notes?: string;
}

export const useAppointments = (patientId: string) => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Demo data
        const today = new Date();
        const futureDate1 = new Date();
        futureDate1.setDate(today.getDate() + 14);
        const futureDate2 = new Date();
        futureDate2.setDate(today.getDate() + 45);
        
        const pastDate1 = new Date();
        pastDate1.setDate(today.getDate() - 15);
        const pastDate2 = new Date();
        pastDate2.setDate(today.getDate() - 60);
        
        const formatDate = (date: Date) => {
          return date.toISOString().split('T')[0];
        };
        
        const mockAppointments: Appointment[] = [
          {
            id: "1",
            date: formatDate(futureDate1),
            time: "10:30 AM",
            reason: "Annual Physical Examination",
            provider: "Dr. Michael Johnson",
            location: "Main Clinic - Room 105",
            status: "scheduled"
          },
          {
            id: "2",
            date: formatDate(futureDate2),
            time: "2:15 PM",
            reason: "Follow-up Consultation",
            provider: "Dr. Sarah Wilson",
            location: "East Wing - Room 210",
            status: "scheduled"
          },
          {
            id: "3",
            date: formatDate(pastDate1),
            time: "9:00 AM",
            reason: "Blood Work",
            provider: "Dr. Michael Johnson",
            location: "Lab Services - Room 302",
            status: "completed",
            notes: "All tests completed successfully. Results have been analyzed and shared."
          },
          {
            id: "4",
            date: formatDate(pastDate2),
            time: "11:45 AM",
            reason: "Diabetes Management",
            provider: "Dr. Emily Chen",
            location: "Specialty Clinic - Room 118",
            status: "completed",
            notes: "Discussed diet plan and reviewed medication schedule."
          }
        ];
        
        setAppointments(mockAppointments);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointment data");
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [patientId]);

  return { appointments, isLoading, error };
};
