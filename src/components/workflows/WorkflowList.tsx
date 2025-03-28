
import React from "react";
import { useWorkflows } from "./hooks/useWorkflows";
import WorkflowGrid from "./WorkflowGrid";
import WorkflowFilters from "./WorkflowFilters";
import WorkflowFormDialog from "./WorkflowFormDialog";
import WorkflowDetailView from "./WorkflowDetailView";
import WorkflowTemplates from "./WorkflowTemplates";
import WorkflowEmptyState from "./WorkflowEmptyState";
import WorkflowListHeader from "./WorkflowListHeader";
import WorkflowError from "./WorkflowError";
import { WorkflowNotFoundView } from "./actions/WorkflowActions";
import { Skeleton } from "@/components/ui/skeleton";

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
    isLoading,
    loadError,
    saveError,
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
    retryLoadWorkflows,
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
      
      {/* Show load error if present */}
      {loadError && (
        <WorkflowError 
          error={loadError} 
          isLoad={true} 
          onRetry={retryLoadWorkflows} 
        />
      )}
      
      {/* Show save error if present */}
      {saveError && (
        <WorkflowError error={saveError} />
      )}
      
      <WorkflowFilters
        onSearchChange={(value) => updateFilters({ searchQuery: value })}
        onStatusFilterChange={(statuses) => updateFilters({ selectedStatuses: statuses })}
        onReset={resetFilters}
        searchValue={filters.searchQuery}
        selectedStatuses={filters.selectedStatuses}
        disabled={isLoading}
      />
      
      {/* Show loading skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-md" />
          ))}
        </div>
      ) : filteredWorkflows.length === 0 ? (
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
