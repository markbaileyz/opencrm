
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileText, RefreshCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RefillStatusBadge, { RefillStatus } from "./RefillStatusBadge";
import { Prescription } from "./hooks/usePrescriptionFilters";

interface PrescriptionTableRowProps {
  prescription: Prescription;
  onRefillRequest: (prescription: Prescription) => void;
  formatDate: (date: Date) => string;
}

const PrescriptionTableRow: React.FC<PrescriptionTableRowProps> = ({
  prescription,
  onRefillRequest,
  formatDate,
}) => {
  const canRequestRefill =
    prescription.status === "active" && 
    (prescription.refillsRemaining > 0 || !prescription.refillStatus) && 
    prescription.refillStatus !== "pending" &&
    prescription.refillStatus !== "approved" &&
    prescription.refillStatus !== "processing";

  return (
    <TableRow>
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
        <RefillStatusBadge status={prescription.refillStatus as RefillStatus} />
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
            {canRequestRefill && (
              <DropdownMenuItem 
                className="flex items-center"
                onClick={() => onRefillRequest(prescription)}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Request Refill
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default PrescriptionTableRow;
