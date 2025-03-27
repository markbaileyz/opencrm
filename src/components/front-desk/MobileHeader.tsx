
import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Calendar } from "lucide-react";

const MobileHeader = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold">Front Desk</h2>
    <p className="text-sm text-muted-foreground">
      Manage patient check-ins, appointments, and scheduling
    </p>
    <div className="flex gap-2">
      <Button className="w-full">
        <UserPlus className="h-4 w-4 mr-2" />
        Check-In
      </Button>
      <Button variant="outline" className="w-full">
        <Calendar className="h-4 w-4 mr-2" />
        Schedule
      </Button>
    </div>
  </div>
);

export default MobileHeader;
