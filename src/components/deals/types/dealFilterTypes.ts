
export interface DealFiltersProps {
  filters: DealFiltersState;
  onFilterChange: (filters: DealFiltersState) => void;
}

export type DealFiltersState = {
  search: string;
  stage: string;
  value: string;
  sortBy: string;
  organization?: string;
  closeDate?: string;
  probability?: string;
  tags?: string[];
};
