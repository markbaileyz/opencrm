
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import OfficeMetricsCards from "./OfficeMetricsCards";
import OfficeQuickActions from "./OfficeQuickActions";

interface OfficeDashboardProps {
  overdueTasks: any[] | null;
  lowStockSupplies: any[];
}

const OfficeDashboard: React.FC<OfficeDashboardProps> = ({ 
  overdueTasks, 
  lowStockSupplies 
}) => {
  return (
    <div className="space-y-4">
      <OfficeMetricsCards 
        overdueTasks={overdueTasks} 
        lowStockSupplies={lowStockSupplies} 
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Office Dashboard</CardTitle>
            <CardDescription>
              Daily operations overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
              <p className="text-muted-foreground">Dashboard charts coming soon</p>
            </div>
          </CardContent>
        </Card>
        
        <OfficeQuickActions />
      </div>
    </div>
  );
};

export default OfficeDashboard;
