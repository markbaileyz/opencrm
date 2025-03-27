
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface NotificationSettingsFormProps {
  emailNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
  smsNotifications: boolean;
  setSmsNotifications: (value: boolean) => void;
  dataAnalytics: boolean;
  setDataAnalytics: (value: boolean) => void;
  onSave: () => void;
}

const NotificationSettingsForm: React.FC<NotificationSettingsFormProps> = ({
  emailNotifications,
  setEmailNotifications,
  smsNotifications,
  setSmsNotifications,
  dataAnalytics,
  setDataAnalytics,
  onSave,
}) => {
  return (
    <div className="space-y-4">
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
        <Button onClick={onSave}>Save Preferences</Button>
      </div>
    </div>
  );
};

export default NotificationSettingsForm;
