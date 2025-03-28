
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { type SupplyItem } from "@/types/office";

interface SupplyInventoryListProps {
  supplies: SupplyItem[];
}

const SupplyInventoryList: React.FC<SupplyInventoryListProps> = ({ supplies }) => {
  const getCategoryLabel = (category: SupplyItem["category"]) => {
    switch (category) {
      case "medical": return "Medical";
      case "office": return "Office";
      case "kitchen": return "Kitchen";
      case "cleaning": return "Cleaning";
      default: return "Other";
    }
  };
  
  const getStockStatus = (current: number, min: number) => {
    if (current <= 0) return { label: "Out of Stock", className: "bg-red-100 text-red-800" };
    if (current <= min) return { label: "Low Stock", className: "bg-yellow-100 text-yellow-800" };
    return { label: "In Stock", className: "bg-green-100 text-green-800" };
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Current Stock</TableHead>
          <TableHead className="text-right">Min Stock</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {supplies.map((item) => {
          const stockStatus = getStockStatus(item.currentStock, item.minStock);
          
          return (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{getCategoryLabel(item.category)}</TableCell>
              <TableCell className="text-right">{item.currentStock} {item.unit}</TableCell>
              <TableCell className="text-right">{item.minStock} {item.unit}</TableCell>
              <TableCell>
                <Badge className={stockStatus.className}>
                  {stockStatus.label}
                </Badge>
              </TableCell>
              <TableCell>{item.location || "—"}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button size="sm" variant="outline">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                  <Button size="sm" variant="outline">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    Use
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
        
        {supplies.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
              No supplies found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default SupplyInventoryList;
