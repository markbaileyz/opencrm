
import { useState, useEffect } from 'react';
import { SupplyItem } from '@/types/office';

// Sample supplies data
const sampleSupplies: SupplyItem[] = [
  {
    id: '1',
    name: 'Examination Gloves',
    category: 'medical',
    currentStock: 450,
    minStock: 200,
    unit: 'boxes',
    lastOrdered: '2023-10-15',
    supplier: 'Medical Supplies Inc.',
    reorderAmount: 100,
    location: 'Storage Room A'
  },
  {
    id: '2',
    name: 'Printer Paper',
    category: 'office',
    currentStock: 15,
    minStock: 10,
    unit: 'reams',
    lastOrdered: '2023-11-02',
    supplier: 'Office Depot',
    reorderAmount: 20,
    location: 'Reception Cabinet'
  },
  {
    id: '3',
    name: 'Disinfectant Wipes',
    category: 'cleaning',
    currentStock: 12,
    minStock: 10,
    unit: 'containers',
    lastOrdered: '2023-10-28',
    supplier: 'CleanCo',
    reorderAmount: 24,
    location: 'Supply Closet'
  },
  {
    id: '4',
    name: 'Coffee',
    category: 'kitchen',
    currentStock: 5,
    minStock: 3,
    unit: 'bags',
    lastOrdered: '2023-11-05',
    supplier: 'Coffee Beans Co.',
    reorderAmount: 10,
    location: 'Break Room'
  },
  {
    id: '5',
    name: 'Face Masks',
    category: 'medical',
    currentStock: 120,
    minStock: 100,
    unit: 'boxes',
    lastOrdered: '2023-10-10',
    supplier: 'Medical Supplies Inc.',
    reorderAmount: 50,
    location: 'Storage Room A'
  }
];

export const useSupplies = () => {
  const [supplies, setSupplies] = useState<SupplyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    
    // Simulate API response
    setTimeout(() => {
      setSupplies(sampleSupplies);
      setLoading(false);
    }, 500);
  }, []);

  // Supply categories
  const supplyCategories = Array.from(new Set(supplies.map(supply => supply.category)));

  // Calculate low stock supplies
  const lowStockSupplies = supplies.filter(supply => 
    supply.currentStock <= supply.minStock
  );

  // Supply management functions
  const updateSupplyStock = (supplyId: string, newStock: number) => {
    setSupplies(current => 
      current.map(supply => 
        supply.id === supplyId ? { ...supply, currentStock: newStock } : supply
      )
    );
  };

  const reorderSupply = (supplyId: string) => {
    setSupplies(current => 
      current.map(supply => {
        if (supply.id === supplyId && supply.reorderAmount) {
          return {
            ...supply,
            currentStock: supply.currentStock + supply.reorderAmount,
            lastOrdered: new Date().toISOString().split('T')[0]
          };
        }
        return supply;
      })
    );
  };

  return {
    supplies,
    loading,
    error,
    supplyCategories,
    lowStockSupplies,
    updateSupplyStock,
    reorderSupply
  };
};
