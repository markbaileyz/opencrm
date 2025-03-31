
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PharmacyDirectoryView from "./PharmacyDirectoryView";
import PrescriptionTransmissionHistory from "./PrescriptionTransmissionHistory";
import PharmacyIntegrationSettings from "./PharmacyIntegrationSettings";

interface PharmacyIntegrationProps {
  className?: string;
}

const PharmacyIntegration: React.FC<PharmacyIntegrationProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<string>("directory");
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Pharmacy Integration</CardTitle>
        <CardDescription>
          Connect with pharmacy systems to transmit prescriptions electronically
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="directory" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="directory">Pharmacy Directory</TabsTrigger>
            <TabsTrigger value="transmissions">Transmission History</TabsTrigger>
            <TabsTrigger value="settings">Integration Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="directory" className="mt-4">
            <PharmacyDirectoryView />
          </TabsContent>
          <TabsContent value="transmissions" className="mt-4">
            <PrescriptionTransmissionHistory />
          </TabsContent>
          <TabsContent value="settings" className="mt-4">
            <PharmacyIntegrationSettings />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PharmacyIntegration;
