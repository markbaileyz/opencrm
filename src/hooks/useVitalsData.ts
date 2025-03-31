
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

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

export interface VitalStats {
  current: any;
  trend?: "up" | "down" | "stable";
  change?: number;
}

export interface VitalsChartData {
  date: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
  weight: number;
  respiratoryRate: number;
}

export interface VitalsData {
  bloodPressure: VitalStats;
  heartRate: VitalStats;
  temperature: VitalStats;
  oxygenSaturation: VitalStats;
  weight: VitalStats;
  readings: VitalReading[];
  chartData: VitalsChartData[];
}

// Generate sample vital readings for demo purposes
const generateSampleReadings = (patientId: string): VitalReading[] => {
  const readings: VitalReading[] = [];
  const now = new Date();
  
  // Generate readings for the past 30 days
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Create slight variation in values
    const systolic = Math.floor(120 + (Math.random() * 20 - 10));
    const diastolic = Math.floor(80 + (Math.random() * 15 - 7));
    const heartRate = Math.floor(72 + (Math.random() * 15 - 7));
    const temperature = 98.6 + (Math.random() * 1.5 - 0.7);
    const respiratoryRate = Math.floor(16 + (Math.random() * 4 - 2));
    const oxygenSaturation = Math.floor(98 + (Math.random() * 3 - 1));
    const weight = 70 + (Math.random() * 2 - 1);
    
    readings.push({
      id: uuidv4(),
      date: date.toISOString().split('T')[0],
      bloodPressure: `${systolic}/${diastolic}`,
      heartRate,
      temperature,
      respiratoryRate,
      oxygenSaturation,
      weight,
      recordedBy: i % 5 === 0 ? "Dr. Smith" : (i % 3 === 0 ? "Nurse Johnson" : undefined)
    });
  }
  
  // Add one outlier for demonstration purposes
  const outlierIndex = Math.floor(Math.random() * readings.length);
  readings[outlierIndex].heartRate = 115; // High heart rate
  readings[outlierIndex].notes = "Patient reported feeling anxious";
  
  return readings;
};

// Process readings to generate chart data
const processReadingsToChartData = (readings: VitalReading[]): VitalsChartData[] => {
  return readings.map(reading => {
    const [systolic, diastolic] = reading.bloodPressure.split('/').map(Number);
    return {
      date: reading.date,
      systolic,
      diastolic,
      heartRate: reading.heartRate,
      temperature: reading.temperature,
      oxygenSaturation: reading.oxygenSaturation,
      weight: reading.weight,
      respiratoryRate: reading.respiratoryRate
    };
  });
};

// Calculate trend based on the last two readings
const calculateTrend = (current: number, previous: number): "up" | "down" | "stable" => {
  const difference = current - previous;
  const percentChange = (difference / previous) * 100;
  
  if (percentChange > 3) {
    return "up";
  } else if (percentChange < -3) {
    return "down";
  } else {
    return "stable";
  }
};

