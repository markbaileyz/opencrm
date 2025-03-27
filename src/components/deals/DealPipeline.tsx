
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Deal } from "@/types/deal";
import { formatCurrency } from "@/lib/utils";

interface DealPipelineProps {
  deals?: Deal[];
  onDealClick?: (dealId: string) => void;
}

const DealPipeline: React.FC<DealPipelineProps> = ({ 
  deals = [], 
  onDealClick = () => {} 
}) => {
  const stages = [
    { id: "lead", name: "Lead" },
    { id: "qualification", name: "Qualified" },
    { id: "proposal", name: "Proposal" },
    { id: "negotiation", name: "Negotiation" },
    { id: "closed-won", name: "Closed Won" },
    { id: "closed-lost", name: "Closed Lost" }
  ];

  // Sample data for demo purposes
  const sampleDeals: Deal[] = deals.length > 0 ? deals : [
    {
      id: "deal1",
      name: "Software Implementation",
      stage: "lead",
      value: 25000,
      probability: 20,
      closeDate: new Date("2023-12-30"),
      organization: "org1",
      description: "Initial implementation of CRM software",
      createdAt: new Date("2023-10-15"),
      updatedAt: new Date("2023-10-20")
    },
    {
      id: "deal2",
      name: "Hardware Upgrade",
      stage: "qualification",
      value: 15000,
      probability: 40,
      closeDate: new Date("2023-12-15"),
      organization: "org2",
      description: "Server infrastructure upgrade",
      createdAt: new Date("2023-10-10"),
      updatedAt: new Date("2023-10-18")
    },
    {
      id: "deal3",
      name: "Annual Support Contract",
      stage: "proposal",
      value: 50000,
      probability: 60,
      closeDate: new Date("2023-11-30"),
      organization: "org3",
      description: "Yearly support and maintenance",
      createdAt: new Date("2023-09-25"),
      updatedAt: new Date("2023-10-22")
    },
    {
      id: "deal4",
      name: "Cloud Migration Project",
      stage: "negotiation",
      value: 75000,
      probability: 80,
      closeDate: new Date("2023-11-15"),
      organization: "org1",
      description: "Migrating on-prem systems to cloud",
      createdAt: new Date("2023-09-15"),
      updatedAt: new Date("2023-10-24")
    },
    {
      id: "deal5",
      name: "Mobile App Development",
      stage: "closed-won",
      value: 35000,
      probability: 100,
      closeDate: new Date("2023-10-10"),
      organization: "org4",
      description: "Custom mobile application development",
      createdAt: new Date("2023-08-20"),
      updatedAt: new Date("2023-10-10")
    },
    {
      id: "deal6",
      name: "Network Security Audit",
      stage: "closed-lost",
      value: 12000,
      probability: 0,
      closeDate: new Date("2023-10-05"),
      organization: "org5",
      description: "Comprehensive security assessment",
      createdAt: new Date("2023-08-15"),
      updatedAt: new Date("2023-10-05")
    }
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
                      {sampleDeals.filter(deal => deal.stage === stage.id).length}
                    </Badge>
                  </div>
                </div>
                <div className="bg-muted/30 rounded-b-md p-2 min-h-[400px]">
                  {sampleDeals
                    .filter(deal => deal.stage === stage.id)
                    .map(deal => (
                      <div 
                        key={deal.id} 
                        className="bg-card border rounded-md p-3 mb-2 cursor-pointer hover:border-primary transition-colors"
                        onClick={() => onDealClick(deal.id)}
                      >
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">{deal.name}</div>
                          <div className="text-sm font-medium">{formatCurrency(deal.value)}</div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {deal.organization ? `Organization ID: ${deal.organization}` : 'No organization'}
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span>Updated: {new Date(deal.updatedAt).toLocaleDateString()}</span>
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
