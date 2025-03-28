
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Workflow } from "@/types/workflow";
import { getTemplateById } from "./templateUtils";
import { Check, ArrowRight } from "lucide-react";

interface TemplatePreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateId: string | null;
  onUseTemplate: (templateId: string) => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  open,
  onOpenChange,
  templateId,
  onUseTemplate
}) => {
  const template = templateId ? getTemplateById(templateId) : null;

  if (!template) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Template Preview: {template.name}</DialogTitle>
          <DialogDescription>
            Preview this workflow template before using it
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <h3 className="font-medium">Description</h3>
            <p className="text-muted-foreground">{template.description}</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Steps</h3>
            <div className="space-y-3">
              {template.steps.map((step, i) => (
                <Card key={i} className="relative border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        {i + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{step.title}</h4>
                          <Badge variant="outline">{step.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                      </div>
                    </div>
                    
                    {step.type === "branch" && (
                      <div className="mt-3 pl-9">
                        <div className="text-sm font-medium text-muted-foreground mb-2">Branches:</div>
                        <div className="space-y-2">
                          {step.branches?.map((branch, j) => (
                            <div key={j} className="flex items-center gap-2 text-sm border rounded p-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-muted-foreground">If {branch.condition}</span>
                              <ArrowRight className="h-4 w-4" />
                              <span>{branch.nextStep}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => {
            onUseTemplate(templateId);
            onOpenChange(false);
          }}>
            Use This Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreview;
