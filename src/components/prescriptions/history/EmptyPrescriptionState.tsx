
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";

const EmptyPrescriptionState: React.FC = () => {
  return (
    <TableRow>
      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
        No prescriptions found matching your criteria
      </TableCell>
    </TableRow>
  );
};

export default EmptyPrescriptionState;
