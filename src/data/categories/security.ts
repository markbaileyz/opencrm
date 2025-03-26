
import { Feature, FeatureCategory } from '../types';

const securityFeatures: Feature[] = [
  {
    name: "HIPAA Compliance",
    description: "Complete HIPAA compliance for healthcare data protection",
    implemented: true,
    votes: 98,
    technicalDetails: "End-to-end encryption, audit trails, BAA support, and automated compliance checks for HIPAA regulations.",
    progress: 100
  },
  {
    name: "Role-Based Access Control",
    description: "Granular permission settings for different user roles",
    implemented: true,
    votes: 85,
    technicalDetails: "Customizable role definitions with fine-grained permissions at the feature, record, and field levels.",
    progress: 100
  },
  {
    name: "Two-Factor Authentication",
    description: "Additional security layer for user accounts",
    implemented: true,
    votes: 73,
    technicalDetails: "SMS, email, and authenticator app options for verification codes. Supports hardware security keys (FIDO2).",
    progress: 100
  },
  {
    name: "Data Loss Prevention",
    description: "Prevent accidental data exposure or leakage",
    comingSoon: true,
    votes: 68,
    technicalDetails: "Content inspection, contextual analysis, and protection actions for data in motion and at rest.",
    progress: 35,
    comments: [
      {
        id: "dlp-1",
        author: "Security Officer",
        text: "Will this include protection for data shared via integrations?",
        date: "2023-11-02T09:30:00Z"
      }
    ]
  },
  {
    name: "Blockchain Verification",
    description: "Immutable audit trail for critical healthcare records",
    comingSoon: true,
    votes: 62,
    technicalDetails: "Distributed ledger technology to create tamper-proof records of data access, modifications, and consent management.",
    progress: 15
  }
];

export const security: FeatureCategory = {
  name: "Security & Compliance",
  features: securityFeatures
};
