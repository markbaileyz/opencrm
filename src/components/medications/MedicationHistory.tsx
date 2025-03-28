
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface MedicationHistoryItem {
  medication: string;
  dosage: string;
  prescribedDate: string;
  endDate: string;
  prescribedBy: string;
  reason: string;
  status: "Completed" | "Discontinued" | "Replaced";
}

interface MedicationHistoryProps {
  history: MedicationHistoryItem[];
}

const MedicationHistory: React.FC<MedicationHistoryProps> = ({ history }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
      case "Discontinued":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Discontinued</Badge>;
      case "Replaced":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Replaced</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Medication History</CardTitle>
      </CardHeader>
      <CardContent>
        {history.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Prescribed</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.medication}</TableCell>
                  <TableCell>{item.dosage}</TableCell>
                  <TableCell>{item.prescribedDate}</TableCell>
                  <TableCell>{item.endDate}</TableCell>
                  <TableCell>{item.prescribedBy}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No medication history found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicationHistory;
