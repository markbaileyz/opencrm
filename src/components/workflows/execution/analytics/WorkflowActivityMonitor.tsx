
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle } from "lucide-react";

interface ActivityLog {
  id: string;
  message: string;
  timestamp: string;
  type: "success" | "error" | "info";
  workflow: string;
}

const WorkflowActivityMonitor: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([
    {
      id: "log-1",
      message: "Appointment reminder sent to johndoe@example.com",
      timestamp: new Date(Date.now() - 120000).toISOString(),
      type: "success",
      workflow: "Appointment Reminder"
    },
    {
      id: "log-2",
      message: "Patient intake form completed for Sarah Johnson",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      type: "success",
      workflow: "Patient Intake Form"
    },
    {
      id: "log-3",
      message: "Failed to send survey to invalid email: test@example",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      type: "error",
      workflow: "Follow-up Survey"
    }
  ]);

  // Add a new log entry randomly every 20-40 seconds
  useEffect(() => {
    const successMessages = [
      "Appointment reminder sent to {email}",
      "Patient intake form completed for {name}",
      "Follow-up survey sent to {email}",
      "Medication reminder sent to {email}",
      "Referral form processed for {name}"
    ];
    
    const errorMessages = [
      "Failed to send email to {email}: Delivery failure",
      "Patient form submission error for {name}: Missing data",
      "Workflow execution timeout for {workflow}",
      "API connection error in {workflow}",
      "Invalid input data for {workflow}"
    ];
    
    const getRandomEmail = () => {
      const names = ["john", "mary", "bob", "alice", "sarah", "james"];
      const domains = ["example.com", "test.org", "healthcare.net", "medic.co"];
      return `${names[Math.floor(Math.random() * names.length)]}@${
        domains[Math.floor(Math.random() * domains.length)]
      }`;
    };
    
    const getRandomName = () => {
      const firstNames = ["John", "Mary", "Robert", "Patricia", "Michael", "Linda"];
      const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis"];
      return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
        lastNames[Math.floor(Math.random() * lastNames.length)]
      }`;
    };
    
    const workflows = ["Appointment Reminder", "Patient Intake Form", "Follow-up Survey"];
    
    const interval = setInterval(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate
      const workflow = workflows[Math.floor(Math.random() * workflows.length)];
      
      let message;
      if (isSuccess) {
        message = successMessages[Math.floor(Math.random() * successMessages.length)]
          .replace("{email}", getRandomEmail())
          .replace("{name}", getRandomName())
          .replace("{workflow}", workflow);
      } else {
        message = errorMessages[Math.floor(Math.random() * errorMessages.length)]
          .replace("{email}", getRandomEmail())
          .replace("{name}", getRandomName())
          .replace("{workflow}", workflow);
      }
      
      const newLog: ActivityLog = {
        id: `log-${Date.now()}`,
        message,
        timestamp: new Date().toISOString(),
        type: isSuccess ? "success" : "error",
        workflow
      };
      
      setLogs(prev => [newLog, ...prev.slice(0, 19)]); // Keep last 20 logs
    }, Math.random() * 20000 + 20000); // Random interval between 20-40 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Format the timestamp to a more readable format
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Activity Monitor</CardTitle>
        <CardDescription>Real-time workflow execution logs</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[220px] w-full pr-4">
          {logs.map((log) => (
            <div key={log.id} className="mb-3 last:mb-0">
              <div className="flex items-start gap-2">
                {log.type === "success" ? (
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 mt-0.5 text-red-500 flex-shrink-0" />
                )}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {log.workflow}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(log.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{log.message}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WorkflowActivityMonitor;
