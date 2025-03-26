
import { FeatureCategory } from './types';
import { contactManagement } from './categories/contactManagement';
import { leadManagement } from './categories/leadManagement';
import { salesPipeline } from './categories/salesPipeline';
import { customerService } from './categories/customerService';
import { marketing } from './categories/marketing';
import { integration } from './categories/integration';

// Re-export the types
export * from './types';

// Export the feature list
export const featuresList: FeatureCategory[] = [
  contactManagement,
  leadManagement,
  salesPipeline,
  customerService,
  marketing,
  integration
];
