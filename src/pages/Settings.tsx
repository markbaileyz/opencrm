
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { Phone } from "lucide-react";

const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }).optional(),
  timezone: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Settings = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: "John Doe",
      email: "johndoe@example.com",
      phone: "",
      timezone: "UTC-7",
    },
  });

  const handleSaveSettings = (values: ProfileFormValues) => {
    console.log("Form values:", values);
    console.log("Email notifications:", emailNotifications);
    console.log("SMS notifications:", smsNotifications);
    
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSaveSettings)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Input {...field} placeholder="Enter your phone number for SMS notifications" />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Your phone number will be used for SMS notifications and updates.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="timezone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timezone</FormLabel>
                          <FormControl>
                            <select
                              className="w-full px-3 py-2 border rounded-md h-10 bg-background"
                              {...field}
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
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </Form>
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
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    id="emailNotifications"
                  />
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
                  <Switch
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                    id="smsNotifications"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={() => {
                  toast({
                    title: "Notification preferences saved",
                    description: "Your notification preferences have been updated successfully.",
                  });
                }}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
