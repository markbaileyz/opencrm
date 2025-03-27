
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, EyeOff, Shield, Lock, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export interface SecuritySettingsFormProps {
  onPasswordChange: (values: { currentPassword: string; newPassword: string }) => void;
  twoFactorEnabled: boolean;
  onTwoFactorChange: (enabled: boolean) => void;
}

const SecuritySettingsForm: React.FC<SecuritySettingsFormProps> = ({
  onPasswordChange,
  twoFactorEnabled,
  onTwoFactorChange
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error
    setPasswordError("");
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    
    // Check for strong password requirements
    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(newPassword)) {
      setPasswordError("Password must include uppercase, lowercase, number, and special character");
      return;
    }
    
    // Submit password change
    onPasswordChange({
      currentPassword,
      newPassword
    });
    
    // Reset form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-6">
      <Alert className="bg-primary/10 border-primary/20">
        <Shield className="h-4 w-4 text-primary" />
        <AlertTitle>HIPAA Compliant Security</AlertTitle>
        <AlertDescription className="text-sm">
          This system implements HIPAA and SOC 2 compliant security measures to protect patient data. 
          All security settings and password requirements meet or exceed regulatory standards.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to maintain account security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters and include uppercase, lowercase, 
                number, and special character.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            {passwordError && (
              <p className="text-sm text-destructive">{passwordError}</p>
            )}
            
            <div className="flex justify-end">
              <Button type="submit">Update Password</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-primary mr-2" />
                <h4 className="font-medium">Two-Factor Authentication</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Receive a verification code via email or authenticator app when logging in
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={onTwoFactorChange}
            />
          </div>
          
          {twoFactorEnabled && (
            <div className="mt-4 p-3 bg-primary/10 rounded-md text-sm">
              <p className="font-medium mb-1">Two-Factor Authentication is enabled</p>
              <p className="text-muted-foreground">
                You'll be asked for a verification code each time you log in from a new device.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Compliance Documents</CardTitle>
          <CardDescription>
            Review important security and compliance information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">HIPAA Privacy Policy</h4>
                <p className="text-sm text-muted-foreground mb-1">
                  Our policy on handling protected health information
                </p>
                <Button variant="link" className="p-0 h-auto text-sm">View Document</Button>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Lock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Security Measures</h4>
                <p className="text-sm text-muted-foreground mb-1">
                  How we protect your information and ensure compliance
                </p>
                <Button variant="link" className="p-0 h-auto text-sm">View Document</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettingsForm;
