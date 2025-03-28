
import { useState, useEffect } from "react";

interface VitalsData {
  bloodPressure: {
    current: string;
    trend?: 'up' | 'down' | 'stable';
    history?: { date: string; value: string }[];
  };
  heartRate: {
    current: number;
    trend?: 'up' | 'down' | 'stable';
    history?: { date: string; value: number }[];
  };
  temperature: {
    current: number;
    trend?: 'up' | 'down' | 'stable';
    history?: { date: string; value: number }[];
  };
  respiratoryRate: {
    current: number;
    trend?: 'up' | 'down' | 'stable';
    history?: { date: string; value: number }[];
  };
  oxygenSaturation: {
    current: number;
    trend?: 'up' | 'down' | 'stable';
    history?: { date: string; value: number }[];
  };
  weight: {
    current: number;
    trend?: 'up' | 'down' | 'stable';
    history?: { date: string; value: number }[];
  };
  history?: {
    date: string;
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    respiratoryRate: number;
    oxygenSaturation: number;
    weight: number;
    recordedBy: string;
  }[];
}

export const useVitalsData = (patientId: string) => {
  const [vitals, setVitals] = useState<VitalsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchVitals = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // Demo data
        const mockVitals: VitalsData = {
          bloodPressure: {
            current: "120/80",
            trend: "stable",
            history: [
              { date: "2024-04-10", value: "120/80" },
              { date: "2024-03-15", value: "122/82" },
              { date: "2024-02-18", value: "118/78" }
            ]
          },
          heartRate: {
            current: 72,
            trend: "down",
            history: [
              { date: "2024-04-10", value: 72 },
              { date: "2024-03-15", value: 75 },
              { date: "2024-02-18", value: 78 }
            ]
          },
          temperature: {
            current: 98.6,
            trend: "stable",
            history: [
              { date: "2024-04-10", value: 98.6 },
              { date: "2024-03-15", value: 98.8 },
              { date: "2024-02-18", value: 98.7 }
            ]
          },
          respiratoryRate: {
            current: 16,
            trend: "stable",
            history: [
              { date: "2024-04-10", value: 16 },
              { date: "2024-03-15", value: 15 },
              { date: "2024-02-18", value: 16 }
            ]
          },
          oxygenSaturation: {
            current: 98,
            trend: "up",
            history: [
              { date: "2024-04-10", value: 98 },
              { date: "2024-03-15", value: 97 },
              { date: "2024-02-18", value: 96 }
            ]
          },
          weight: {
            current: 68.5,
            trend: "down",
            history: [
              { date: "2024-04-10", value: 68.5 },
              { date: "2024-03-15", value: 69.2 },
              { date: "2024-02-18", value: 70.1 }
            ]
          },
          history: [
            {
              date: "2024-04-10",
              bloodPressure: "120/80",
              heartRate: 72,
              temperature: 98.6,
              respiratoryRate: 16,
              oxygenSaturation: 98,
              weight: 68.5,
              recordedBy: "Nurse Johnson"
            },
            {
              date: "2024-03-15",
              bloodPressure: "122/82",
              heartRate: 75,
              temperature: 98.8,
              respiratoryRate: 15,
              oxygenSaturation: 97,
              weight: 69.2,
              recordedBy: "Nurse Williams"
            },
            {
              date: "2024-02-18",
              bloodPressure: "118/78",
              heartRate: 78,
              temperature: 98.7,
              respiratoryRate: 16,
              oxygenSaturation: 96,
              weight: 70.1,
              recordedBy: "Dr. Thompson"
            }
          ]
        };
        
        setVitals(mockVitals);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching vitals data:", err);
        setError("Failed to load vitals data");
        setIsLoading(false);
      }
    };

    fetchVitals();
  }, [patientId]);

  return { vitals, isLoading, error };
};
