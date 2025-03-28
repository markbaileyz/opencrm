
import { useState, useMemo } from 'react';
import { SupplyItem } from '@/types/office';

export const useSuppliesFilter = (supplies: SupplyItem[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredSupplies = useMemo(() => {
    return supplies.filter(supply => {
      const matchesSearch = supply.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || supply.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [supplies, searchQuery, categoryFilter]);

  return {
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    filteredSupplies
  };
};
