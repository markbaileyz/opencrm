
import React, { useState } from "react";
import { Patient } from "@/types/patient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";

interface MobilePatientListProps {
  patients: Patient[];
  selectedPatientId?: string;
  onSelectPatient: (patient: Patient) => void;
  onAddPatient?: () => void;
}

const MobilePatientList: React.FC<MobilePatientListProps> = ({
  patients,
  selectedPatientId,
  onSelectPatient,
  onAddPatient,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [showFilters, setShowFilters] = useState(false);

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
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[280px]">
            <SheetHeader>
              <SheetTitle>Filter Patients</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Status</h3>
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
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Apply Filters</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        
        {onAddPatient && (
          <Button size="icon" onClick={onAddPatient}>
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

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
    </div>
  );
};

export default MobilePatientList;
