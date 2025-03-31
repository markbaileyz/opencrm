
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pill, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Prescription } from "./hooks/usePrescriptionFilters";
import RefillStatusBadge from "./RefillStatusBadge";
import ApprovalStatusBadge from "../approval/ApprovalStatusBadge";

interface PrescriptionTableRowProps {
  prescription: Prescription;
  onRefillRequest: (prescription: Prescription) => void;
  onApprovalRequest: (prescription: Prescription) => void;
  formatDate: (date: Date) => string;
  actionButton?: React.ReactNode;
}

const PrescriptionTableRow: React.FC<PrescriptionTableRowProps> = ({
  prescription,
  onRefillRequest,
  onApprovalRequest,
  formatDate,
  actionButton,
}) => {
  const isActive = prescription.status === "active";
  const needsRefill = isActive && prescription.refillsRemaining === 0;
  const hasRefillRequest = prescription.refillStatus !== undefined;
  const needsApproval = hasRefillRequest && prescription.refillStatus === "pending" && !prescription.approvalStatus;
  
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{prescription.medicationName}</div>
        <div className="text-sm text-muted-foreground">
          {prescription.dosage}, {prescription.frequency}
        </div>
      </TableCell>
      
      <TableCell>{formatDate(prescription.prescribedDate)}</TableCell>
      
      <TableCell>{formatDate(prescription.expiryDate)}</TableCell>
      
      <TableCell>{prescription.prescribedBy}</TableCell>
      
      <TableCell>
        <div className="flex items-center">
          {isActive ? (
            <Badge variant="success" className="capitalize">Active</Badge>
          ) : (
            <Badge variant="destructive" className="capitalize">Expired</Badge>
          )}
        </div>
      </TableCell>
      
      <TableCell>
        {prescription.pharmacy || "Not specified"}
      </TableCell>
      
      <TableCell>
        {hasRefillRequest && <RefillStatusBadge status={prescription.refillStatus} />}
        {prescription.approvalStatus && <ApprovalStatusBadge status={prescription.approvalStatus} className="ml-2" />}
      </TableCell>
      
      <TableCell>
        <div className="flex gap-2 justify-end">
          {needsApproval && (
            <Button 
              variant="outline"
              size="sm"
              onClick={() => onApprovalRequest(prescription)}
            >
              <Pill className="h-3.5 w-3.5 mr-1" />
              Approve
            </Button>
          )}
          
          {isActive && !hasRefillRequest && (
            <Button 
              variant="outline"
              size="sm"
              onClick={() => onRefillRequest(prescription)}
              disabled={prescription.refillsRemaining > 0}
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              {prescription.refillsRemaining > 0 ? 
                `${prescription.refillsRemaining} Refills` : 
                'Request Refill'}
            </Button>
          )}
          
          {actionButton}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PrescriptionTableRow;
