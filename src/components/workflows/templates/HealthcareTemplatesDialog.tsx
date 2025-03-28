
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HealthcareWorkflowTemplates from "./HealthcareWorkflowTemplates";
import TemplatePreview from "./TemplatePreview";

interface HealthcareTemplatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUseTemplate: (templateId: string) => void;
}

const HealthcareTemplatesDialog: React.FC<HealthcareTemplatesDialogProps> = ({
  open,
  onOpenChange,
  onUseTemplate
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleUseTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setIsPreviewOpen(true);
  };

  const handleConfirmUseTemplate = (templateId: string) => {
    onUseTemplate(templateId);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Healthcare Workflow Templates</DialogTitle>
            <DialogDescription>
              Choose from specialized templates designed for healthcare workflows
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="healthcare" className="mt-4">
            <TabsList className="mb-4">
              <TabsTrigger value="healthcare">Healthcare Templates</TabsTrigger>
              <TabsTrigger value="general">General Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="healthcare" className="mt-0">
              <HealthcareWorkflowTemplates onUseTemplate={handleUseTemplate} />
            </TabsContent>
            
            <TabsContent value="general" className="mt-0">
              <div className="py-8 text-center">
                <h3 className="text-lg font-medium mb-2">General Templates</h3>
                <p className="text-muted-foreground">
                  General workflow templates are available from the main templates section.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      <TemplatePreview
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        templateId={selectedTemplateId}
        onUseTemplate={handleConfirmUseTemplate}
      />
    </>
  );
};

export default HealthcareTemplatesDialog;
