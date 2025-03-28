
import React, { useState } from "react";
import { type SupplyItem } from "@/types/office";

export const useSupplyManagement = () => {
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
  
  return {
    supplies,
    setSupplies,
    filteredSupplies,
    isAddSupplyOpen,
    setIsAddSupplyOpen,
    searchQuery,
    setSearchQuery,
    newSupply,
    setNewSupply,
    handleAddSupply
  };
};
