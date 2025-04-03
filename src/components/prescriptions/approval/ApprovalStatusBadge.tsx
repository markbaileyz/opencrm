
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Clock, User } from "lucide-react";

export type ApprovalStatus = "approved" | "denied" | "pending" | "pending_information" | "referred" | undefined;

interface ApprovalStatusBadgeProps {
  status: ApprovalStatus;
  className?: string; // Added className prop
}

const ApprovalStatusBadge: React.FC<ApprovalStatusBadgeProps> = ({ status, className = "" }) => {
  if (!status) return null;

  const getStatusDetails = () => {
    switch (status) {
      case "approved":
        return {
          label: "Approved",
          icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
          className: "bg-green-50 text-green-700 border-green-200"
        };
      case "denied":
        return {
          label: "Denied",
          icon: <AlertCircle className="h-3 w-3 mr-1" />,
          className: "bg-red-50 text-red-700 border-red-200"
        };
      case "pending":
        return {
          label: "Pending Approval",
          icon: <Clock className="h-3 w-3 mr-1" />,
          className: "bg-amber-50 text-amber-700 border-amber-200"
        };
      case "pending_information":
        return {
          label: "Info Needed",
          icon: <Clock className="h-3 w-3 mr-1" />,
          className: "bg-blue-50 text-blue-700 border-blue-200"
        };
      case "referred":
        return {
          label: "Referred",
          icon: <User className="h-3 w-3 mr-1" />,
          className: "bg-purple-50 text-purple-700 border-purple-200"
        };
      default:
        return {
          label: "Unknown",
          icon: null,
          className: "bg-gray-50 text-gray-700 border-gray-200"
        };
    }
  };

  const { label, icon, className: statusClassName } = getStatusDetails();
  
  return (
    <Badge 
      variant="outline" 
      className={`flex items-center ${statusClassName} ${className}`}
    >
      {icon}
      {label}
    </Badge>
  );
};

export default ApprovalStatusBadge;
