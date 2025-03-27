
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const securityFormSchema = z.object({
  currentPassword: z.string().min(8, { message: "Current password must be at least 8 characters." }),
  newPassword: z.string().min(8, { message: "New password must be at least 8 characters." }),
  confirmPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters." }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SecurityFormValues = z.infer<typeof securityFormSchema>;

interface SecuritySettingsFormProps {
  onPasswordChange: (values: SecurityFormValues) => void;
  twoFactorEnabled: boolean;
  onTwoFactorChange: (enabled: boolean) => void;
}

const SecuritySettingsForm: React.FC<SecuritySettingsFormProps> = ({
  onPasswordChange,
  twoFactorEnabled,
  onTwoFactorChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="space-y-6">
      <Form {...securityForm}>
        <form onSubmit={securityForm.handleSubmit(onPasswordChange)} className="space-y-4">
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
      
      <div className="space-y-4 pt-4">
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
              onCheckedChange={onTwoFactorChange}
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
    </div>
  );
};

export default SecuritySettingsForm;
