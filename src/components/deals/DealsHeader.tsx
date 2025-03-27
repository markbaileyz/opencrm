
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DealsHeaderProps {
  setShowAddDealDialog: (show: boolean) => void;
  viewMode: "pipeline" | "details" | "analytics";
  setViewMode: (mode: "pipeline" | "details" | "analytics") => void;
}

const DealsHeader: React.FC<DealsHeaderProps> = ({
  setShowAddDealDialog,
  viewMode,
  setViewMode
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Deals</h1>
        <p className="text-muted-foreground">
          Manage and track your sales pipeline
        </p>
      </div>
      <div className="flex gap-2">
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
          <TabsList>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button onClick={() => setShowAddDealDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Deal
        </Button>
      </div>
    </div>
  );
};

export default DealsHeader;
