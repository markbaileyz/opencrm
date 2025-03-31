
import React, { useState } from "react";
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { DateRange } from "react-day-picker";
import RefillRequestDialog from "./RefillRequestDialog";
import PrescriptionTableHeader from "./PrescriptionTableHeader";
import PrescriptionTableRow from "./PrescriptionTableRow";
import EmptyPrescriptionState from "./EmptyPrescriptionState";
import { usePrescriptionFilters, Prescription } from "./hooks/usePrescriptionFilters";
import PrescriptionApprovalDialog from "../approval/PrescriptionApprovalDialog";
import { ApprovalStatus } from "../approval/ApprovalStatusBadge";
import { RefillStatus } from "./RefillStatusBadge";

// Mock data for prescriptions - enhanced with refill information and approval status
const MOCK_PRESCRIPTIONS = [
  {
    id: "rx-123456",
    medicationName: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    prescribedDate: new Date(2025, 2, 15),
    expiryDate: new Date(2025, 8, 15),
    prescribedBy: "Dr. Sarah Johnson",
    status: "active",
    pharmacy: "Walgreens",
    refillsRemaining: 2,
    lastFilled: new Date(2025, 2, 15),
    refillStatus: undefined as RefillStatus | undefined,
    approvalStatus: undefined as ApprovalStatus | undefined,
  },
  {
    id: "rx-123457",
    medicationName: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily with meals",
    prescribedDate: new Date(2025, 2, 10),
    expiryDate: new Date(2025, 8, 10),
    prescribedBy: "Dr. Sarah Johnson",
    status: "active",
    pharmacy: "CVS Pharmacy",
    refillsRemaining: 3,
    lastFilled: new Date(2025, 2, 10),
    refillStatus: "pending" as RefillStatus,
    approvalStatus: undefined as ApprovalStatus | undefined,
  },
  {
    id: "rx-123458",
    medicationName: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily at bedtime",
    prescribedDate: new Date(2025, 2, 5),
    expiryDate: new Date(2025, 8, 5),
    prescribedBy: "Dr. Michael Chen",
    status: "active",
    pharmacy: "Walgreens",
    refillsRemaining: 5,
    lastFilled: new Date(2025, 2, 5),
    refillStatus: "approved" as RefillStatus,
    approvalStatus: "approved" as ApprovalStatus,
  },
  {
    id: "rx-123459",
    medicationName: "Warfarin",
    dosage: "5mg",
    frequency: "Once daily",
    prescribedDate: new Date(2025, 1, 20),
    expiryDate: new Date(2025, 7, 20),
    prescribedBy: "Dr. Sarah Johnson",
    status: "active",
    pharmacy: "Rite Aid",
    refillsRemaining: 0,
    lastFilled: new Date(2025, 1, 20),
    refillStatus: "completed" as RefillStatus,
    approvalStatus: "approved" as ApprovalStatus,
  },
  {
    id: "rx-123460",
    medicationName: "Levothyroxine",
    dosage: "50mcg",
    frequency: "Once daily on empty stomach",
    prescribedDate: new Date(2024, 11, 15),
    expiryDate: new Date(2025, 5, 15),
    prescribedBy: "Dr. Michael Chen",
    status: "expired",
    pharmacy: "CVS Pharmacy",
    refillsRemaining: 0,
    lastFilled: new Date(2024, 11, 15),
    refillStatus: undefined as RefillStatus | undefined,
    approvalStatus: undefined as ApprovalStatus | undefined,
  },
  {
    id: "rx-123461",
    medicationName: "Amlodipine",
    dosage: "5mg",
    frequency: "Once daily",
    prescribedDate: new Date(2024, 10, 10),
    expiryDate: new Date(2025, 4, 10),
    prescribedBy: "Dr. Sarah Johnson",
    status: "expired",
    pharmacy: "Walgreens",
    refillsRemaining: 0,
    lastFilled: new Date(2024, 10, 10),
    refillStatus: "denied" as RefillStatus,
    approvalStatus: "denied" as ApprovalStatus,
  },
  {
    id: "rx-123462",
    medicationName: "Metoprolol",
    dosage: "25mg",
    frequency: "Twice daily",
    prescribedDate: new Date(2025, 3, 1),
    expiryDate: new Date(2025, 9, 1),
    prescribedBy: "Dr. Michael Chen",
    status: "active",
    pharmacy: "Rite Aid",
    refillsRemaining: 3,
    lastFilled: new Date(2025, 3, 1),
    refillStatus: undefined as RefillStatus | undefined,
    approvalStatus: undefined as ApprovalStatus | undefined,
  },
  {
    id: "rx-123463",
    medicationName: "Hydrochlorothiazide",
    dosage: "25mg",
    frequency: "Once daily",
    prescribedDate: new Date(2024, 9, 15),
    expiryDate: new Date(2025, 3, 15),
    prescribedBy: "Dr. Sarah Johnson",
    status: "expired",
    pharmacy: "CVS Pharmacy",
    refillsRemaining: 0,
    lastFilled: new Date(2024, 9, 15),
    refillStatus: "cancelled" as RefillStatus,
    approvalStatus: undefined as ApprovalStatus | undefined,
  },
];

