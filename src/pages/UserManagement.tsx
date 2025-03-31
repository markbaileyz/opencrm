
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, UserCog, Users, Shield, Key } from "lucide-react";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const { toast } = useToast();

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddUserOpen(false);
    toast({
      title: "User Added",
      description: "New user has been added successfully",
    });
  };

  const mockUsers = [
    { id: 1, name: "Dr. Sarah Johnson", email: "sarah.johnson@example.com", role: "doctor", status: "Active" },
    { id: 2, name: "Nurse Michael Chen", email: "michael.chen@example.com", role: "nurse", status: "Active" },
    { id: 3, name: "Admin Alex Smith", email: "alex.smith@example.com", role: "admin", status: "Active" },
    { id: 4, name: "Lisa Rodriguez", email: "lisa.rodriguez@example.com", role: "front-desk", status: "Active" },
    { id: 5, name: "Dr. David Kim", email: "david.kim@example.com", role: "doctor", status: "Inactive" },
  ];

  const filteredUsers = searchQuery
    ? mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockUsers;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">User Management</h1>
            <p className="text-muted-foreground">
              Manage user accounts, permissions, and access controls
            </p>
          </div>
          <Button onClick={() => setIsAddUserOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              <span>Roles & Permissions</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security Policies</span>
            </TabsTrigger>
            <TabsTrigger value="access" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span>Access Control</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>User Directory</CardTitle>
                <CardDescription>
                  View and manage all system users
                </CardDescription>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="nurse">Nurse</SelectItem>
                      <SelectItem value="front-desk">Front Desk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="bg-muted px-4 py-2 grid grid-cols-5 font-medium">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Role</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredUsers.map((user) => (
                      <div key={user.id} className="px-4 py-3 grid grid-cols-5 items-center">
                        <div>{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div>
                          <span className="rounded-full px-2 py-1 text-xs font-medium bg-primary/10 text-primary">
                            {user.role}
                          </span>
                        </div>
                        <div>{user.status}</div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Deactivate
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Roles & Permissions</CardTitle>
                <CardDescription>
                  Configure user roles and their associated permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Admin Role</Label>
                    <div className="bg-muted rounded-md p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="admin-users">Manage Users</Label>
                          <Switch id="admin-users" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="admin-billing">Billing Access</Label>
                          <Switch id="admin-billing" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="admin-reports">View Reports</Label>
                          <Switch id="admin-reports" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="admin-settings">System Settings</Label>
                          <Switch id="admin-settings" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium">Doctor Role</Label>
                    <div className="bg-muted rounded-md p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="doctor-patients">View Patients</Label>
                          <Switch id="doctor-patients" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="doctor-edit">Edit Medical Records</Label>
                          <Switch id="doctor-edit" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="doctor-prescribe">Prescribe Medication</Label>
                          <Switch id="doctor-prescribe" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium">Front Desk Role</Label>
                    <div className="bg-muted rounded-md p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="frontdesk-appointments">Manage Appointments</Label>
                          <Switch id="frontdesk-appointments" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="frontdesk-billing">Process Payments</Label>
                          <Switch id="frontdesk-billing" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="frontdesk-patient-info">Edit Patient Info</Label>
                          <Switch id="frontdesk-patient-info" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button>Save Role Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Policies</CardTitle>
                <CardDescription>
                  Configure security settings for user accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Input id="password-expiry" type="number" defaultValue={90} />
                  <p className="text-sm text-muted-foreground">
                    Users will be prompted to change their password after this many days
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-attempts">Failed Login Attempts</Label>
                  <Input id="max-attempts" type="number" defaultValue={5} />
                  <p className="text-sm text-muted-foreground">
                    Account will be locked after this many failed attempts
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue={30} />
                  <p className="text-sm text-muted-foreground">
                    Users will be automatically logged out after this period of inactivity
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all users
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Button>Save Security Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="access" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
                <CardDescription>
                  Configure IP restrictions and access schedules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>IP Address Restrictions</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ip-restrictions">Enable IP Restrictions</Label>
                      <Switch id="ip-restrictions" />
                    </div>
                    <Input placeholder="Enter allowed IP addresses (comma separated)" disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Access Schedule</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="limit-hours">Limit Access Hours</Label>
                      <Switch id="limit-hours" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="access-start">Start Time</Label>
                        <Input id="access-start" type="time" defaultValue="08:00" disabled />
                      </div>
                      <div>
                        <Label htmlFor="access-end">End Time</Label>
                        <Input id="access-end" type="time" defaultValue="18:00" disabled />
                      </div>
                    </div>
                  </div>
                </div>

                <Button>Save Access Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account with appropriate permissions.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddUser}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" placeholder="Full name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="Email address" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select defaultValue="front-desk">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="front-desk">Front Desk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input id="password" type="password" placeholder="Set initial password" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div></div>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch id="send-invite" />
                  <Label htmlFor="send-invite">Send welcome email with login instructions</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add User</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default UserManagement;
