
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SavedReportsProvider } from "./saved-reports/SavedReportsContext";
import SavedReportsContent from "./saved-reports/SavedReportsContent";

const SavedReports: React.FC = () => {
  return (
    <SavedReportsProvider>
      <Card>
        <CardHeader>
          <CardTitle>Saved Reports</CardTitle>
          <CardDescription>
            Your saved and scheduled reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SavedReportsContent />
        </CardContent>
      </Card>
    </SavedReportsProvider>
  );
};

export default SavedReports;
