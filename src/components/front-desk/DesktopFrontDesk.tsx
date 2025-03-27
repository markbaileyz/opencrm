import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Calendar } from "lucide-react";
import PatientWaitingCard from "@/components/front-desk/PatientWaitingCard";
import PatientCheckedInCard from "@/components/front-desk/PatientCheckedInCard";
import PatientUpcomingCard from "@/components/front-desk/PatientUpcomingCard";
import CheckInDialog from "./CheckInDialog";
import ScheduleDialog from "./ScheduleDialog";
import { PatientListItem } from "@/types/patientList";

const samplePatients: PatientListItem[] = [
  {
    id: "1",
    name: "John Smith",
    dateOfBirth: "1980-05-15",
    gender: "male",
    phone: "(555) 123-4567",
    email: "john.smith@example.com",
    address: "123 Main St, Anytown, USA",
    insurance: {
      provider: "Blue Cross",
      policyNumber: "BC12345678",
      group: "Group-123"
    },
    status: "active",
    lastVisit: "2023-05-10"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    dateOfBirth: "1975-08-21",
    gender: "female",
    phone: "(555) 987-6543",
    email: "sarah.johnson@example.com",
    address: "456 Oak Ave, Somewhere, USA",
    insurance: {
      provider: "Aetna",
      policyNumber: "AE87654321",
      group: "Group-456"
    },
    status: "active",
    lastVisit: "2023-04-22"
  },
  {
    id: "3",
    name: "Michael Davis",
    dateOfBirth: "1992-02-10",
    gender: "male",
    phone: "(555) 456-7890",
    email: "michael.davis@example.com",
    address: "789 Pine St, Nowhere, USA",
    insurance: {
      provider: "UnitedHealthcare",
      policyNumber: "UH24681357",
      group: "Group-789"
    },
    status: "active",
    lastVisit: "2023-06-01"
  }
];

const DesktopFrontDesk = () => {
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Front Desk</h1>
            <p className="text-muted-foreground">
              Manage patient check-ins, appointments, and scheduling
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsCheckInOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Check-In Patient
            </Button>
            <Button variant="outline" onClick={() => setIsScheduleOpen(true)}>
              <Calendar className="h-4 w-4 mr-2" />
              View Schedule
            </Button>
          </div>
        </div>

        <Tabs defaultValue="waiting" className="w-full">
          <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
            <TabsTrigger value="waiting">Waiting</TabsTrigger>
            <TabsTrigger value="checked-in">Checked In</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>

          <TabsContent value="waiting" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <PatientWaitingCard 
                name="John Smith" 
                time="10:30 AM" 
                waitTime="15 min" 
                provider="Dr. Johnson"
                appointmentType="Follow-up" 
              />
              <PatientWaitingCard 
                name="Alice Chen" 
                time="10:45 AM" 
                waitTime="5 min" 
                provider="Dr. Williams"
                appointmentType="New Patient" 
              />
              <PatientWaitingCard 
                name="Robert Davis" 
                time="11:00 AM" 
                waitTime="Just arrived" 
                provider="Dr. Smith"
                appointmentType="Consultation" 
              />
            </div>
          </TabsContent>

          <TabsContent value="checked-in" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <PatientCheckedInCard 
                name="Maria Rodriguez" 
                time="10:15 AM" 
                checkInTime="10:10 AM"
                provider="Dr. Johnson"
                room="103" 
              />
              <PatientCheckedInCard 
                name="David Lee" 
                time="10:00 AM" 
                checkInTime="9:55 AM"
                provider="Dr. Williams"
                room="105" 
              />
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <PatientUpcomingCard 
                name="Sarah Johnson" 
                time="11:30 AM" 
                provider="Dr. Smith"
                appointmentType="Follow-up" 
              />
              <PatientUpcomingCard 
                name="Michael Brown" 
                time="11:45 AM" 
                provider="Dr. Johnson"
                appointmentType="New Patient" 
              />
              <PatientUpcomingCard 
                name="Jennifer Wilson" 
                time="12:00 PM" 
                provider="Dr. Williams"
                appointmentType="Consultation" 
              />
              <PatientUpcomingCard 
                name="James Martin" 
                time="1:15 PM" 
                provider="Dr. Smith"
                appointmentType="Follow-up" 
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Check-ins Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground mt-1">+12% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Wait Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14 min</div>
              <p className="text-xs text-muted-foreground mt-1">-3 min from average</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">for the next 2 hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rooms Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7/12</div>
              <p className="text-xs text-muted-foreground mt-1">58% utilization</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <CheckInDialog 
        open={isCheckInOpen} 
        onOpenChange={setIsCheckInOpen}
        patients={samplePatients}
      />

      <ScheduleDialog
        open={isScheduleOpen}
        onOpenChange={setIsScheduleOpen}
        patients={samplePatients}
      />
    </>
  );
};

export default DesktopFrontDesk;
