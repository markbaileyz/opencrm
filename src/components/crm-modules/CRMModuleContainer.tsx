
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Settings } from "lucide-react";
import { useCRM } from "@/contexts/CRMContext";
import { CRMModule } from "@/types/crm-modules";
import { Link } from "react-router-dom";

const CRMModuleContainer: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { modules, isModuleActive } = useCRM();
  
  const moduleData = modules.find(m => m.id === moduleId);
  
  if (!moduleData) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
        <p className="mb-6">The module you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/crm')}>Return to Dashboard</Button>
      </div>
    );
  }
  
  if (!isModuleActive(moduleId)) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Module Not Active</h1>
        <p className="mb-6">This module is not active in your current plan. Please add it to your plan first.</p>
        <Button onClick={() => navigate('/crm-config')}>Configure Plan</Button>
      </div>
    );
  }
  
  const ModuleComponent = moduleData.component;
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => navigate('/crm')}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <Button asChild variant="outline">
          <Link to="/crm-config">
            <Settings className="h-4 w-4 mr-2" />
            Configure Modules
          </Link>
        </Button>
      </div>
      
      <ModuleComponent />
    </div>
  );
};

export default CRMModuleContainer;
