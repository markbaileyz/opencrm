
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const StrategicPlan: React.FC = () => {
  return (
    <div className="container mx-auto px-4 mb-12 text-center">
      <div className="p-6 border rounded-lg bg-card">
        <h2 className="text-2xl font-bold mb-3">Strategic Development Plan</h2>
        <p className="text-muted-foreground mb-6">
          Explore our comprehensive OpenCRM strategic roadmap - a detailed plan for developing a HIPAA-compliant healthcare CRM system.
        </p>
        <Button asChild>
          <Link to="/open-crm-roadmap" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            View OpenCRM Roadmap
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default StrategicPlan;
