
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { type OfficeSettings as OfficeSettingsType } from "@/types/office";

const OfficeSettings: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<OfficeSettingsType>({
    businessName: "Acme Healthcare",
    address: "123 Main Street, Suite 100, Anytown, USA 12345",
    phone: "(555) 123-4567",
    email: "info@acmehealthcare.com",
    businessHours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    rooms: [],
    supplies: [],
    scheduledTasks: []
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith("businessHours.")) {
      const day = name.split(".")[1];
      setSettings({
        ...settings,
        businessHours: {
          ...settings.businessHours,
          [day]: value
        }
      });
    } else {
      setSettings({
        ...settings,
        [name]: value
      });
    }
  };
  
  const handleSave = () => {
    // In a real app, we would save to a database or local storage
    toast({
      title: "Settings Saved",
      description: "Your office settings have been updated.",
      variant: "success",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Update your basic business information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input 
              id="businessName" 
              name="businessName"
              value={settings.businessName}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address" 
              name="address"
              value={settings.address}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone"
                value={settings.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email"
                name="email" 
                type="email"
                value={settings.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
          <CardDescription>
            Set your regular business hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {Object.entries(settings.businessHours).map(([day, hours]) => (
              <div key={day} className="grid grid-cols-3 gap-4 items-center">
                <Label htmlFor={`business-hours-${day}`} className="capitalize">
                  {day}
                </Label>
                <Input 
                  id={`business-hours-${day}`}
                  name={`businessHours.${day}`}
                  value={hours}
                  onChange={handleChange}
                  className="col-span-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Import or export your office data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Import Data</h3>
              <p className="text-sm text-muted-foreground">
                Import your office data from a file
              </p>
              <div className="pt-2">
                <Input id="import-file" type="file" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Export Data</h3>
              <p className="text-sm text-muted-foreground">
                Export your office data to a file
              </p>
              <div className="pt-2">
                <Button variant="outline">Export Data</Button>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Reset all office settings to default values
            </p>
            <div className="pt-2">
              <Button variant="destructive">Reset Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfficeSettings;
