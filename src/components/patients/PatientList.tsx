
import React, { useState } from "react";
import { Patient } from "@/types/patient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

interface PatientListProps {
  patients: Patient[];
  selectedPatientId?: string;
  onSelectPatient: (patient: Patient) => void;
}

const PatientList: React.FC<PatientListProps> = ({
  patients,
  selectedPatientId,
  onSelectPatient,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = 
      patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery);
      
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Patients ({patients.length})</CardTitle>
        <div className="flex flex-col space-y-2 mt-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Button 
              variant={statusFilter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setStatusFilter("all")}
              className="flex-1"
            >
              All
            </Button>
            <Button 
              variant={statusFilter === "active" ? "default" : "outline"} 
              size="sm"
              onClick={() => setStatusFilter("active")}
              className="flex-1"
            >
              Active
            </Button>
            <Button 
              variant={statusFilter === "inactive" ? "default" : "outline"} 
              size="sm"
              onClick={() => setStatusFilter("inactive")}
              className="flex-1"
            >
              Inactive
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-[calc(100vh-18rem)]">
        {filteredPatients.length > 0 ? (
          <div className="space-y-2">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className={`p-3 cursor-pointer rounded-md transition-colors ${
                  selectedPatientId === patient.id
                    ? "bg-primary/10 hover:bg-primary/15"
                    : "hover:bg-muted"
                }`}
                onClick={() => onSelectPatient(patient)}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="font-medium">
                    {patient.firstName} {patient.lastName}
                  </div>
                  <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                    {patient.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{patient.email}</div>
                <div className="text-sm text-muted-foreground">{patient.phone}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No patients found matching your criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientList;
