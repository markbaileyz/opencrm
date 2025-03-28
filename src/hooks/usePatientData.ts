
import { useState, useEffect } from "react";

export interface Patient {
  patientId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: string;
  insurance: string;
  status: "active" | "inactive" | "pending";
  avatarUrl?: string;
  lastVisit?: string;
  upcomingAppointment?: {
    date: string;
    time: string;
    reason: string;
    provider: string;
  };
  medicalHistory?: {
    condition: string;
    status: string;
    notes: string;
  }[];
  allergies?: string[];
  medications?: string[];
  flags?: {
    type: string;
    description: string;
  }[];
  recentActivity?: {
    date: string;
    description: string;
  }[];
}

export const usePatientData = (patientId: string | undefined) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchPatient = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Demo data
        const mockPatient: Patient = {
          patientId: patientId || "12345",
          firstName: "Jane",
          lastName: "Smith",
          dateOfBirth: "1985-06-15",
          age: 38,
          gender: "Female",
          email: "jane.smith@example.com",
          phone: "(555) 123-4567",
          address: "123 Main St, Anytown, CA 94123",
          insurance: "BlueCross HealthPlus",
          status: "active",
          lastVisit: "2023-11-10",
          upcomingAppointment: {
            date: "2024-05-15",
            time: "10:30 AM",
            reason: "Annual Physical",
            provider: "Dr. Michael Johnson"
          },
          medicalHistory: [
            {
              condition: "Hypertension",
              status: "Controlled",
              notes: "Maintaining normal levels with medication."
            },
            {
              condition: "Type 2 Diabetes",
              status: "Monitored",
              notes: "Diet-controlled, regular testing required."
            }
          ],
          allergies: ["Penicillin", "Peanuts"],
          medications: ["Lisinopril 10mg", "Metformin 500mg", "Vitamin D 1000IU"],
          flags: [
            {
              type: "Alert",
              description: "Requires 30 minutes for checking vitals before appointment"
            }
          ],
          recentActivity: [
            {
              date: "2024-04-05",
              description: "Lab results reviewed by Dr. Johnson"
            },
            {
              date: "2024-03-28",
              description: "Prescription renewed for Lisinopril"
            },
            {
              date: "2024-03-15",
              description: "Completed annual physical examination"
            }
          ]
        };
        
        setPatient(mockPatient);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching patient data:", err);
        setError("Failed to load patient data");
        setIsLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  return { patient, isLoading, error };
};
