
import React from "react";
import ScheduleView from "./ScheduleView";
import AddEventDialog from "./AddEventDialog";
import { useStaffSchedule } from "./useStaffSchedule";

const SchedulingContainer: React.FC = () => {
  const {
    staffMembers,
    addEvent,
    isAddEventOpen,
    setIsAddEventOpen
  } = useStaffSchedule();
  
  return (
    <>
      <ScheduleView />
      <AddEventDialog 
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        staffMembers={staffMembers}
        onAddEvent={addEvent}
      />
    </>
  );
};

export default SchedulingContainer;
