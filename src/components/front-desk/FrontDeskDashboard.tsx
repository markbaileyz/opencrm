
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, Clock, CheckCircle, XCircle, UserCheck, Plus, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CheckInDialog from "./CheckInDialog";
import { PatientListItem } from "@/types/patientList";

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  insuranceProvider: string;
  appointmentTime: string;
  appointmentType: string;
  status: "scheduled" | "checked-in" | "in-progress" | "completed" | "no-show" | "canceled";
  provider: string;
  notes?: string;
}

const patientsList: PatientListItem[] = [
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
      policyNumber: "BC123456789",
      group: "GRP-1234"
    },
    status: "active",
    lastVisit: "2023-11-15",
    medicalHistory: [
      { condition: "Hypertension", diagnosedDate: "2018-03-10" },
      { condition: "Type 2 Diabetes", diagnosedDate: "2019-07-22" }
    ]
  },
  {
    id: "2",
    name: "Sarah Johnson",
    dateOfBirth: "1992-09-23",
    gender: "female",
    phone: "(555) 987-6543",
    email: "sarah.johnson@example.com",
    address: "456 Oak Ave, Somewhere, USA",
    insurance: {
      provider: "Aetna",
      policyNumber: "AET987654321",
      group: "GRP-5678"
    },
    status: "active",
    lastVisit: "2023-12-01",
    medicalHistory: [
      { condition: "Asthma", diagnosedDate: "2010-05-17" }
    ]
  },
  {
    id: "3",
    name: "Michael Chen",
    dateOfBirth: "1975-11-08",
    gender: "male",
    phone: "(555) 456-7890",
    email: "michael.chen@example.com",
    address: "789 Pine St, Nowhere, USA",
    insurance: {
      provider: "UnitedHealthcare",
      policyNumber: "UHC567891234",
      group: "GRP-9012"
    },
    status: "inactive",
    lastVisit: "2023-09-10",
    medicalHistory: [
      { condition: "Arthritis", diagnosedDate: "2015-12-03" },
      { condition: "High Cholesterol", diagnosedDate: "2016-02-14" }
    ]
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    dateOfBirth: "1988-03-12",
    gender: "female",
    phone: "(555) 789-0123",
    email: "emily.rodriguez@example.com",
    address: "101 Maple Dr, Elsewhere, USA",
    insurance: {
      provider: "Cigna",
      policyNumber: "CG432109876",
      group: "GRP-3456"
    },
    status: "pending",
    lastVisit: null,
    medicalHistory: []
  }
];

