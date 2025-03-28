
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Package, AlertTriangle, RefreshCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useOfficeResources } from '@/hooks/useOfficeResources';
import { useToast } from '@/hooks/use-toast';

const SuppliesManagement: React.FC = () => {
  const { supplies, supplyCategories, updateSupplyStock, reorderSupply, loading } = useOfficeResources();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredSupplies = supplies.filter(supply => {
    const matchesSearch = supply.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || supply.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleReorder = (supplyId: string, supplyName: string) => {
    reorderSupply(supplyId);
    toast({
      title: "Supply Reordered",
      description: `${supplyName} has been reordered.`
    });
  };

  const getCategoryDisplay = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getStockLevel = (current: number, min: number) => {
    if (current <= min * 0.5) return { level: 'critical', color: 'bg-red-500' };
    if (current <= min) return { level: 'low', color: 'bg-yellow-500' };
    if (current <= min * 1.5) return { level: 'moderate', color: 'bg-blue-500' };
    return { level: 'good', color: 'bg-green-500' };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Supplies Management</CardTitle>
        <CardDescription>
          Track and manage office supplies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search supplies..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {supplyCategories.map(category => (
                <SelectItem key={category} value={category}>
                  {getCategoryDisplay(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading supplies...</div>
        ) : filteredSupplies.length === 0 ? (
          <div className="text-center py-10">
            <Package className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No supplies found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSupplies.map((supply) => {
              const stockStatus = getStockLevel(supply.currentStock, supply.minStock);
              const stockPercentage = Math.min(100, (supply.currentStock / (supply.minStock * 2)) * 100);
              
              return (
                <Card key={supply.id} className="overflow-hidden">
                  <div className={`h-1 ${stockStatus.color}`} />
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{supply.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {supply.location && `${supply.location} • `}
                          {supply.supplier && `${supply.supplier}`}
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {getCategoryDisplay(supply.category)}
                      </Badge>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Stock Level:</span>
                        <span className={`font-medium ${
                          stockStatus.level === 'critical' ? 'text-red-600' :
                          stockStatus.level === 'low' ? 'text-yellow-600' :
                          stockStatus.level === 'moderate' ? 'text-blue-600' :
                          'text-green-600'
                        }`}>
                          {supply.currentStock} / {supply.minStock} {supply.unit}
                        </span>
                      </div>
                      
                      <Progress value={stockPercentage} className="h-2" />
                      
                      {supply.currentStock <= supply.minStock && (
                        <div className="flex items-center gap-1 text-yellow-600 text-sm">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Stock below minimum level</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-sm mt-1">
                        <span>Last Ordered:</span>
                        <span>{supply.lastOrdered || 'Never'}</span>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button 
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleReorder(supply.id, supply.name)}
                        >
                          <RefreshCcw className="h-4 w-4" />
                          Reorder {supply.reorderAmount} {supply.unit}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SuppliesManagement;
