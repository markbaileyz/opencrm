
export interface Deal {
  id: string;
  name: string;
  stage: string;
  organization?: string;
  contact?: string;
  value: number;
  closeDate: Date | string;
  probability: number;
  description?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
