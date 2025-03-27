
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

interface DealPipelineProps {
  deals: Deal[];
  onEdit?: (deal: Deal) => void;
}

const DealPipeline: React.FC<DealPipelineProps> = ({ deals, onEdit }) => {
  const stages = [
    { id: "lead", name: "Lead" },
    { id: "qualification", name: "Qualified" },
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
                        className="bg-card border rounded-md p-3 mb-2 cursor-pointer hover:border-primary transition-colors"
                        onClick={() => onEdit && onEdit(deal)}
                      >
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">{deal.name}</div>
                          <div className="text-sm font-medium">${deal.value.toLocaleString()}</div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {/* Here we would show organization name, but for now we're just showing the id */}
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
