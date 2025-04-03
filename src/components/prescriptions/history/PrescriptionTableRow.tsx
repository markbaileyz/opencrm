
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
    <TableRow className="hover:bg-slate-50">
      <TableCell>
        <div className="font-medium text-black">{prescription.medicationName}</div>
        <div className="text-sm text-gray-700">
          {prescription.dosage}, {prescription.frequency}
        </div>
        {prescription.diagnosis && (
          <div className="mt-1">
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-800 border-blue-200">
              {prescription.diagnosis}
            </Badge>
          </div>
        )}
      </TableCell>
      
      <TableCell className="text-gray-800">{formatDate(prescription.prescribedDate)}</TableCell>
      
      <TableCell className="text-gray-800">{formatDate(prescription.expiryDate)}</TableCell>
      
      <TableCell className="text-gray-800">{prescription.prescribedBy}</TableCell>
      
      <TableCell>
        <div className="flex items-center">
          {isActive ? (
            <Badge variant="success" className="capitalize bg-green-100 text-green-800 border-green-200">Active</Badge>
          ) : (
            <Badge variant="destructive" className="capitalize bg-red-100 text-red-800 border-red-200">Expired</Badge>
          )}
        </div>
      </TableCell>
      
      <TableCell className="text-gray-800">
        {prescription.pharmacy || "Not specified"}
      </TableCell>
      
      <TableCell>
        {hasRefillRequest && <RefillStatusBadge status={prescription.refillStatus} />}
        {prescription.approvalStatus && <ApprovalStatusBadge status={prescription.approvalStatus} className="ml-2" />}
      </TableCell>
      
      <TableCell>
        <div className="flex flex-wrap gap-2 justify-end">
          {needsApproval && (
            <Button 
              variant="outline"
              size="sm"
              onClick={() => onApprovalRequest(prescription)}
              className="whitespace-nowrap"
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
              className="whitespace-nowrap"
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
