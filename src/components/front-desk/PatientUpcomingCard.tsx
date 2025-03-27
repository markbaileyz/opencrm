
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Check } from "lucide-react";

interface PatientUpcomingCardProps {
  name: string;
  time: string;
  provider: string;
  appointmentType: string;
}

const PatientUpcomingCard = ({ 
  name, 
  time, 
  provider, 
  appointmentType 
}: PatientUpcomingCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-base">{name}</CardTitle>
          <CardDescription className="text-xs">{appointmentType}</CardDescription>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded">
          Upcoming
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{provider}</span>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          Arriving soon
        </div>
        <div className="flex gap-1">
          <Button variant="secondary" size="sm">
            <Check className="h-3.5 w-3.5 mr-1" />
            Pre-Check In
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default PatientUpcomingCard;
