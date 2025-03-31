
import { useMemo } from "react";
import { DateRange } from "react-day-picker";

// Define the prescription type to match what we're using
export interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  prescribedDate: Date;
  expiryDate: Date;
  prescribedBy: string;
  status: string;
  pharmacy: string;
  refillsRemaining: number;
  lastFilled: Date;
  refillStatus?: string;
}

interface UsePrescriptionFiltersProps {
  prescriptions: Prescription[];
  status: "active" | "expired" | "all";
  searchQuery: string;
  dateRange: DateRange | undefined;
  medicationFilter: string | null;
}

export const usePrescriptionFilters = ({
  prescriptions,
  status,
  searchQuery,
  dateRange,
  medicationFilter,
}: UsePrescriptionFiltersProps) => {
  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter((prescription) => {
      // Filter by status
      if (status !== "all" && prescription.status !== status) {
        return false;
      }

      // Filter by search query
      if (
        searchQuery &&
        !prescription.medicationName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !prescription.id.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter by date range
      if (dateRange?.from && prescription.prescribedDate < dateRange.from) {
        return false;
      }
      if (dateRange?.to && prescription.prescribedDate > dateRange.to) {
        return false;
      }

      // Filter by medication
      if (medicationFilter && prescription.medicationName !== medicationFilter) {
        return false;
      }

      return true;
    });
  }, [prescriptions, status, searchQuery, dateRange, medicationFilter]);

  return { filteredPrescriptions };
};
