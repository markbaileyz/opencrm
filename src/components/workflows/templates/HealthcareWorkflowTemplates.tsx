
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, CalendarClock, Stethoscope, ClipboardCheck, Activity, ShieldCheck } from "lucide-react";
import { Workflow } from "@/types/workflow";

interface HealthcareWorkflowTemplatesProps {
  onUseTemplate: (templateId: string) => void;
}

// Define template categories
const categories = [
  { id: "patient-care", name: "Patient Care", icon: <Users className="h-4 w-4" /> },
  { id: "admin", name: "Administrative", icon: <ClipboardCheck className="h-4 w-4" /> },
  { id: "clinical", name: "Clinical", icon: <Stethoscope className="h-4 w-4" /> }
];

// Define healthcare workflow templates
const templates = [
  // Patient Care Templates
  {
    id: "new-patient-onboarding",
    name: "New Patient Onboarding",
    description: "Guide new patients through registration, insurance verification, and initial assessment.",
    category: "patient-care",
    icon: <Users className="h-5 w-5" />,
    steps: 5,
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: "follow-up-appointment",
    name: "Follow-up Appointment",
    description: "Automated follow-up scheduling and reminders based on visit type.",
    category: "patient-care",
    icon: <CalendarClock className="h-5 w-5" />,
    steps: 4,
    color: "bg-indigo-100 text-indigo-700"
  },
  
  // Administrative Templates
  {
    id: "insurance-verification",
    name: "Insurance Verification",
    description: "Verify patient insurance eligibility and benefits before appointments.",
    category: "admin",
    icon: <ShieldCheck className="h-5 w-5" />,
    steps: 3,
    color: "bg-amber-100 text-amber-700"
  },
  {
    id: "appointment-reminders",
    name: "Appointment Reminders",
    description: "Send automated appointment reminders via email and SMS.",
    category: "admin",
    icon: <CalendarClock className="h-5 w-5" />,
    steps: 4,
    color: "bg-purple-100 text-purple-700"
  },
  
  // Clinical Templates
  {
    id: "lab-results-notification",
    name: "Lab Results Notification",
    description: "Notify patients of lab results with appropriate follow-up actions.",
    category: "clinical",
    icon: <FileText className="h-5 w-5" />,
    steps: 6,
    color: "bg-green-100 text-green-700"
  },
  {
    id: "vital-signs-monitoring",
    name: "Vital Signs Monitoring",
    description: "Monitor patient vital signs and alert on concerning values.",
    category: "clinical",
    icon: <Activity className="h-5 w-5" />,
    steps: 5,
    color: "bg-red-100 text-red-700"
  }
];

const HealthcareWorkflowTemplates: React.FC<HealthcareWorkflowTemplatesProps> = ({ onUseTemplate }) => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="patient-care">
        <TabsList className="mb-4">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1.5">
              {category.icon}
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates
                .filter(template => template.category === category.id)
                .map(template => (
                  <Card key={template.id} className="overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className={`p-2 rounded-full ${template.color}`}>
                          {template.icon}
                        </div>
                        <Badge variant="outline">{template.steps} steps</Badge>
                      </div>
                      <CardTitle className="text-lg mt-2">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <Button 
                        onClick={() => onUseTemplate(template.id)} 
                        className="w-full"
                      >
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default HealthcareWorkflowTemplates;
