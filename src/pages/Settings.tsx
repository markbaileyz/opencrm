
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import refactored components
import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsCard from "@/components/settings/SettingsCard";
import ProfileSettingsForm, { ProfileFormValues } from "@/components/settings/ProfileSettingsForm";
import SecuritySettingsForm, { SecurityFormValues } from "@/components/settings/SecuritySettingsForm";
import NotificationSettingsForm from "@/components/settings/NotificationSettingsForm";
import DangerZoneSection from "@/components/settings/DangerZoneSection";
import IntegrationSettings from "@/components/settings/IntegrationSettings";
import DataManagementSettings from "@/components/settings/DataManagementSettings";
import SubscriptionSettings from "@/components/settings/SubscriptionSettings";

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
  const [activeTab, setActiveTab] = useState("account");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [dataAnalytics, setDataAnalytics] = useState(true);
  const [isSecuritySettingsOpen, setIsSecuritySettingsOpen] = useState(false);

  const handleSaveSettings = (values: ProfileFormValues) => {
    console.log("Form values:", values);
    
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  const handlePasswordChange = (values: SecurityFormValues) => {
    console.log("Password change requested:", values);
    
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    });
  };

  const handleNotificationSave = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };
  
  const handleDeleteAccount = () => {
    console.log("Account deletion requested");
    
    toast({
      title: "Account deleted",
      description: "Your account has been scheduled for deletion.",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SettingsHeader 
          title="Settings"
          description="Manage your account settings and preferences."
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="account" className="space-y-6">
              <SettingsCard
                title="Profile Settings"
                description="Update your personal information and preferences."
              >
                <ProfileSettingsForm
                  defaultValues={{
                    fullName: "John Doe",
                    email: "johndoe@example.com",
                    phone: "",
                    timezone: "UTC-7",
                  }}
                  timezones={timezones}
                  onSubmit={handleSaveSettings}
                />
              </SettingsCard>

              <SettingsCard
                title="Notification Preferences"
                description="Control how and when you receive notifications."
              >
                <NotificationSettingsForm
                  emailNotifications={emailNotifications}
                  setEmailNotifications={setEmailNotifications}
                  smsNotifications={smsNotifications}
                  setSmsNotifications={setSmsNotifications}
                  dataAnalytics={dataAnalytics}
                  setDataAnalytics={setDataAnalytics}
                  onSave={handleNotificationSave}
                />
              </SettingsCard>

              <DataManagementSettings />
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <SettingsCard
                title="Security Settings"
                description="Manage your password and two-factor authentication."
              >
                <SecuritySettingsForm
                  onPasswordChange={handlePasswordChange}
                  twoFactorEnabled={twoFactorEnabled}
                  onTwoFactorChange={setTwoFactorEnabled}
                />
              </SettingsCard>

              <SettingsCard
                title="Danger Zone"
                description="Danger zone - these actions cannot be undone."
              >
                <DangerZoneSection onDeleteAccount={handleDeleteAccount} />
              </SettingsCard>
            </TabsContent>
            
            <TabsContent value="integrations">
              <IntegrationSettings />
            </TabsContent>
            
            <TabsContent value="billing">
              <SubscriptionSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
