
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileCheck, RefreshCw } from "lucide-react";
import RefillStatusBadge, { RefillStatus } from "./RefillStatusBadge";
import ApprovalStatusBadge from "../approval/ApprovalStatusBadge";
import { Prescription } from "./hooks/usePrescriptionFilters";

interface PrescriptionTableRowProps {
  prescription: Prescription;
  onRefillRequest: (prescription: Prescription) => void;
  onApprovalRequest?: (prescription: Prescription) => void;
  formatDate: (date: Date) => string;
}

const PrescriptionTableRow: React.FC<PrescriptionTableRowProps> = ({
  prescription,
  onRefillRequest,
  onApprovalRequest,
  formatDate,
}) => {
  const canRequestRefill = prescription.refillsRemaining > 0 && prescription.status !== "expired";

  const handleRefillClick = () => {
    onRefillRequest(prescription);
  };

  const handleApprovalClick = () => {
    if (onApprovalRequest) {
      onApprovalRequest(prescription);
    }
  };

  const needsApproval = prescription.refillStatus === "pending" && !prescription.approvalStatus;
  
  return (
    <TableRow>
      <TableCell>{prescription.medicationName}</TableCell>
      <TableCell>{prescription.id}</TableCell>
      <TableCell>{prescription.dosage}</TableCell>
      <TableCell>{formatDate(prescription.prescribedDate)}</TableCell>
      <TableCell>{formatDate(prescription.expiryDate)}</TableCell>
      <TableCell>{prescription.refillsRemaining}</TableCell>
      <TableCell>
        <span className={`px-2 py-1 rounded-full text-xs ${
          prescription.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
        }`}>
          {prescription.status === "active" ? "Active" : "Expired"}
        </span>
      </TableCell>
      <TableCell>
        <RefillStatusBadge status={prescription.refillStatus as RefillStatus} />
      </TableCell>
      <TableCell>
        <ApprovalStatusBadge status={prescription.approvalStatus} />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          {needsApproval && onApprovalRequest && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={handleApprovalClick}
            >
              <FileCheck className="h-3 w-3 mr-1" />
              Approve
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2 text-xs"
            disabled={!canRequestRefill || prescription.refillStatus === "pending"}
            onClick={handleRefillClick}
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Refill
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PrescriptionTableRow;
