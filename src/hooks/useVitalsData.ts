
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export interface VitalReading {
  id: string;
  date: string;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  weight: number;
  recordedBy?: string;
  notes?: string;
}

export interface VitalsChartData {
  date: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
  weight: number;
}

export interface VitalsData {
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
  readings: VitalReading[];
  chartData: VitalsChartData[];
}

export const useVitalsData = (patientId?: string, timeRange: string = "week") => {
  const [vitals, setVitals] = useState<VitalsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchVitals = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // Mock readings data with more frequent entries for better visualization
        const mockReadings: VitalReading[] = [
          {
            id: "v1",
            date: "2024-04-10",
            bloodPressure: "120/80",
            heartRate: 72,
            temperature: 98.6,
            respiratoryRate: 16,
            oxygenSaturation: 98,
            weight: 68.5,
            recordedBy: "Nurse Johnson",
            notes: "Patient reports feeling well"
          },
          {
            id: "v2",
            date: "2024-04-08",
            bloodPressure: "118/79",
            heartRate: 70,
            temperature: 98.4,
            respiratoryRate: 15,
            oxygenSaturation: 99,
            weight: 68.7,
            recordedBy: "Self-recorded"
          },
          {
            id: "v3",
            date: "2024-04-05",
            bloodPressure: "122/82",
            heartRate: 74,
            temperature: 98.8,
            respiratoryRate: 16,
            oxygenSaturation: 97,
            weight: 68.9,
            recordedBy: "Self-recorded"
          },
          {
            id: "v4",
            date: "2024-04-02",
            bloodPressure: "121/81",
            heartRate: 73,
            temperature: 98.7,
            respiratoryRate: 17,
            oxygenSaturation: 98,
            weight: 69.0,
            recordedBy: "Self-recorded"
          },
          {
            id: "v5",
            date: "2024-03-30",
            bloodPressure: "123/83",
            heartRate: 75,
            temperature: 98.9,
            respiratoryRate: 16,
            oxygenSaturation: 97,
            weight: 69.1,
            recordedBy: "Nurse Williams"
          },
          {
            id: "v6",
            date: "2024-03-27",
            bloodPressure: "119/80",
            heartRate: 71,
            temperature: 98.5,
            respiratoryRate: 15,
            oxygenSaturation: 98,
            weight: 69.3,
            recordedBy: "Self-recorded"
          },
          {
            id: "v7",
            date: "2024-03-24",
            bloodPressure: "120/82",
            heartRate: 76,
            temperature: 98.8,
            respiratoryRate: 16,
            oxygenSaturation: 96,
            weight: 69.5,
            recordedBy: "Self-recorded"
          },
          {
            id: "v8",
            date: "2024-03-21",
            bloodPressure: "122/84",
            heartRate: 77,
            temperature: 99.0,
            respiratoryRate: 17,
            oxygenSaturation: 96,
            weight: 69.8,
            recordedBy: "Dr. Thompson",
            notes: "Patient reports occasional headaches in the afternoon"
          },
          {
            id: "v9",
            date: "2024-03-15",
            bloodPressure: "124/83",
            heartRate: 75,
            temperature: 98.8,
            respiratoryRate: 15,
            oxygenSaturation: 97,
            weight: 70.0,
            recordedBy: "Nurse Williams"
          },
          {
            id: "v10",
            date: "2024-02-28",
            bloodPressure: "122/81",
            heartRate: 76,
            temperature: 98.7,
            respiratoryRate: 16,
            oxygenSaturation: 97,
            weight: 70.2,
            recordedBy: "Dr. Thompson"
          },
          {
            id: "v11",
            date: "2024-02-18",
            bloodPressure: "118/78",
            heartRate: 78,
            temperature: 98.7,
            respiratoryRate: 16,
            oxygenSaturation: 96,
            weight: 70.1,
            recordedBy: "Self-recorded"
          }
        ];
        
        // Generate chart data from readings
        const chartData: VitalsChartData[] = mockReadings.map(reading => {
          const [systolic, diastolic] = reading.bloodPressure.split('/').map(Number);
          return {
            date: reading.date,
            systolic,
            diastolic,
            heartRate: reading.heartRate,
            temperature: reading.temperature,
            oxygenSaturation: reading.oxygenSaturation,
            weight: reading.weight
          };
        });
        
        // Prepare the history data
        const bpHistory = mockReadings.map(r => ({ date: r.date, value: r.bloodPressure }));
        const hrHistory = mockReadings.map(r => ({ date: r.date, value: r.heartRate }));
        const tempHistory = mockReadings.map(r => ({ date: r.date, value: r.temperature }));
        const rrHistory = mockReadings.map(r => ({ date: r.date, value: r.respiratoryRate }));
        const o2History = mockReadings.map(r => ({ date: r.date, value: r.oxygenSaturation }));
        const weightHistory = mockReadings.map(r => ({ date: r.date, value: r.weight }));
        
        // Get systolic values for determining trend
        const currentSystolic = Number(mockReadings[0].bloodPressure.split('/')[0]);
        const previousSystolic = Number(mockReadings[1].bloodPressure.split('/')[0]);
        
        // Mock vital data structure
        const mockVitals: VitalsData = {
          bloodPressure: {
            current: mockReadings[0].bloodPressure,
            trend: currentSystolic < previousSystolic ? "down" : 
                   currentSystolic > previousSystolic ? "up" : "stable",
            history: bpHistory
          },
          heartRate: {
            current: mockReadings[0].heartRate,
            trend: mockReadings[0].heartRate < mockReadings[1].heartRate ? "down" : 
                   mockReadings[0].heartRate > mockReadings[1].heartRate ? "up" : "stable",
            history: hrHistory
          },
          temperature: {
            current: mockReadings[0].temperature,
            trend: mockReadings[0].temperature < mockReadings[1].temperature ? "down" : 
                   mockReadings[0].temperature > mockReadings[1].temperature ? "up" : "stable",
            history: tempHistory
          },
          respiratoryRate: {
            current: mockReadings[0].respiratoryRate,
            trend: mockReadings[0].respiratoryRate < mockReadings[1].respiratoryRate ? "down" : 
                   mockReadings[0].respiratoryRate > mockReadings[1].respiratoryRate ? "up" : "stable",
            history: rrHistory
          },
          oxygenSaturation: {
            current: mockReadings[0].oxygenSaturation,
            trend: mockReadings[0].oxygenSaturation < mockReadings[1].oxygenSaturation ? "down" : 
                   mockReadings[0].oxygenSaturation > mockReadings[1].oxygenSaturation ? "up" : "stable",
            history: o2History
          },
          weight: {
            current: mockReadings[0].weight,
            trend: mockReadings[0].weight < mockReadings[1].weight ? "down" : 
                   mockReadings[0].weight > mockReadings[1].weight ? "up" : "stable",
            history: weightHistory
          },
          readings: mockReadings,
          chartData
        };
        
        setVitals(mockVitals);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching vitals data:", err);
        setError("Failed to load vitals data");
        setIsLoading(false);
        
        toast({
          title: "Error Loading Data",
          description: "There was a problem loading your vitals data.",
          variant: "destructive"
        });
      }
    };

    fetchVitals();
  }, [patientId, timeRange, toast]);

  // Function to add a new vital reading
  const addVitalReading = (reading: Omit<VitalReading, 'id'>) => {
    if (!vitals) return;
    
    const newReading: VitalReading = {
      ...reading,
      id: `v${Date.now()}` // Generate a unique ID
    };
    
    // Update the vitals state with the new reading
    const [systolic, diastolic] = newReading.bloodPressure.split('/').map(Number);
    const newChartDataPoint: VitalsChartData = {
      date: newReading.date,
      systolic,
      diastolic,
      heartRate: newReading.heartRate,
      temperature: newReading.temperature,
      oxygenSaturation: newReading.oxygenSaturation,
      weight: newReading.weight
    };
    
    setVitals(prev => {
      if (!prev) return null;
      
      // Prepare updated history arrays
      const bpHistory = [{ date: newReading.date, value: newReading.bloodPressure }, ...(prev.bloodPressure.history || [])];
      const hrHistory = [{ date: newReading.date, value: newReading.heartRate }, ...(prev.heartRate.history || [])];
      const tempHistory = [{ date: newReading.date, value: newReading.temperature }, ...(prev.temperature.history || [])];
      const rrHistory = [{ date: newReading.date, value: newReading.respiratoryRate }, ...(prev.respiratoryRate.history || [])];
      const o2History = [{ date: newReading.date, value: newReading.oxygenSaturation }, ...(prev.oxygenSaturation.history || [])];
      const weightHistory = [{ date: newReading.date, value: newReading.weight }, ...(prev.weight.history || [])];
      
      // Get systolic value for determining trend
      const currentSystolic = Number(newReading.bloodPressure.split('/')[0]);
      const previousSystolic = Number(prev.bloodPressure.current.split('/')[0]);
      
      // Determine trends based on the two most recent readings
      const bpTrend = currentSystolic < previousSystolic ? "down" : 
                      currentSystolic > previousSystolic ? "up" : "stable";
      const hrTrend = newReading.heartRate < prev.heartRate.current ? "down" : 
                      newReading.heartRate > prev.heartRate.current ? "up" : "stable";
      const tempTrend = newReading.temperature < prev.temperature.current ? "down" : 
                        newReading.temperature > prev.temperature.current ? "up" : "stable";
      const rrTrend = newReading.respiratoryRate < prev.respiratoryRate.current ? "down" : 
                      newReading.respiratoryRate > prev.respiratoryRate.current ? "up" : "stable";
      const o2Trend = newReading.oxygenSaturation < prev.oxygenSaturation.current ? "down" : 
                      newReading.oxygenSaturation > prev.oxygenSaturation.current ? "up" : "stable";
      const weightTrend = newReading.weight < prev.weight.current ? "down" : 
                          newReading.weight > prev.weight.current ? "up" : "stable";
      
      return {
        bloodPressure: {
          current: newReading.bloodPressure,
          trend: bpTrend,
          history: bpHistory
        },
        heartRate: {
          current: newReading.heartRate,
          trend: hrTrend,
          history: hrHistory
        },
        temperature: {
          current: newReading.temperature,
          trend: tempTrend,
          history: tempHistory
        },
        respiratoryRate: {
          current: newReading.respiratoryRate,
          trend: rrTrend,
          history: rrHistory
        },
        oxygenSaturation: {
          current: newReading.oxygenSaturation,
          trend: o2Trend,
          history: o2History
        },
        weight: {
          current: newReading.weight,
          trend: weightTrend,
          history: weightHistory
        },
        readings: [newReading, ...prev.readings],
        chartData: [newChartDataPoint, ...prev.chartData]
      };
    });
    
    toast({
      title: "Vital Reading Added",
      description: "Your new vital signs have been recorded successfully.",
      variant: "success"
    });
  };

  return { 
    vitals, 
    isLoading, 
    error,
    addVitalReading
  };
};
