
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, ShoppingCart, AlertTriangle, Filter, Download, Upload } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { SupplyItem } from "@/types/office";

const SupplyManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<SupplyItem | null>(null);
  const [supplies, setSupplies] = useState<SupplyItem[]>([
    {
      id: "1",
      name: "Examination Gloves",
      category: "medical",
      currentStock: 500,
      minStock: 100,
      unit: "boxes",
      lastOrdered: "2023-10-15",
      supplier: "MedSupply Inc.",
      reorderAmount: 200,
      location: "Storage Room A"
    },
    {
      id: "2",
      name: "Printer Paper",
      category: "office",
      currentStock: 15,
      minStock: 5,
      unit: "reams",
      lastOrdered: "2023-11-02",
      supplier: "Office Depot",
      reorderAmount: 20,
      location: "Supply Closet 1"
    },
    {
      id: "3",
      name: "Disposable Face Masks",
      category: "medical",
      currentStock: 30,
      minStock: 50,
      unit: "boxes",
      lastOrdered: "2023-09-20",
      supplier: "MedSupply Inc.",
      reorderAmount: 100,
      location: "Storage Room A"
    },
    {
      id: "4",
      name: "Coffee",
      category: "kitchen",
      currentStock: 8,
      minStock: 3,
      unit: "bags",
      lastOrdered: "2023-10-28",
      supplier: "Office Depot",
      reorderAmount: 10,
      location: "Break Room"
    },
    {
      id: "5",
      name: "Disinfectant Wipes",
      category: "cleaning",
      currentStock: 12,
      minStock: 10,
      unit: "containers",
      lastOrdered: "2023-10-05",
      supplier: "Cleaning Supplies Co.",
      reorderAmount: 24,
      location: "Cleaning Closet"
    }
  ]);

  const handleAddItem = () => {
    setCurrentItem({
      id: String(Date.now()),
      name: "",
      category: "medical",
      currentStock: 0,
      minStock: 0,
      unit: "",
      lastOrdered: new Date().toISOString().split('T')[0],
      supplier: "",
      reorderAmount: 0,
      location: ""
    });
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: SupplyItem) => {
    setCurrentItem(item);
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (itemId: string) => {
    setSupplies(supplies.filter(item => item.id !== itemId));
    toast({
      title: "Item deleted",
      description: "The supply item has been removed from inventory",
      variant: "default"
    });
  };

  const handleReorderItem = (item: SupplyItem) => {
    toast({
      title: "Reorder initiated",
      description: `Ordered ${item.reorderAmount} ${item.unit} of ${item.name} from ${item.supplier}`,
      variant: "default"
    });
    
    // Update last ordered date and increase stock
    const updatedSupplies = supplies.map(supply => {
      if (supply.id === item.id) {
        return {
          ...supply,
          lastOrdered: new Date().toISOString().split('T')[0],
          currentStock: supply.currentStock + (supply.reorderAmount || 0)
        };
      }
      return supply;
    });
    
    setSupplies(updatedSupplies);
  };

  const handleSaveItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentItem) return;

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const category = formData.get("category") as SupplyItem["category"];
    const currentStock = parseInt(formData.get("currentStock") as string, 10);
    const minStock = parseInt(formData.get("minStock") as string, 10);
    const unit = formData.get("unit") as string;
    const supplier = formData.get("supplier") as string;
    const reorderAmount = parseInt(formData.get("reorderAmount") as string, 10);
    const location = formData.get("location") as string;

    const updatedItem: SupplyItem = {
      ...currentItem,
      name,
      category,
      currentStock,
      minStock,
      unit,
      supplier,
      reorderAmount,
      location
    };

    const isNewItem = !supplies.some(item => item.id === currentItem.id);
    
    if (isNewItem) {
      setSupplies([...supplies, updatedItem]);
      toast({
        title: "Item added",
        description: `${name} has been added to inventory`,
        variant: "default"
      });
    } else {
      setSupplies(supplies.map(item => 
        item.id === currentItem.id ? updatedItem : item
      ));
      toast({
        title: "Item updated",
        description: `${name} has been updated in inventory`,
        variant: "default"
      });
    }

    setIsDialogOpen(false);
    setCurrentItem(null);
  };

  const getStockStatus = (item: SupplyItem) => {
    if (item.currentStock <= 0) {
      return { status: "Out of stock", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" };
    }
    if (item.currentStock < item.minStock) {
      return { status: "Low stock", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" };
    }
    return { status: "In stock", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" };
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "medical":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "office":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "kitchen":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "cleaning":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-300";
    }
  };

  const filteredSupplies = supplies.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Supply Management</h2>
          <p className="text-muted-foreground">
            Track and manage office and medical supplies
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button onClick={handleAddItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
            <CardTitle>Inventory</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search supplies..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    {categoryFilter === "all" ? "All Categories" : 
                      categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuRadioGroup value={categoryFilter} onValueChange={setCategoryFilter}>
                    <DropdownMenuRadioItem value="all">All Categories</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="medical">Medical</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="office">Office</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="kitchen">Kitchen</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="cleaning">Cleaning</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="other">Other</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Min. Stock</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Ordered</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSupplies.length > 0 ? (
                filteredSupplies.map((item) => {
                  const status = getStockStatus(item);
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={status.color}>
                          {status.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.currentStock} {item.unit}
                      </TableCell>
                      <TableCell>{item.minStock} {item.unit}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{item.lastOrdered ? new Date(item.lastOrdered).toLocaleDateString() : "Never"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {item.currentStock < item.minStock && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8"
                              onClick={() => handleReorderItem(item)}
                            >
                              <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                              Reorder
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8"
                            onClick={() => handleEditItem(item)}
                          >
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center h-32">
                    <div className="flex flex-col items-center justify-center">
                      <AlertTriangle className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No items found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            {filteredSupplies.length} items • {supplies.filter(i => i.currentStock < i.minStock).length} low stock
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{currentItem?.name ? 'Edit Supply Item' : 'Add New Supply Item'}</DialogTitle>
            <DialogDescription>
              {currentItem?.name 
                ? 'Update the supply item details below.'
                : 'Fill in the details for the new supply item.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveItem}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter item name"
                  defaultValue={currentItem?.name}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue={currentItem?.category}>
                    <SelectTrigger>
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

                <div className="grid gap-2">
                  <Label htmlFor="location">Storage Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Where is it stored?"
                    defaultValue={currentItem?.location}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="currentStock">Current Stock</Label>
                  <Input
                    id="currentStock"
                    name="currentStock"
                    type="number"
                    min="0"
                    defaultValue={currentItem?.currentStock}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="minStock">Minimum Stock</Label>
                  <Input
                    id="minStock"
                    name="minStock"
                    type="number"
                    min="0"
                    defaultValue={currentItem?.minStock}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    name="unit"
                    placeholder="boxes, items, etc."
                    defaultValue={currentItem?.unit}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    name="supplier"
                    placeholder="Who supplies this item?"
                    defaultValue={currentItem?.supplier}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="reorderAmount">Reorder Amount</Label>
                  <Input
                    id="reorderAmount"
                    name="reorderAmount"
                    type="number"
                    min="0"
                    defaultValue={currentItem?.reorderAmount}
                    required
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupplyManagement;
