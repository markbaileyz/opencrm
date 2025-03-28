
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";

import PrescriptionHeader from "@/components/prescriptions/PrescriptionHeader";
import PrescriptionFilters from "@/components/prescriptions/PrescriptionFilters";
import ActivePrescriptionsTab from "@/components/prescriptions/ActivePrescriptionsTab";
import PrescriptionHistoryTab from "@/components/prescriptions/PrescriptionHistoryTab";
import PrescriptionTemplatesTab from "@/components/prescriptions/PrescriptionTemplatesTab";

const PrescriptionsPage = () => {
  const [patientFilter, setPatientFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("current");
  const [medicationType, setMedicationType] = useState("all");

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <PrescriptionHeader />

        <PrescriptionFilters 
          patientFilter={patientFilter}
          setPatientFilter={setPatientFilter}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          medicationType={medicationType}
          setMedicationType={setMedicationType}
        />

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Prescriptions</TabsTrigger>
            <TabsTrigger value="history">Prescription History</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            <ActivePrescriptionsTab />
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <PrescriptionHistoryTab />
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <PrescriptionTemplatesTab />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PrescriptionsPage;
