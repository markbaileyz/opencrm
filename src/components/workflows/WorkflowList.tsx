
import React from "react";
import { useWorkflows } from "./hooks/useWorkflows";
import WorkflowGrid from "./WorkflowGrid";
import WorkflowFilters from "./WorkflowFilters";
import WorkflowFormDialog from "./WorkflowFormDialog";
import WorkflowDetailView from "./WorkflowDetailView";
import WorkflowTemplates from "./WorkflowTemplates";
import WorkflowEmptyState from "./WorkflowEmptyState";
import WorkflowListHeader from "./WorkflowListHeader";
import { WorkflowNotFoundView } from "./actions/WorkflowActions";

const WorkflowList: React.FC = () => {
  const {
    filteredWorkflows,
    selectedWorkflowId,
    workflows,
    isCreateDialogOpen,
    isEditDialogOpen,
    workflowToEdit,
    isTemplatesDialogOpen,
    filters,
    handleCreateWorkflow,
    handleOpenTemplates,
    handleSaveWorkflow,
    handleUseTemplate,
    handleUpdateWorkflow,
    handleEditWorkflow,
    handleDeleteWorkflow,
    handleActivateWorkflow,
    handlePauseWorkflow,
    handleViewWorkflow,
    handleBackToList,
    updateFilters,
    resetFilters,
    setIsCreateDialogOpen,
    setIsEditDialogOpen,
    setIsTemplatesDialogOpen,
  } = useWorkflows();
  
  // If a workflow is selected, show its details
  if (selectedWorkflowId) {
    const selectedWorkflow = workflows.find(w => w.id === selectedWorkflowId);
    
    if (!selectedWorkflow) {
      return <WorkflowNotFoundView onBack={handleBackToList} />;
    }
    
    return (
      <WorkflowDetailView
        workflow={selectedWorkflow}
        onBack={handleBackToList}
        onEdit={handleEditWorkflow}
        onDelete={handleDeleteWorkflow}
        onActivate={handleActivateWorkflow}
        onPause={handlePauseWorkflow}
      />
    );
  }
  
  return (
    <div className="space-y-6">
      <WorkflowListHeader 
        onCreateWorkflow={handleCreateWorkflow}
        onOpenTemplates={handleOpenTemplates}
      />
      
      <WorkflowFilters
        onSearchChange={(value) => updateFilters({ searchQuery: value })}
        onStatusFilterChange={(statuses) => updateFilters({ selectedStatuses: statuses })}
        onReset={resetFilters}
        searchValue={filters.searchQuery}
        selectedStatuses={filters.selectedStatuses}
      />
      
      {filteredWorkflows.length === 0 ? (
        <WorkflowEmptyState />
      ) : (
        <WorkflowGrid
          workflows={filteredWorkflows}
          onActivate={handleActivateWorkflow}
          onPause={handlePauseWorkflow}
          onEdit={handleEditWorkflow}
          onDelete={handleDeleteWorkflow}
          onView={handleViewWorkflow}
        />
      )}
      
      <WorkflowFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSave={handleSaveWorkflow}
        title="Create Workflow"
      />
      
      {workflowToEdit && (
        <WorkflowFormDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleUpdateWorkflow}
          initialData={workflowToEdit}
          title="Edit Workflow"
        />
      )}

      <WorkflowTemplates
        open={isTemplatesDialogOpen}
        onOpenChange={setIsTemplatesDialogOpen}
        onUseTemplate={handleUseTemplate}
      />
    </div>
  );
};

export default WorkflowList;
