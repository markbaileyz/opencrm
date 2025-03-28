
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Users, Calendar, ClipboardList, DollarSign } from "lucide-react";

const HealthcareCRMModule: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-1">Healthcare CRM</h2>
        <p className="text-muted-foreground">Manage your healthcare practice</p>
      </div>
      
      <Tabs defaultValue="patients">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="patients">
            <Users className="h-4 w-4 mr-2" />
            Patients
          </TabsTrigger>
          <TabsTrigger value="appointments">
            <Calendar className="h-4 w-4 mr-2" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="treatments">
            <Activity className="h-4 w-4 mr-2" />
            Treatments
          </TabsTrigger>
          <TabsTrigger value="records">
            <ClipboardList className="h-4 w-4 mr-2" />
            Records
          </TabsTrigger>
          <TabsTrigger value="billing">
            <DollarSign className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="patients" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Patient management interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Appointment scheduling interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="treatments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Treatment Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Treatment plans interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="records" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Medical records interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Insurance</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Billing and insurance interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthcareCRMModule;
