import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Settings as SettingsIcon, Lock, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Import refactored components
import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsCard from "@/components/settings/SettingsCard";
import ProfileSettingsForm, { ProfileFormValues } from "@/components/settings/ProfileSettingsForm";
import SecuritySettingsForm, { SecurityFormValues } from "@/components/settings/SecuritySettingsForm";
import NotificationSettingsForm from "@/components/settings/NotificationSettingsForm";
import DangerZoneSection from "@/components/settings/DangerZoneSection";

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
  const [isSecuritySettingsOpen, setIsSecuritySettingsOpen] = useState(false);

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

        <div className="grid gap-6">
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
            title="Security Settings"
            description="Manage your password and two-factor authentication."
            icon={<Lock className="h-5 w-5" />}
            collapsible
            headerAction={
              <Collapsible open={isSecuritySettingsOpen} onOpenChange={setIsSecuritySettingsOpen}>
                <CollapsibleTrigger className="rounded-full p-2 hover:bg-muted">
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
                <CollapsibleContent>
                  <SecuritySettingsForm
                    onPasswordChange={handlePasswordChange}
                    twoFactorEnabled={twoFactorEnabled}
                    onTwoFactorChange={setTwoFactorEnabled}
                  />
                </CollapsibleContent>
              </Collapsible>
            }
          >
            <div></div>
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

          <SettingsCard
            title="Advanced Settings"
            description="Danger zone - these actions cannot be undone."
            icon={<Info className="h-5 w-5 text-destructive" />}
          >
            <DangerZoneSection onDeleteAccount={handleDeleteAccount} />
          </SettingsCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
