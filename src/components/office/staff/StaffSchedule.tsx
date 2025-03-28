
import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StaffMember } from "@/types/office";
import { Calendar, Clock } from "lucide-react";

interface StaffScheduleProps {
  staff: StaffMember[];
}

const StaffSchedule: React.FC<StaffScheduleProps> = ({ staff }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  
  const filteredStaff = staff.filter(member => {
    if (selectedDepartment === "all") return true;
    return member.department === selectedDepartment;
  });
  
  const formatDayHeader = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };
  
  const getStatusColor = (status: StaffMember["status"]) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "on-leave": return "bg-amber-500";
      case "part-time": return "bg-blue-500";
      case "inactive": return "bg-red-500";
      default: return "bg-slate-500";
    }
  };
  
  const formatDaySchedule = (schedule: string) => {
    if (schedule === "Off") {
      return <span className="text-muted-foreground">Off</span>;
    }
    return schedule;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">Weekly Schedule</h3>
        </div>
        
        <div className="w-40">
          <Select 
            value={selectedDepartment} 
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="primary-care">Primary Care</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="front-desk">Front Desk</SelectItem>
              <SelectItem value="administration">Administration</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="border rounded-md overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[120px]">Staff</TableHead>
              {days.map(day => (
                <TableHead key={day}>{formatDayHeader(day)}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.map(member => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`} />
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                </TableCell>
                {days.map(day => (
                  <TableCell key={day} className="text-sm">
                    {formatDaySchedule(member.availability[day])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            
            {filteredStaff.length === 0 && (
              <TableRow>
                <TableCell colSpan={days.length + 1} className="text-center py-4 text-muted-foreground">
                  No staff members found for the selected department
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" size="sm">
          <Clock className="h-4 w-4 mr-2" />
          Edit Schedules
        </Button>
      </div>
    </div>
  );
};

export default StaffSchedule;
