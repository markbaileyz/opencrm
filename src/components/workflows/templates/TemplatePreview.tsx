
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { WorkflowStepType } from "../../types/workflow";

interface TemplatePreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateId: string | null;
  onUseTemplate: (templateId: string) => void;
}

// For demonstration purposes, this is simplified template data
// In a real application, this would be fetched based on the templateId
interface TemplateStep {
  id: string;
  type: WorkflowStepType;
  name: string;
  description: string;
}

interface TemplateDetail {
  id: string;
  name: string;
  description: string;
  steps: TemplateStep[];
  benefits: string[];
}

const templateDetails: Record<string, TemplateDetail> = {
  "template-patient-onboarding": {
    id: "template-patient-onboarding",
    name: "New Patient Onboarding",
    description: "Streamlined workflow for registering and onboarding new patients with automatic form distribution and follow-up.",
    steps: [
      {
        id: "step-1",
        type: "email",
        name: "Welcome Email",
        description: "Send welcome email with registration forms and portal access instructions"
      },
      {
        id: "step-2",
        type: "task",
        name: "Registration Review",
        description: "Staff reviews submitted registration information"
      },
      {
        id: "step-3",
        type: "wait",
        name: "Wait for Submission",
        description: "Wait 3 days for patient to complete registration"
      },
      {
        id: "step-4",
        type: "form_submission",
        name: "Verify Form Submission",
        description: "Check if required forms have been completed"
      },
      {
        id: "step-5",
        type: "email",
        name: "Confirmation Email",
        description: "Send confirmation email with appointment scheduling information"
      }
    ],
    benefits: [
      "Reduces administrative workload by 75%",
      "Ensures consistent patient communication",
      "Increases form completion rates",
      "Improves patient satisfaction with the onboarding process"
    ]
  },
  "template-appointment-reminder": {
    id: "template-appointment-reminder",
    name: "Appointment Reminder Sequence",
    description: "Automated appointment reminders sent at strategic intervals to reduce no-shows and allow for timely rescheduling.",
    steps: [
      {
        id: "step-1",
        type: "email",
        name: "Initial Confirmation",
        description: "Send appointment confirmation email when appointment is scheduled"
      },
      {
        id: "step-2",
        type: "wait",
        name: "Wait Period",
        description: "Wait until 3 days before appointment"
      },
      {
        id: "step-3",
        type: "sms",
        name: "SMS Reminder",
        description: "Send SMS reminder with confirmation request"
      },
      {
        id: "step-4",
        type: "condition",
        name: "Check Confirmation",
        description: "Check if patient confirmed appointment and send final reminder if needed"
      }
    ],
    benefits: [
      "Reduces no-show rates by up to 30%",
      "Allows for timely rescheduling",
      "Improves schedule efficiency",
      "Enhances patient experience with multi-channel reminders"
    ]
  }
};

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  open,
  onOpenChange,
  templateId,
  onUseTemplate
}) => {
  if (!templateId) return null;
  
  // Get template details for the selected template
  // In a real app, you would fetch this from your backend
  const templateDetail = templateDetails[templateId] || {
    id: templateId,
    name: "Template Preview",
    description: "Template details not available",
    steps: [],
    benefits: []
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{templateDetail.name}</DialogTitle>
          <DialogDescription>{templateDetail.description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Workflow Steps</h3>
            <div className="space-y-3">
              {templateDetail.steps.map((step, index) => (
                <Card key={step.id} className="relative">
                  <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                    {index + 1}
                  </div>
                  <CardContent className="p-4 pl-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge className="mb-1">{step.type.replace('_', ' ')}</Badge>
                        <h4 className="font-medium">{step.name}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      {index < templateDetail.steps.length - 1 && (
                        <ArrowRight className="h-5 w-5 text-muted-foreground mt-2" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Benefits</h3>
            <ul className="space-y-2">
              {templateDetail.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              onUseTemplate(templateId);
              onOpenChange(false);
            }}>
              Use This Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreview;
