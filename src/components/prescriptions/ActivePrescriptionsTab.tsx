
import React from "react";
import { Pill, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import PrescriptionSummaryCard from "./PrescriptionSummaryCard";
import { prescriptionsData } from "@/data/prescriptionData";

const ActivePrescriptionsTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PrescriptionSummaryCard 
          title="Active Prescriptions"
          icon={<Pill className="h-5 w-5 text-blue-500" />}
          count={18}
          changeText="+2 this week"
          lastUpdated="Today"
        />
        <PrescriptionSummaryCard 
          title="Expiring Soon"
          icon={<Calendar className="h-5 w-5 text-orange-500" />}
          count={4}
          changeText="Within 7 days"
          lastUpdated="Updated daily"
        />
        <PrescriptionSummaryCard 
          title="Pending Refills"
          icon={<Clock className="h-5 w-5 text-amber-500" />}
          count={3}
          changeText="Need approval"
          lastUpdated="2 new requests"
        />
        <PrescriptionSummaryCard 
          title="Patients on Medication"
          icon={<User className="h-5 w-5 text-green-500" />}
          count={12}
          changeText="75% adherence"
          lastUpdated="Last checked today"
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Prescriptions</CardTitle>
          <CardDescription>Currently active patient prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptionsData.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell className="font-medium">{prescription.patientName}</TableCell>
                  <TableCell>{prescription.medication}</TableCell>
                  <TableCell>{prescription.dosage}</TableCell>
                  <TableCell>{prescription.frequency}</TableCell>
                  <TableCell>{prescription.startDate}</TableCell>
                  <TableCell>{prescription.endDate}</TableCell>
                  <TableCell>
                    <Badge variant={
                      prescription.status === "Active" ? "success" : 
                      prescription.status === "Expiring Soon" ? "warning" : 
                      "outline"
                    }>
                      {prescription.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Renew</Button>
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="ml-auto">View All Prescriptions</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ActivePrescriptionsTab;
