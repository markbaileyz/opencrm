
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type DealStage = "lead" | "qualified" | "proposal" | "negotiation" | "closed-won" | "closed-lost";

interface Deal {
  id: string;
  name: string;
  company: string;
  amount: number;
  stage: DealStage;
  lastUpdated: string;
  probability: number;
}

const deals: Deal[] = [
  {
    id: "1",
    name: "Software Implementation",
    company: "Acme Corp",
    amount: 45000,
    stage: "proposal",
    lastUpdated: "2023-09-15",
    probability: 60
  },
  {
    id: "2",
    name: "Annual Subscription",
    company: "Global Industries",
    amount: 12000,
    stage: "qualified",
    lastUpdated: "2023-09-10",
    probability: 40
  },
  {
    id: "3",
    name: "Enterprise License",
    company: "TechStart Inc",
    amount: 75000,
    stage: "negotiation",
    lastUpdated: "2023-09-18",
    probability: 80
  },
  {
    id: "4",
    name: "Cloud Migration",
    company: "First Financial",
    amount: 35000,
    stage: "lead",
    lastUpdated: "2023-09-05",
    probability: 20
  },
  {
    id: "5",
    name: "Support Contract",
    company: "Metro Healthcare",
    amount: 18000,
    stage: "closed-won",
    lastUpdated: "2023-09-01",
    probability: 100
  }
];

const DealPipeline = () => {
  const stages: { id: DealStage; name: string }[] = [
    { id: "lead", name: "Lead" },
    { id: "qualified", name: "Qualified" },
    { id: "proposal", name: "Proposal" },
    { id: "negotiation", name: "Negotiation" },
    { id: "closed-won", name: "Closed Won" },
    { id: "closed-lost", name: "Closed Lost" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Deal Pipeline</CardTitle>
          <CardDescription>Drag and drop deals between stages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex overflow-x-auto pb-4 space-x-4">
            {stages.map((stage) => (
              <div key={stage.id} className="flex-shrink-0 w-72">
                <div className="bg-muted rounded-t-md px-3 py-2 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{stage.name}</h3>
                    <Badge variant="outline">
                      {deals.filter(deal => deal.stage === stage.id).length}
                    </Badge>
                  </div>
                </div>
                <div className="bg-muted/30 rounded-b-md p-2 min-h-[400px]">
                  {deals
                    .filter(deal => deal.stage === stage.id)
                    .map(deal => (
                      <div 
                        key={deal.id} 
                        className="bg-card border rounded-md p-3 mb-2 cursor-move hover:border-primary transition-colors"
                      >
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">{deal.name}</div>
                          <div className="text-sm font-medium">${deal.amount.toLocaleString()}</div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">{deal.company}</div>
                        <div className="flex justify-between items-center text-xs">
                          <span>Updated: {new Date(deal.lastUpdated).toLocaleDateString()}</span>
                          <Badge variant={deal.probability >= 50 ? "default" : "outline"}>
                            {deal.probability}%
                          </Badge>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealPipeline;
