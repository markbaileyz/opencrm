
import React from "react";
import DealDetailsHeader from "./DealDetailsHeader";
import DealDetailsTabs from "./DealDetailsTabs";
import DealDeleteDialog from "./DealDeleteDialog";
import { useDealDetailsData } from "./useDealDetailsData";

interface DealDetailsViewProps {
  dealId: string;
  onBack: () => void;
  onEdit?: (dealId: string) => void;
}

const DealDetailsView: React.FC<DealDetailsViewProps> = ({
  dealId,
  onBack,
  onEdit
}) => {
  const {
    dealData,
    timeline,
    stageConversions,
    showDeleteConfirm,
    setShowDeleteConfirm,
    activeTab,
    setActiveTab,
    handleDeleteDeal,
    handleAddActivity
  } = useDealDetailsData(dealId, onBack);

  return (
    <div className="space-y-6">
      <DealDetailsHeader
        dealName={dealData.name}
        organizationName={dealData.organization.name}
        stage={dealData.stage}
        value={dealData.value}
        onBack={onBack}
        onEdit={onEdit}
        dealId={dealId}
        onDeleteClick={() => setShowDeleteConfirm(true)}
      />

      <DealDetailsTabs
        dealId={dealId}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        dealData={dealData}
        timeline={timeline}
        stageConversions={stageConversions}
        onAddActivity={handleAddActivity}
      />

      <DealDeleteDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirmDelete={handleDeleteDeal}
      />
    </div>
  );
};

export default DealDetailsView;
