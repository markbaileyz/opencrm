
import React, { useState, useContext } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SavedReportsContext } from "./SavedReportsContext";
import { SavedReport } from "./types";

interface ScheduleFormProps {
  report: SavedReport;
  reportId: string;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ report, reportId }) => {
  const { handleScheduleReport } = useContext(SavedReportsContext);
  const [scheduleEmail, setScheduleEmail] = useState(report.schedule?.email || "");
  const [scheduleFrequency, setScheduleFrequency] = useState(report.schedule?.frequency || "weekly");

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-sm">Schedule Report</h4>
      <div className="space-y-2">
        <div>
          <label className="text-xs text-muted-foreground">Frequency</label>
          <Select 
            value={scheduleFrequency} 
            onValueChange={setScheduleFrequency}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Email</label>
          <Input 
            placeholder="Email recipients" 
            value={scheduleEmail} 
            onChange={(e) => setScheduleEmail(e.target.value)} 
          />
        </div>
        <Button 
          size="sm" 
          className="w-full"
          onClick={() => handleScheduleReport(reportId, scheduleEmail, scheduleFrequency)}
        >
          Save Schedule
        </Button>
      </div>
    </div>
  );
};

export default ScheduleForm;
