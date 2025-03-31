
import React from "react";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Clock } from "lucide-react";

interface PrescriptionRefillSummaryProps {
  refillCounts: {
    pending: number;
    approved: number;
    processing: number;
  };
}

const PrescriptionRefillSummary: React.FC<PrescriptionRefillSummaryProps> = ({
  refillCounts
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {refillCounts.pending > 0 && (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {refillCounts.pending} Pending Refill{refillCounts.pending > 1 ? 's' : ''}
        </Badge>
      )}
      {refillCounts.approved > 0 && (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
          <RefreshCw className="h-3 w-3" />
          {refillCounts.approved} Approved Refill{refillCounts.approved > 1 ? 's' : ''}
        </Badge>
      )}
      {refillCounts.processing > 0 && (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
          <RefreshCw className="h-3 w-3" />
          {refillCounts.processing} Processing
        </Badge>
      )}
    </div>
  );
};

export default PrescriptionRefillSummary;
