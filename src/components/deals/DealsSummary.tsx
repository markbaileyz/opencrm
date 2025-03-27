
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, Target } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export interface DealsSummaryProps {
  deals?: Array<{
    id: string;
    stage: string;
    value: number;
    probability: number;
  }>;
}

const DealsSummary: React.FC<DealsSummaryProps> = ({ deals = [] }) => {
  // Calculate summary metrics
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const weightedValue = deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);
  const openDeals = deals.filter(deal => 
    !["closed-won", "closed-lost"].includes(deal.stage)
  ).length;
  const wonDeals = deals.filter(deal => deal.stage === "closed-won").length;

  // Sample data for when no deals are passed
  const sampleTotalValue = totalValue || 325000;
  const sampleWeightedValue = weightedValue || 198000;
  const sampleOpenDeals = openDeals || 24;
  const sampleWonDeals = wonDeals || 18;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Pipeline Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(sampleTotalValue)}</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">12%</span> from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weighted Pipeline</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(sampleWeightedValue)}</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">8%</span> from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open Deals</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sampleOpenDeals}</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">10%</span> from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Won Deals (YTD)</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sampleWonDeals}</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            <span className="text-red-500 font-medium">3%</span> from last year
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealsSummary;
