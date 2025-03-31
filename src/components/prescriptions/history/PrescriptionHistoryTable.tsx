
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileText, RefreshCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DateRange } from "react-day-picker";
import RefillRequestDialog from "./RefillRequestDialog";
import RefillStatusBadge from "./RefillStatusBadge";

// Mock data for prescriptions - enhanced with refill information
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
    refillStatus: undefined,
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
    refillStatus: "pending",
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
    refillStatus: "approved",
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
    refillStatus: "completed",
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
    refillStatus: undefined,
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
    refillStatus: "denied",
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
    refillStatus: undefined,
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
    refillStatus: "cancelled",
  },
];

interface PrescriptionHistoryTableProps {
  status: "active" | "expired" | "all";
  searchQuery: string;
  dateRange: DateRange | undefined;
  medicationFilter: string | null;
}

const PrescriptionHistoryTable: React.FC<PrescriptionHistoryTableProps> = ({
  status,
  searchQuery,
  dateRange,
  medicationFilter,
}) => {
  const [refillDialogOpen, setRefillDialogOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);

  // Filter prescriptions based on props
  const filteredPrescriptions = MOCK_PRESCRIPTIONS.filter((prescription) => {
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRefillRequest = (prescription: any) => {
    setSelectedPrescription(prescription);
    setRefillDialogOpen(true);
  };

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medication</TableHead>
              <TableHead>Rx Number</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Prescribed</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Refills</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Refill Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrescriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  No prescriptions found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredPrescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell className="font-medium">{prescription.medicationName}</TableCell>
                  <TableCell>{prescription.id}</TableCell>
                  <TableCell>{`${prescription.dosage}, ${prescription.frequency}`}</TableCell>
                  <TableCell>{formatDate(prescription.prescribedDate)}</TableCell>
                  <TableCell>{formatDate(prescription.expiryDate)}</TableCell>
                  <TableCell>{prescription.refillsRemaining}</TableCell>
                  <TableCell>
                    <Badge
                      variant={prescription.status === "active" ? "default" : "secondary"}
                    >
                      {prescription.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <RefillStatusBadge status={prescription.refillStatus} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {prescription.status === "active" && 
                         (prescription.refillsRemaining > 0 || !prescription.refillStatus) && 
                         prescription.refillStatus !== "pending" &&
                         prescription.refillStatus !== "approved" &&
                         prescription.refillStatus !== "processing" && (
                          <DropdownMenuItem 
                            className="flex items-center"
                            onClick={() => handleRefillRequest(prescription)}
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Request Refill
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedPrescription && (
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
      )}
    </>
  );
};

export default PrescriptionHistoryTable;
