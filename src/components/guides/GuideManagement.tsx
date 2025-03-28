
import React, { useState } from "react";
import { useGuide } from "@/contexts/GuideContext";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import GuideBuilderDialog from "./GuideBuilderDialog";
import { DataTable } from "@/components/ui/data-table";

const GuideManagement: React.FC = () => {
  const { guides, deleteGuide, startGuide } = useGuide();
  const [showGuideBuilder, setShowGuideBuilder] = useState(false);
  const [editGuideId, setEditGuideId] = useState<string | undefined>(undefined);
  const [deleteGuideId, setDeleteGuideId] = useState<string | null>(null);

  const handleAddGuide = () => {
    setEditGuideId(undefined);
    setShowGuideBuilder(true);
  };

  const handleEditGuide = (guideId: string) => {
    setEditGuideId(guideId);
    setShowGuideBuilder(true);
  };

  const handleDeleteGuide = () => {
    if (deleteGuideId) {
      deleteGuide(deleteGuideId);
      setDeleteGuideId(null);
    }
  };

  const guideToDelete = deleteGuideId ? guides.find(g => g.id === deleteGuideId) : null;

  const columns = [
    {
      id: "name",
      header: "Guide Name",
      cell: (row: any) => <span className="font-medium">{row.name}</span>,
    },
    {
      id: "category",
      header: "Category",
      cell: (row: any) => <Badge variant="outline">{row.category}</Badge>,
    },
    {
      id: "steps",
      header: "Steps",
      cell: (row: any) => (
        <span className="text-muted-foreground">
          {row.steps.length} {row.steps.length === 1 ? "step" : "steps"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => startGuide(row.id)}
            title="Start guide"
          >
            <Play className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleEditGuide(row.id)}
            title="Edit guide"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDeleteGuideId(row.id)}
            title="Delete guide"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Guide Management</h2>
          <p className="text-muted-foreground">
            Create, edit and manage interactive guides
          </p>
        </div>
        <Button onClick={handleAddGuide}>
          <Plus className="h-4 w-4 mr-2" />
          Add Guide
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={guides}
        emptyMessage="No guides found. Create your first guide to get started."
      />

      <GuideBuilderDialog
        open={showGuideBuilder}
        onOpenChange={setShowGuideBuilder}
        editGuideId={editGuideId}
      />

      <AlertDialog open={!!deleteGuideId} onOpenChange={(open) => !open && setDeleteGuideId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete
              the guide <strong>{guideToDelete?.name}</strong> and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteGuide} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GuideManagement;
