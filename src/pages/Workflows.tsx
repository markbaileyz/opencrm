
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import WorkflowList from "@/components/workflows/WorkflowList";
import { Route, Routes, useNavigate } from "react-router-dom";
import WorkflowDetail from "@/components/workflows/WorkflowDetailView";
import { useWorkflows } from "@/components/workflows/hooks/useWorkflows";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

const WorkflowsPage = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <Link to="/workflow-analytics">
            <Button variant="outline" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Analytics Dashboard
            </Button>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<WorkflowList />} />
          <Route path="/detail/:id" element={<WorkflowDetailRoute />} />
        </Routes>
      </div>
    </DashboardLayout>
  );
};

// Helper component for workflow detail route
const WorkflowDetailRoute = () => {
  const { workflows, handleEditWorkflow, handleDeleteWorkflow, handleActivateWorkflow, handlePauseWorkflow } = useWorkflows();
  const navigate = useNavigate();
  const urlParts = window.location.pathname.split('/');
  const workflowId = urlParts[urlParts.length - 1];
  
  const workflow = workflows.find(w => w.id === workflowId);
  
  if (!workflow) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Workflow Not Found</h2>
        <p className="text-muted-foreground mb-6">The workflow you're looking for doesn't exist or has been deleted.</p>
        <Button onClick={() => navigate('/workflows')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Workflows
        </Button>
      </div>
    );
  }
  
  return (
    <WorkflowDetail
      workflow={workflow}
      onBack={() => navigate('/workflows')}
      onEdit={handleEditWorkflow}
      onDelete={handleDeleteWorkflow}
      onActivate={handleActivateWorkflow}
      onPause={handlePauseWorkflow}
    />
  );
};

export default WorkflowsPage;
