
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MedicalRecord } from "@/types/medicalRecord";
import { FileCheck, Calendar, Search, Filter } from "lucide-react";
import { format } from "date-fns";
import MedicalRecordDetail from "./MedicalRecordDetail";

interface MedicalRecordsListProps {
  records: MedicalRecord[];
  patientName?: string;
}

const MedicalRecordsList: React.FC<MedicalRecordsListProps> = ({ records, patientName }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  
  const filteredRecords = records.filter(record => 
    record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRecordTypeBadge = (type: string) => {
    switch (type) {
      case "visit":
        return <Badge variant="outline" className="border-blue-500 text-blue-700">Visit</Badge>;
      case "lab":
        return <Badge variant="outline" className="border-purple-500 text-purple-700">Lab</Badge>;
      case "imaging":
        return <Badge variant="outline" className="border-indigo-500 text-indigo-700">Imaging</Badge>;
      case "procedure":
        return <Badge variant="outline" className="border-red-500 text-red-700">Procedure</Badge>;
      case "vaccination":
        return <Badge variant="outline" className="border-green-500 text-green-700">Vaccination</Badge>;
      case "allergy":
        return <Badge variant="outline" className="border-orange-500 text-orange-700">Allergy</Badge>;
      case "diagnosis":
        return <Badge variant="outline" className="border-amber-500 text-amber-700">Diagnosis</Badge>;
      case "note":
        return <Badge variant="outline" className="border-gray-500 text-gray-700">Note</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      {selectedRecord ? (
        <MedicalRecordDetail 
          record={selectedRecord} 
          onClose={() => setSelectedRecord(null)} 
        />
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Medical Records {patientName && `- ${patientName}`}</CardTitle>
              <CardDescription>View and manage patient medical records</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search records..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button>Add Record</Button>
            </div>
          </CardHeader>
          <CardContent>
            {filteredRecords.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Record</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedRecord(record)}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <FileCheck className="h-4 w-4 mr-2 text-blue-500" />
                          {record.title}
                        </div>
                      </TableCell>
                      <TableCell>{getRecordTypeBadge(record.recordType)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {format(new Date(record.date), "MMM d, yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>{record.provider}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            record.status === "draft"
                              ? "bg-yellow-100 text-yellow-800"
                              : record.status === "final"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }
                        >
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRecord(record);
                        }}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileCheck className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No records found</h3>
                <p className="text-sm text-muted-foreground max-w-md mt-1">
                  {searchTerm
                    ? "No records match your search criteria. Try adjusting your search terms."
                    : "No medical records have been added yet."}
                </p>
                {!searchTerm && <Button className="mt-4">Add First Record</Button>}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MedicalRecordsList;
