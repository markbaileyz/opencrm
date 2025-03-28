
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, MessageSquare, Home } from "lucide-react";

const OfficeQuickActions: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Frequently used tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button className="w-full justify-start">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Appointment
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          New Patient Form
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" />
          Send Message
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Home className="mr-2 h-4 w-4" />
          Room Status
        </Button>
      </CardContent>
    </Card>
  );
};

export default OfficeQuickActions;
