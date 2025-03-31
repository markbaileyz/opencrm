
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, AlertCircle, RefreshCcw } from "lucide-react";

export type RefillStatus = 
  | "pending" 
  | "approved" 
  | "processing" 
  | "completed" 
  | "denied" 
  | "cancelled"
  | undefined;

interface RefillStatusBadgeProps {
  status: RefillStatus;
}

const RefillStatusBadge: React.FC<RefillStatusBadgeProps> = ({ status }) => {
  if (!status) return null;

  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          variant: "outline" as const,
          icon: <Clock className="h-3 w-3 mr-1" />,
        };
      case "approved":
        return {
          label: "Approved",
          variant: "success" as const,
          icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
        };
      case "processing":
        return {
          label: "Processing",
          variant: "secondary" as const,
          icon: <RefreshCcw className="h-3 w-3 mr-1" />,
        };
      case "completed":
        return {
          label: "Completed",
          variant: "default" as const,
          icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
        };
      case "denied":
        return {
          label: "Denied",
          variant: "destructive" as const,
          icon: <AlertCircle className="h-3 w-3 mr-1" />,
        };
      case "cancelled":
        return {
          label: "Cancelled",
          variant: "outline" as const,
          icon: <AlertCircle className="h-3 w-3 mr-1" />,
        };
      default:
        return {
          label: "Unknown",
          variant: "outline" as const,
          icon: null,
        };
    }
  };

  const { label, variant, icon } = getStatusConfig();

  return (
    <Badge variant={variant} className="flex items-center">
      {icon}
      {label}
    </Badge>
  );
};

export default RefillStatusBadge;
