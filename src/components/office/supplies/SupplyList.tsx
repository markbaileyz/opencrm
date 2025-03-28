
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, RefreshCcw, Package } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { SupplyItem } from '@/types/office';
import { useToast } from '@/hooks/use-toast';

interface SupplyListProps {
  supplies: SupplyItem[];
  loading: boolean;
  searchQuery: string;
  updateSupplyStock: (supplyId: string, newStock: number) => void;
  reorderSupply: (supplyId: string) => void;
}

const SupplyList: React.FC<SupplyListProps> = ({ 
  supplies, 
  loading, 
  searchQuery,
  updateSupplyStock,
  reorderSupply
}) => {
  const { toast } = useToast();

  const handleReorder = (supplyId: string) => {
    reorderSupply(supplyId);
    toast({
      title: "Supplies Reordered",
      description: "The supplies have been reordered successfully."
    });
  };

  const handleUpdateStock = (supplyId: string, newStock: number) => {
    updateSupplyStock(supplyId, newStock);
    toast({
      title: "Stock Updated",
      description: "The supply stock has been updated successfully."
    });
  };

  const getStockPercentage = (supply: SupplyItem) => {
    return Math.min(100, Math.max(0, (supply.currentStock / (supply.minStock * 2)) * 100));
  };

  const getStockStatus = (supply: SupplyItem) => {
    if (supply.currentStock <= supply.minStock * 0.5) {
      return "critical";
    } else if (supply.currentStock <= supply.minStock) {
      return "low";
    } else if (supply.currentStock <= supply.minStock * 1.5) {
      return "adequate";
    } else {
      return "good";
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading supplies...</div>;
  }

  if (supplies.length === 0) {
    return (
      <div className="text-center py-10">
        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No supplies found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {supplies.map(supply => {
        const stockPercentage = getStockPercentage(supply);
        const stockStatus = getStockStatus(supply);
        const isLowStock = supply.currentStock <= supply.minStock;
        
        return (
          <Card key={supply.id} className="overflow-hidden">
            <div className={`h-1 ${
              stockStatus === "good" ? "bg-green-500" :
              stockStatus === "adequate" ? "bg-blue-500" :
              stockStatus === "low" ? "bg-yellow-500" : 
              "bg-red-500"
            }`} />
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="space-y-1">
                  <h3 className="font-medium text-lg">{supply.name}</h3>
                  <Badge className="capitalize">{supply.category}</Badge>
                </div>
                {isLowStock && (
                  <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Low Stock
                  </Badge>
                )}
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Current Stock: {supply.currentStock} {supply.unit}</span>
                  <span>Minimum: {supply.minStock} {supply.unit}</span>
                </div>
                
                <Progress 
                  value={stockPercentage} 
                  className="h-2"
                  indicatorStyle={{
                    background: stockStatus === "good" ? "hsl(var(--success))" :
                                stockStatus === "adequate" ? "hsl(var(--primary))" :
                                stockStatus === "low" ? "hsl(var(--warning))" : 
                                "hsl(var(--destructive))"
                  }}
                />
                
                <div className="flex text-xs items-center justify-between mt-1">
                  <div>
                    Location: {supply.location || "Not specified"}
                  </div>
                  <div>
                    Last ordered: {supply.lastOrdered || "Never"}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2">
                    <Input 
                      type="number" 
                      className="w-[80px]" 
                      defaultValue={supply.currentStock} 
                      onChange={(e) => {
                        if (e.target.value) {
                          handleUpdateStock(supply.id, parseInt(e.target.value));
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value) {
                          handleUpdateStock(supply.id, parseInt(e.target.value));
                        }
                      }}
                    />
                    <span className="flex items-center text-sm text-muted-foreground">
                      {supply.unit}
                    </span>
                  </div>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleReorder(supply.id)}
                    disabled={!isLowStock}
                  >
                    <RefreshCcw className="h-4 w-4" />
                    Reorder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SupplyList;
