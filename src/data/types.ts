
export interface Feature {
  name: string;
  description: string;
  implemented?: boolean;
  comingSoon?: boolean;
  votes?: number;
  technicalDetails?: string;
  progress?: number; // Implementation progress percentage
  comments?: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface FeatureCategory {
  name: string;
  features: Feature[];
}
