
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Mail, 
  Phone, 
  MessageSquare, 
  MoreHorizontal,
  FileEdit 
} from "lucide-react";
import { Patient } from "@/types/patient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PatientHeaderProps {
  patient: Patient;
}

const PatientHeader: React.FC<PatientHeaderProps> = ({ patient }) => {
  // Generate initials for avatar
  const getInitials = () => {
    return `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`;
  };

  // Format status with appropriate styling
  const getStatusBadge = () => {
    switch (patient.status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      default:
        return <Badge variant="outline">{patient.status}</Badge>;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Avatar className="h-16 w-16 text-lg">
          {patient.avatarUrl ? (
            <img src={patient.avatarUrl} alt={`${patient.firstName} ${patient.lastName}`} />
          ) : (
            <div>{getInitials()}</div>
          )}
        </Avatar>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold">
              {patient.firstName} {patient.lastName}
            </h2>
            {getStatusBadge()}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1.5" />
              <span>{patient.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1.5" />
              <span>{patient.email}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5" />
              <span>Last visit: {patient.lastVisit || 'Never'}</span>
            </div>
          </div>
        </div>
        
        <div className="flex mt-2 sm:mt-0 gap-2">
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Message</span>
          </Button>
          
          <Button size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Schedule</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2">
                <FileEdit className="h-4 w-4" />
                <span>Edit Patient</span>
              </DropdownMenuItem>
              <DropdownMenuItem>View Patient History</DropdownMenuItem>
              <DropdownMenuItem>Generate Report</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                Archive Patient
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;
