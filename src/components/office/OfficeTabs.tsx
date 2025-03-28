
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OfficeTabsProps {
  defaultValue: string;
  overdueTasks: any[] | null;
  lowStockSupplies: any[];
  onChange?: (value: string) => void;
}

const OfficeTabs: React.FC<OfficeTabsProps> = ({ 
  defaultValue, 
  overdueTasks, 
  lowStockSupplies,
  onChange
}) => {
  return (
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
      <TabsTrigger value="tasks">
        Tasks
        {overdueTasks && overdueTasks.length > 0 && (
          <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {overdueTasks.length}
          </span>
        )}
      </TabsTrigger>
      <TabsTrigger value="resources">
        Resources
        {lowStockSupplies.length > 0 && (
          <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {lowStockSupplies.length}
          </span>
        )}
      </TabsTrigger>
      <TabsTrigger value="staff">
        Staff
      </TabsTrigger>
      <TabsTrigger value="communications">Communications</TabsTrigger>
    </TabsList>
  );
};

export default OfficeTabs;
