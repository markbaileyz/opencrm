
export interface GuideStep {
  id: string;
  title: string;
  content: string;
  elementSelector?: string;
  position?: "top" | "right" | "bottom" | "left";
}

export interface Guide {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: GuideStep[];
}
