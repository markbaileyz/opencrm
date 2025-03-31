
import React from "react";
import { TableHead, TableRow, TableHeader } from "@/components/ui/table";

const PrescriptionTableHeader: React.FC = () => {
  return (
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
  );
};

export default PrescriptionTableHeader;
