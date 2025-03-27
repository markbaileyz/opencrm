
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Phone, Mail, Calendar, ChevronRight } from "lucide-react";
import { PatientListItem } from "@/types/patientList";

interface MobilePatientListProps {
  patients: PatientListItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onViewDetails: (patientId: string) => void;
  onAddPatient: () => void;
}

const MobilePatientList: React.FC<MobilePatientListProps> = ({
  patients,
  searchQuery,
  setSearchQuery,
  onViewDetails,
  onAddPatient
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={onAddPatient} className="w-full">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <div className="space-y-3">
        {patients.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No patients found</p>
          </div>
        ) : (
          patients.map((patient) => (
            <Card key={patient.id} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  className="w-full text-left p-4 flex flex-col space-y-2"
                  onClick={() => onViewDetails(patient.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-base">{patient.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(patient.dateOfBirth).toLocaleDateString()} ({getAge(patient.dateOfBirth)} yrs)
                      </div>
                    </div>
                    <Badge 
                      variant={
                        patient.status === 'active' ? 'default' : 
                        patient.status === 'pending' ? 'outline' : 'secondary'
                      }
                    >
                      {patient.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                      <span className="truncate">{patient.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2 pt-2 border-t">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                      <span>
                        {patient.lastVisit 
                          ? `Last visit: ${new Date(patient.lastVisit).toLocaleDateString()}` 
                          : 'No previous visits'}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

// Helper function to calculate age from date of birth
const getAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export default MobilePatientList;
