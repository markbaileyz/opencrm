
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Patient } from "@/types/patient";
import { Search, UserPlus, Phone, Mail, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ResponsiveContainer from "@/components/ui/responsive-container";
import MobilePatientList from './MobilePatientList';

interface PatientListProps {
  patients: Patient[];
  onViewDetails: (patientId: string) => void;
  onAddPatient: () => void;
}

const PatientList: React.FC<PatientListProps> = ({ 
  patients, 
  onViewDetails, 
  onAddPatient 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery)
  );

  // Desktop view component
  const DesktopPatientList = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={onAddPatient}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground h-24">
                  No patients found
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{new Date(patient.dateOfBirth).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <span className="flex items-center text-sm">
                        <Phone className="mr-2 h-3 w-3 text-muted-foreground" />
                        {patient.phone}
                      </span>
                      <span className="flex items-center text-sm">
                        <Mail className="mr-2 h-3 w-3 text-muted-foreground" />
                        {patient.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'No visits'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={patient.status === 'active' ? 'default' : 
                        patient.status === 'pending' ? 'outline' : 'secondary'}
                    >
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(patient.id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <ResponsiveContainer
      mobileView={<MobilePatientList 
        patients={filteredPatients} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onViewDetails={onViewDetails}
        onAddPatient={onAddPatient}
      />}
      desktopView={<DesktopPatientList />}
    />
  );
};

export default PatientList;
