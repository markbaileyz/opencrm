
import { Feature, FeatureCategory } from '../types';

const contactManagementFeatures: Feature[] = [
  {
    name: "Contact Database",
    description: "Store and manage all your customer contacts in one place",
    implemented: true,
    votes: 42,
    technicalDetails: "Built on PostgreSQL database with real-time syncing. Includes full-text search capabilities and automatic data validation.",
    progress: 100
  },
  {
    name: "Contact Organization",
    description: "Tag, segment, and categorize contacts",
    implemented: true,
    votes: 38,
    technicalDetails: "Hierarchical tagging system with custom attributes. Supports both automated and manual categorization rules.",
    progress: 100
  },
  {
    name: "Import/Export",
    description: "Easily import and export contact data",
    implemented: true,
    votes: 35,
    technicalDetails: "Supports CSV, Excel, and VCF formats. Includes field mapping assistant and duplicate detection algorithms.",
    progress: 100
  },
];

export const contactManagement: FeatureCategory = {
  name: "Contact Management",
  features: contactManagementFeatures
};
