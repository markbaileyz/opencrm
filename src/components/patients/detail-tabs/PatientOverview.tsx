
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Patient } from "@/types/patient";

interface PatientOverviewProps {
  patient: Patient;
}

const PatientOverview: React.FC<PatientOverviewProps> = ({ patient }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h4>
              <p>{patient.firstName} {patient.lastName}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Date of Birth</h4>
              <p>{patient.dateOfBirth} {patient.age ? `(${patient.age} years)` : ''}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Gender</h4>
              <p>{patient.gender}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Patient ID</h4>
              <p>{patient.id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Phone</h4>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <p>{patient.phone}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <p>{patient.email}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Address</h4>
              <p>{patient.address}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Insurance</h4>
              <p>{patient.insuranceProvider}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h4 className="text-sm font-medium mb-2">Medical History</h4>
            <div className="space-y-2">
              {patient.medicalHistory?.length ? (
                patient.medicalHistory.map((item, index) => (
                  <div key={index} className="border p-3 rounded-md">
                    <div className="flex justify-between">
                      <p className="font-medium">{item.condition}</p>
                      <Badge variant="outline">{item.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.notes}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No medical history recorded</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            {patient.upcomingAppointment ? (
              <div>
                <div className="flex items-center mb-3">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <p className="font-medium">{patient.upcomingAppointment.date}</p>
                    <p className="text-sm text-muted-foreground">{patient.upcomingAppointment.time}</p>
                  </div>
                </div>
                <p className="text-sm"><span className="font-medium">Reason:</span> {patient.upcomingAppointment.reason}</p>
                <p className="text-sm"><span className="font-medium">Provider:</span> {patient.upcomingAppointment.provider}</p>
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="outline">Reschedule</Button>
                  <Button size="sm" variant="destructive">Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4">
                <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-center">No upcoming appointments</p>
                <Button size="sm" className="mt-3">Schedule Appointment</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {patient.recentActivity?.length ? (
              <div className="space-y-3">
                {patient.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No recent activity</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientOverview;
