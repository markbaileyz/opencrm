
import React from "react";
import { ArrowLeft, Filter, Plus, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface HealthTrackerHeaderProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
}

const HealthTrackerHeader: React.FC<HealthTrackerHeaderProps> = ({ timeRange, setTimeRange }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={handleBack} size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Health Tracker</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Measurement
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-md">
          <Input 
            placeholder="Search health metrics..." 
            className="max-w-md"
            icon={<LineChart className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 Hours</SelectItem>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
            <SelectItem value="quarter">Last 90 Days</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default HealthTrackerHeader;
