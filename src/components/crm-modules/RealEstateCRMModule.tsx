
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Home, CalendarCheck, MapPin, User, Building, Check, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const RealEstateCRMModule: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-1">Real Estate CRM</h2>
        <p className="text-muted-foreground">Manage your properties and clients</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search properties or clients..." className="pl-8" />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="listings">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="check-in">Check-In</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="listings" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-[4/3] bg-muted relative">
                  <div className="absolute top-2 left-2">
                    <Badge variant={i % 3 === 0 ? "default" : i % 3 === 1 ? "secondary" : "destructive"}>
                      {i % 3 === 0 ? "For Sale" : i % 3 === 1 ? "For Rent" : "Pending"}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="outline" className="bg-black/50 text-white">
                      ${(300000 + i * 50000).toLocaleString()}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">123 Main St, Unit {i}</h3>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" /> 
                        {i % 2 === 0 ? "Downtown" : "Uptown"}, New York
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">{i + 2}</span> bd |{" "}
                      <span className="font-medium">{i + 1}</span> ba |{" "}
                      <span className="font-medium">{(1200 + i * 200).toLocaleString()}</span> sqft
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="clients" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Looking For</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>C{i}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Client {i}</p>
                            <p className="text-xs text-muted-foreground">client{i}@example.com</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {i % 2 === 0 ? "Buyer" : "Seller"}
                      </TableCell>
                      <TableCell>
                        {i % 2 === 0 ? 
                          `${i + 1}bd/${Math.floor(i/2) + 1}ba Apartment` : 
                          `${i + 2}bd/${i}ba House`}
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          i % 3 === 0 ? "default" : 
                          i % 3 === 1 ? "secondary" : 
                          "outline"
                        }>
                          {i % 3 === 0 ? "Active" : 
                           i % 3 === 1 ? "Pending" : 
                           "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(2023, 9, 20 - i).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <User className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <CalendarCheck className="h-4 w-4" />
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
        
        <TabsContent value="check-in" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    Upcoming Check-Ins
                  </div>
                </CardTitle>
                <CardDescription>
                  Today's property viewings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center p-3 border rounded-lg">
                      <div className="mr-4 text-center min-w-[50px]">
                        <div className="text-xl font-bold">{10 + i}:00</div>
                        <div className="text-xs text-muted-foreground">AM</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Client {i}</h4>
                          <Badge variant="outline">
                            {i === 1 ? "First Viewing" : 
                             i === 2 ? "Second Viewing" : 
                             "Final Viewing"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          123 Main St, Unit {i}
                        </p>
                      </div>
                      <div className="ml-4">
                        <Button size="sm" variant="outline">Check In</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    Completed Check-Ins
                  </div>
                </CardTitle>
                <CardDescription>
                  Today's completed viewings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[4, 5].map((i) => (
                    <div key={i} className="flex items-center p-3 border rounded-lg bg-muted/40">
                      <div className="mr-4 text-center min-w-[50px]">
                        <div className="text-xl font-bold">{8 + i}:00</div>
                        <div className="text-xs text-muted-foreground">AM</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Client {i}</h4>
                          <div className="flex items-center text-green-500 text-sm">
                            <Check className="h-4 w-4 mr-1" />
                            Completed
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          123 Main St, Unit {i}
                        </p>
                      </div>
                      <div className="ml-4">
                        <Button size="sm" variant="outline">Notes</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Check-In Form</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Client Name</label>
                      <Input placeholder="Enter client name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input placeholder="client@example.com" type="email" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <Input placeholder="(123) 456-7890" type="tel" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Property</label>
                      <Input placeholder="123 Main St, Unit 1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Appointment Time</label>
                      <Input type="datetime-local" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Agent</label>
                      <Input placeholder="Select agent" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Notes</label>
                    <Input placeholder="Add any special instructions or requirements" />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <Button>
                      Submit Check-In
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Active Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">$4.2M total value</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Pending Deals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">$1.8M total value</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Closed This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">$52.5K commission</p>
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
                    <TableHead>Property</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Closing Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-primary" />
                          123 Main St, Unit {i}
                        </div>
                      </TableCell>
                      <TableCell>
                        {i % 2 === 0 ? "Sale" : "Rental"}
                      </TableCell>
                      <TableCell>Client {i}</TableCell>
                      <TableCell>${(300000 + i * 50000).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          i === 1 ? "default" : 
                          i === 2 ? "secondary" : 
                          i === 3 ? "destructive" : 
                          "outline"
                        }>
                          {i === 1 ? "Closed" : 
                           i === 2 ? "Pending" : 
                           i === 3 ? "Cancelled" : 
                           i === 4 ? "In Contract" : "Listed"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {i === 1 || i === 3 ? 
                          new Date(2023, 9, 15 - i).toLocaleDateString() : 
                          "TBD"}
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

export default RealEstateCRMModule;
