
import React from "react";
import { VitalRecord } from "@/hooks/health-tracker/useHealthData";
import VitalCard from "../VitalCard";
import { ArrowUpRight, Heart, Thermometer, Droplets } from "lucide-react";

interface VitalCardsListProps {
  vitalRecords: VitalRecord[];
}

const VitalCardsList: React.FC<VitalCardsListProps> = ({ vitalRecords }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <VitalCard 
        title="Blood Pressure"
        value={`${vitalRecords[0]?.systolic || 120}/${vitalRecords[0]?.diastolic || 80}`}
        unit="mmHg"
        icon={<ArrowUpRight className="h-4 w-4 text-red-500" />}
        trend={
          vitalRecords[0]?.systolic < (vitalRecords[1]?.systolic || 0) ? "down" : 
          vitalRecords[0]?.systolic > (vitalRecords[1]?.systolic || 0) ? "up" : "neutral"
        }
        trendDirection={
          vitalRecords[0]?.systolic < (vitalRecords[1]?.systolic || 0) ? "down" : 
          vitalRecords[0]?.systolic > (vitalRecords[1]?.systolic || 0) ? "up" : "neutral"
        }
        lastUpdated="Last recorded today"
      />
      
      <VitalCard 
        title="Heart Rate"
        value={(vitalRecords[0]?.heartRate || 72).toString()}
        unit="bpm"
        icon={<Heart className="h-4 w-4 text-red-500" />}
        trend={
          vitalRecords[0]?.heartRate < (vitalRecords[1]?.heartRate || 0) ? "down" : 
          vitalRecords[0]?.heartRate > (vitalRecords[1]?.heartRate || 0) ? "up" : "neutral"
        }
        trendDirection={
          vitalRecords[0]?.heartRate < (vitalRecords[1]?.heartRate || 0) ? "down" : 
          vitalRecords[0]?.heartRate > (vitalRecords[1]?.heartRate || 0) ? "up" : "neutral"
        }
        lastUpdated="Last recorded today"
      />
      
      <VitalCard 
        title="Temperature"
        value={(vitalRecords[0]?.temperature || 98.6).toString()}
        unit="°F"
        icon={<Thermometer className="h-4 w-4 text-red-500" />}
        trend={
          (vitalRecords[0]?.temperature || 0) < (vitalRecords[1]?.temperature || 0) ? "down" : 
          (vitalRecords[0]?.temperature || 0) > (vitalRecords[1]?.temperature || 0) ? "up" : "neutral"
        }
        trendDirection={
          (vitalRecords[0]?.temperature || 0) < (vitalRecords[1]?.temperature || 0) ? "down" : 
          (vitalRecords[0]?.temperature || 0) > (vitalRecords[1]?.temperature || 0) ? "up" : "neutral"
        }
        lastUpdated="Last recorded today"
      />
      
      <VitalCard 
        title="Oxygen Saturation"
        value={(vitalRecords[0]?.oxygenSaturation || 98).toString()}
        unit="%"
        icon={<Droplets className="h-4 w-4 text-blue-500" />}
        trend={
          (vitalRecords[0]?.oxygenSaturation || 0) < (vitalRecords[1]?.oxygenSaturation || 0) ? "down" : 
          (vitalRecords[0]?.oxygenSaturation || 0) > (vitalRecords[1]?.oxygenSaturation || 0) ? "up" : "neutral"
        }
        trendDirection={
          (vitalRecords[0]?.oxygenSaturation || 0) < (vitalRecords[1]?.oxygenSaturation || 0) ? "down" : 
          (vitalRecords[0]?.oxygenSaturation || 0) > (vitalRecords[1]?.oxygenSaturation || 0) ? "up" : "neutral"
        }
        lastUpdated="Last recorded today"
      />
    </div>
  );
};

export default VitalCardsList;
