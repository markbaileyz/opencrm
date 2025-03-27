
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Deal } from "@/types/deal";

interface DealsSummaryProps {
  deals: Deal[];
}

const DealsSummary: React.FC<DealsSummaryProps> = ({ deals }) => {
  // Calculate total pipeline value
  const totalPipelineValue = deals.reduce((total, deal) => total + deal.value, 0);
  
  // Calculate value of deals closed this month
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const closedThisMonth = deals
    .filter(deal => deal.stage === "closed-won" && 
            new Date(deal.updatedAt) >= firstDayOfMonth)
    .reduce((total, deal) => total + deal.value, 0);
  
  // Count active deals
  const activeDeals = deals.filter(deal => 
    deal.stage !== "closed-won" && deal.stage !== "closed-lost"
  ).length;
  
  // Calculate win rate (simplified)
  const closedDeals = deals.filter(deal => 
    deal.stage === "closed-won" || deal.stage === "closed-lost"
  );
  
  const winRate = closedDeals.length > 0 
    ? Math.round((deals.filter(deal => deal.stage === "closed-won").length / closedDeals.length) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">${totalPipelineValue.toLocaleString()}</div>
          <p className="text-muted-foreground">Total Pipeline Value</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">${closedThisMonth.toLocaleString()}</div>
          <p className="text-muted-foreground">Closed This Month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{activeDeals}</div>
          <p className="text-muted-foreground">Active Deals</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-green-500">{winRate}%</div>
          <p className="text-muted-foreground">Win Rate</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealsSummary;
