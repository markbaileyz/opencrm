
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Calendar, CheckSquare, Package, Users } from "lucide-react";

interface OfficeMetricsCardsProps {
  overdueTasks: any[] | null;
  lowStockSupplies: any[];
}

const OfficeMetricsCards: React.FC<OfficeMetricsCardsProps> = ({ 
  overdueTasks, 
  lowStockSupplies 
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Today's Appointments
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">
            2 are new patients
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Tasks
          </CardTitle>
          <CheckSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overdueTasks ? overdueTasks.length : 0}</div>
          <p className="text-xs text-muted-foreground">
            {overdueTasks && overdueTasks.length > 0 ? 'Overdue tasks need attention' : 'No overdue tasks'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Staff On Duty
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">6</div>
          <p className="text-xs text-muted-foreground">
            2 doctors, 3 nurses, 1 admin
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Supplies to Reorder
          </CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{lowStockSupplies.length}</div>
          <p className="text-xs text-muted-foreground">
            {lowStockSupplies.length > 0 ? 'Items below minimum stock' : 'All supplies are stocked'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfficeMetricsCards;