const FrontDeskDashboard: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);
  const [appointmentToCheckIn, setAppointmentToCheckIn] = useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      patientId: "1",
      patientName: "John Smith",
      insuranceProvider: "Blue Cross",
      appointmentTime: "09:00 AM",
      appointmentType: "Follow-up",
      status: "scheduled",
      provider: "Dr. Johnson",
      notes: "Patient needs to update insurance information"
    },
    {
      id: "2",
      patientId: "2",
      patientName: "Sarah Johnson",
      insuranceProvider: "Aetna",
      appointmentTime: "10:30 AM",
      appointmentType: "Annual Physical",
      status: "checked-in",
      provider: "Dr. Williams",
      notes: "New patient, arrived 15 minutes early"
    },
    {
      id: "3",
      patientId: "3",
      patientName: "Michael Chen",
      insuranceProvider: "UnitedHealthcare",
      appointmentTime: "11:15 AM",
      appointmentType: "Consultation",
      status: "in-progress",
      provider: "Dr. Smith",
    },
    {
      id: "4",
      patientId: "4",
      patientName: "Emily Rodriguez",
      insuranceProvider: "Cigna",
      appointmentTime: "01:45 PM",
      appointmentType: "Initial Visit",
      status: "scheduled",
      provider: "Dr. Johnson",
    },
    {
      id: "5",
      patientId: "2",
      patientName: "Sarah Johnson",
      insuranceProvider: "Aetna",
      appointmentTime: "03:00 PM",
      appointmentType: "Lab Results",
      status: "scheduled",
      provider: "Dr. Williams",
    }
  ]);

  const handleCheckIn = (appointment: Appointment) => {
    setAppointmentToCheckIn(appointment);
    setIsCheckInDialogOpen(true);
  };

  const handleStatusChange = (appointmentId: string, newStatus: Appointment["status"]) => {
    setAppointments(appointments.map(appointment => {
      if (appointment.id === appointmentId) {
        return { ...appointment, status: newStatus };
      }
      return appointment;
    }));
    
    const statusMessages = {
      "scheduled": "Appointment marked as scheduled",
      "checked-in": "Patient checked in",
      "in-progress": "Patient is now with provider",
      "completed": "Appointment completed",
      "no-show": "Patient marked as no-show",
      "canceled": "Appointment canceled"
    };
    
    toast({
      title: statusMessages[newStatus],
      description: `Status updated for ${appointments.find(a => a.id === appointmentId)?.patientName}`,
      variant: "default"
    });
  };

  const getStatusBadge = (status: Appointment["status"]) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-300">Scheduled</Badge>;
      case "checked-in":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Checked In</Badge>;
      case "in-progress":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">With Provider</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Completed</Badge>;
      case "no-show":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">No Show</Badge>;
      case "canceled":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Canceled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    return appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           appointment.appointmentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
           appointment.provider.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Group appointments by status for the dashboard
  const groupedAppointments = {
    scheduled: filteredAppointments.filter(a => a.status === "scheduled"),
    checkedIn: filteredAppointments.filter(a => a.status === "checked-in"),
    inProgress: filteredAppointments.filter(a => a.status === "in-progress"),
    completed: filteredAppointments.filter(a => a.status === "completed"),
    noShow: filteredAppointments.filter(a => a.status === "no-show"),
    canceled: filteredAppointments.filter(a => a.status === "canceled")
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Front Desk Dashboard</h2>
          <p className="text-muted-foreground">
            Manage patient check-ins and today's appointments
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsCheckInDialogOpen(true)}>
            <UserCheck className="h-4 w-4 mr-2" />
            Check In Patient
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search appointments or patients..."
          className="pl-8 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="allAppointments">All Appointments</TabsTrigger>
          <TabsTrigger value="checkedIn">Checked In</TabsTrigger>
          <TabsTrigger value="waitingRoom">Waiting Room</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAppointments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">No appointments scheduled for today</p>
                  ) : (
                    <div className="text-sm">
                      <div className="font-medium">Scheduled: {groupedAppointments.scheduled.length}</div>
                      <div className="font-medium">Checked In: {groupedAppointments.checkedIn.length}</div>
                      <div className="font-medium">With Provider: {groupedAppointments.inProgress.length}</div>
                      <div className="font-medium">Completed: {groupedAppointments.completed.length}</div>
                      <div className="font-medium">No Show: {groupedAppointments.noShow.length}</div>
                      <div className="font-medium">Canceled: {groupedAppointments.canceled.length}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Waiting Room
                </CardTitle>
                <CardDescription>
                  Patients checked in and waiting
                </CardDescription>
              </CardHeader>
              <CardContent>
                {groupedAppointments.checkedIn.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No patients in waiting room</p>
                ) : (
                  <div className="space-y-3">
                    {groupedAppointments.checkedIn.map(appointment => (
                      <div key={appointment.id} className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                        <div>
                          <div className="font-medium">{appointment.patientName}</div>
                          <div className="text-xs text-muted-foreground">
                            {appointment.appointmentTime} • {appointment.provider}
                          </div>
                        </div>
                        <Button size="sm" variant="secondary" onClick={() => handleStatusChange(appointment.id, "in-progress")}>
                          Start Visit
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Upcoming Appointments
                </CardTitle>
                <CardDescription>
                  Next scheduled arrivals
                </CardDescription>
              </CardHeader>
              <CardContent>
                {groupedAppointments.scheduled.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No upcoming appointments</p>
                ) : (
                  <div className="space-y-3">
                    {groupedAppointments.scheduled.slice(0, 3).map(appointment => (
                      <div key={appointment.id} className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                        <div>
                          <div className="font-medium">{appointment.patientName}</div>
                          <div className="text-xs text-muted-foreground">
                            {appointment.appointmentTime} • {appointment.appointmentType}
                          </div>
                        </div>
                        <Button size="sm" onClick={() => handleCheckIn(appointment)}>
                          Check In
                        </Button>
                      </div>
                    ))}
                    {groupedAppointments.scheduled.length > 3 && (
                      <Button variant="ghost" className="w-full text-xs">
                        View all {groupedAppointments.scheduled.length} upcoming
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Current Patient Status</CardTitle>
              <CardDescription>
                Overview of all patients for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAppointments.map(appointment => (
                  <div key={appointment.id} className="border rounded-md p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{appointment.patientName}</div>
                        <div className="text-sm text-muted-foreground">{appointment.appointmentTime} • {appointment.appointmentType}</div>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Provider: {appointment.provider} • Insurance: {appointment.insuranceProvider}
                    </div>
                    {appointment.notes && (
                      <div className="text-xs bg-muted p-2 rounded">
                        Note: {appointment.notes}
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      {appointment.status === "scheduled" && (
                        <Button size="sm" className="h-7" onClick={() => handleCheckIn(appointment)}>
                          Check In
                        </Button>
                      )}
                      {appointment.status === "checked-in" && (
                        <Button size="sm" variant="secondary" className="h-7" onClick={() => handleStatusChange(appointment.id, "in-progress")}>
                          Start Visit
                        </Button>
                      )}
                      {appointment.status === "in-progress" && (
                        <Button size="sm" variant="secondary" className="h-7" onClick={() => handleStatusChange(appointment.id, "completed")}>
                          Complete
                        </Button>
                      )}
                      {appointment.status === "scheduled" && (
                        <Button size="sm" variant="ghost" className="h-7" onClick={() => handleStatusChange(appointment.id, "no-show")}>
                          <XCircle className="h-3.5 w-3.5 mr-1" />
                          No Show
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="allAppointments">
          <Card>
            <CardHeader>
              <CardTitle>All Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAppointments.length > 0 ? filteredAppointments.map(appointment => (
                  <div key={appointment.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{appointment.patientName}</span>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Time:</span> {appointment.appointmentTime} • 
                        <span className="text-muted-foreground"> Type:</span> {appointment.appointmentType} •
                        <span className="text-muted-foreground"> Provider:</span> {appointment.provider}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {appointment.status === "scheduled" && (
                        <Button size="sm" onClick={() => handleCheckIn(appointment)}>Check In</Button>
                      )}
                      {appointment.status === "checked-in" && (
                        <Button size="sm" variant="secondary" onClick={() => handleStatusChange(appointment.id, "in-progress")}>Start Visit</Button>
                      )}
                      {appointment.status === "in-progress" && (
                        <Button size="sm" variant="secondary" onClick={() => handleStatusChange(appointment.id, "completed")}>Complete</Button>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No appointments found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="checkedIn">
          <Card>
            <CardHeader>
              <CardTitle>Checked In Patients</CardTitle>
              <CardDescription>
                Patients who have checked in for their appointment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groupedAppointments.checkedIn.length > 0 ? groupedAppointments.checkedIn.map(appointment => (
                  <div key={appointment.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{appointment.patientName}</span>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Checked In</Badge>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Time:</span> {appointment.appointmentTime} • 
                        <span className="text-muted-foreground"> Provider:</span> {appointment.provider}
                      </div>
                      {appointment.notes && (
                        <div className="text-xs bg-muted p-2 rounded mt-2">
                          Note: {appointment.notes}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => handleStatusChange(appointment.id, "in-progress")}>
                        Start Visit
                      </Button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No patients currently checked in</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="waitingRoom">
          <Card>
            <CardHeader>
              <CardTitle>Waiting Room</CardTitle>
              <CardDescription>
                Manage patients in the waiting room
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...groupedAppointments.checkedIn, ...groupedAppointments.inProgress].length > 0 ? 
                  [...groupedAppointments.checkedIn, ...groupedAppointments.inProgress].map(appointment => (
                    <div key={appointment.id} className="border rounded-md p-3 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{appointment.patientName}</div>
                          <div className="text-sm text-muted-foreground">{appointment.appointmentTime}</div>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <div>
                        <div className="text-sm">{appointment.appointmentType}</div>
                        <div className="text-sm text-muted-foreground">{appointment.provider}</div>
                      </div>
                      <div className="pt-2">
                        {appointment.status === "checked-in" ? (
                          <Button 
                            size="sm" 
                            variant="secondary" 
                            className="w-full"
                            onClick={() => handleStatusChange(appointment.id, "in-progress")}
                          >
                            Start Visit
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="secondary" 
                            className="w-full"
                            onClick={() => handleStatusChange(appointment.id, "completed")}
                          >
                            Complete Visit
                          </Button>
                        )}
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-muted-foreground">No patients in waiting room</p>
                    </div>
                  )
                }
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setIsCheckInDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Check In New Patient
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <CheckInDialog 
        open={isCheckInDialogOpen} 
        onOpenChange={setIsCheckInDialogOpen}
        patients={patientsList}
      />
    </div>
  );
};

export default FrontDeskDashboard;
