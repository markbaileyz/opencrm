
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { type SupplyItem } from "@/types/office";
import { Plus, Search, ArrowDown, ArrowUp } from "lucide-react";

const SupplyManagement: React.FC = () => {
  const [supplies, setSupplies] = useState<SupplyItem[]>([
    {
      id: "sup-1",
      name: "Copy Paper",
      category: "office",
      currentStock: 10,
      minStock: 5,
      unit: "ream",
      supplier: "Office Depot",
      reorderAmount: 20,
      location: "Storage Room"
    },
    {
      id: "sup-2",
      name: "Pens",
      category: "office",
      currentStock: 50,
      minStock: 20,
      unit: "box",
      supplier: "Staples",
      reorderAmount: 10,
      location: "Front Desk"
    },
    {
      id: "sup-3",
      name: "Coffee",
      category: "kitchen",
      currentStock: 3,
      minStock: 5,
      unit: "bag",
      supplier: "Amazon",
      reorderAmount: 5,
      location: "Break Room"
    },
    {
      id: "sup-4",
      name: "Hand Sanitizer",
      category: "cleaning",
      currentStock: 8,
      minStock: 3,
      unit: "bottle",
      supplier: "Costco",
      reorderAmount: 12,
      location: "All Rooms"
    },
  ]);
  
  const [isAddSupplyOpen, setIsAddSupplyOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newSupply, setNewSupply] = useState<Partial<SupplyItem>>({
    name: "",
    category: "office",
    currentStock: 0,
    minStock: 1,
    unit: "",
    supplier: "",
    reorderAmount: 0,
    location: ""
  });
  
  const handleAddSupply = () => {
    const supplyToAdd: SupplyItem = {
      id: `sup-${Date.now()}`,
      name: newSupply.name || "New Supply",
      category: newSupply.category || "office",
      currentStock: newSupply.currentStock || 0,
      minStock: newSupply.minStock || 1,
      unit: newSupply.unit || "item",
      supplier: newSupply.supplier,
      reorderAmount: newSupply.reorderAmount,
      location: newSupply.location
    };
    
    setSupplies([...supplies, supplyToAdd]);
    setIsAddSupplyOpen(false);
    setNewSupply({
      name: "",
      category: "office",
      currentStock: 0,
      minStock: 1,
      unit: "",
      supplier: "",
      reorderAmount: 0,
      location: ""
    });
  };
  
  const filteredSupplies = supplies.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.supplier && item.supplier.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Supply Inventory</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search supplies..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <Dialog open={isAddSupplyOpen} onOpenChange={setIsAddSupplyOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Supply
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Supply</DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="supply-name">Name</Label>
                  <Input 
                    id="supply-name" 
                    value={newSupply.name || ""}
                    onChange={(e) => setNewSupply({...newSupply, name: e.target.value})}
                    placeholder="Enter supply name" 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="supply-category">Category</Label>
                  <Select 
                    value={newSupply.category || "office"}
                    onValueChange={(value) => setNewSupply({...newSupply, category: value as SupplyItem["category"]})}
                  >
                    <SelectTrigger id="supply-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="kitchen">Kitchen</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-stock">Current Stock</Label>
                    <Input 
                      id="current-stock" 
                      type="number" 
                      min="0"
                      value={newSupply.currentStock || 0}
                      onChange={(e) => setNewSupply({...newSupply, currentStock: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="min-stock">Min Stock</Label>
                    <Input 
                      id="min-stock" 
                      type="number" 
                      min="0"
                      value={newSupply.minStock || 1}
                      onChange={(e) => setNewSupply({...newSupply, minStock: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input 
                    id="unit" 
                    value={newSupply.unit || ""}
                    onChange={(e) => setNewSupply({...newSupply, unit: e.target.value})}
                    placeholder="e.g., box, ream, bottle" 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="supplier">Supplier (Optional)</Label>
                  <Input 
                    id="supplier" 
                    value={newSupply.supplier || ""}
                    onChange={(e) => setNewSupply({...newSupply, supplier: e.target.value})}
                    placeholder="Enter supplier name" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="reorder-amount">Reorder Amount</Label>
                    <Input 
                      id="reorder-amount" 
                      type="number" 
                      min="0"
                      value={newSupply.reorderAmount || 0}
                      onChange={(e) => setNewSupply({...newSupply, reorderAmount: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={newSupply.location || ""}
                      onChange={(e) => setNewSupply({...newSupply, location: e.target.value})}
                      placeholder="e.g., Storage Room" 
                    />
                  </div>
                </div>
              </div>
              
              <Button onClick={handleAddSupply}>Add Supply</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
        </CardHeader>
        <CardContent>
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
              {filteredSupplies.map((item) => {
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
              
              {filteredSupplies.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    No supplies found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Items to Reorder</CardTitle>
        </CardHeader>
        <CardContent>
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
              {supplies
                .filter(item => item.currentStock <= item.minStock)
                .map((item) => (
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
              
              {supplies.filter(item => item.currentStock <= item.minStock).length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No items to reorder
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplyManagement;
