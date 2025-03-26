
import { Email } from "@/types/email";

export const emailData: Email[] = [
  {
    id: "1",
    senderName: "John Smith",
    senderEmail: "john.smith@example.com",
    recipient: "you@example.com",
    subject: "Quarterly Business Review",
    preview: "I wanted to discuss our quarterly performance and the goals for the next quarter.",
    body: `<p>Hi there,</p>
    <p>I wanted to discuss our quarterly performance and the goals for the next quarter. Can we schedule a meeting sometime next week?</p>
    <p>Best regards,<br/>John</p>`,
    date: "2023-09-15T10:30:00",
    read: false,
    starred: true,
    folder: "inbox",
    hasAttachments: true,
    labels: ["important", "work"],
  },
  {
    id: "2",
    senderName: "Marketing Team",
    senderEmail: "marketing@company.com",
    recipient: "you@example.com",
    subject: "New Campaign Launch",
    preview: "We're excited to share the details of our upcoming marketing campaign for Q4.",
    body: `<p>Hello,</p>
    <p>We're excited to share the details of our upcoming marketing campaign for Q4. Please find attached the presentation with all the details.</p>
    <p>Let me know if you have any questions.</p>
    <p>Thanks,<br/>Marketing Team</p>`,
    date: "2023-09-14T14:45:00",
    read: true,
    starred: false,
    folder: "inbox",
    hasAttachments: true,
    labels: ["marketing"],
  },
  {
    id: "3",
    senderName: "Sarah Johnson",
    senderEmail: "sarah.j@partner.org",
    recipient: "you@example.com",
    subject: "Partnership Opportunity",
    preview: "I'd like to discuss a potential partnership between our organizations.",
    body: `<p>Dear Team,</p>
    <p>I'd like to discuss a potential partnership between our organizations. We believe there's significant potential for collaboration in the upcoming market expansion.</p>
    <p>Would you be available for a call next Tuesday?</p>
    <p>Best,<br/>Sarah</p>`,
    date: "2023-09-13T09:15:00",
    read: true,
    starred: true,
    folder: "inbox",
    hasAttachments: false,
    labels: ["partnership"],
  },
  {
    id: "4",
    senderName: "Alex Davis",
    senderEmail: "alex@client.com",
    recipient: "you@example.com",
    subject: "Project Update Request",
    preview: "Could you provide an update on the current status of our project?",
    body: `<p>Hi,</p>
    <p>Could you provide an update on the current status of our project? We haven't received the weekly report and wanted to check if everything is on track.</p>
    <p>Thanks,<br/>Alex</p>`,
    date: "2023-09-12T16:20:00",
    read: true,
    starred: false,
    folder: "inbox",
    hasAttachments: false,
    labels: ["client"],
  },
  {
    id: "5",
    senderName: "Tech Support",
    senderEmail: "support@company.com",
    recipient: "you@example.com",
    subject: "Your Support Ticket #45678",
    preview: "We've resolved the issue you reported regarding the dashboard access.",
    body: `<p>Hello,</p>
    <p>We've resolved the issue you reported regarding the dashboard access. Please try logging in again and let us know if you encounter any further problems.</p>
    <p>Regards,<br/>Tech Support Team</p>`,
    date: "2023-09-11T11:05:00",
    read: false,
    starred: false,
    folder: "inbox",
    hasAttachments: false,
    labels: ["support"],
  },
  {
    id: "6",
    senderName: "You",
    senderEmail: "you@example.com",
    recipient: "client@example.com",
    subject: "Proposal for New Project",
    preview: "As discussed in our meeting last week, please find attached our proposal.",
    body: `<p>Dear Client,</p>
    <p>As discussed in our meeting last week, please find attached our proposal for the new project. We've included the timeline, budget, and resource allocation as requested.</p>
    <p>Please let me know if you need any clarification or have any questions.</p>
    <p>Best regards,<br/>Your Name</p>`,
    date: "2023-09-10T15:30:00",
    read: true,
    starred: false,
    folder: "sent",
    hasAttachments: true,
    labels: ["proposal"],
  },
  {
    id: "7",
    senderName: "You",
    senderEmail: "you@example.com",
    recipient: "team@company.com",
    subject: "Team Meeting - Agenda",
    preview: "Here's the agenda for our team meeting scheduled for tomorrow.",
    body: `<p>Hi Team,</p>
    <p>Here's the agenda for our team meeting scheduled for tomorrow at 10 AM:</p>
    <ol>
      <li>Project updates</li>
      <li>Quarterly goals review</li>
      <li>New client onboarding process</li>
      <li>Open discussion</li>
    </ol>
    <p>Please come prepared with your updates.</p>
    <p>Thanks,<br/>Your Name</p>`,
    date: "2023-09-09T17:45:00",
    read: true,
    starred: true,
    folder: "sent",
    hasAttachments: false,
    labels: ["internal"],
  },
  {
    id: "8",
    senderName: "You",
    senderEmail: "you@example.com",
    recipient: "vendor@supplies.com",
    subject: "Order Confirmation #12345",
    preview: "Thank you for your quote. We'd like to proceed with the order as discussed.",
    body: `<p>Hello,</p>
    <p>Thank you for your quote. We'd like to proceed with the order as discussed. Please find the signed purchase order attached.</p>
    <p>Could you please confirm the delivery timeline?</p>
    <p>Thanks,<br/>Your Name</p>`,
    date: "2023-09-08T13:20:00",
    read: true,
    starred: false,
    folder: "drafts",
    hasAttachments: true,
    labels: ["order"],
  },
  {
    id: "9",
    senderName: "Newsletter",
    senderEmail: "news@industry.com",
    recipient: "you@example.com",
    subject: "Industry Insights - September Edition",
    preview: "The latest trends, news, and analyses from the industry.",
    body: `<p>Hello Subscriber,</p>
    <p>Welcome to the September edition of Industry Insights. In this issue, we cover:</p>
    <ul>
      <li>Market trends for Q4</li>
      <li>Regulatory updates</li>
      <li>Technology innovations</li>
      <li>Expert interviews</li>
    </ul>
    <p>Happy reading!</p>
    <p>The Newsletter Team</p>`,
    date: "2023-09-07T08:30:00",
    read: true,
    starred: false,
    folder: "trash",
    hasAttachments: false,
    labels: ["newsletter"],
  },
  {
    id: "10",
    senderName: "HR Department",
    senderEmail: "hr@company.com",
    recipient: "you@example.com",
    subject: "Company Policy Updates",
    preview: "Please review the updated company policies effective from October 1st.",
    body: `<p>Dear Employee,</p>
    <p>Please review the updated company policies effective from October 1st. The main changes relate to remote work arrangements and expense reporting procedures.</p>
    <p>All employees are required to acknowledge receipt by the end of this week.</p>
    <p>Thank you,<br/>HR Department</p>`,
    date: "2023-09-06T11:55:00",
    read: true,
    starred: false,
    folder: "archive",
    hasAttachments: true,
    labels: ["hr", "important"],
  },
];
