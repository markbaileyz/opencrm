
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prescriptionTransmissions, getPharmacyById } from "@/data/pharmacyData";
import { prescriptionHistoryData } from "@/data/prescriptionData";
import { PrescriptionTransmission } from "@/types/pharmacy";
import { format } from "date-fns";
import TransmissionDetailDialog from "./TransmissionDetailDialog";

const PrescriptionTransmissionHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState<PrescriptionTransmission | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const filteredTransmissions = prescriptionTransmissions.filter(transmission => {
    const prescription = prescriptionHistoryData.find(p => p.id.toString() === transmission.prescriptionId);
    const pharmacy = getPharmacyById(transmission.pharmacyId);
    
    const searchString = `
      ${prescription?.medication || ""} 
      ${prescription?.patientName || ""} 
      ${pharmacy?.name || ""}
    `.toLowerCase();
    
    return searchString.includes(searchTerm.toLowerCase());
  });

  const getPrescriptionData = (id: string) => {
    return prescriptionHistoryData.find(p => p.id.toString() === id);
  };

  const getTransmissionStatusColor = (status: string) => {
    switch (status) {
      case "filled": return "bg-green-50 text-green-700 border-green-200";
      case "processing": return "bg-blue-50 text-blue-700 border-blue-200";
      case "sent": return "bg-purple-50 text-purple-700 border-purple-200";
      case "received": return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "error": return "bg-red-50 text-red-700 border-red-200";
      case "cancelled": return "bg-gray-50 text-gray-700 border-gray-200";
      case "pending": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const handleViewDetails = (transmission: PrescriptionTransmission) => {
    setSelectedTransmission(transmission);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by medication, patient, or pharmacy..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Medication</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Pharmacy</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransmissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No transmission records found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTransmissions.map((transmission) => {
                const prescription = getPrescriptionData(transmission.prescriptionId);
                const pharmacy = getPharmacyById(transmission.pharmacyId);
                const sentDate = transmission.sentDate 
                  ? new Date(transmission.sentDate)
                  : null;
                
                return (
                  <TableRow key={transmission.id}>
                    <TableCell>
                      {sentDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{format(sentDate, "MMM dd, yyyy")}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{prescription?.medication || "Unknown"}</TableCell>
                    <TableCell>{prescription?.patientName || "Unknown"}</TableCell>
                    <TableCell>{pharmacy?.name || "Unknown"}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getTransmissionStatusColor(transmission.status)}
                      >
                        {transmission.status.charAt(0).toUpperCase() + transmission.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleViewDetails(transmission)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      
      <TransmissionDetailDialog 
        transmission={selectedTransmission} 
        open={isDetailOpen} 
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
};

export default PrescriptionTransmissionHistory;
