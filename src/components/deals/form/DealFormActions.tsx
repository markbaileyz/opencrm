
import React from "react";
import { Button } from "@/components/ui/button";

interface DealFormActionsProps {
  isEditMode: boolean;
  onCancel: () => void;
}

const DealFormActions: React.FC<DealFormActionsProps> = ({
  isEditMode,
  onCancel,
}) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button variant="outline" type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">
        {isEditMode ? "Update Deal" : "Create Deal"}
      </Button>
    </div>
  );
};

export default DealFormActions;
