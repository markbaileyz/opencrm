
import React from "react";

interface CheckInProgressProps {
  step: number;
}

const CheckInProgress: React.FC<CheckInProgressProps> = ({ step }) => {
  return (
    <>
      <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all" 
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>Patient Info</span>
        <span>Details</span>
        <span>Documents</span>
        <span>Review</span>
      </div>
    </>
  );
};

export default CheckInProgress;
