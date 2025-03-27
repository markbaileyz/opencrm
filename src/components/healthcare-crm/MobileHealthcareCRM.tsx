
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MobileLayout from "@/components/layout/MobileLayout";
import StrategiesContent from "@/components/healthcare-crm/StrategiesContent";
import ResponsiveContainer from "@/components/ui/responsive-container";
import { ArrowDownToLine, Lightbulb, BookText } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileHealthcareCRM = () => {
  return (
    <MobileLayout title="Healthcare CRM" navigationContent={<div className="p-4">Navigation placeholder</div>}>
      <div className="space-y-6 pb-24">
        <div className="bg-primary/10 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-primary" />
            CRM for Healthcare
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Modern healthcare requires effective patient relationship management to improve outcomes and satisfaction.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="flex items-center gap-1.5">
              <ArrowDownToLine className="h-3.5 w-3.5" />
              Download Guide
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-1.5">
              <BookText className="h-3.5 w-3.5" />
              Case Studies
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="strategies" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="strategies" className="mt-4">
            <StrategiesContent />
          </TabsContent>
          
          <TabsContent value="implementation" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Implementation Guide</h3>
              <p className="text-muted-foreground">
                Coming soon: Detailed guidance on implementing healthcare CRM strategies.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Resources & Tools</h3>
              <p className="text-muted-foreground">
                Coming soon: Access templates, checklists, and other resources to support your healthcare CRM implementation.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default MobileHealthcareCRM;