export const useVitalsData = (patientId: string) => {
  const [vitals, setVitals] = useState<VitalsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchVitalsData = async () => {
      try {
        // In a real app, this would be an API call
        // For demo, we'll generate sample data
        setIsLoading(true);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const readings = generateSampleReadings(patientId);
        const chartData = processReadingsToChartData(readings);
        
        // Sort readings by date descending for display
        const sortedReadings = [...readings].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        // Extract the latest and second-latest readings for trend calculation
        const latest = sortedReadings[0];
        const secondLatest = sortedReadings[1] || null;
        
        // Calculate current values and trends
        const [latestSystolic, latestDiastolic] = latest.bloodPressure.split('/').map(Number);
        
        let bloodPressureTrend: "up" | "down" | "stable" = "stable";
        let heartRateTrend: "up" | "down" | "stable" = "stable";
        let temperatureTrend: "up" | "down" | "stable" = "stable";
        let oxygenSaturationTrend: "up" | "down" | "stable" = "stable";
        let weightTrend: "up" | "down" | "stable" = "stable";
        
        // Calculate trends if we have a previous reading
        if (secondLatest) {
          const [prevSystolic] = secondLatest.bloodPressure.split('/').map(Number);
          bloodPressureTrend = calculateTrend(latestSystolic, prevSystolic);
          heartRateTrend = calculateTrend(latest.heartRate, secondLatest.heartRate);
          temperatureTrend = calculateTrend(latest.temperature, secondLatest.temperature);
          oxygenSaturationTrend = calculateTrend(latest.oxygenSaturation, secondLatest.oxygenSaturation);
          weightTrend = calculateTrend(latest.weight, secondLatest.weight);
        }
        
        // Set the processed vitals data
        setVitals({
          bloodPressure: {
            current: latest.bloodPressure,
            trend: bloodPressureTrend
          },
          heartRate: {
            current: latest.heartRate,
            trend: heartRateTrend
          },
          temperature: {
            current: latest.temperature,
            trend: temperatureTrend
          },
          oxygenSaturation: {
            current: latest.oxygenSaturation,
            trend: oxygenSaturationTrend
          },
          weight: {
            current: latest.weight,
            trend: weightTrend
          },
          readings: sortedReadings,
          chartData
        });
        
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setIsLoading(false);
      }
    };
    
    fetchVitalsData();
  }, [patientId]);
  
  // Function to add a new vital reading
  const addVitalReading = (newReading: Omit<VitalReading, 'id'>) => {
    if (!vitals) return;
    
    // Create a new reading with an ID
    const readingWithId: VitalReading = {
      ...newReading,
      id: uuidv4()
    };
    
    // Add the new reading to the list
    const updatedReadings = [readingWithId, ...vitals.readings];
    
    // Process the updated readings for chart data
    const updatedChartData = processReadingsToChartData(updatedReadings);
    
    // Calculate new trends
    const [newSystolic, newDiastolic] = readingWithId.bloodPressure.split('/').map(Number);
    const [prevSystolic, prevDiastolic] = vitals.bloodPressure.current.split('/').map(Number);
    
    const bloodPressureTrend = calculateTrend(newSystolic, prevSystolic);
    const heartRateTrend = calculateTrend(readingWithId.heartRate, vitals.heartRate.current);
    const temperatureTrend = calculateTrend(readingWithId.temperature, vitals.temperature.current);
    const oxygenSaturationTrend = calculateTrend(readingWithId.oxygenSaturation, vitals.oxygenSaturation.current);
    const weightTrend = calculateTrend(readingWithId.weight, vitals.weight.current);
    
    // Update the vitals data
    setVitals({
      bloodPressure: {
        current: readingWithId.bloodPressure,
        trend: bloodPressureTrend
      },
      heartRate: {
        current: readingWithId.heartRate,
        trend: heartRateTrend
      },
      temperature: {
        current: readingWithId.temperature,
        trend: temperatureTrend
      },
      oxygenSaturation: {
        current: readingWithId.oxygenSaturation,
        trend: oxygenSaturationTrend
      },
      weight: {
        current: readingWithId.weight,
        trend: weightTrend
      },
      readings: updatedReadings,
      chartData: updatedChartData
    });
  };
  
  // Function to add comparative data for analysis
  const getComparativeAnalysis = (timeRange: "week" | "month" | "year" = "month") => {
    if (!vitals || vitals.readings.length === 0) return null;
    
    const now = new Date();
    let cutoffDate = new Date();
    
    if (timeRange === "week") {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (timeRange === "month") {
      cutoffDate.setMonth(now.getMonth() - 1);
    } else {
      cutoffDate.setFullYear(now.getFullYear() - 1);
    }
    
    // Get readings within the specified time range
    const filteredReadings = vitals.readings.filter(
      reading => new Date(reading.date) >= cutoffDate
    );
    
    if (filteredReadings.length === 0) return null;
    
    // Calculate averages, mins, maxes
    const analysis = {
      bloodPressure: {
        average: { systolic: 0, diastolic: 0 },
        min: { systolic: Infinity, diastolic: Infinity },
        max: { systolic: -Infinity, diastolic: -Infinity }
      },
      heartRate: {
        average: 0,
        min: Infinity,
        max: -Infinity
      },
      temperature: {
        average: 0,
        min: Infinity,
        max: -Infinity
      },
      oxygenSaturation: {
        average: 0,
        min: Infinity,
        max: -Infinity
      },
      weight: {
        average: 0,
        min: Infinity,
        max: -Infinity
      }
    };
    
    // Sum values
    let totalSystolic = 0;
    let totalDiastolic = 0;
    let totalHeartRate = 0;
    let totalTemperature = 0;
    let totalOxygenSaturation = 0;
    let totalWeight = 0;
    
    filteredReadings.forEach(reading => {
      const [systolic, diastolic] = reading.bloodPressure.split('/').map(Number);
      
      // Update min/max for blood pressure
      analysis.bloodPressure.min.systolic = Math.min(analysis.bloodPressure.min.systolic, systolic);
      analysis.bloodPressure.min.diastolic = Math.min(analysis.bloodPressure.min.diastolic, diastolic);
      analysis.bloodPressure.max.systolic = Math.max(analysis.bloodPressure.max.systolic, systolic);
      analysis.bloodPressure.max.diastolic = Math.max(analysis.bloodPressure.max.diastolic, diastolic);
      
      // Update min/max for other vitals
      analysis.heartRate.min = Math.min(analysis.heartRate.min, reading.heartRate);
      analysis.heartRate.max = Math.max(analysis.heartRate.max, reading.heartRate);
      
      analysis.temperature.min = Math.min(analysis.temperature.min, reading.temperature);
      analysis.temperature.max = Math.max(analysis.temperature.max, reading.temperature);
      
      analysis.oxygenSaturation.min = Math.min(analysis.oxygenSaturation.min, reading.oxygenSaturation);
      analysis.oxygenSaturation.max = Math.max(analysis.oxygenSaturation.max, reading.oxygenSaturation);
      
      analysis.weight.min = Math.min(analysis.weight.min, reading.weight);
      analysis.weight.max = Math.max(analysis.weight.max, reading.weight);
      
      // Add to totals
      totalSystolic += systolic;
      totalDiastolic += diastolic;
      totalHeartRate += reading.heartRate;
      totalTemperature += reading.temperature;
      totalOxygenSaturation += reading.oxygenSaturation;
      totalWeight += reading.weight;
    });
    
    // Calculate averages
    const count = filteredReadings.length;
    analysis.bloodPressure.average.systolic = parseFloat((totalSystolic / count).toFixed(1));
    analysis.bloodPressure.average.diastolic = parseFloat((totalDiastolic / count).toFixed(1));
    analysis.heartRate.average = parseFloat((totalHeartRate / count).toFixed(1));
    analysis.temperature.average = parseFloat((totalTemperature / count).toFixed(1));
    analysis.oxygenSaturation.average = parseFloat((totalOxygenSaturation / count).toFixed(1));
    analysis.weight.average = parseFloat((totalWeight / count).toFixed(1));
    
    return analysis;
  };
  
  return { vitals, isLoading, error, addVitalReading, getComparativeAnalysis };
};
