
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, Plus, ArrowDownUp, 
  DollarSign, AlertCircle, BarChart, Clock 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Deal {
  id: string;
  name: string;
  stage: string;
  value: number;
  probability: number;
  expectedCloseDate: string;
  owner: string;
  progress: number;
}

interface OrganizationDealsProps {
  organizationId: string;
}

const OrganizationDeals: React.FC<OrganizationDealsProps> = ({ organizationId }) => {
  // Mock deals data - in a real app this would come from an API
  const deals: Deal[] = [
    {
      id: "1",
      name: "Enterprise License Renewal",
      stage: "Negotiation",
      value: 75000,
      probability: 85,
      expectedCloseDate: "2024-06-15",
      owner: "Alex Johnson",
      progress: 80
    },
    {
      id: "2",
      name: "Cloud Migration Project",
      stage: "Proposal",
      value: 120000,
      probability: 60,
      expectedCloseDate: "2024-07-30",
      owner: "Emily Chen",
      progress: 40
    },
    {
      id: "3",
      name: "Support Package Upgrade",
      stage: "Qualified",
      value: 25000,
      probability: 50,
      expectedCloseDate: "2024-08-10",
      owner: "Alex Johnson",
      progress: 30
    }
  ];

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    });
  };

  // Get stage color
  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "qualified": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "proposal": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
      case "negotiation": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "closed won": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "closed lost": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Calculate days until expected close
  const getDaysUntilClose = (dateString: string) => {
    const today = new Date();
    const closeDate = new Date(dateString);
    const diffTime = closeDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Total potential value
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  
  // Weighted pipeline value
  const weightedValue = deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Search deals..." 
            className="max-w-sm"
            startIcon={<Search className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="gap-1">
            <ArrowDownUp className="h-3.5 w-3.5" />
            <span>Sort</span>
          </Button>
          <Button size="sm" className="gap-1">
            <Plus className="h-3.5 w-3.5" />
            <span>Create Deal</span>
          </Button>
        </div>
      </div>
      
      {/* Deal summary card */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                <BarChart className="h-3.5 w-3.5 text-muted-foreground" />
                Open Deals
              </h4>
              <p className="text-2xl font-bold">{deals.length}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                Pipeline Value
              </h4>
              <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                Weighted Value
              </h4>
              <p className="text-2xl font-bold">{formatCurrency(weightedValue)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {deals.length > 0 ? (
        <div className="space-y-3">
          {deals.map(deal => (
            <Card key={deal.id} className="hover:bg-muted/40 transition-colors">
              <CardContent className="p-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{deal.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStageColor(deal.stage)}>
                          {deal.stage}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          Closing: {formatDate(deal.expectedCloseDate)}
                          {getDaysUntilClose(deal.expectedCloseDate) > 0 && 
                            ` (${getDaysUntilClose(deal.expectedCloseDate)} days)`
                          }
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{formatCurrency(deal.value)}</div>
                      <div className="text-sm text-muted-foreground">
                        {deal.probability}% probability
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{deal.progress}%</span>
                    </div>
                    <Progress
                      value={deal.progress}
                      className="h-1.5"
                      indicatorStyle={{
                        background: 
                          deal.progress >= 80 ? "hsl(var(--success))" :
                          deal.progress >= 40 ? "hsl(var(--primary))" :
                          "hsl(var(--warning))"
                      }}
                    />
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Owner: {deal.owner}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md">
          <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="font-medium">No deals found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Create your first deal with this organization
          </p>
          <Button variant="outline" className="mt-4 gap-1">
            <Plus className="h-4 w-4" />
            <span>Create Deal</span>
          </Button>
        </div>
      )}
      
      {deals.length > 0 && (
        <div className="flex justify-between items-center text-sm text-muted-foreground pt-2">
          <span>Showing {deals.length} deals</span>
          {deals.length >= 3 && (
            <Button variant="link" size="sm" className="gap-1 h-8 p-0">
              View All Deals
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrganizationDeals;
