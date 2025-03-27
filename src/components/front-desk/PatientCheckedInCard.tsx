
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";

interface PatientCheckedInCardProps {
  name: string;
  time: string;
  checkInTime: string;
  provider: string;
  room: string;
}

const PatientCheckedInCard = ({ 
  name, 
  time, 
  checkInTime, 
  provider, 
  room 
}: PatientCheckedInCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-base">{name}</CardTitle>
          <CardDescription className="text-xs">Appt: {time}</CardDescription>
        </div>
        <div className="bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded">
          Checked In
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <span>In at: {checkInTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{provider}</span>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <div className="text-xs font-medium">
          Room: {room}
        </div>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default PatientCheckedInCard;
