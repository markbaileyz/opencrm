
import React, { useState } from "react";
import { Workflow, WorkflowStepType, WorkflowTrigger } from "@/types/workflow";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, MessageSquare, UserPlus, Calendar, Heart, Activity, Clipboard, FileText } from "lucide-react";

interface WorkflowTemplatesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUseTemplate: (template: Omit<Workflow, "id">) => void;
}

// Template categories
type TemplateCategory = "patient" | "appointment" | "communication" | "clinical" | "administrative";

// Define workflow templates
const workflowTemplates: (Omit<Workflow, "id"> & { category: TemplateCategory })[] = [
  // Patient Engagement templates
  {
    name: "New Patient Onboarding",
    description: "Welcome new patients and guide them through initial steps",
    status: "draft",
    trigger: "new_patient",
    steps: [
      {
        type: "email",
        config: {
          subject: "Welcome to Our Practice",
          content: "Dear {{patient.name}}, welcome to our healthcare practice. We're excited to have you join us. Here's what to expect for your first visit...",
          recipient: "patient"
        }
      },
      {
        type: "wait",
        config: {
          delay: "24"
        }
      },
      {
        type: "task",
        config: {
          subject: "Call new patient for initial screening",
          description: "Contact the patient to answer any questions and confirm initial appointment",
          assignee: "nurse"
        }
      },
      {
        type: "sms",
        config: {
          message: "Your patient portal is ready! Access your records and communicate with our team at: {{portalLink}}",
          recipient: "patient"
        }
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    category: "patient"
  },
  {
    name: "Patient Satisfaction Survey",
    description: "Collect feedback after completed appointments",
    status: "draft",
    trigger: "appointment_completed",
    steps: [
      {
        type: "wait",
        config: {
          delay: "24"
        }
      },
      {
        type: "email",
        config: {
          subject: "How was your recent visit?",
          content: "We value your feedback. Please take a moment to share your experience during your recent visit with Dr. {{provider.name}}. {{surveyLink}}",
          recipient: "patient"
        }
      },
      {
        type: "wait",
        config: {
          delay: "72"
        }
      },
      {
        type: "condition",
        config: {
          condition: "survey.completed == false"
        }
      },
      {
        type: "sms",
        config: {
          message: "We'd still love to hear your feedback on your recent visit. Take our quick survey here: {{surveyLink}}",
          recipient: "patient"
        }
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    category: "patient"
  },
  
  // Appointment Management templates
  {
    name: "Appointment Reminder Sequence",
    description: "Send reminders before scheduled appointments",
    status: "draft",
    trigger: "appointment_scheduled",
    steps: [
      {
        type: "wait",
        config: {
          delay: "72"
        }
      },
      {
        type: "email",
        config: {
          subject: "Upcoming Appointment Reminder",
          content: "This is a reminder about your appointment with Dr. {{provider.name}} on {{appointment.date}} at {{appointment.time}}. Please arrive 15 minutes early to complete any paperwork.",
          recipient: "patient"
        }
      },
      {
        type: "wait",
        config: {
          delay: "24"
        }
      },
      {
        type: "sms",
        config: {
          message: "Reminder: Your appointment is tomorrow at {{appointment.time}}. Reply C to confirm or R to reschedule.",
          recipient: "patient"
        }
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    category: "appointment"
  },
  {
    name: "No-Show Follow Up",
    description: "Reconnect with patients who missed appointments",
    status: "draft",
    trigger: "manual",
    steps: [
      {
        type: "task",
        config: {
          subject: "Contact patient about missed appointment",
          description: "Call the patient to determine reason for no-show and reschedule if appropriate",
          assignee: "frontdesk"
        }
      },
      {
        type: "wait",
        config: {
          delay: "4"
        }
      },
      {
        type: "sms",
        config: {
          message: "We missed you at your appointment today. Please call {{practice.phone}} to reschedule.",
          recipient: "patient"
        }
      },
      {
        type: "wait",
        config: {
          delay: "24"
        }
      },
      {
        type: "email",
        config: {
          subject: "Important: Missed Appointment",
          content: "We noticed you missed your scheduled appointment today. Regular care is important for your health. Please contact us at {{practice.phone}} to reschedule at your earliest convenience.",
          recipient: "patient"
        }
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    category: "appointment"
  },
  
  // Communication templates
  {
    name: "Test Results Notification",
    description: "Notify patients when test results are available",
    status: "draft",
    trigger: "manual",
    steps: [
      {
        type: "task",
        config: {
          subject: "Review test results before sending",
          description: "Provider needs to review test results and add comments before notification is sent",
          assignee: "provider"
        }
      },
      {
        type: "condition",
        config: {
          condition: "results.reviewed == true"
        }
      },
      {
        type: "email",
        config: {
          subject: "Your Test Results Are Available",
          content: "Your recent test results are now available in your patient portal. {{resultsNotes}}",
          recipient: "patient"
        }
      },
      {
        type: "sms",
        config: {
          message: "Your test results are now available in your patient portal. Please log in to review them.",
          recipient: "patient"
        }
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    category: "communication"
  },
  
  // Clinical templates
  {
    name: "Chronic Condition Monitoring",
    description: "Regular check-ins for patients with chronic conditions",
    status: "draft",
    trigger: "scheduled",
    steps: [
      {
        type: "task",
        config: {
          subject: "Review patient monitoring data",
          description: "Check latest readings and determine if intervention is needed",
          assignee: "nurse"
        }
      },
      {
        type: "email",
        config: {
          subject: "Your Monthly Health Check-In",
          content: "It's time for your monthly check-in for your {{condition.name}} management. Please submit your latest readings on the patient portal.",
          recipient: "patient"
        }
      },
      {
        type: "wait",
        config: {
          delay: "72"
        }
      },
      {
        type: "condition",
        config: {
          condition: "readings.submitted == false"
        }
      },
      {
        type: "sms",
        config: {
          message: "Reminder: Please submit your monthly health readings for your condition monitoring.",
          recipient: "patient"
        }
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    category: "clinical"
  },
  {
    name: "Medication Refill Reminder",
    description: "Remind patients when prescriptions are due for refill",
    status: "draft",
    trigger: "scheduled",
    steps: [
      {
        type: "condition",
        config: {
          condition: "medication.daysUntilRefill <= 7"
        }
      },
      {
        type: "email",
        config: {
          subject: "Medication Refill Reminder",
          content: "Your prescription for {{medication.name}} will need a refill soon. Please contact our office at {{practice.phone}} to arrange this.",
          recipient: "patient"
        }
      },
      {
        type: "wait",
        config: {
          delay: "72"
        }
      },
      {
        type: "condition",
        config: {
          condition: "medication.refillRequested == false"
        }
      },
      {
        type: "sms",
        config: {
          message: "Your {{medication.name}} prescription needs refilling. Please call us or request through your patient portal.",
          recipient: "patient"
        }
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    category: "clinical"
  },
  
  // Administrative templates
  {
    name: "Insurance Verification",
    description: "Verify patient insurance before appointments",
    status: "draft",
    trigger: "appointment_scheduled",
    steps: [
      {
        type: "task",
        config: {
          subject: "Verify patient insurance coverage",
          description: "Contact insurance provider to verify coverage and benefits for upcoming appointment",
          assignee: "frontdesk"
        }
      },
      {
        type: "condition",
        config: {
          condition: "insurance.verified == true"
        }
      },
      {
        type: "email",
        config: {
          subject: "Insurance Verification Complete",
          content: "We've verified your insurance coverage for your upcoming appointment. Your estimated responsibility is: {{insurance.patientResponsibility}}",
          recipient: "patient"
        }
      },
      {
        type: "condition",
        config: {
          condition: "insurance.verified == false"
        }
      },
      {
        type: "task",
        config: {
          subject: "Contact patient about insurance issues",
          description: "There are issues with insurance verification. Contact patient to resolve before appointment.",
          assignee: "frontdesk"
        }
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    category: "administrative"
  },
  {
    name: "Patient Document Collection",
    description: "Request and track required documents from patients",
    status: "draft",
    trigger: "manual",
    steps: [
      {
        type: "email",
        config: {
          subject: "Required Documents for Your Care",
          content: "To provide you with the best care, we need the following documents: {{documents.list}}. Please upload them to your patient portal or bring them to your next appointment.",
          recipient: "patient"
        }
      },
      {
        type: "wait",
        config: {
          delay: "72"
        }
      },
      {
        type: "condition",
        config: {
          condition: "documents.submitted == false"
        }
      },
      {
        type: "sms",
        config: {
          message: "Reminder: We still need your medical documents. Please upload them to your patient portal.",
          recipient: "patient"
        }
      },
      {
        type: "wait",
        config: {
          delay: "72"
        }
      },
      {
        type: "task",
        config: {
          subject: "Follow up on missing documents",
          description: "Call patient to remind about required documents that haven't been submitted",
          assignee: "frontdesk"
        }
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    category: "administrative"
  }
];

const WorkflowTemplates: React.FC<WorkflowTemplatesProps> = ({
  open,
  onOpenChange,
  onUseTemplate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>("patient");
  
  const categoryIcons = {
    patient: <UserPlus className="h-5 w-5 mr-2" />,
    appointment: <Calendar className="h-5 w-5 mr-2" />,
    communication: <MessageSquare className="h-5 w-5 mr-2" />,
    clinical: <Heart className="h-5 w-5 mr-2" />,
    administrative: <Clipboard className="h-5 w-5 mr-2" />
  };
  
  const filteredTemplates = workflowTemplates.filter(
    template => template.category === selectedCategory
  );

  const getCategoryName = (category: TemplateCategory): string => {
    switch (category) {
      case "patient": return "Patient Engagement";
      case "appointment": return "Appointment Management";
      case "communication": return "Communication";
      case "clinical": return "Clinical Care";
      case "administrative": return "Administrative";
      default: return category;
    }
  };

  const getStepIcon = (stepType: WorkflowStepType) => {
    switch (stepType) {
      case "email": return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "sms": return <MessageSquare className="h-4 w-4 text-green-500" />;
      case "task": return <Clipboard className="h-4 w-4 text-orange-500" />;
      case "wait": return <Clock className="h-4 w-4 text-gray-500" />;
      case "condition": return <Activity className="h-4 w-4 text-purple-500" />;
      case "template": return <FileText className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Workflow Templates</DialogTitle>
          <DialogDescription>
            Choose a pre-built workflow template to get started quickly.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as TemplateCategory)}>
          <TabsList className="mb-4 w-full justify-start overflow-x-auto">
            <TabsTrigger value="patient" className="flex items-center">
              {categoryIcons.patient} Patient Engagement
            </TabsTrigger>
            <TabsTrigger value="appointment" className="flex items-center">
              {categoryIcons.appointment} Appointment Management
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center">
              {categoryIcons.communication} Communication
            </TabsTrigger>
            <TabsTrigger value="clinical" className="flex items-center">
              {categoryIcons.clinical} Clinical Care
            </TabsTrigger>
            <TabsTrigger value="administrative" className="flex items-center">
              {categoryIcons.administrative} Administrative
            </TabsTrigger>
          </TabsList>
          
          {Object.keys(categoryIcons).map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTemplates.map((template, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-semibold">{template.name}</CardTitle>
                        <Badge variant="outline">{getCategoryName(template.category)}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Trigger:</span>
                          <span className="text-muted-foreground">
                            {template.trigger.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="font-medium">Steps ({template.steps.length}):</span>
                          <ul className="mt-1 space-y-1">
                            {template.steps.slice(0, 3).map((step, idx) => (
                              <li key={idx} className="flex items-center text-xs">
                                {getStepIcon(step.type)}
                                <span className="ml-2 capitalize">{step.type}</span>
                              </li>
                            ))}
                            {template.steps.length > 3 && (
                              <li className="text-xs text-muted-foreground">
                                +{template.steps.length - 3} more steps...
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button 
                        className="w-full"
                        onClick={() => onUseTemplate(template)}
                      >
                        Use This Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowTemplates;
