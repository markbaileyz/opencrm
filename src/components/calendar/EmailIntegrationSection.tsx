
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoveRight, BellRing, Mail, FileText, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface EmailIntegrationSectionProps {
  onGoToEmail: () => void;
}

const EmailIntegrationSection = ({ onGoToEmail }: EmailIntegrationSectionProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("reminders");
  const [reminderTemplate, setReminderTemplate] = useState(
    "Hello, this is a friendly reminder that you have an appointment scheduled for tomorrow at {time}. Please let us know if you need to reschedule."
  );
  const [autoSendReminders, setAutoSendReminders] = useState(true);
  
  const handleSendAllReminders = () => {
    toast({
      title: "Reminder emails sent",
      description: "Reminder emails have been sent for tomorrow's appointments",
      variant: "success"
    });
  };

  const handleSaveTemplate = () => {
    toast({
      title: "Template saved",
      description: "Your email template has been saved successfully",
      variant: "success"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email & Calendar Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="reminders" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="reminders">
              <BellRing className="h-4 w-4 mr-2" />
              Reminders
            </TabsTrigger>
            <TabsTrigger value="templates">
              <FileText className="h-4 w-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="reminders" className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Create appointments from emails</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule follow-up meetings directly from your email inbox
                </p>
              </div>
              <Button onClick={onGoToEmail}>
                Go to Email
                <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Send email reminders</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically send email reminders for upcoming appointments
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={handleSendAllReminders}
              >
                Send All Reminders
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <div className="p-4 border rounded-lg space-y-4">
              <div>
                <h3 className="font-medium mb-2">Appointment Reminder Template</h3>
                <Textarea 
                  value={reminderTemplate}
                  onChange={(e) => setReminderTemplate(e.target.value)}
                  rows={5}
                  placeholder="Enter your reminder template..."
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Use {"{name}"}, {"{time}"}, {"{date}"}, and {"{type}"} as placeholders for appointment details.
                </p>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveTemplate}>
                  Save Template
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Automatic Reminders</h3>
                  <p className="text-sm text-muted-foreground">
                    Send reminder emails automatically 24 hours before appointments
                  </p>
                </div>
                <Switch 
                  checked={autoSendReminders} 
                  onCheckedChange={setAutoSendReminders} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="senderName">Sender Name</Label>
                <Input
                  id="senderName"
                  placeholder="Your Name or Company"
                  defaultValue="Calendar App"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="replyTo">Reply-to Email</Label>
                <Input
                  id="replyTo"
                  type="email"
                  placeholder="your-email@example.com"
                  defaultValue=""
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EmailIntegrationSection;
