
import { Feature, FeatureCategory } from '../types';

const integrationFeatures: Feature[] = [
  {
    name: "EHR Integration",
    description: "Connect with popular Electronic Health Record systems",
    comingSoon: true,
    votes: 78,
    technicalDetails: "API integrations with major EHR providers including Epic, Cerner, and Allscripts. Supports HL7 FHIR standards for medical data exchange.",
    progress: 40,
    comments: [
      {
        id: "ehr-1",
        author: "Dr. Smith",
        text: "This would be a game-changer for our practice. Looking forward to the Epic integration!",
        date: "2023-08-15T14:30:00Z"
      },
      {
        id: "ehr-2",
        author: "Healthcare Admin",
        text: "Will this support bidirectional data sync? That's essential for our workflow.",
        date: "2023-08-16T09:15:00Z"
      }
    ]
  },
  {
    name: "Payment Processors",
    description: "Integrate with popular payment gateways for seamless billing",
    implemented: true,
    votes: 65,
    technicalDetails: "Secure integrations with Stripe, Square, and PayPal. PCI DSS compliant with tokenization for sensitive payment data.",
    progress: 100
  },
  {
    name: "Calendar Sync",
    description: "Sync with Google, Outlook, and Apple calendars",
    implemented: true,
    votes: 62,
    technicalDetails: "OAuth 2.0 authentication with calendar providers. Real-time bidirectional syncing with conflict resolution.",
    progress: 100
  },
  {
    name: "Telehealth Platforms",
    description: "Connect with telehealth services for virtual appointments",
    comingSoon: true,
    votes: 69,
    technicalDetails: "SDK integrations with Zoom, Teams, and specialized HIPAA-compliant telehealth platforms. Includes waiting room management and secure recording options.",
    progress: 60,
    comments: [
      {
        id: "tele-1",
        author: "TeleMed Provider",
        text: "Will this include integration with our custom telehealth solution?",
        date: "2023-09-05T11:20:00Z"
      }
    ]
  },
  {
    name: "Insurance Verification",
    description: "Automatically verify patient insurance eligibility",
    comingSoon: true,
    votes: 82,
    technicalDetails: "Real-time eligibility verification through integration with major insurance clearinghouses. Supports benefits estimation and coverage details.",
    progress: 25
  }
];

export const integration: FeatureCategory = {
  name: "Integrations",
  features: integrationFeatures
};
