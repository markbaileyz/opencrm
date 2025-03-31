
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const QuickActionsPanel: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <Button className="w-full justify-start" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            View All Appointments
          </Button>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Filter by Provider</h4>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select a provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Providers</SelectItem>
              <SelectItem value="dr-lee">Dr. Michael Lee</SelectItem>
              <SelectItem value="dr-chen">Dr. Emily Chen</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Filter by Type</h4>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select appointment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="new-patient">New Patient</SelectItem>
              <SelectItem value="follow-up">Follow-up</SelectItem>
              <SelectItem value="consultation">Consultation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsPanel;
