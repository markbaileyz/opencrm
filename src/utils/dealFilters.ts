
import { Deal } from "@/types/deal";
import { DealFiltersState } from "@/components/deals/DealFilters";

export const filterDeals = (deals: Deal[], filters: DealFiltersState): Deal[] => {
  return deals.filter(deal => {
    // Search filter
    if (filters.search && !deal.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Stage filter
    if (filters.stage && filters.stage !== 'all' && deal.stage !== filters.stage) {
      return false;
    }

    // Organization filter
    if (filters.organization && filters.organization !== 'all' && deal.organization !== filters.organization) {
      return false;
    }

    // Close date filter
    if (filters.closeDate && filters.closeDate !== 'all') {
      const closeDate = new Date(deal.closeDate);
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      
      if (filters.closeDate === 'this-month') {
        if (closeDate.getMonth() !== currentMonth || closeDate.getFullYear() !== currentYear) {
          return false;
        }
      } else if (filters.closeDate === 'next-month') {
        const nextMonth = (currentMonth + 1) % 12;
        const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        if (closeDate.getMonth() !== nextMonth || closeDate.getFullYear() !== nextMonthYear) {
          return false;
        }
      } else if (filters.closeDate === 'this-quarter') {
        const currentQuarter = Math.floor(currentMonth / 3);
        const dealQuarter = Math.floor(closeDate.getMonth() / 3);
        if (dealQuarter !== currentQuarter || closeDate.getFullYear() !== currentYear) {
          return false;
        }
      } else if (filters.closeDate === 'next-quarter') {
        const currentQuarter = Math.floor(currentMonth / 3);
        const nextQuarter = (currentQuarter + 1) % 4;
        const nextQuarterYear = currentQuarter === 3 ? currentYear + 1 : currentYear;
        const dealQuarter = Math.floor(closeDate.getMonth() / 3);
        if (dealQuarter !== nextQuarter || closeDate.getFullYear() !== nextQuarterYear) {
          return false;
        }
      }
    }

    // Value filter
    if (filters.value && filters.value !== 'all') {
      if (filters.value === 'low' && deal.value >= 10000) {
        return false;
      } else if (filters.value === 'medium' && (deal.value < 10000 || deal.value > 50000)) {
        return false;
      } else if (filters.value === 'high' && (deal.value < 50000 || deal.value > 100000)) {
        return false;
      } else if (filters.value === 'very-high' && deal.value <= 100000) {
        return false;
      }
    }

    return true;
  });
};
