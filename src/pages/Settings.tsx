
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your personal information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue="johndoe@example.com"
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="timezone" className="text-sm font-medium">
                  Timezone
                </label>
                <select
                  id="timezone"
                  className="w-full px-3 py-2 border rounded-md"
                  defaultValue="UTC-7"
                >
                  <option value="UTC-12">UTC-12</option>
                  <option value="UTC-11">UTC-11</option>
                  <option value="UTC-10">UTC-10</option>
                  <option value="UTC-9">UTC-9</option>
                  <option value="UTC-8">UTC-8</option>
                  <option value="UTC-7">UTC-7 (Pacific)</option>
                  <option value="UTC-6">UTC-6 (Mountain)</option>
                  <option value="UTC-5">UTC-5 (Central)</option>
                  <option value="UTC-4">UTC-4 (Eastern)</option>
                </select>
              </div>

              <div className="pt-4">
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Control how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about system updates and activity.
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    className="mr-2"
                    defaultChecked
                  />
                  <label htmlFor="emailNotifications">Enabled</label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">SMS Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive text messages for urgent updates.
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="smsNotifications"
                    className="mr-2"
                  />
                  <label htmlFor="smsNotifications">Enabled</label>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleSaveSettings}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
