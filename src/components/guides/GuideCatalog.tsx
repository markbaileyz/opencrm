
import React, { useState } from "react";
import { useGuide } from "@/contexts/GuideContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import GuideBuilderDialog from "./GuideBuilderDialog";

interface GuideCatalogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GuideCatalog: React.FC<GuideCatalogProps> = ({ open, onOpenChange }) => {
  const { guides, startGuide } = useGuide();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editGuideId, setEditGuideId] = useState<string | undefined>(undefined);

  const handleStartGuide = (guideId: string) => {
    startGuide(guideId);
    onOpenChange(false);
  };

  const handleEditGuide = (guideId: string) => {
    setEditGuideId(guideId);
    setIsCreateDialogOpen(true);
  };

  const handleCreateGuide = () => {
    setEditGuideId(undefined);
    setIsCreateDialogOpen(true);
  };

  // Get unique categories
  const categories = Array.from(new Set(guides.map(guide => guide.category)));

  // Filter guides
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === "all" || guide.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Interactive Guides</DialogTitle>
            <DialogDescription>
              Browse our interactive guides to learn how to use the application effectively
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-between items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search guides..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleCreateGuide} className="ml-2">
              <Plus className="h-4 w-4 mr-2" />
              Create Guide
            </Button>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Guides</TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <ScrollArea className="h-[50vh]">
              {filteredGuides.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No guides match your search criteria.
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredGuides.map(guide => (
                    <Card key={guide.id} className="transition-all hover:shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle>{guide.name}</CardTitle>
                          <Badge className="capitalize">{guide.category}</Badge>
                        </div>
                        <CardDescription>{guide.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {guide.steps.length} {guide.steps.length === 1 ? "step" : "steps"}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={() => handleEditGuide(guide.id)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="default"
                          onClick={() => handleStartGuide(guide.id)}
                        >
                          Start Guide
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>

      <GuideBuilderDialog 
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        editGuideId={editGuideId}
      />
    </>
  );
};

export default GuideCatalog;
