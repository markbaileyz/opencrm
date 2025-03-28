
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Utensils, Clock, Users, CalendarClock, AlertCircle, Pizza, Coffee, Beef, Drumstick, ChefHat } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const RestaurantCRMModule: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-1">Restaurant CRM</h2>
        <p className="text-muted-foreground">Manage your restaurant operations</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders or customers..." className="pl-8" />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New Reservation
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="orders">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-base">Active Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i} 
                      className={`p-3 rounded-lg cursor-pointer ${
                        i === 2 ? "bg-primary/10 border-primary border" : "border"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">Order #{i*1001}</div>
                          <div className="text-xs text-muted-foreground">
                            {i === 1 ? "Dine-in" : i === 2 ? "Takeout" : i === 3 ? "Delivery" : "Online"}
                          </div>
                        </div>
                        <Badge variant={
                          i === 1 ? "default" : 
                          i === 2 ? "secondary" : 
                          i === 3 ? "destructive" : 
                          "outline"
                        }>
                          {i === 1 ? "New" : 
                           i === 2 ? "Preparing" : 
                           i === 3 ? "Ready" : 
                           i === 4 ? "Delivering" : 
                           "Completed"}
                        </Badge>
                      </div>
                      <div className="text-sm mt-1">
                        {i * 2} items · ${(i * 15.99).toFixed(2)}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Clock className="h-3 w-3 mr-1" />
                        {i * 5 + 10} mins ago
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Order #1002 Details</CardTitle>
                <CardDescription>Takeout - 15 mins ago</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium mb-2">Customer Information</h3>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Avatar>
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                          <p className="text-xs text-muted-foreground">(123) 456-7890</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Order Timeline</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="mr-2 bg-primary h-2 w-2 rounded-full mt-2"></div>
                          <div className="flex-1 p-2 rounded bg-muted">
                            <div className="flex justify-between">
                              <span className="font-medium text-sm">Order Placed</span>
                              <span className="text-xs text-muted-foreground">3:45 PM</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Order #1002 was placed via mobile app
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="mr-2 bg-primary h-2 w-2 rounded-full mt-2"></div>
                          <div className="flex-1 p-2 rounded bg-muted">
                            <div className="flex justify-between">
                              <span className="font-medium text-sm">Order Confirmed</span>
                              <span className="text-xs text-muted-foreground">3:47 PM</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Kitchen received the order
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="mr-2 bg-primary/50 h-2 w-2 rounded-full mt-2"></div>
                          <div className="flex-1 p-2 rounded bg-primary/5 border-primary/10 border">
                            <div className="flex justify-between">
                              <span className="font-medium text-sm">Preparing Order</span>
                              <span className="text-xs text-muted-foreground">3:50 PM</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Chef Alex is preparing your order
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start opacity-50">
                          <div className="mr-2 bg-muted h-2 w-2 rounded-full mt-2"></div>
                          <div className="flex-1 p-2 rounded bg-muted/50">
                            <div className="flex justify-between">
                              <span className="font-medium text-sm">Ready for Pickup</span>
                              <span className="text-xs text-muted-foreground">--:-- PM</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Your order will be ready for pickup
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Order Items</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Qty</TableHead>
                          <TableHead>Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center">
                              <Pizza className="h-4 w-4 mr-2 text-orange-500" />
                              <div>
                                <p className="font-medium">Margherita Pizza</p>
                                <p className="text-xs text-muted-foreground">Medium, Extra cheese</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>$12.99</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center">
                              <Beef className="h-4 w-4 mr-2 text-red-500" />
                              <div>
                                <p className="font-medium">Classic Burger</p>
                                <p className="text-xs text-muted-foreground">No onions, Extra sauce</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>$8.99</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center">
                              <Coffee className="h-4 w-4 mr-2 text-brown-500" />
                              <div>
                                <p className="font-medium">Iced Coffee</p>
                                <p className="text-xs text-muted-foreground">Large, Almond milk</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>$9.98</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    
                    <div className="mt-4 border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>$31.96</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Tax</span>
                        <span>$2.88</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>$34.84</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Button variant="default">
                        Ready for Pickup
                      </Button>
                      <Button variant="outline">
                        Edit Order
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="reservations" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Today's Reservations</CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "11:30 AM", name: "Sarah Johnson", guests: 2, table: 5, status: "Confirmed" },
                    { time: "12:00 PM", name: "Mike Chen", guests: 4, table: 10, status: "Seated" },
                    { time: "1:15 PM", name: "Emma Watson", guests: 3, table: 7, status: "Completed" },
                    { time: "6:00 PM", name: "David Smith", guests: 2, table: 8, status: "Confirmed" },
                    { time: "7:30 PM", name: "Jessica Lee", guests: 6, table: 12, status: "Confirmed" },
                    { time: "8:00 PM", name: "Robert Brown", guests: 2, table: 4, status: "Waiting" }
                  ].map((reservation, i) => (
                    <div key={i} className="flex items-center p-3 border rounded-lg">
                      <div className="mr-4 text-center min-w-[80px]">
                        <div className="text-lg font-bold">{reservation.time}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{reservation.name}</h4>
                          <Badge variant={
                            reservation.status === "Confirmed" ? "outline" : 
                            reservation.status === "Seated" ? "default" : 
                            reservation.status === "Completed" ? "secondary" : 
                            "destructive"
                          }>
                            {reservation.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {reservation.guests} guests · Table #{reservation.table}
                        </p>
                      </div>
                      <div className="ml-4">
                        <Button size="sm" variant="outline">Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Reservation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Guest Name</label>
                    <Input placeholder="Enter guest name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input placeholder="(123) 456-7890" type="tel" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Number of Guests</label>
                    <Input placeholder="2" type="number" min="1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Date & Time</label>
                    <Input type="datetime-local" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Special Requests</label>
                    <Input placeholder="Window seat, allergies, etc." />
                  </div>
                  <Button className="w-full">
                    Create Reservation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="menu" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Menu Management</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="w-full grid grid-cols-5 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="appetizers">Appetizers</TabsTrigger>
                  <TabsTrigger value="mains">Main Courses</TabsTrigger>
                  <TabsTrigger value="desserts">Desserts</TabsTrigger>
                  <TabsTrigger value="drinks">Drinks</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { name: "Mozzarella Sticks", category: "Appetizers", price: 8.99, available: true, icon: <Pizza className="h-4 w-4 text-yellow-500" /> },
                        { name: "Margherita Pizza", category: "Main Courses", price: 12.99, available: true, icon: <Pizza className="h-4 w-4 text-orange-500" /> },
                        { name: "Classic Burger", category: "Main Courses", price: 10.99, available: true, icon: <Beef className="h-4 w-4 text-red-500" /> },
                        { name: "Chicken Alfredo", category: "Main Courses", price: 14.99, available: false, icon: <Drumstick className="h-4 w-4 text-amber-500" /> },
                        { name: "Chocolate Cake", category: "Desserts", price: 6.99, available: true, icon: <Utensils className="h-4 w-4 text-pink-500" /> },
                        { name: "Iced Coffee", category: "Drinks", price: 4.99, available: true, icon: <Coffee className="h-4 w-4 text-brown-500" /> },
                      ].map((item, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <div className="flex items-center">
                              {item.icon}
                              <span className="ml-2 font-medium">{item.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={item.available ? "default" : "outline"}>
                              {item.available ? "Available" : "Unavailable"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant={item.available ? "outline" : "default"} size="sm">
                                {item.available ? "Disable" : "Enable"}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="appetizers">
                  <div className="flex items-center justify-center p-12">
                    <div className="text-center">
                      <div className="mb-4">
                        <Utensils className="h-12 w-12 mx-auto text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">Appetizers Category Selected</h3>
                      <p className="text-muted-foreground max-w-md">
                        The interface would show appetizers menu items here
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="mains">
                  <div className="flex items-center justify-center p-12">
                    <div className="text-center">
                      <div className="mb-4">
                        <ChefHat className="h-12 w-12 mx-auto text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">Main Courses Category Selected</h3>
                      <p className="text-muted-foreground max-w-md">
                        The interface would show main course menu items here
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="desserts">
                  <div className="flex items-center justify-center p-12">
                    <div className="text-center">
                      <div className="mb-4">
                        <Utensils className="h-12 w-12 mx-auto text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">Desserts Category Selected</h3>
                      <p className="text-muted-foreground max-w-md">
                        The interface would show dessert menu items here
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="drinks">
                  <div className="flex items-center justify-center p-12">
                    <div className="text-center">
                      <div className="mb-4">
                        <Coffee className="h-12 w-12 mx-auto text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">Drinks Category Selected</h3>
                      <p className="text-muted-foreground max-w-md">
                        The interface would show drink menu items here
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tables" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Restaurant Layout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 bg-muted/20 relative h-[400px]">
                  {/* This would be a real interactive floor plan in a production app */}
                  <div className="text-center">
                    <div className="absolute top-4 left-4 border border-dashed border-primary p-4 w-32 h-16 rounded flex items-center justify-center">
                      <div className="text-sm">Entry</div>
                    </div>
                    
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`absolute border rounded w-16 h-16 flex items-center justify-center ${
                        i % 2 === 0 ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"
                      }`} style={{ 
                        top: `${70 + (i * 20)}px`, 
                        left: `${80 + (i * 10)}px` 
                      }}>
                        <div className="text-xs">
                          <div>Table {i}</div>
                          <div className="text-[10px]">{i % 2 === 0 ? "Open" : "Occupied"}</div>
                        </div>
                      </div>
                    ))}
                    
                    {[5, 6, 7, 8].map(i => (
                      <div key={i} className={`absolute border rounded w-16 h-16 flex items-center justify-center ${
                        i % 2 === 1 ? "bg-green-100 border-green-500" : "bg-yellow-100 border-yellow-500"
                      }`} style={{ 
                        top: `${70 + ((i-4) * 20)}px`, 
                        left: `${250 + ((i-4) * 10)}px` 
                      }}>
                        <div className="text-xs">
                          <div>Table {i}</div>
                          <div className="text-[10px]">
                            {i % 2 === 1 ? "Open" : i % 3 === 0 ? "Reserved" : "Occupied"}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="absolute top-4 right-4 border border-dashed border-primary p-4 w-32 h-32 rounded flex items-center justify-center">
                      <div className="text-sm">Bar Area</div>
                    </div>
                    
                    <div className="absolute bottom-4 right-4 border border-dashed border-primary p-4 w-32 h-16 rounded flex items-center justify-center">
                      <div className="text-sm">Kitchen</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tables Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span>Available</span>
                    </div>
                    <span className="font-medium">4 tables</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span>Occupied</span>
                    </div>
                    <span className="font-medium">3 tables</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span>Reserved</span>
                    </div>
                    <span className="font-medium">1 table</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Table Assignment</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded bg-muted">
                      <div>
                        <p className="font-medium">Table 2</p>
                        <p className="text-xs text-muted-foreground">Party of 2</p>
                      </div>
                      <div className="text-xs">
                        <Badge variant="default">Occupied</Badge>
                        <p className="text-muted-foreground mt-1">45 mins</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded bg-muted">
                      <div>
                        <p className="font-medium">Table 7</p>
                        <p className="text-xs text-muted-foreground">Smith Party</p>
                      </div>
                      <div className="text-xs">
                        <Badge variant="secondary">Reserved</Badge>
                        <p className="text-muted-foreground mt-1">7:30 PM</p>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-2">
                      <Plus className="mr-2 h-4 w-4" />
                      Assign Table
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="customers" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Customer Database</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Visits</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Favorite Item</TableHead>
                    <TableHead>Loyalty</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "John Smith", email: "john.smith@example.com", visits: 12, lastVisit: "2 days ago", favorite: "Margherita Pizza", loyalty: "Gold" },
                    { name: "Emma Johnson", email: "emma.j@example.com", visits: 8, lastVisit: "1 week ago", favorite: "Classic Burger", loyalty: "Silver" },
                    { name: "Michael Brown", email: "mbrown@example.com", visits: 5, lastVisit: "2 weeks ago", favorite: "Chicken Alfredo", loyalty: "Bronze" },
                    { name: "Sarah Wilson", email: "sarahw@example.com", visits: 3, lastVisit: "1 month ago", favorite: "Chocolate Cake", loyalty: "Bronze" },
                    { name: "David Lee", email: "david.lee@example.com", visits: 1, lastVisit: "3 months ago", favorite: "Iced Coffee", loyalty: "New" },
                  ].map((customer, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{customer.name.charAt(0)}{customer.name.split(' ')[1].charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">{customer.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.visits}</TableCell>
                      <TableCell>{customer.lastVisit}</TableCell>
                      <TableCell>{customer.favorite}</TableCell>
                      <TableCell>
                        <Badge variant={
                          customer.loyalty === "Gold" ? "default" : 
                          customer.loyalty === "Silver" ? "secondary" : 
                          customer.loyalty === "Bronze" ? "outline" : 
                          "destructive"
                        }>
                          {customer.loyalty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">
                            <CalendarClock className="h-4 w-4" />
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
      </Tabs>
    </div>
  );
};

export default RestaurantCRMModule;
