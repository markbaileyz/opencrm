
import React from "react";
import StrategiesContent from "@/components/healthcare-crm/StrategiesContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, BookOpen, MessageSquare, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const DesktopHealthcareCRM = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="strategies" className="w-full">
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="strategies">
              <StrategiesContent />
            </TabsContent>
            
            <TabsContent value="implementation">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Implementation Guide</h2>
                <p className="text-muted-foreground text-lg">
                  Coming soon: This section will provide detailed guidance on implementing healthcare CRM strategies within your organization.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="resources">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Resources & Tools</h2>
                <p className="text-muted-foreground text-lg">
                  Coming soon: Access templates, checklists, and other resources to support your healthcare CRM implementation.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="case-studies">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Case Studies</h2>
                <p className="text-muted-foreground text-lg">
                  Coming soon: Explore real-world examples of successful healthcare CRM implementations and their outcomes.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:order-first md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Healthcare CRM Resources</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileDown className="mr-2 h-4 w-4" />
                    Download Complete Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Implementation Checklist
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Request Consultation
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    FAQ
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Implementation Timeline</h3>
                <div className="space-y-4">
                  <div className="relative pl-6 pb-4 border-l-2 border-primary/20">
                    <div className="absolute top-0 left-[-8px] w-4 h-4 rounded-full bg-primary"></div>
                    <h4 className="font-medium">Assessment Phase</h4>
                    <p className="text-sm text-muted-foreground">1-2 weeks</p>
                  </div>
                  <div className="relative pl-6 pb-4 border-l-2 border-primary/20">
                    <div className="absolute top-0 left-[-8px] w-4 h-4 rounded-full bg-primary/60"></div>
                    <h4 className="font-medium">Planning & Setup</h4>
                    <p className="text-sm text-muted-foreground">2-4 weeks</p>
                  </div>
                  <div className="relative pl-6 pb-4 border-l-2 border-primary/20">
                    <div className="absolute top-0 left-[-8px] w-4 h-4 rounded-full bg-primary/40"></div>
                    <h4 className="font-medium">Staff Training</h4>
                    <p className="text-sm text-muted-foreground">2-3 weeks</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute top-0 left-[-8px] w-4 h-4 rounded-full bg-primary/20"></div>
                    <h4 className="font-medium">Full Implementation</h4>
                    <p className="text-sm text-muted-foreground">4-8 weeks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHealthcareCRM;
