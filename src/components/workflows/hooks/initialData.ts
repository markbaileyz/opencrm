
import { v4 as uuidv4 } from "uuid";
import { Workflow } from "@/types/workflow";

// Sample initial workflows for demonstration
export const initialWorkflows: Workflow[] = [
  {
    id: "wf-1",
    name: "Patient Welcome Sequence",
    description: "Send welcome emails to new patients",
    status: "active",
    trigger: "new_patient",
    steps: [
      {
        id: uuidv4(),
        type: "email",
        config: {
          subject: "Welcome to our clinic!",
          content: "Thank you for choosing our clinic. Here's what you need to know for your first visit.",
          recipient: "{{patient.email}}"
        }
      },
      {
        id: uuidv4(),
        type: "wait",
        config: {
          delay: "2 days"
        }
      },
      {
        id: uuidv4(),
        type: "task",
        config: {
          subject: "Follow up with new patient",
          description: "Call the patient to ensure they received welcome materials and address any questions.",
          assignee: "{{user.id}}"
        }
      }
    ],
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-06-01T14:45:00Z",
    lastRun: "2023-06-10T09:15:00Z",
    createdBy: "user-1"
  },
  {
    id: "wf-2",
    name: "Appointment Reminder",
    description: "Send reminders before scheduled appointments",
    status: "active",
    trigger: "appointment_scheduled",
    steps: [
      {
        id: uuidv4(),
        type: "wait",
        config: {
          delay: "3 days before appointment"
        }
      },
      {
        id: uuidv4(),
        type: "email",
        config: {
          subject: "Your Upcoming Appointment",
          content: "This is a reminder about your appointment scheduled for {{appointment.date}} at {{appointment.time}}.",
          recipient: "{{patient.email}}"
        }
      },
      {
        id: uuidv4(),
        type: "sms",
        config: {
          message: "Reminder: Your appointment is tomorrow at {{appointment.time}}. Reply C to confirm or R to reschedule.",
          recipient: "{{patient.phone}}"
        }
      }
    ],
    createdAt: "2023-04-20T11:20:00Z",
    updatedAt: "2023-05-25T13:10:00Z",
    lastRun: "2023-06-12T08:45:00Z",
    createdBy: "user-1"
  },
  {
    id: "wf-3",
    name: "Follow-up Survey",
    description: "Send survey after appointments to gather feedback",
    status: "paused",
    trigger: "appointment_completed",
    steps: [
      {
        id: uuidv4(),
        type: "wait",
        config: {
          delay: "1 day after appointment"
        }
      },
      {
        id: uuidv4(),
        type: "email",
        config: {
          subject: "How was your appointment?",
          content: "Please take a moment to complete this survey about your recent appointment.",
          recipient: "{{patient.email}}"
        }
      }
    ],
    createdAt: "2023-02-10T09:00:00Z",
    updatedAt: "2023-05-05T16:30:00Z",
    lastRun: "2023-05-20T14:15:00Z",
    createdBy: "user-2"
  },
  {
    id: "wf-4",
    name: "Medication Reminder",
    description: "Regular reminders for medication adherence",
    status: "draft",
    trigger: "scheduled",
    steps: [
      {
        id: uuidv4(),
        type: "condition",
        config: {
          condition: "patient.needs_reminder == true"
        }
      },
      {
        id: uuidv4(),
        type: "email",
        config: {
          subject: "Medication Reminder",
          content: "This is a reminder to take your medication as prescribed.",
          recipient: "{{patient.email}}"
        }
      }
    ],
    createdAt: "2023-03-25T13:45:00Z",
    updatedAt: "2023-03-25T13:45:00Z",
    createdBy: "user-1"
  }
];
