
export type SavedReport = {
  id: string;
  name: string;
  type: string;
  createdAt: string; 
  lastRun: string;
  isFavorite: boolean;
  schedule?: {
    frequency: string;
    email: string;
    lastSent?: string;
  };
};
