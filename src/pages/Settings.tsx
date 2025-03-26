import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }).optional(),
  timezone: z.string(),
});

const securityFormSchema = z.object({
  currentPassword: z.string().min(8, { message: "Current password must be at least 8 characters." }),
  newPassword: z.string().min(8, { message: "New password must be at least 8 characters." }),
  confirmPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters." }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type SecurityFormValues = z.infer<typeof securityFormSchema>;

const timezones = [
  { value: "UTC-12", label: "UTC-12:00 (Baker Island, Howland Island)" },
  { value: "UTC-11", label: "UTC-11:00 (American Samoa, Niue)" },
  { value: "UTC-10", label: "UTC-10:00 (Hawaii, Cook Islands)" },
  { value: "UTC-9", label: "UTC-09:00 (Alaska)" },
  { value: "UTC-8", label: "UTC-08:00 (Pacific Time)" },
  { value: "UTC-7", label: "UTC-07:00 (Mountain Time)" },
  { value: "UTC-6", label: "UTC-06:00 (Central Time)" },
  { value: "UTC-5", label: "UTC-05:00 (Eastern Time)" },
  { value: "UTC-4", label: "UTC-04:00 (Atlantic Time)" },
  { value: "UTC-3", label: "UTC-03:00 (Argentina, Brazil)" },
  { value: "UTC-2", label: "UTC-02:00 (Mid-Atlantic)" },
  { value: "UTC-1", label: "UTC-01:00 (Azores, Cape Verde)" },
  { value: "UTC+0", label: "UTC±00:00 (London, Dublin, Lisbon)" },
  { value: "UTC+1", label: "UTC+01:00 (Berlin, Paris, Rome)" },
  { value: "UTC+2", label: "UTC+02:00 (Athens, Cairo, Johannesburg)" },
  { value: "UTC+3", label: "UTC+03:00 (Moscow, Istanbul, Riyadh)" },
  { value: "UTC+4", label: "UTC+04:00 (Dubai, Baku)" },
  { value: "UTC+5", label: "UTC+05:00 (Karachi, Tashkent)" },
  { value: "UTC+5.5", label: "UTC+05:30 (India, Sri Lanka)" },
  { value: "UTC+6", label: "UTC+06:00 (Dhaka, Almaty)" },
  { value: "UTC+7", label: "UTC+07:00 (Bangkok, Jakarta)" },
  { value: "UTC+8", label: "UTC+08:00 (Singapore, Beijing, Manila)" },
  { value: "UTC+9", label: "UTC+09:00 (Tokyo, Seoul)" },
  { value: "UTC+10", label: "UTC+10:00 (Sydney, Melbourne)" },
  { value: "UTC+11", label: "UTC+11:00 (Solomon Islands)" },
  { value: "UTC+12", label: "UTC+12:00 (Auckland, Fiji)" },
];

const Settings = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [dataAnalytics, setDataAnalytics] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSecuritySettingsOpen, setIsSecuritySettingsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: "John Doe",
      email: "johndoe@example.com",
      phone: "",
      timezone: "UTC-7",
    },
  });

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
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

  const handlePasswordChange = (values: SecurityFormValues) => {
    console.log("Password change requested:", values);
    
    // In a real app, you would call an API to change the password
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    });
    
    securityForm.reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  
  const handleDeleteAccount = () => {
    // In a real app, you would call an API to delete the account
    console.log("Account deletion requested");
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Account deleted",
      description: "Your account has been scheduled for deletion.",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account settings and preferences.
            </p>
          </div>
          <SettingsIcon className="h-8 w-8 text-muted-foreground" />
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
                          <FormMessage />
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
                          <FormDescription>
                            Contact support to change your email address.
                          </FormDescription>
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
                              {timezones.map((timezone) => (
                                <option key={timezone.value} value={timezone.value}>
                                  {timezone.label}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormDescription>
                            Your local timezone for appointments and reminders.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit">Save Profile</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" /> 
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your password and two-factor authentication.
                </CardDescription>
              </div>
              <CollapsibleTrigger onClick={() => setIsSecuritySettingsOpen(!isSecuritySettingsOpen)} className="rounded-full p-2 hover:bg-muted">
                {isSecuritySettingsOpen ? (
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                    <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                    <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                )}
              </CollapsibleTrigger>
            </CardHeader>
            <Collapsible open={isSecuritySettingsOpen} onOpenChange={setIsSecuritySettingsOpen}>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <Form {...securityForm}>
                    <form onSubmit={securityForm.handleSubmit(handlePasswordChange)} className="space-y-4">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <FormField
                        control={securityForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input 
                                  {...field} 
                                  type={showPassword ? "text" : "password"} 
                                  placeholder="Enter your current password" 
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={securityForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    {...field} 
                                    type={showNewPassword ? "text" : "password"} 
                                    placeholder="Enter your new password" 
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                  >
                                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={securityForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm New Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    {...field} 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder="Confirm your new password" 
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <Button type="submit">Update Password</Button>
                      </div>
                    </form>
                  </Form>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Enable Two-factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account with 2FA.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Switch
                          checked={twoFactorEnabled}
                          onCheckedChange={setTwoFactorEnabled}
                          id="twoFactorEnabled"
                        />
                      </div>
                    </div>
                    {twoFactorEnabled && (
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <p>Two-factor authentication is enabled. You'll receive verification codes via SMS when signing in from a new device.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
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

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Data Analytics Sharing</h4>
                  <p className="text-sm text-muted-foreground">
                    Allow anonymous usage data to be collected to improve our service.
                  </p>
                </div>
                <div className="flex items-center">
                  <Switch
                    checked={dataAnalytics}
                    onCheckedChange={setDataAnalytics}
                    id="dataAnalytics"
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

          <Card>
            <CardHeader className="flex flex-row items-center">
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2 text-destructive" /> 
                Advanced Settings
              </CardTitle>
              <CardDescription>
                Danger zone - these actions cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-destructive/20 rounded-md bg-destructive/5">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium flex items-center">
                      <Trash className="h-4 w-4 mr-2 text-destructive" />
                      Delete Your Account
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                  </div>
                  <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive">Delete Account</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center text-destructive">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          Delete Account
                        </DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="bg-destructive/10 p-3 rounded-md text-sm border border-destructive/20">
                        <p className="font-medium">What will happen when you delete your account:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>All your personal information will be deleted</li>
                          <li>All your contacts and organizations will be removed</li>
                          <li>All your deals and communications history will be erased</li>
                          <li>You will lose access to all data immediately</li>
                        </ul>
                      </div>
                      <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteAccount}>
                          Yes, Delete My Account
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
