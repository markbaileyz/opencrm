
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCheck, ChartBar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import MedicalRecordsList from "@/components/medical-records/MedicalRecordsList";
import MedicalRecordsStats from "@/components/medical-records/MedicalRecordsStats";
import MedicalRecordsFilter from "@/components/medical-records/MedicalRecordsFilter";
import { sampleMedicalRecords, getMedicalRecordStats } from "@/data/medicalRecordsData";
import { MedicalRecordFilter } from "@/types/medicalRecord";

const MedicalRecordsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<MedicalRecordFilter>({});
  const stats = getMedicalRecordStats();

  const filteredRecords = sampleMedicalRecords.filter(record => {
    // Filter by record type
    if (activeFilter.recordType && activeFilter.recordType.length > 0) {
      if (!activeFilter.recordType.includes(record.recordType)) {
        return false;
      }
    }
    
    // Filter by status
    if (activeFilter.status && activeFilter.status.length > 0) {
      if (!activeFilter.status.includes(record.status)) {
        return false;
      }
    }
    
    // Filter by provider
    if (activeFilter.provider && activeFilter.provider.length > 0) {
      if (!activeFilter.provider.includes(record.provider)) {
        return false;
      }
    }
    
    // Filter by date range
    if (activeFilter.dateRange) {
      const recordDate = new Date(record.date);
      const fromDate = new Date(activeFilter.dateRange.from);
      const toDate = new Date(activeFilter.dateRange.to);
      
      if (recordDate < fromDate || recordDate > toDate) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Medical Records</h1>
            <p className="text-muted-foreground">
              View and manage patient medical records
            </p>
          </div>
          <div className="flex gap-2">
            <MedicalRecordsFilter onFilterChange={setActiveFilter} />
            <Button className="flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              <span>Add New Record</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="records" className="w-full">
          <TabsList className="flex">
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              <span>Records</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <ChartBar className="h-4 w-4" />
              <span>Statistics</span>
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Patient Selection</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="mt-6">
            <MedicalRecordsList records={filteredRecords} />
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <MedicalRecordsStats stats={stats} />
          </TabsContent>

          <TabsContent value="patients" className="mt-6">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium mb-2">Patient Selection Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                This feature will allow you to select specific patients to view their medical records.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MedicalRecordsPage;
