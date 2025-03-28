
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Calendar, FileText, Stethoscope, Pill, Dollar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const HealthcareCRMModule: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-1">Dental Healthcare CRM</h2>
        <p className="text-muted-foreground">Manage your dental practice</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search patients..." className="pl-8" />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Patient
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="patients">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="treatments">Treatments</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="patients" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Next Appointment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>P{i}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Patient {i}</p>
                            <p className="text-xs text-muted-foreground">patient{i}@example.com</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(2023, 6 + i, i * 3).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(2023, 11, i * 5 + 3).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={i % 3 === 0 ? "default" : i % 3 === 1 ? "secondary" : "outline"}>
                          {i % 3 === 0 ? "Active" : i % 3 === 1 ? "Pending" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[9, 10, 11, 13, 14, 15].map((hour) => (
                  <Card key={hour} className={`border-l-4 ${hour === 11 ? "border-l-blue-500" : "border-l-green-500"}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {hour}:00 - {hour + 1}:00
                          </p>
                          <h4 className="font-semibold">Patient {hour % 5 + 1}</h4>
                        </div>
                        <Badge variant={hour === 11 ? "secondary" : "default"}>
                          {hour === 11 ? "Check-in" : "Confirmed"}
                        </Badge>
                      </div>
                      <p className="text-sm">
                        {hour === 9 ? "Regular Cleaning" : 
                         hour === 10 ? "Whitening Consultation" :
                         hour === 11 ? "Root Canal" :
                         hour === 13 ? "Wisdom Tooth Extraction" :
                         hour === 14 ? "Filling" : "Check-up"}
                      </p>
                      <div className="flex mt-3 justify-end">
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="treatments" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Treatment Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start border-b pb-4">
                      <Stethoscope className="h-5 w-5 mr-3 mt-1 text-primary" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Patient {i}</h4>
                          <Badge>{i * 20}% Complete</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {i === 1 ? "Full Mouth Reconstruction" : 
                          i === 2 ? "Invisalign Treatment" : "Implant Procedure"}
                        </p>
                        <div className="w-full h-2 bg-secondary mt-2 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary"
                            style={{ width: `${i * 20}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Medications & Prescriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start border-b pb-4">
                      <Pill className="h-5 w-5 mr-3 mt-1 text-primary" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Patient {i}</h4>
                          <span className="text-xs text-muted-foreground">
                            Issued: {new Date().toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">
                          {i === 1 ? "Amoxicillin 500mg" : 
                          i === 2 ? "Ibuprofen 600mg" : 
                          i === 3 ? "Oxycodone 5mg" : "Penicillin VK 500mg"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {i === 1 ? "Take 1 capsule by mouth every 8 hours for 7 days" : 
                          i === 2 ? "Take 1 tablet by mouth every 6 hours as needed for pain" : 
                          i === 3 ? "Take 1 tablet by mouth every 6 hours as needed for severe pain" : 
                          "Take 1 tablet by mouth every 6 hours for 10 days"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="insurance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Policy #</TableHead>
                    <TableHead>Service Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i}>
                      <TableCell>Patient {i}</TableCell>
                      <TableCell>
                        {i === 1 ? "Delta Dental" : 
                         i === 2 ? "Cigna" : 
                         i === 3 ? "Aetna" : 
                         i === 4 ? "MetLife" : "Blue Cross"}
                      </TableCell>
                      <TableCell>POL-{100000 + i * 1234}</TableCell>
                      <TableCell>{new Date(2023, 7, i * 3 + 2).toLocaleDateString()}</TableCell>
                      <TableCell>${(i * 125 + 75).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={
                          i === 1 ? "default" : 
                          i === 2 ? "secondary" : 
                          i === 3 ? "destructive" : 
                          "outline"
                        }>
                          {i === 1 ? "Approved" : 
                           i === 2 ? "Pending" : 
                           i === 3 ? "Denied" : 
                           i === 4 ? "In Progress" : "Submitted"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Outstanding Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$3,245.75</div>
                <p className="text-xs text-muted-foreground">From 12 patients</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Revenue This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$12,850.00</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Pending Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$5,432.25</div>
                <p className="text-xs text-muted-foreground">8 insurance claims</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i}>
                      <TableCell>Patient {i}</TableCell>
                      <TableCell>
                        {i === 1 ? "Dental Cleaning" : 
                         i === 2 ? "Filling (2 teeth)" : 
                         i === 3 ? "Root Canal" : 
                         i === 4 ? "Crown" : "Consultation"}
                      </TableCell>
                      <TableCell>{new Date(2023, 9, 20 - i).toLocaleDateString()}</TableCell>
                      <TableCell>${(i * 125 + 75).toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Dollar className="h-4 w-4 mr-2 text-green-500" />
                          {i === 1 ? "Credit Card" : 
                           i === 2 ? "Insurance" : 
                           i === 3 ? "Cash" : 
                           i === 4 ? "Check" : "Credit Card"}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthcareCRMModule;
