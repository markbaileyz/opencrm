
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const DocumentationSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentation</CardTitle>
        <CardDescription>Access detailed documentation for all features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-4 border rounded-lg">
            <FileText className="h-8 w-8 text-primary mr-4" />
            <div>
              <h3 className="font-medium">User Manual</h3>
              <p className="text-sm text-muted-foreground">Comprehensive user documentation</p>
            </div>
          </div>
          <div className="flex items-center p-4 border rounded-lg">
            <FileText className="h-8 w-8 text-primary mr-4" />
            <div>
              <h3 className="font-medium">API Documentation</h3>
              <p className="text-sm text-muted-foreground">Technical API references</p>
            </div>
          </div>
          <div className="flex items-center p-4 border rounded-lg">
            <FileText className="h-8 w-8 text-primary mr-4" />
            <div>
              <h3 className="font-medium">Healthcare Guides</h3>
              <p className="text-sm text-muted-foreground">Healthcare specific workflows</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentationSection;
