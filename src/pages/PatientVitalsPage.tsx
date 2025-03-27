
import React, { useState } from "react";
import { ArrowLeft, Search, Plus, FileText, Heart, Activity, Thermometer, Lungs, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const PatientVitalsPage = () => {
  const navigate = useNavigate();
  const [patientFilter, setPatientFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("today");

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
            <h1 className="text-2xl font-bold">Patient Vitals</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-1" />
              Generate Report
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Record Vitals
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Input 
              placeholder="Search patients..." 
              className="max-w-md"
              icon={<Search className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
          <div className="flex gap-4">
            <Select value={patientFilter} onValueChange={setPatientFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Patient Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Patients</SelectItem>
                <SelectItem value="inpatient">Inpatients</SelectItem>
                <SelectItem value="outpatient">Outpatients</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="recent">
          <TabsList>
            <TabsTrigger value="recent">Recent Measurements</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <VitalSummaryCard 
                title="Heart Rate"
                icon={<Heart className="h-5 w-5 text-red-500" />}
                total={24}
                abnormal={3}
                lastUpdated="10 minutes ago"
              />
              <VitalSummaryCard 
                title="Blood Pressure"
                icon={<Activity className="h-5 w-5 text-blue-500" />}
                total={24}
                abnormal={5}
                lastUpdated="15 minutes ago"
              />
              <VitalSummaryCard 
                title="Temperature"
                icon={<Thermometer className="h-5 w-5 text-orange-500" />}
                total={24}
                abnormal={2}
                lastUpdated="20 minutes ago"
              />
              <VitalSummaryCard 
                title="Respiratory Rate"
                icon={<Lungs className="h-5 w-5 text-green-500" />}
                total={24}
                abnormal={0}
                lastUpdated="25 minutes ago"
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Vital Sign Records</CardTitle>
                <CardDescription>All measurements from today's patients</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Heart Rate</TableHead>
                      <TableHead>Blood Pressure</TableHead>
                      <TableHead>Temperature</TableHead>
                      <TableHead>Respiratory Rate</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentVitalsData.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.patientName}</TableCell>
                        <TableCell>{record.time}</TableCell>
                        <TableCell>{record.heartRate} bpm</TableCell>
                        <TableCell>{record.bloodPressure}</TableCell>
                        <TableCell>{record.temperature}°F</TableCell>
                        <TableCell>{record.respiratoryRate} bpm</TableCell>
                        <TableCell>
                          <Badge variant={record.status === "Normal" ? "outline" : "destructive"}>
                            {record.status}
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
              <CardFooter>
                <Button variant="outline" className="ml-auto">View All Records</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vital Sign Alerts</CardTitle>
                <CardDescription>Abnormal measurements requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Alert Time</TableHead>
                      <TableHead>Vital Sign</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Normal Range</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alertsData.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-medium">{alert.patientName}</TableCell>
                        <TableCell>{alert.time}</TableCell>
                        <TableCell>{alert.vitalSign}</TableCell>
                        <TableCell className="font-bold text-red-500">{alert.value}</TableCell>
                        <TableCell>{alert.normalRange}</TableCell>
                        <TableCell>
                          <Badge variant={
                            alert.severity === "High" ? "destructive" : 
                            alert.severity === "Medium" ? "default" : "outline"
                          }>
                            {alert.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="mr-2">Attend</Button>
                          <Button variant="ghost" size="sm">Dismiss</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vital Signs Trends</CardTitle>
                <CardDescription>Long-term vital sign monitoring and patterns</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center p-6 border border-dashed rounded-lg w-full">
                  <BarChart2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Trend visualization coming soon</h3>
                  <p className="text-muted-foreground mb-4">
                    Detailed historical trends and analytics are under development
                  </p>
                  <Button variant="outline">Request Early Access</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface VitalSummaryCardProps {
  title: string;
  icon: React.ReactNode;
  total: number;
  abnormal: number;
  lastUpdated: string;
}

const VitalSummaryCard: React.FC<VitalSummaryCardProps> = ({ 
  title, 
  icon, 
  total,
  abnormal,
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
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Readings:</span>
            <span className="font-bold">{total}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Abnormal:</span>
            <span className={`font-bold ${abnormal > 0 ? "text-red-500" : ""}`}>{abnormal}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};

// Sample data for the recent vitals table
const recentVitalsData = [
  { 
    id: 1, 
    patientName: "John Doe", 
    time: "9:30 AM",
    heartRate: 72,
    bloodPressure: "120/80",
    temperature: 98.6,
    respiratoryRate: 16,
    status: "Normal"
  },
  { 
    id: 2, 
    patientName: "Emma Wilson", 
    time: "10:15 AM",
    heartRate: 92,
    bloodPressure: "135/85",
    temperature: 99.2,
    respiratoryRate: 18,
    status: "Elevated"
  },
  { 
    id: 3, 
    patientName: "Michael Brown", 
    time: "11:00 AM",
    heartRate: 65,
    bloodPressure: "110/70",
    temperature: 98.4,
    respiratoryRate: 14,
    status: "Normal"
  },
  { 
    id: 4, 
    patientName: "Sophia Davis", 
    time: "11:45 AM",
    heartRate: 110,
    bloodPressure: "150/95",
    temperature: 101.3,
    respiratoryRate: 22,
    status: "Abnormal"
  },
  { 
    id: 5, 
    patientName: "James Wilson", 
    time: "12:30 PM",
    heartRate: 75,
    bloodPressure: "125/82",
    temperature: 98.7,
    respiratoryRate: 16,
    status: "Normal"
  }
];

// Sample data for the alerts table
const alertsData = [
  {
    id: 1,
    patientName: "Sophia Davis",
    time: "11:45 AM",
    vitalSign: "Heart Rate",
    value: "110 bpm",
    normalRange: "60-100 bpm",
    severity: "Medium"
  },
  {
    id: 2,
    patientName: "Sophia Davis",
    time: "11:45 AM",
    vitalSign: "Temperature",
    value: "101.3°F",
    normalRange: "97.8-99.5°F",
    severity: "High"
  },
  {
    id: 3,
    patientName: "Emma Wilson",
    time: "10:15 AM",
    vitalSign: "Blood Pressure",
    value: "135/85 mmHg",
    normalRange: "<120/80 mmHg",
    severity: "Low"
  },
  {
    id: 4,
    patientName: "Robert Johnson",
    time: "Yesterday, 3:30 PM",
    vitalSign: "Blood Oxygen",
    value: "92%",
    normalRange: "95-100%",
    severity: "High"
  }
];

export default PatientVitalsPage;
