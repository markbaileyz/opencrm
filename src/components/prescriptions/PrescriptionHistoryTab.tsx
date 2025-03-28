
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prescriptionHistoryData } from "@/data/prescriptionData";

const PrescriptionHistoryTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Prescription History</CardTitle>
          <CardDescription>Past and expired prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Prescriber</TableHead>
                <TableHead>Date Prescribed</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptionHistoryData.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell className="font-medium">{prescription.patientName}</TableCell>
                  <TableCell>{prescription.medication}</TableCell>
                  <TableCell>{prescription.prescriber}</TableCell>
                  <TableCell>{prescription.datePrescribed}</TableCell>
                  <TableCell>{prescription.endDate}</TableCell>
                  <TableCell>
                    <Badge variant={
                      prescription.status === "Completed" ? "outline" : 
                      prescription.status === "Discontinued" ? "destructive" : 
                      "secondary"
                    }>
                      {prescription.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescriptionHistoryTab;
