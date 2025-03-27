
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import SettingsHeader from "@/components/settings/SettingsHeader";
import ProfileSettingsForm from "@/components/settings/ProfileSettingsForm";
import NotificationSettingsForm from "@/components/settings/NotificationSettingsForm";
import SecuritySettingsForm from "@/components/settings/SecuritySettingsForm";
import DataManagementSettings from "@/components/settings/DataManagementSettings";
import IntegrationSettings from "@/components/settings/IntegrationSettings";
import UserPreferencesSettings from "@/components/settings/UserPreferencesSettings";
import AccessibilitySettings from "@/components/settings/AccessibilitySettings";
import DangerZoneSection from "@/components/settings/DangerZoneSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Bell, 
  Lock, 
  Database, 
  Link, 
  Settings as SettingsIcon,
  Palette,
  Accessibility
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SettingsHeader 
          title="Settings" 
          description="Manage your account settings and preferences" 
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-wrap gap-2">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center gap-2">
              <Accessibility className="h-4 w-4" />
              <span>Accessibility</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Data</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              <span>Integrations</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <ProfileSettingsForm />
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <UserPreferencesSettings />
          </TabsContent>
          
          <TabsContent value="accessibility" className="space-y-6">
            <AccessibilitySettings />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <NotificationSettingsForm />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <SecuritySettingsForm />
          </TabsContent>
          
          <TabsContent value="data" className="space-y-6">
            <DataManagementSettings />
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-6">
            <IntegrationSettings />
          </TabsContent>
        </Tabs>
        
        <DangerZoneSection />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
