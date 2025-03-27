
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FileImage, Table, X } from "lucide-react";

interface ReportExportOptionsProps {
  onExport: (format: string) => void;
  onCancel: () => void;
}

const ReportExportOptions: React.FC<ReportExportOptionsProps> = ({ onExport, onCancel }) => {
  const exportOptions = [
    { label: "PDF Document", value: "pdf", icon: <FileText className="h-4 w-4" /> },
    { label: "Excel Spreadsheet", value: "xlsx", icon: <Table className="h-4 w-4" /> },
    { label: "CSV File", value: "csv", icon: <Table className="h-4 w-4" /> },
    { label: "PNG Image", value: "png", icon: <FileImage className="h-4 w-4" /> }
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Export Report</h3>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {exportOptions.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              className="flex flex-col items-center justify-center h-24 p-3"
              onClick={() => onExport(option.value)}
            >
              <div className="h-8 w-8 flex items-center justify-center text-primary mb-2">
                {option.icon}
              </div>
              <span className="text-sm">{option.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportExportOptions;
