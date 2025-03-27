
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, Calendar, ChevronRight, PhoneCall } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PatientUpcomingCardProps {
  name: string;
  time: string;
  provider: string;
  appointmentType: string;
}

const PatientUpcomingCard: React.FC<PatientUpcomingCardProps> = ({
  name,
  time,
  provider,
  appointmentType
}) => {
  const { toast } = useToast();
  
  const handleReschedule = () => {
    // In a real app, this would open a reschedule dialog
    console.log(`Reschedule appointment for ${name}`);
    
    toast({
      title: "Reschedule initiated",
      description: `Reschedule appointment for ${name}`,
    });
  };
  
  const handleCall = () => {
    // In a real app, this would initiate a call or show contact info
    console.log(`Call ${name}`);
    
    toast({
      title: "Call initiated",
      description: `Calling ${name}...`,
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{name}</h3>
            <div className="text-sm text-muted-foreground flex items-center mt-1">
              <Clock className="h-3.5 w-3.5 mr-1" /> 
              {time}
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium">{appointmentType}</span>
            <span className="text-xs text-muted-foreground">{provider}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-8"
              onClick={handleReschedule}
            >
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              Reschedule
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-8"
              onClick={handleCall}
            >
              <PhoneCall className="h-3.5 w-3.5" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-8"
          >
            Details <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PatientUpcomingCard;