interface PrescriptionHistoryTableProps {
  status: "active" | "expired" | "all";
  searchQuery: string;
  dateRange: DateRange | undefined;
  medicationFilter: string | null;
  actionButton?: (prescription: any) => React.ReactNode;
}

const PrescriptionHistoryTable: React.FC<PrescriptionHistoryTableProps> = ({
  status,
  searchQuery,
  dateRange,
  medicationFilter,
  actionButton,
}) => {
  const [refillDialogOpen, setRefillDialogOpen] = useState(false);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(MOCK_PRESCRIPTIONS);

  const { filteredPrescriptions } = usePrescriptionFilters({
    prescriptions,
    status,
    searchQuery,
    dateRange,
    medicationFilter,
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRefillRequest = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setRefillDialogOpen(true);
  };

  const handleApprovalRequest = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setApprovalDialogOpen(true);
  };

  const handleApprovalComplete = ({ status, notes }: { status: ApprovalStatus, notes: string }) => {
    if (selectedPrescription) {
      const updatedPrescriptions = prescriptions.map(p => {
        if (p.id === selectedPrescription.id) {
          return {
            ...p,
            approvalStatus: status,
            // If approved, also update the refill status
            refillStatus: status === "approved" ? "approved" : p.refillStatus
          };
        }
        return p;
      });
      
      setPrescriptions(updatedPrescriptions);
    }
  };

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <PrescriptionTableHeader />
          <TableBody>
            {filteredPrescriptions.length === 0 ? (
              <EmptyPrescriptionState />
            ) : (
              filteredPrescriptions.map((prescription) => (
                <PrescriptionTableRow
                  key={prescription.id}
                  prescription={prescription}
                  onRefillRequest={handleRefillRequest}
                  onApprovalRequest={handleApprovalRequest}
                  formatDate={formatDate}
                  actionButton={actionButton ? actionButton(prescription) : undefined}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedPrescription && (
        <>
          <RefillRequestDialog
            open={refillDialogOpen}
            onOpenChange={setRefillDialogOpen}
            prescriptionData={{
              id: selectedPrescription.id,
              medicationName: selectedPrescription.medicationName,
              dosage: `${selectedPrescription.dosage}, ${selectedPrescription.frequency}`,
              prescribedBy: selectedPrescription.prescribedBy,
              pharmacy: selectedPrescription.pharmacy,
            }}
          />
          
          <PrescriptionApprovalDialog
            open={approvalDialogOpen}
            onOpenChange={setApprovalDialogOpen}
            prescriptionData={{
              id: selectedPrescription.id,
              medicationName: selectedPrescription.medicationName,
              dosage: `${selectedPrescription.dosage}, ${selectedPrescription.frequency}`,
              prescribedBy: selectedPrescription.prescribedBy,
            }}
            onApprovalComplete={handleApprovalComplete}
          />
        </>
      )}
    </>
  );
};

export default PrescriptionHistoryTable;
