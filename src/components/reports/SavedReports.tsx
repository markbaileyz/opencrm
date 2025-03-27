
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SavedReportsContent from "./saved-reports/SavedReportsContent";
import { SavedReportsProvider } from "./saved-reports/SavedReportsContext";
import { FileText } from "lucide-react";

const SavedReports: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Saved Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SavedReportsProvider>
          <SavedReportsContent />
        </SavedReportsProvider>
      </CardContent>
    </Card>
  );
};

export default SavedReports;
