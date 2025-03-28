
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, File, User, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface WorkflowPreview {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  steps: number;
  color: string;
}

const healthcareWorkflows: WorkflowPreview[] = [
  {
    id: "preview-1",
    name: "New Patient Onboarding",
    description: "Streamlined patient registration and intake process",
    icon: <User className="h-5 w-5" />,
    category: "Patient Care",
    steps: 5,
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: "preview-2",
    name: "Appointment Reminders",
    description: "Automatic appointment notifications and confirmations",
    icon: <Calendar className="h-5 w-5" />,
    category: "Administrative",
    steps: 4,
    color: "bg-indigo-100 text-indigo-700"
  },
  {
    id: "preview-3",
    name: "Lab Results Delivery",
    description: "Secure and timely delivery of lab results to patients",
    icon: <File className="h-5 w-5" />,
    category: "Clinical",
    steps: 3,
    color: "bg-amber-100 text-amber-700"
  }
];

const HealthcareWorkflowsPreview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Check className="h-5 w-5 mr-2 text-primary" />
          Healthcare Workflows
        </CardTitle>
        <CardDescription>
          Specialized workflows for healthcare processes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {healthcareWorkflows.map((workflow) => (
            <div 
              key={workflow.id} 
              className="flex items-start p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className={`p-2 rounded-full ${workflow.color} mr-3`}>
                {workflow.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium truncate">{workflow.name}</h3>
                  <Badge variant="outline" className="ml-2">
                    {workflow.steps} steps
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {workflow.description}
                </p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {workflow.category}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to="/workflows">View All Healthcare Workflows</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HealthcareWorkflowsPreview;
