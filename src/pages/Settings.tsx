
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettingsForm from "@/components/settings/ProfileSettingsForm";
import NotificationSettingsForm from "@/components/settings/NotificationSettingsForm";
import SecuritySettingsForm from "@/components/settings/SecuritySettingsForm";
import SubscriptionSettings from "@/components/settings/SubscriptionSettings";
import DangerZoneSection from "@/components/settings/DangerZoneSection";
import IntegrationSettings from "@/components/settings/IntegrationSettings";
import DataManagementSettings from "@/components/settings/data-management/DataManagementSettings";
import SettingsHeader from "@/components/settings/SettingsHeader";
import { User, Bell, Shield, CreditCard, Database, Wrench, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();
  
  // Profile settings state
  const [profileValues, setProfileValues] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    company: "Acme Inc.",
    timezone: "America/New_York"
  });
  
  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [dataAnalytics, setDataAnalytics] = useState(true);
  
  // Security settings state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const handleProfileSubmit = (values: any) => {
    console.log("Profile updated:", values);
    toast({
      title: "Profile updated",
      description: "Your profile settings have been saved."
    });
  };
  
  const handlePasswordChange = (values: any) => {
    console.log("Password change requested:", values);
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully."
    });
  };
  
  const handleNotificationSave = () => {
    console.log("Notification settings saved");
    toast({
      title: "Preferences saved",
      description: "Your notification preferences have been updated."
    });
  };
  
  const handleDeleteAccount = () => {
    console.log("Account deletion requested");
    toast({
      title: "Account deleted",
      description: "Your account has been scheduled for deletion.",
      variant: "destructive"
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SettingsHeader 
          title="Settings" 
          description="Manage your account settings and preferences" 
        />
        
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Subscription</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Data</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              <span>Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="danger" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Danger Zone</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <ProfileSettingsForm 
              defaultValues={profileValues}
              timezones={["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "Europe/London"]}
              onSubmit={handleProfileSubmit}
            />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationSettingsForm 
              emailNotifications={emailNotifications}
              setEmailNotifications={setEmailNotifications}
              smsNotifications={smsNotifications}
              setSmsNotifications={setSmsNotifications}
              dataAnalytics={dataAnalytics}
              setDataAnalytics={setDataAnalytics}
              onSave={handleNotificationSave}
            />
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySettingsForm 
              onPasswordChange={handlePasswordChange}
              twoFactorEnabled={twoFactorEnabled}
              onTwoFactorChange={setTwoFactorEnabled}
            />
          </TabsContent>
          
          <TabsContent value="subscription">
            <SubscriptionSettings />
          </TabsContent>
          
          <TabsContent value="data">
            <DataManagementSettings />
          </TabsContent>
          
          <TabsContent value="integrations">
            <IntegrationSettings />
          </TabsContent>
          
          <TabsContent value="danger">
            <DangerZoneSection onDeleteAccount={handleDeleteAccount} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
