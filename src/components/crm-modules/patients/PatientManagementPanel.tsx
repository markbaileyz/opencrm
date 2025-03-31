
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  UserPlus,
  RefreshCcw,
  FileText,
  Calendar,
  Clock,
  Phone,
  Mail
} from "lucide-react";

// Sample patient data - in a real app, this would come from an API
const patientData = [
  {
    id: 1,
    name: "Sarah Johnson",
    status: "Active",
    age: 42,
    lastVisit: "2023-05-15",
    nextAppointment: "2023-06-20",
    contactNumber: "(555) 123-4567",
    email: "sarah.j@example.com",
    conditions: ["Hypertension", "Diabetes"]
  },
  {
    id: 2,
    name: "Michael Chen",
    status: "Active",
    age: 35,
    lastVisit: "2023-05-10",
    nextAppointment: "2023-06-05",
    contactNumber: "(555) 987-6543",
    email: "m.chen@example.com",
    conditions: ["Asthma"]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    status: "Inactive",
    age: 28,
    lastVisit: "2023-04-22",
    nextAppointment: null,
    contactNumber: "(555) 345-6789",
    email: "e.rodriguez@example.com",
    conditions: ["Anxiety"]
  },
  {
    id: 4,
    name: "James Wilson",
    status: "New",
    age: 56,
    lastVisit: null,
    nextAppointment: "2023-05-30",
    contactNumber: "(555) 567-8901",
    email: "j.wilson@example.com",
    conditions: ["Heart Disease", "Arthritis"]
  },
  {
    id: 5,
    name: "Olivia Taylor",
    status: "Active",
    age: 31,
    lastVisit: "2023-05-18",
    nextAppointment: "2023-06-15",
    contactNumber: "(555) 234-5678",
    email: "o.taylor@example.com",
    conditions: ["Migraine"]
  }
];

const PatientManagementPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredPatients = patientData.filter(patient => {
    // Filter by search query
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status tab
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && patient.status.toLowerCase() === activeTab.toLowerCase();
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Patient Management</CardTitle>
          <Button size="sm" variant="outline">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search patients..."
                className="w-full pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">All Patients</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <PatientsList patients={filteredPatients} />
            </TabsContent>
            <TabsContent value="active" className="mt-4">
              <PatientsList patients={filteredPatients} />
            </TabsContent>
            <TabsContent value="new" className="mt-4">
              <PatientsList patients={filteredPatients} />
            </TabsContent>
            <TabsContent value="inactive" className="mt-4">
              <PatientsList patients={filteredPatients} />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

interface Patient {
  id: number;
  name: string;
  status: string;
  age: number;
  lastVisit: string | null;
  nextAppointment: string | null;
  contactNumber: string;
  email: string;
  conditions: string[];
}

interface PatientsListProps {
  patients: Patient[];
}

const PatientsList: React.FC<PatientsListProps> = ({ patients }) => {
  if (patients.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-md">
        <p className="text-muted-foreground">No patients found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  );
};

const PatientCard: React.FC<{ patient: Patient }> = ({ patient }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "new":
        return "primary";
      case "inactive":
        return "secondary";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not scheduled";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-lg">{patient.name}</h3>
              <Badge variant={getStatusColor(patient.status) as any}>
                {patient.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {patient.age} years old • {patient.conditions.join(", ")}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="text-sm">
                {patient.lastVisit ? (
                  <>Last visit: {formatDate(patient.lastVisit)}</>
                ) : (
                  <span className="text-muted-foreground">No previous visits</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="text-sm">
                {patient.nextAppointment ? (
                  <>Next: {formatDate(patient.nextAppointment)}</>
                ) : (
                  <span className="text-muted-foreground">No upcoming appointments</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientManagementPanel;
