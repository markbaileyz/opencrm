
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, UserPlus } from "lucide-react";
import { type StaffMember } from "@/types/office";

interface StaffHeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  isAddStaffOpen: boolean;
  setIsAddStaffOpen: (value: boolean) => void;
  handleAddStaff: () => void;
  newStaff: Partial<StaffMember>;
  setNewStaff: (value: Partial<StaffMember>) => void;
}

const StaffHeader: React.FC<StaffHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  isAddStaffOpen,
  setIsAddStaffOpen,
  handleAddStaff,
  newStaff,
  setNewStaff
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-xl font-semibold">Staff Management</h2>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div className="relative w-full sm:w-60">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search staff..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="staff-name">Full Name</Label>
                <Input 
                  id="staff-name" 
                  value={newStaff.name || ""}
                  onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                  placeholder="Enter staff name" 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="staff-role">Role</Label>
                <Select 
                  value={newStaff.role || "receptionist"}
                  onValueChange={(value) => setNewStaff({...newStaff, role: value as StaffMember["role"]})}
                >
                  <SelectTrigger id="staff-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="receptionist">Receptionist</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="technician">Technician</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="staff-department">Department</Label>
                <Select 
                  value={newStaff.department || "front-desk"}
                  onValueChange={(value) => setNewStaff({...newStaff, department: value as StaffMember["department"]})}
                >
                  <SelectTrigger id="staff-department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
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
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="staff-email">Email</Label>
                  <Input 
                    id="staff-email" 
                    type="email"
                    value={newStaff.contact?.email || ""}
                    onChange={(e) => setNewStaff({
                      ...newStaff, 
                      contact: {
                        email: e.target.value,
                        phone: newStaff.contact?.phone || "" // Ensure phone is set even if it wasn't before
                      }
                    })}
                    placeholder="email@example.com"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="staff-phone">Phone</Label>
                  <Input 
                    id="staff-phone" 
                    value={newStaff.contact?.phone || ""}
                    onChange={(e) => setNewStaff({
                      ...newStaff, 
                      contact: {
                        email: newStaff.contact?.email || "", // Ensure email is set even if it wasn't before
                        phone: e.target.value
                      }
                    })}
                    placeholder="123-456-7890" 
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="staff-status">Status</Label>
                <Select 
                  value={newStaff.status || "active"}
                  onValueChange={(value) => setNewStaff({...newStaff, status: value as StaffMember["status"]})}
                >
                  <SelectTrigger id="staff-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {newStaff.role === "doctor" && (
                <div className="grid gap-2">
                  <Label htmlFor="staff-specialty">Specialty</Label>
                  <Input 
                    id="staff-specialty" 
                    value={newStaff.specialty || ""}
                    onChange={(e) => setNewStaff({...newStaff, specialty: e.target.value})}
                    placeholder="Enter specialty" 
                  />
                </div>
              )}
            </div>
            
            <Button onClick={handleAddStaff}>Add Staff Member</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default StaffHeader;
