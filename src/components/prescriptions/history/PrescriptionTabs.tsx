
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { DateRange } from "react-day-picker";
import { prescriptionHistoryData } from "@/data/prescriptionData";
import PrescriptionHistoryTable from "./PrescriptionHistoryTable";
import SendToPrescriptionDialog from "../pharmacy/SendToPrescriptionDialog";

interface PrescriptionTabsProps {
  activeTab: "active" | "expired" | "all";
  setActiveTab: (tab: "active" | "expired" | "all") => void;
  tabCounts: {
    active: number;
    expired: number;
    all: number;
  };
  searchQuery: string;
  dateRange: DateRange | undefined;
  medicationFilter: string | null;
}

const PrescriptionTabs: React.FC<PrescriptionTabsProps> = ({
  activeTab,
  setActiveTab,
  tabCounts,
  searchQuery,
  dateRange,
  medicationFilter,
}) => {
  const [selectedPrescription, setSelectedPrescription] = useState<{
    id: string;
    medicationName: string;
    patientName: string;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSendToPrescription = (prescription: typeof prescriptionHistoryData[0]) => {
    setSelectedPrescription({
      id: prescription.id.toString(),
      medicationName: prescription.medication,
      patientName: prescription.patientName
    });
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as "active" | "expired" | "all")}>
          <TabsList>
            <TabsTrigger value="active">
              Active ({tabCounts.active})
            </TabsTrigger>
            <TabsTrigger value="expired">
              Expired ({tabCounts.expired})
            </TabsTrigger>
            <TabsTrigger value="all">
              All ({tabCounts.all})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="pt-4">
            <PrescriptionHistoryTable 
              status="active"
              searchQuery={searchQuery}
              dateRange={dateRange}
              medicationFilter={medicationFilter}
              actionButton={(prescription) => (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex gap-1 items-center"
                  onClick={() => handleSendToPrescription(prescription)}
                >
                  <Send className="h-3.5 w-3.5" />
                  Send
                </Button>
              )}
            />
          </TabsContent>
          <TabsContent value="expired" className="pt-4">
            <PrescriptionHistoryTable 
              status="expired"
              searchQuery={searchQuery}
              dateRange={dateRange}
              medicationFilter={medicationFilter}
            />
          </TabsContent>
          <TabsContent value="all" className="pt-4">
            <PrescriptionHistoryTable 
              status="all"
              searchQuery={searchQuery}
              dateRange={dateRange}
              medicationFilter={medicationFilter}
              actionButton={(prescription) => (
                prescription.status !== "Expired" && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex gap-1 items-center"
                    onClick={() => handleSendToPrescription(prescription)}
                  >
                    <Send className="h-3.5 w-3.5" />
                    Send
                  </Button>
                )
              )}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {selectedPrescription && (
        <SendToPrescriptionDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          prescriptionId={selectedPrescription.id}
          medicationName={selectedPrescription.medicationName}
          patientName={selectedPrescription.patientName}
        />
      )}
    </>
  );
};

export default PrescriptionTabs;
