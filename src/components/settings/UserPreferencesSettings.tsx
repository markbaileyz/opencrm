
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SettingsCard from "./SettingsCard";
import { User, Palette, Bell, Eye } from "lucide-react";

interface UserPreference {
  darkMode: boolean;
  compactView: boolean;
  emailDigest: "daily" | "weekly" | "never";
  dashboardLayout: "default" | "compact" | "expanded";
  notificationsEnabled: boolean;
  fontSize: "small" | "medium" | "large";
}

const UserPreferencesSettings = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<UserPreference>({
    darkMode: true,
    compactView: false,
    emailDigest: "weekly",
    dashboardLayout: "default",
    notificationsEnabled: true,
    fontSize: "medium",
  });
  
  const [isSaving, setIsSaving] = useState(false);

  const handleToggleChange = (field: keyof UserPreference) => {
    setPreferences((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSelectChange = (field: keyof UserPreference, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSavePreferences = () => {
    setIsSaving(true);
    
    // Simulate API call to save preferences
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Preferences saved",
        description: "Your preferences have been updated successfully.",
      });
    }, 800);
  };

  return (
    <div className="space-y-6">
      <SettingsCard
        title="Display Preferences"
        description="Customize how the application looks and feels"
        icon={<Palette className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dark-mode" className="font-medium">
                Dark Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Use dark theme for the application
              </p>
            </div>
            <Switch
              id="dark-mode"
              checked={preferences.darkMode}
              onCheckedChange={() => handleToggleChange("darkMode")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="compact-view" className="font-medium">
                Compact View
              </Label>
              <p className="text-sm text-muted-foreground">
                Display more content with less spacing
              </p>
            </div>
            <Switch
              id="compact-view"
              checked={preferences.compactView}
              onCheckedChange={() => handleToggleChange("compactView")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="font-size" className="font-medium">
                Font Size
              </Label>
              <p className="text-sm text-muted-foreground">
                Adjust the text size throughout the application
              </p>
            </div>
            <Select
              value={preferences.fontSize}
              onValueChange={(value) => 
                handleSelectChange("fontSize", value as "small" | "medium" | "large")
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SettingsCard>
      
      <SettingsCard
        title="Dashboard Preferences"
        description="Customize your dashboard experience"
        icon={<Eye className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dashboard-layout" className="font-medium">
                Dashboard Layout
              </Label>
              <p className="text-sm text-muted-foreground">
                Choose how your dashboard is arranged
              </p>
            </div>
            <Select
              value={preferences.dashboardLayout}
              onValueChange={(value) => 
                handleSelectChange("dashboardLayout", value as "default" | "compact" | "expanded")
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="expanded">Expanded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SettingsCard>
      
      <SettingsCard
        title="Notification Preferences"
        description="Control how and when you receive notifications"
        icon={<Bell className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications-enabled" className="font-medium">
                Enable Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications about important updates
              </p>
            </div>
            <Switch
              id="notifications-enabled"
              checked={preferences.notificationsEnabled}
              onCheckedChange={() => handleToggleChange("notificationsEnabled")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-digest" className="font-medium">
                Email Digest
              </Label>
              <p className="text-sm text-muted-foreground">
                How often you want to receive email summaries
              </p>
            </div>
            <Select
              value={preferences.emailDigest}
              onValueChange={(value) => 
                handleSelectChange("emailDigest", value as "daily" | "weekly" | "never")
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SettingsCard>
      
      <div className="flex justify-end">
        <Button onClick={handleSavePreferences} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
};

export default UserPreferencesSettings;
