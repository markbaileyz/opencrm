
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import PrescriptionHistoryTable from "./PrescriptionHistoryTable";
import { DateRange } from "react-day-picker";

interface PrescriptionTabsProps {
  activeTab: "active" | "expired" | "all";
  setActiveTab: (value: "active" | "expired" | "all") => void;
  tabCounts: {
    active: number;
    expired: number;
    all: number;
  };
  searchQuery: string;
  dateRange: DateRange | undefined;
  medicationFilter: string | null;
}

const PrescriptionTabs: React.FC<PrescriptionTabsProps> = ({
  activeTab,
  setActiveTab,
  tabCounts,
  searchQuery,
  dateRange,
  medicationFilter,
}) => {
  return (
    <Tabs defaultValue="active" value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="active">
          Active
          <Badge variant="outline" className="ml-2">{tabCounts.active}</Badge>
        </TabsTrigger>
        <TabsTrigger value="expired">
          Expired
          <Badge variant="outline" className="ml-2">{tabCounts.expired}</Badge>
        </TabsTrigger>
        <TabsTrigger value="all">
          All
          <Badge variant="outline" className="ml-2">{tabCounts.all}</Badge>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="active" className="mt-4">
        <PrescriptionHistoryTable 
          status="active" 
          searchQuery={searchQuery} 
          dateRange={dateRange} 
          medicationFilter={medicationFilter} 
        />
      </TabsContent>
      
      <TabsContent value="expired" className="mt-4">
        <PrescriptionHistoryTable 
          status="expired" 
          searchQuery={searchQuery} 
          dateRange={dateRange} 
          medicationFilter={medicationFilter} 
        />
      </TabsContent>
      
      <TabsContent value="all" className="mt-4">
        <PrescriptionHistoryTable 
          status="all" 
          searchQuery={searchQuery} 
          dateRange={dateRange} 
          medicationFilter={medicationFilter} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default PrescriptionTabs;
