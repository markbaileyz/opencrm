import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOfficeResources } from '@/hooks/office/useOfficeResources';
import { useSuppliesFilter } from './useSuppliesFilter';
import SupplyFilters from './SupplyFilters';
import SupplyList from './SupplyList';

const SuppliesManagement: React.FC = () => {
  const { supplies, supplyCategories, updateSupplyStock, reorderSupply, loading } = useOfficeResources();
  const { 
    searchQuery, 
    setSearchQuery, 
    categoryFilter, 
    setCategoryFilter, 
    filteredSupplies 
  } = useSuppliesFilter(supplies);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Supplies Management</CardTitle>
        <CardDescription>
          Track and manage office supplies and inventory
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SupplyFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          supplyCategories={supplyCategories}
        />

        <SupplyList 
          supplies={filteredSupplies}
          loading={loading}
          searchQuery={searchQuery}
          updateSupplyStock={updateSupplyStock}
          reorderSupply={reorderSupply}
        />
      </CardContent>
    </Card>
  );
};

export default SuppliesManagement;
