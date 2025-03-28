
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { VitalRecord } from "@/hooks/health-tracker/useHealthData";

interface VitalRecordsTableProps {
  vitalRecords: VitalRecord[];
}

const VitalRecordsTable: React.FC<VitalRecordsTableProps> = ({ vitalRecords }) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Blood Pressure</TableHead>
              <TableHead>Heart Rate</TableHead>
              <TableHead>Temperature</TableHead>
              <TableHead>O₂ Saturation</TableHead>
              <TableHead>Glucose</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vitalRecords.length > 0 ? (
              vitalRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.systolic}/{record.diastolic} mmHg</TableCell>
                  <TableCell>{record.heartRate} bpm</TableCell>
                  <TableCell>{record.temperature}°F</TableCell>
                  <TableCell>{record.oxygenSaturation}%</TableCell>
                  <TableCell>{record.glucoseLevel} mg/dL</TableCell>
                  <TableCell className="max-w-[200px] truncate">{record.notes}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">No vital records found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default VitalRecordsTable;
