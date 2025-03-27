
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MobileLayout from "@/components/layout/MobileLayout";
import MobileHeader from "@/components/front-desk/MobileHeader";
import MobileStats from "@/components/front-desk/MobileStats";
import PatientWaitingCard from "@/components/front-desk/PatientWaitingCard";
import PatientCheckedInCard from "@/components/front-desk/PatientCheckedInCard";
import PatientUpcomingCard from "@/components/front-desk/PatientUpcomingCard";

const MobileFrontDesk = () => (
  <MobileLayout title="Front Desk" navigationContent={<div className="p-4">Navigation placeholder</div>}>
    <div className="space-y-6">
      <MobileHeader />
      
      <Tabs defaultValue="waiting" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="waiting">Waiting</TabsTrigger>
          <TabsTrigger value="checked-in">Checked In</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <MobileStats />
        
        <TabsContent value="waiting" className="mt-4">
          <div className="space-y-3">
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

        <TabsContent value="checked-in" className="mt-4">
          <div className="space-y-3">
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

        <TabsContent value="upcoming" className="mt-4">
          <div className="space-y-3">
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </MobileLayout>
);

export default MobileFrontDesk;
