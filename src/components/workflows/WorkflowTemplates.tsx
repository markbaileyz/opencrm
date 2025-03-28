
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Workflow, WorkflowStep } from "@/types/workflow";
import { v4 as uuidv4 } from "uuid";

interface WorkflowTemplatesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUseTemplate: (template: Partial<Workflow>) => void;
}

const WorkflowTemplates: React.FC<WorkflowTemplatesProps> = ({ open, onOpenChange, onUseTemplate }) => {
  // Pre-defined workflow templates
  const templates = [
    {
      id: "patient-welcome",
      name: "Patient Welcome Sequence",
      description: "A sequence of emails and SMS to welcome new patients",
      trigger: "new_patient" as const,
      steps: [
        {
          id: uuidv4(),
          type: "email" as const,
          config: {
            subject: "Welcome to our clinic!",
            content: "Thank you for choosing our clinic. Here's what you need to know for your first visit.",
            recipient: "{{patient.email}}"
          }
        },
        {
          id: uuidv4(),
          type: "wait" as const,
          config: {
            delay: "2 days"
          }
        },
        {
          id: uuidv4(),
          type: "task" as const,
          config: {
            subject: "Follow up with new patient",
            description: "Call the patient to ensure they received welcome materials and address any questions.",
            assignee: "{{user.id}}"
          }
        },
        {
          id: uuidv4(),
          type: "sms" as const,
          config: {
            message: "Don't forget about your upcoming appointment. Reply CONFIRM to confirm.",
            recipient: "{{patient.phone}}"
          }
        }
      ]
    },
    {
      id: "appointment-reminder",
      name: "Appointment Reminder",
      description: "Multi-channel appointment reminders at different intervals",
      trigger: "appointment_scheduled" as const,
      steps: [
        {
          id: uuidv4(),
          type: "wait" as const,
          config: {
            delay: "3 days before appointment"
          }
        },
        {
          id: uuidv4(),
          type: "email" as const,
          config: {
            subject: "Your Upcoming Appointment",
            content: "This is a reminder about your appointment scheduled for {{appointment.date}} at {{appointment.time}}.",
            recipient: "{{patient.email}}"
          }
        },
        {
          id: uuidv4(),
          type: "wait" as const,
          config: {
            delay: "1 day before appointment"
          }
        },
        {
          id: uuidv4(),
          type: "condition" as const,
          config: {
            condition: "patient.preferences.sms_notifications == true"
          }
        },
        {
          id: uuidv4(),
          type: "sms" as const,
          config: {
            message: "Reminder: Your appointment is tomorrow at {{appointment.time}}. Reply C to confirm or R to reschedule.",
            recipient: "{{patient.phone}}"
          }
        }
      ]
    },
    {
      id: "appointment-followup",
      name: "Post-Appointment Follow-up",
      description: "Feedback and follow-up after appointments",
      trigger: "appointment_completed" as const,
      steps: [
        {
          id: uuidv4(),
          type: "wait" as const,
          config: {
            delay: "4 hours after appointment"
          }
        },
        {
          id: uuidv4(),
          type: "email" as const,
          config: {
            subject: "How was your appointment?",
            content: "Thank you for visiting us today. We'd appreciate your feedback on your experience.",
            recipient: "{{patient.email}}"
          }
        },
        {
          id: uuidv4(),
          type: "wait" as const,
          config: {
            delay: "3 days"
          }
        },
        {
          id: uuidv4(),
          type: "sms" as const,
          config: {
            message: "We hope you're feeling better after your recent visit. Any questions or concerns?",
            recipient: "{{patient.phone}}"
          }
        }
      ]
    },
    {
      id: "task-assignment",
      name: "Clinical Task Assignment",
      description: "Automated task assignments for clinical workflows",
      trigger: "form_submission" as const,
      steps: [
        {
          id: uuidv4(),
          type: "task" as const,
          config: {
            subject: "Review submitted form",
            description: "Review the patient's submitted form and provide feedback.",
            assignee: "{{provider.id}}"
          }
        },
        {
          id: uuidv4(),
          type: "wait" as const,
          config: {
            delay: "1 day"
          }
        },
        {
          id: uuidv4(),
          type: "sms" as const,
          config: {
            message: "Your form has been received and is being reviewed by our staff.",
            recipient: "{{patient.phone}}"
          }
        },
        {
          id: uuidv4(),
          type: "wait" as const,
          config: {
            delay: "3 days"
          }
        },
        {
          id: uuidv4(),
          type: "email" as const,
          config: {
            subject: "Your Form Review Results",
            content: "We've completed reviewing your submitted form. Here are our findings and recommendations.",
            recipient: "{{patient.email}}"
          }
        }
      ]
    },
    {
      id: "medication-reminder",
      name: "Medication Reminder",
      description: "Reminders for medication adherence",
      trigger: "scheduled" as const,
      steps: [
        {
          id: uuidv4(),
          type: "task" as const,
          config: {
            subject: "Prepare medication reminder list",
            description: "Compile list of patients who need medication reminders.",
            assignee: "{{nurse.id}}"
          }
        },
        {
          id: uuidv4(),
          type: "condition" as const,
          config: {
            condition: "patient.medications.count > 0"
          }
        },
        {
          id: uuidv4(),
          type: "email" as const,
          config: {
            subject: "Medication Reminder",
            content: "This is a friendly reminder to take your prescribed medications. Maintaining your regimen is important for your health.",
            recipient: "{{patient.email}}"
          }
        },
        {
          id: uuidv4(),
          type: "sms" as const,
          config: {
            message: "Reminder: Please take your medications as prescribed. Need a refill? Reply REFILL.",
            recipient: "{{patient.phone}}"
          }
        }
      ]
    },
    {
      id: "lab-results",
      name: "Lab Results Notification",
      description: "Notify patients about lab results and next steps",
      trigger: "manual" as const,
      steps: [
        {
          id: uuidv4(),
          type: "task" as const,
          config: {
            subject: "Review lab results",
            description: "Review lab results before sending to patient.",
            assignee: "{{provider.id}}"
          }
        },
        {
          id: uuidv4(),
          type: "email" as const,
          config: {
            subject: "Your Lab Results Are Available",
            content: "Your recent lab results have been reviewed by your provider and are now available in your patient portal.",
            recipient: "{{patient.email}}"
          }
        },
        {
          id: uuidv4(),
          type: "wait" as const,
          config: {
            delay: "2 days"
          }
        },
        {
          id: uuidv4(),
          type: "condition" as const,
          config: {
            condition: "lab_results.requires_followup == true"
          }
        },
        {
          id: uuidv4(),
          type: "sms" as const,
          config: {
            message: "Please schedule a follow-up appointment to discuss your recent lab results.",
            recipient: "{{patient.phone}}"
          }
        }
      ]
    },
    {
      id: "preventive-care",
      name: "Preventive Care Reminder",
      description: "Reminders for preventive care and screenings",
      trigger: "scheduled" as const,
      steps: [
        {
          id: uuidv4(),
          type: "condition" as const,
          config: {
            condition: "patient.age > 50"
          }
        },
        {
          id: uuidv4(),
          type: "email" as const,
          config: {
            subject: "Important Preventive Care Reminder",
            content: "Based on your age and health history, it's time to schedule preventive screenings.",
            recipient: "{{patient.email}}"
          }
        },
        {
          id: uuidv4(),
          type: "wait" as const,
          config: {
            delay: "1 week"
          }
        },
        {
          id: uuidv4(),
          type: "condition" as const,
          config: {
            condition: "patient.has_scheduled_screening == false"
          }
        },
        {
          id: uuidv4(),
          type: "sms" as const,
          config: {
            message: "Your health matters! Please schedule your recommended preventive screenings.",
            recipient: "{{patient.phone}}"
          }
        }
      ]
    },
    {
      id: "referral-followup",
      name: "Referral Follow-up",
      description: "Follow-up process for patient referrals",
      trigger: "manual" as const,
      steps: [
        {
          id: uuidv4(),
          type: "task" as const,
          config: {
            subject: "Send referral to specialist",
            description: "Prepare and send referral documentation to specialist.",
            assignee: "{{staff.id}}"
          }
        },
        {
          id: uuidv4(),
          type: "condition" as const,
          config: {
            condition: "referral.status == 'sent'"
          }
        },
        {
          id: uuidv4(),
          type: "email" as const,
          config: {
            subject: "Your Referral Information",
            content: "We've processed your referral. Here's the specialist's information and what to expect next.",
            recipient: "{{patient.email}}"
          }
        },
        {
          id: uuidv4(),
          type: "condition" as const,
          config: {
            condition: "patient.has_contacted_specialist == false"
          }
        },
        {
          id: uuidv4(),
          type: "task" as const,
          config: {
            subject: "Follow up on referral",
            description: "Check if patient has contacted the specialist and if they need assistance.",
            assignee: "{{staff.id}}"
          }
        }
      ]
    },
    {
      id: "reactivation-campaign",
      name: "Patient Reactivation Campaign",
      description: "Re-engage inactive patients",
      trigger: "scheduled" as const,
      steps: [
        {
          id: uuidv4(),
          type: "email" as const,
          config: {
            subject: "We miss seeing you!",
            content: "It's been a while since your last visit. Schedule your next appointment today and prioritize your health.",
            recipient: "{{patient.email}}"
          }
        },
        {
          id: uuidv4(),
          type: "wait" as const,
          config: {
            delay: "1 week"
          }
        },
        {
          id: uuidv4(),
          type: "condition" as const,
          config: {
            condition: "patient.has_scheduled_appointment == false"
          }
        },
        {
          id: uuidv4(),
          type: "sms" as const,
          config: {
            message: "We haven't seen you recently at our clinic. Would you like to schedule an appointment? Reply YES for us to call you.",
            recipient: "{{patient.phone}}"
          }
        },
        {
          id: uuidv4(),
          type: "wait" as const,
          config: {
            delay: "2 weeks"
          }
        },
        {
          id: uuidv4(),
          type: "task" as const,
          config: {
            subject: "Call inactive patient",
            description: "Reach out to patient who hasn't responded to reactivation communications.",
            assignee: "{{staff.id}}"
          }
        }
      ]
    }
  ];

  const handleUseTemplate = (template: typeof templates[0]) => {
    onUseTemplate({
      name: template.name,
      description: template.description,
      trigger: template.trigger,
      steps: template.steps,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Workflow Templates</DialogTitle>
          <DialogDescription>
            Choose a template as a starting point for your workflow
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {templates.map(template => (
            <Card key={template.id} className="transition-shadow hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{template.name}</CardTitle>
                <CardDescription className="text-xs">{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-xs text-muted-foreground mb-2">
                  Trigger: <span className="font-medium">{template.trigger}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Steps: <span className="font-medium">{template.steps.length}</span>
                </div>
              </CardContent>
              <CardContent className="pt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleUseTemplate(template)}
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowTemplates;
