
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PrescriptionFiltersProps {
  patientFilter: string;
  setPatientFilter: (value: string) => void;
  timeRange: string;
  setTimeRange: (value: string) => void;
  medicationType: string;
  setMedicationType: (value: string) => void;
}

const PrescriptionFilters: React.FC<PrescriptionFiltersProps> = ({
  patientFilter,
  setPatientFilter,
  timeRange,
  setTimeRange,
  medicationType,
  setMedicationType
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      <div className="relative max-w-md w-full">
        <Input 
          placeholder="Search prescriptions..." 
          className="max-w-md"
          icon={<Search className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <Select value={patientFilter} onValueChange={setPatientFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Patient Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Patients</SelectItem>
            <SelectItem value="inpatient">Inpatients</SelectItem>
            <SelectItem value="outpatient">Outpatients</SelectItem>
            <SelectItem value="recent">Recent Visits</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current</SelectItem>
            <SelectItem value="past-month">Past Month</SelectItem>
            <SelectItem value="past-3-months">Past 3 Months</SelectItem>
            <SelectItem value="past-year">Past Year</SelectItem>
            <SelectItem value="all-time">All Time</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={medicationType} onValueChange={setMedicationType}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Medication Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="antibiotic">Antibiotics</SelectItem>
            <SelectItem value="analgesic">Analgesics</SelectItem>
            <SelectItem value="antihypertensive">Antihypertensives</SelectItem>
            <SelectItem value="antidepressant">Antidepressants</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PrescriptionFilters;
