
import React, { useState } from "react";
import { ArrowLeft, FileText, FilePlus, Search, Calendar, Clock, Filter, User, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const PrescriptionsPage = () => {
  const navigate = useNavigate();
  const [patientFilter, setPatientFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("current");
  const [medicationType, setMedicationType] = useState("all");

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleBack} size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Prescriptions</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button size="sm">
              <FilePlus className="h-4 w-4 mr-1" />
              New Prescription
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Input 
              placeholder="Search prescriptions..." 
              className="max-w-md"
              icon={<Search className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <Select value={patientFilter} onValueChange={setPatientFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Patient Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Patients</SelectItem>
                <SelectItem value="inpatient">Inpatients</SelectItem>
                <SelectItem value="outpatient">Outpatients</SelectItem>
                <SelectItem value="recent">Recent Visits</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="past-month">Past Month</SelectItem>
                <SelectItem value="past-3-months">Past 3 Months</SelectItem>
                <SelectItem value="past-year">Past Year</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={medicationType} onValueChange={setMedicationType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Medication Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="antibiotic">Antibiotics</SelectItem>
                <SelectItem value="analgesic">Analgesics</SelectItem>
                <SelectItem value="antihypertensive">Antihypertensives</SelectItem>
                <SelectItem value="antidepressant">Antidepressants</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Prescriptions</TabsTrigger>
            <TabsTrigger value="history">Prescription History</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Prescription History</CardTitle>
                <CardDescription>Past and expired prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Medication</TableHead>
                      <TableHead>Prescriber</TableHead>
                      <TableHead>Date Prescribed</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prescriptionHistoryData.map((prescription) => (
                      <TableRow key={prescription.id}>
                        <TableCell className="font-medium">{prescription.patientName}</TableCell>
                        <TableCell>{prescription.medication}</TableCell>
                        <TableCell>{prescription.prescriber}</TableCell>
                        <TableCell>{prescription.datePrescribed}</TableCell>
                        <TableCell>{prescription.endDate}</TableCell>
                        <TableCell>
                          <Badge variant={
                            prescription.status === "Completed" ? "outline" : 
                            prescription.status === "Discontinued" ? "destructive" : 
                            "secondary"
                          }>
                            {prescription.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prescriptionTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Pill className="h-5 w-5 text-blue-500" />
                    </div>
                    <CardDescription>{template.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Default Dosage:</span>
                        <span>{template.defaultDosage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Default Duration:</span>
                        <span>{template.defaultDuration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Common Usage:</span>
                        <span>{template.commonUsage}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">Use Template</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface PrescriptionSummaryCardProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  changeText: string;
  lastUpdated: string;
}

const PrescriptionSummaryCard: React.FC<PrescriptionSummaryCardProps> = ({
  title,
  icon,
  count,
  changeText,
  lastUpdated
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {icon}
        </div>
        <CardDescription>Last updated: {lastUpdated}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-bold">{count}</span>
          <span className="text-sm text-muted-foreground">{changeText}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};

const prescriptionsData = [
  {
    id: 1,
    patientName: "John Doe",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    startDate: "05/10/2023",
    endDate: "05/10/2024",
    status: "Active"
  },
  {
    id: 2,
    patientName: "Emma Wilson",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    startDate: "04/15/2023",
    endDate: "04/15/2024",
    status: "Active"
  },
  {
    id: 3,
    patientName: "Sophia Davis",
    medication: "Levothyroxine",
    dosage: "75mcg",
    frequency: "Once daily",
    startDate: "06/22/2023",
    endDate: "06/22/2024",
    status: "Active"
  },
  {
    id: 4,
    patientName: "Michael Brown",
    medication: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily at bedtime",
    startDate: "05/05/2023",
    endDate: "05/15/2023",
    status: "Expiring Soon"
  },
  {
    id: 5,
    patientName: "James Wilson",
    medication: "Amlodipine",
    dosage: "5mg",
    frequency: "Once daily",
    startDate: "03/10/2023",
    endDate: "03/10/2024",
    status: "Active"
  }
];

const prescriptionHistoryData = [
  {
    id: 1,
    patientName: "Sophia Davis",
    medication: "Amoxicillin",
    prescriber: "Dr. Smith",
    datePrescribed: "02/15/2023",
    endDate: "02/28/2023",
    status: "Completed"
  },
  {
    id: 2,
    patientName: "John Doe",
    medication: "Ibuprofen",
    prescriber: "Dr. Jones",
    datePrescribed: "01/10/2023",
    endDate: "01/24/2023",
    status: "Completed"
  },
  {
    id: 3,
    patientName: "Emma Wilson",
    medication: "Prednisone",
    prescriber: "Dr. Williams",
    datePrescribed: "03/05/2023",
    endDate: "03/15/2023",
    status: "Discontinued"
  },
  {
    id: 4,
    patientName: "Michael Brown",
    medication: "Ciprofloxacin",
    prescriber: "Dr. Johnson",
    datePrescribed: "04/12/2023",
    endDate: "04/22/2023",
    status: "Completed"
  },
  {
    id: 5,
    patientName: "James Wilson",
    medication: "Fluoxetine",
    prescriber: "Dr. Miller",
    datePrescribed: "12/05/2022",
    endDate: "03/05/2023",
    status: "Completed"
  }
];

const prescriptionTemplates = [
  {
    id: 1,
    name: "Standard Antibiotic",
    category: "Antibiotic",
    defaultDosage: "500mg",
    defaultDuration: "7-10 days",
    commonUsage: "Bacterial infections"
  },
  {
    id: 2,
    name: "Blood Pressure Control",
    category: "Antihypertensive",
    defaultDosage: "10mg",
    defaultDuration: "30 days with refills",
    commonUsage: "Hypertension"
  },
  {
    id: 3,
    name: "Pain Management",
    category: "Analgesic",
    defaultDosage: "500-1000mg every 6 hours",
    defaultDuration: "As needed, 7 days",
    commonUsage: "Mild to moderate pain"
  },
  {
    id: 4,
    name: "Diabetes Control",
    category: "Antidiabetic",
    defaultDosage: "500mg twice daily",
    defaultDuration: "30 days with refills",
    commonUsage: "Type 2 diabetes"
  },
  {
    id: 5,
    name: "Allergy Relief",
    category: "Antihistamine",
    defaultDosage: "10mg once daily",
    defaultDuration: "30 days seasonal",
    commonUsage: "Seasonal allergies"
  },
  {
    id: 6,
    name: "Thyroid Replacement",
    category: "Hormone Replacement",
    defaultDosage: "50-100mcg daily",
    defaultDuration: "30 days with refills",
    commonUsage: "Hypothyroidism"
  }
];

export default PrescriptionsPage;
