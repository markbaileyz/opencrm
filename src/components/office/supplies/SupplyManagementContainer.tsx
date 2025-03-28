
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SupplyInventoryList from "./SupplyInventoryList";
import SupplyReorderList from "./SupplyReorderList";
import SupplyHeader from "./SupplyHeader";
import { useSupplyManagement } from "./useSupplyManagement";

const SupplyManagementContainer: React.FC = () => {
  const {
    supplies,
    filteredSupplies,
    searchQuery,
    setSearchQuery,
    isAddSupplyOpen,
    setIsAddSupplyOpen,
    handleAddSupply,
    newSupply,
    setNewSupply
  } = useSupplyManagement();
  
  return (
    <div className="space-y-6">
      <SupplyHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isAddSupplyOpen={isAddSupplyOpen}
        setIsAddSupplyOpen={setIsAddSupplyOpen}
        handleAddSupply={handleAddSupply}
        newSupply={newSupply}
        setNewSupply={setNewSupply}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <SupplyInventoryList supplies={filteredSupplies} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Items to Reorder</CardTitle>
        </CardHeader>
        <CardContent>
          <SupplyReorderList supplies={supplies} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplyManagementContainer;
