
export interface CRMModule {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType;
  price: number; // Monthly price in dollars
  component: React.ComponentType;
  features: string[];
  dependencies?: string[]; // IDs of modules this one depends on
}

export interface CRMConfig {
  activeModules: string[]; // Array of active module IDs
  totalPrice: number;
}
