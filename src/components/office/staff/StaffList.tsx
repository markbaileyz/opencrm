
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StaffMember } from "@/types/office";
import { Edit, Calendar, Phone, Mail } from "lucide-react";

interface StaffListProps {
  staff: StaffMember[];
}

const StaffList: React.FC<StaffListProps> = ({ staff }) => {
  const getRoleBadge = (role: StaffMember["role"]) => {
    const roleStyles = {
      doctor: "bg-blue-500",
      nurse: "bg-green-500",
      receptionist: "bg-purple-500",
      admin: "bg-amber-500",
      technician: "bg-cyan-500",
      other: "bg-slate-500"
    };
    
    return (
      <Badge className={roleStyles[role] || "bg-slate-500"}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };
  
  const getStatusBadge = (status: StaffMember["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-400">Active</Badge>;
      case "on-leave":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-400">On Leave</Badge>;
      case "part-time":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-400">Part Time</Badge>;
      case "inactive":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-400">Inactive</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {staff.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="font-medium">{member.name}</TableCell>
            <TableCell>{getRoleBadge(member.role)}</TableCell>
            <TableCell>
              {member.department
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
              {member.specialty && <div className="text-xs text-muted-foreground mt-1">{member.specialty}</div>}
            </TableCell>
            <TableCell>{getStatusBadge(member.status)}</TableCell>
            <TableCell>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center text-xs">
                  <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span>{member.contact.email}</span>
                </div>
                <div className="flex items-center text-xs">
                  <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span>{member.contact.phone}</span>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="outline">
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  Schedule
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
        
        {staff.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
              No staff members found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default StaffList;
