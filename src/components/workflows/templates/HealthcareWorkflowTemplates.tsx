
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Calendar, Check, File, Plus, User } from "lucide-react";
import { WorkflowTrigger, WorkflowStepType } from "../../types/workflow";

// Define template categories
type TemplateCategory = "patient-care" | "administrative" | "compliance" | "clinical";

// Define template interface
interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  tags: string[];
  steps: number;
  popularity: number; // 1-10 scale
  trigger: WorkflowTrigger;
  icon: React.ReactNode;
  stepTypes: WorkflowStepType[];
}

// Mock templates data
const healthcareTemplates: WorkflowTemplate[] = [
  {
    id: "template-patient-onboarding",
    name: "New Patient Onboarding",
    description: "Streamlined workflow for registering and onboarding new patients with automatic form distribution.",
    category: "patient-care",
    tags: ["onboarding", "registration", "forms"],
    steps: 5,
    popularity: 9,
    trigger: "new_patient",
    icon: <User className="h-6 w-6 text-blue-500" />,
    stepTypes: ["email", "task", "wait", "form_submission", "email"]
  },
  {
    id: "template-appointment-reminder",
    name: "Appointment Reminder Sequence",
    description: "Send automated reminders before appointments with confirmation requests and follow-ups.",
    category: "patient-care",
    tags: ["appointment", "reminder", "scheduling"],
    steps: 4,
    popularity: 10,
    trigger: "appointment_scheduled",
    icon: <Calendar className="h-6 w-6 text-indigo-500" />,
    stepTypes: ["email", "wait", "sms", "condition"]
  },
  {
    id: "template-post-visit-followup",
    name: "Post-Visit Follow-up",
    description: "Automate follow-up communications after patient visits including satisfaction surveys.",
    category: "patient-care",
    tags: ["follow-up", "survey", "care"],
    steps: 3,
    popularity: 8,
    trigger: "appointment_completed",
    icon: <Check className="h-6 w-6 text-green-500" />,
    stepTypes: ["wait", "email", "task"]
  },
  {
    id: "template-lab-results",
    name: "Lab Results Notification",
    description: "Notify patients when lab results are ready and guide them through next steps.",
    category: "clinical",
    tags: ["lab", "results", "notification"],
    steps: 4,
    popularity: 7,
    trigger: "manual",
    icon: <File className="h-6 w-6 text-yellow-500" />,
    stepTypes: ["condition", "email", "task", "wait"]
  },
  {
    id: "template-medication-refill",
    name: "Medication Refill Process",
    description: "Streamline medication refill requests, approvals, and notifications.",
    category: "clinical",
    tags: ["medication", "refill", "pharmacy"],
    steps: 6,
    popularity: 8,
    trigger: "form_submission",
    icon: <Plus className="h-6 w-6 text-red-500" />,
    stepTypes: ["task", "condition", "task", "email", "wait", "email"]
  },
  {
    id: "template-compliance-checklist",
    name: "Compliance Documentation Review",
    description: "Periodic review of compliance documentation with automated alerts for expiring items.",
    category: "compliance",
    tags: ["compliance", "documentation", "review"],
    steps: 5,
    popularity: 6,
    trigger: "scheduled",
    icon: <Activity className="h-6 w-6 text-purple-500" />,
    stepTypes: ["task", "condition", "email", "wait", "task"]
  },
  {
    id: "template-insurance-verification",
    name: "Insurance Verification",
    description: "Verify patient insurance before appointments with automated checks and staff notifications.",
    category: "administrative",
    tags: ["insurance", "verification", "billing"],
    steps: 4,
    popularity: 9,
    trigger: "appointment_scheduled",
    icon: <File className="h-6 w-6 text-blue-500" />,
    stepTypes: ["task", "condition", "email", "task"]
  },
  {
    id: "template-referral-management",
    name: "Referral Management",
    description: "Track and manage patient referrals to specialists with status updates.",
    category: "administrative",
    tags: ["referral", "specialist", "coordination"],
    steps: 5,
    popularity: 7,
    trigger: "manual",
    icon: <User className="h-6 w-6 text-green-500" />,
    stepTypes: ["task", "email", "wait", "condition", "task"]
  }
];

interface HealthcareWorkflowTemplatesProps {
  onUseTemplate: (templateId: string) => void;
}

const HealthcareWorkflowTemplates: React.FC<HealthcareWorkflowTemplatesProps> = ({ 
  onUseTemplate 
}) => {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>("patient-care");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter templates based on active category and search query
  const filteredTemplates = healthcareTemplates.filter(template => {
    const matchesCategory = template.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold">Healthcare Workflow Templates</h2>
        <p className="text-muted-foreground">
          Specialized templates designed for healthcare processes. Select a category to browse templates.
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full px-4 py-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="patient-care" value={activeCategory} onValueChange={(value) => setActiveCategory(value as TemplateCategory)}>
        <TabsList className="mb-4">
          <TabsTrigger value="patient-care">Patient Care</TabsTrigger>
          <TabsTrigger value="clinical">Clinical</TabsTrigger>
          <TabsTrigger value="administrative">Administrative</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="patient-care" className="mt-0">
          <TemplateGrid 
            templates={filteredTemplates} 
            onUseTemplate={onUseTemplate} 
          />
        </TabsContent>
        
        <TabsContent value="clinical" className="mt-0">
          <TemplateGrid 
            templates={filteredTemplates} 
            onUseTemplate={onUseTemplate} 
          />
        </TabsContent>
        
        <TabsContent value="administrative" className="mt-0">
          <TemplateGrid 
            templates={filteredTemplates} 
            onUseTemplate={onUseTemplate} 
          />
        </TabsContent>
        
        <TabsContent value="compliance" className="mt-0">
          <TemplateGrid 
            templates={filteredTemplates} 
            onUseTemplate={onUseTemplate} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TemplateGridProps {
  templates: WorkflowTemplate[];
  onUseTemplate: (templateId: string) => void;
}

const TemplateGrid: React.FC<TemplateGridProps> = ({ templates, onUseTemplate }) => {
  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <File className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No templates found</h3>
        <p className="text-muted-foreground max-w-sm mt-2">
          Try adjusting your search or category filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <TemplateCard 
          key={template.id} 
          template={template} 
          onUseTemplate={onUseTemplate} 
        />
      ))}
    </div>
  );
};

interface TemplateCardProps {
  template: WorkflowTemplate;
  onUseTemplate: (templateId: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onUseTemplate }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-full bg-primary/10">{template.icon}</div>
          <Badge variant="outline" className="ml-2">
            {template.steps} steps
          </Badge>
        </div>
        <CardTitle className="mt-2">{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-1 mt-1">
          {template.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-4">
          <div className="text-sm text-muted-foreground mb-1">Steps:</div>
          <div className="flex space-x-1 overflow-x-auto pb-1">
            {template.stepTypes.map((stepType, index) => (
              <Badge key={index} className="whitespace-nowrap">
                {stepType.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full" 
          onClick={() => onUseTemplate(template.id)}
        >
          Use Template
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HealthcareWorkflowTemplates;
