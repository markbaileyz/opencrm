
import React from "react";
import { BarChart3 } from "lucide-react";

interface ReportHeaderProps {
  title: string;
  description: string;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ title, description }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-2">
          {description}
        </p>
      </div>
      <BarChart3 className="h-8 w-8 text-muted-foreground" />
    </div>
  );
};

export default ReportHeader;
