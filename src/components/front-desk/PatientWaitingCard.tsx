
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, UserCheck, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PatientWaitingCardProps {
  name: string;
  time: string;
  waitTime: string;
  provider: string;
  appointmentType: string;
}

const PatientWaitingCard: React.FC<PatientWaitingCardProps> = ({
  name,
  time,
  waitTime,
  provider,
  appointmentType
}) => {
  const { toast } = useToast();
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleCheckIn = () => {
    // In a real app, this would call an API to check in the patient
    setIsCheckedIn(true);
    
    toast({
      title: "Patient checked in",
      description: `${name} has been checked in`,
    });
  };
  
  const handleViewDetails = () => {
    // In a real app, this would navigate to patient details
    console.log(`View details for ${name}`);
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{name}</h3>
            <div className="text-sm text-muted-foreground flex items-center mt-1">
              <Clock className="h-3.5 w-3.5 mr-1" /> 
              {time} ({waitTime} wait)
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium">{appointmentType}</span>
            <span className="text-xs text-muted-foreground">{provider}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <Button
            size="sm"
            className="text-xs h-8"
            onClick={handleCheckIn}
            disabled={isCheckedIn}
          >
            <UserCheck className="h-3.5 w-3.5 mr-1.5" />
            {isCheckedIn ? "Checked In" : "Check In"}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-8"
            onClick={handleViewDetails}
          >
            Details <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PatientWaitingCard;
