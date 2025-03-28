
import React from "react";
import { Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { prescriptionTemplates } from "@/data/prescriptionData";

const PrescriptionTemplatesTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {prescriptionTemplates.map((template) => (
        <Card key={template.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <Pill className="h-5 w-5 text-blue-500" />
            </div>
            <CardDescription>{template.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Default Dosage:</span>
                <span>{template.defaultDosage}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Default Duration:</span>
                <span>{template.defaultDuration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Common Usage:</span>
                <span>{template.commonUsage}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="outline" size="sm" className="w-full">Use Template</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PrescriptionTemplatesTab;
