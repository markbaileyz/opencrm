
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { type SupplyItem } from "@/types/office";

interface SupplyReorderListProps {
  supplies: SupplyItem[];
}

const SupplyReorderList: React.FC<SupplyReorderListProps> = ({ supplies }) => {
  const lowStockSupplies = supplies.filter(item => item.currentStock <= item.minStock);
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Current Stock</TableHead>
          <TableHead>Min Stock</TableHead>
          <TableHead>Reorder Amount</TableHead>
          <TableHead>Supplier</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lowStockSupplies.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.currentStock} {item.unit}</TableCell>
            <TableCell>{item.minStock} {item.unit}</TableCell>
            <TableCell>{item.reorderAmount || "—"} {item.unit}</TableCell>
            <TableCell>{item.supplier || "—"}</TableCell>
            <TableCell className="text-right">
              <Button size="sm">Reorder</Button>
            </TableCell>
          </TableRow>
        ))}
        
        {lowStockSupplies.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
              No items to reorder
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default SupplyReorderList;
