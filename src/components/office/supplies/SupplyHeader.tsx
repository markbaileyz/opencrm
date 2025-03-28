
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { type SupplyItem } from "@/types/office";

interface SupplyHeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  isAddSupplyOpen: boolean;
  setIsAddSupplyOpen: (value: boolean) => void;
  handleAddSupply: () => void;
  newSupply: Partial<SupplyItem>;
  setNewSupply: (value: Partial<SupplyItem>) => void;
}

const SupplyHeader: React.FC<SupplyHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  isAddSupplyOpen,
  setIsAddSupplyOpen,
  handleAddSupply,
  newSupply,
  setNewSupply
}) => {
  return (
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
  );
};

export default SupplyHeader;
