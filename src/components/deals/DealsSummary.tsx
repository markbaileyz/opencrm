
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const DealsSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">$165,000</div>
          <p className="text-muted-foreground">Total Pipeline Value</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">$18,000</div>
          <p className="text-muted-foreground">Closed This Month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">5</div>
          <p className="text-muted-foreground">Active Deals</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-green-500">60%</div>
          <p className="text-muted-foreground">Win Rate</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealsSummary;
