
import React, { useState } from "react";
import { useGuide } from "@/contexts/GuideContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus, Search, Play, Edit, Trash2 } from "lucide-react";
import GuideBuilderDialog from "./GuideBuilderDialog";

const GuideManagement: React.FC = () => {
  const { guides, startGuide, deleteGuide } = useGuide();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editGuideId, setEditGuideId] = useState<string | undefined>(undefined);
  const [deleteConfirmGuideId, setDeleteConfirmGuideId] = useState<string | null>(null);

  const handleEditGuide = (guideId: string) => {
    setEditGuideId(guideId);
    setIsCreateDialogOpen(true);
  };

  const handleCreateGuide = () => {
    setEditGuideId(undefined);
    setIsCreateDialogOpen(true);
  };

  const handleDeleteConfirm = (guideId: string) => {
    setDeleteConfirmGuideId(guideId);
  };

  const confirmDelete = () => {
    if (deleteConfirmGuideId) {
      deleteGuide(deleteConfirmGuideId);
      setDeleteConfirmGuideId(null);
    }
  };

  // Filter guides
  const filteredGuides = guides.filter(guide => {
    return guide.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           guide.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Guide Management</CardTitle>
          <CardDescription>
            Create, edit, and manage interactive guides for your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search guides..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleCreateGuide}>
              <Plus className="h-4 w-4 mr-2" />
              Create Guide
            </Button>
          </div>

          <div className="rounded-md border">
            <ScrollArea className="h-[500px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Name</th>
                    <th className="py-3 px-4 text-left font-medium">Category</th>
                    <th className="py-3 px-4 text-left font-medium">Steps</th>
                    <th className="py-3 px-4 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuides.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-muted-foreground">
                        No guides found. Create a new guide to get started.
                      </td>
                    </tr>
                  ) : (
                    filteredGuides.map((guide) => (
                      <tr key={guide.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{guide.name}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {guide.description}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className="capitalize">{guide.category}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          {guide.steps.length} {guide.steps.length === 1 ? "step" : "steps"}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => startGuide(guide.id)}
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditGuide(guide.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive"
                              onClick={() => handleDeleteConfirm(guide.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      <GuideBuilderDialog 
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        editGuideId={editGuideId}
      />

      <Dialog open={!!deleteConfirmGuideId} onOpenChange={() => setDeleteConfirmGuideId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Guide</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this guide? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmGuideId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GuideManagement;
