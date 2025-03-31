
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { DateRange } from "react-day-picker";
import PrescriptionHistoryFilters from "./PrescriptionHistoryFilters";
import PrescriptionSearchBar from "./PrescriptionSearchBar";
import PrescriptionDateRangeSelector from "./PrescriptionDateRangeSelector";
import PrescriptionRefillSummary from "./PrescriptionRefillSummary";
import PrescriptionTabs from "./PrescriptionTabs";

interface PrescriptionHistoryViewProps {
  patientId?: string;
}

const PrescriptionHistoryView: React.FC<PrescriptionHistoryViewProps> = ({ patientId }) => {
  const [activeTab, setActiveTab] = useState<"active" | "expired" | "all">("active");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null);

  // Mock data for tab counts
  const tabCounts = {
    active: 12,
    expired: 8,
    all: 20
  };

  // Mock data for refill counts
  const refillCounts = {
    pending: 2,
    approved: 1,
    processing: 1
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <PrescriptionSearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        <div className="flex gap-2">
          <PrescriptionDateRangeSelector 
            dateRange={dateRange} 
            setDateRange={setDateRange} 
          />
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-primary/10" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <PrescriptionHistoryFilters 
          onSelectMedication={setSelectedMedication} 
          selectedMedication={selectedMedication} 
        />
      )}

      <PrescriptionRefillSummary refillCounts={refillCounts} />

      <PrescriptionTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabCounts={tabCounts}
        searchQuery={searchQuery}
        dateRange={dateRange}
        medicationFilter={selectedMedication}
      />
    </div>
  );
};

export default PrescriptionHistoryView;
