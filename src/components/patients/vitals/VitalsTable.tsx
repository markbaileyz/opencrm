
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VitalReading } from "@/hooks/useVitalsData";

interface VitalsTableProps {
  readings: VitalReading[];
}

const VitalsTable: React.FC<VitalsTableProps> = ({ readings }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredReadings = readings
    .filter(reading => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        reading.date.toLowerCase().includes(searchLower) ||
        reading.bloodPressure.toLowerCase().includes(searchLower) ||
        (reading.recordedBy && reading.recordedBy.toLowerCase().includes(searchLower)) ||
        (reading.notes && reading.notes.toLowerCase().includes(searchLower))
      );
    })
    .sort((a, b) => {
      if (sortField === "date") {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }
      
      if (sortField === "bloodPressure") {
        const systolicA = parseInt(a.bloodPressure.split('/')[0]);
        const systolicB = parseInt(b.bloodPressure.split('/')[0]);
        return sortDirection === "asc" ? systolicA - systolicB : systolicB - systolicA;
      }
      
      // For numeric fields
      if (["heartRate", "temperature", "respiratoryRate", "oxygenSaturation", "weight"].includes(sortField)) {
        return sortDirection === "asc" 
          ? (a as any)[sortField] - (b as any)[sortField] 
          : (b as any)[sortField] - (a as any)[sortField];
      }
      
      // Default string comparison
      const valA = String((a as any)[sortField] || "");
      const valB = String((b as any)[sortField] || "");
      return sortDirection === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="max-w-sm">
          <Input
            placeholder="Search readings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" onClick={() => setSearchTerm("")}>
          Clear Filter
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer" 
                onClick={() => handleSort("date")}
              >
                Date {sortField === "date" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("bloodPressure")}
              >
                Blood Pressure {sortField === "bloodPressure" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("heartRate")}
              >
                Heart Rate {sortField === "heartRate" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("temperature")}
              >
                Temperature {sortField === "temperature" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("respiratoryRate")}
              >
                Resp Rate {sortField === "respiratoryRate" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("oxygenSaturation")}
              >
                O2 Sat {sortField === "oxygenSaturation" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("weight")}
              >
                Weight {sortField === "weight" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("recordedBy")}
              >
                Recorded By {sortField === "recordedBy" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReadings.length > 0 ? (
              filteredReadings.map((reading) => (
                <TableRow key={reading.id} className="hover:bg-muted/50">
                  <TableCell>{reading.date}</TableCell>
                  <TableCell>{reading.bloodPressure}</TableCell>
                  <TableCell>{reading.heartRate} bpm</TableCell>
                  <TableCell>{reading.temperature.toFixed(1)}°F</TableCell>
                  <TableCell>{reading.respiratoryRate} bpm</TableCell>
                  <TableCell>{reading.oxygenSaturation}%</TableCell>
                  <TableCell>{reading.weight.toFixed(1)} kg</TableCell>
                  <TableCell>{reading.recordedBy || "-"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                  No vital readings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        {filteredReadings.length} {filteredReadings.length === 1 ? 'record' : 'records'} found
      </div>
    </div>
  );
};

export default VitalsTable;
