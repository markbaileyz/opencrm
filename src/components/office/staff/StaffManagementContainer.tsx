
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StaffHeader from "./StaffHeader";
import StaffList from "./StaffList";
import StaffSchedule from "./StaffSchedule";
import { useStaffManagement } from "./useStaffManagement";

const StaffManagementContainer: React.FC = () => {
  const {
    staff,
    filteredStaff,
    searchQuery,
    setSearchQuery,
    isAddStaffOpen,
    setIsAddStaffOpen,
    handleAddStaff,
    newStaff,
    setNewStaff
  } = useStaffManagement();
  
  return (
    <div className="space-y-6">
      <StaffHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isAddStaffOpen={isAddStaffOpen}
        setIsAddStaffOpen={setIsAddStaffOpen}
        handleAddStaff={handleAddStaff}
        newStaff={newStaff}
        setNewStaff={setNewStaff}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <StaffList staff={filteredStaff} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Staff Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <StaffSchedule staff={staff} />
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffManagementContainer;
