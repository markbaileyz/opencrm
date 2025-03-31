
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PrescriptionHistoryView from "./history/PrescriptionHistoryView";

const PrescriptionHistoryTab: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Prescription History</CardTitle>
        <CardDescription>
          View and manage patient prescription history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PrescriptionHistoryView />
      </CardContent>
    </Card>
  );
};

export default PrescriptionHistoryTab;
