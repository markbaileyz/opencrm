
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, DoorOpen, ChevronRight, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PatientCheckedInCardProps {
  name: string;
  time: string;
  checkInTime: string;
  provider: string;
  room: string;
}

const PatientCheckedInCard: React.FC<PatientCheckedInCardProps> = ({
  name,
  time,
  checkInTime,
  provider,
  room
}) => {
  const { toast } = useToast();
  
  const handleNotifyProvider = () => {
    // In a real app, this would send a notification to the provider
    console.log(`Notify provider that ${name} is ready`);
    
    toast({
      title: "Provider notified",
      description: `${provider} has been notified that ${name} is ready`,
    });
  };
  
  const handleChangeRoom = () => {
    // In a real app, this would open a dialog to change room
    console.log(`Change room for ${name}`);
    
    toast({
      title: "Room change",
      description: `Initiating room change for ${name}`,
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
              Checked in at {checkInTime}
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium">Room {room}</span>
            <span className="text-xs text-muted-foreground">{provider}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <Button
              size="sm"
              className="text-xs h-8"
              onClick={handleNotifyProvider}
            >
              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
              Notify
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-8"
              onClick={handleChangeRoom}
            >
              <DoorOpen className="h-3.5 w-3.5 mr-1.5" />
              Room
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

export default PatientCheckedInCard;
