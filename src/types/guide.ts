
import { ReactNode } from 'react';

export interface GuideStep {
  title: string;
  content: ReactNode;
  image?: string;
  actionLabel?: string;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  coverImage?: string;
  steps: GuideStep[];
}
