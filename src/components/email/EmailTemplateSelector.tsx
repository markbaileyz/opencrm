
import React, { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText } from "lucide-react";
import { 
  EmailTemplate, 
  getAllTemplates, 
  getTemplatesByCategory 
} from "@/utils/emailTemplates";

interface EmailTemplateSelectorProps {
  onSelectTemplate: (template: EmailTemplate) => void;
}

const EmailTemplateSelector: React.FC<EmailTemplateSelectorProps> = ({ 
  onSelectTemplate 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const allTemplates = getAllTemplates();
  
  // Get templates based on selected category
  const templates = selectedCategory === "all" 
    ? allTemplates 
    : getTemplatesByCategory(selectedCategory as EmailTemplate['category']);
  
  const handleSelectTemplate = (templateId: string) => {
    const template = allTemplates.find(t => t.id === templateId);
    if (template) {
      onSelectTemplate(template);
    }
  };

  return (
    <div className="space-y-4">
      <Tabs 
        defaultValue="all" 
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        className="w-full"
      >
        <TabsList className="grid grid-cols-5 mb-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="follow-up">Follow-up</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedCategory} className="mt-0">
          <ScrollArea className="h-60 rounded-md border p-4">
            <div className="space-y-2">
              {templates.map((template) => (
                <div 
                  key={template.id}
                  className="group flex flex-col space-y-2 rounded-lg border p-3 hover:bg-muted"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onSelectTemplate(template)}
                      className="opacity-0 group-hover:opacity-100"
                    >
                      <span className="sr-only">Use template</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Subject: {template.subject}
                  </div>
                </div>
              ))}
              
              {templates.length === 0 && (
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <FileText className="h-10 w-10 text-muted-foreground/50" />
                  <h4 className="mt-2 font-medium">No templates found</h4>
                  <p className="text-sm text-muted-foreground">
                    No templates available for this category
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailTemplateSelector;
