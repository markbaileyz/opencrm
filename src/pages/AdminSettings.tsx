
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Shield, Key, Lock, Settings, Database } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminSettings = () => {
  const [aiApiKey, setAiApiKey] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");
  const [stripeKey, setStripeKey] = useState("");
  const [hipaaMode, setHipaaMode] = useState(true);
  const [soc2Mode, setSoc2Mode] = useState(true);
  const [dataRetention, setDataRetention] = useState("365");
  const { toast } = useToast();

  const handleSaveApiKeys = () => {
    // In a real app, this would securely store these keys
    toast({
      title: "API Keys Saved",
      description: "Your API keys have been securely stored.",
      variant: "success",
    });
  };

  const handleSaveCompliance = () => {
    toast({
      title: "Compliance Settings Saved",
      description: `HIPAA: ${hipaaMode ? "Enabled" : "Disabled"}, SOC 2: ${soc2Mode ? "Enabled" : "Disabled"}`,
      variant: "success",
    });
  };

  const handleGenerateKey = () => {
    // In a real app, this would generate a secure key
    const generatedKey = Array(40)
      .fill(0)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");
    
    setEncryptionKey(generatedKey);
    
    toast({
      title: "Encryption Key Generated",
      description: "Store this key securely. It cannot be recovered if lost.",
      variant: "warning",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Admin Settings</h1>
            <p className="text-muted-foreground">
              Configure system-wide settings and security options
            </p>
          </div>
        </div>

        <Alert className="bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-400">
          <Shield className="h-4 w-4" />
          <AlertTitle>Admin Only Area</AlertTitle>
          <AlertDescription>
            These settings are only accessible to administrators with full system access.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="api-keys" className="space-y-4">
          <TabsList>
            <TabsTrigger value="api-keys"><Key className="h-4 w-4 mr-2" />API Keys</TabsTrigger>
            <TabsTrigger value="security"><Lock className="h-4 w-4 mr-2" />Security & Compliance</TabsTrigger>
            <TabsTrigger value="system"><Settings className="h-4 w-4 mr-2" />System Settings</TabsTrigger>
            <TabsTrigger value="data"><Database className="h-4 w-4 mr-2" />Data Management</TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Keys Configuration</CardTitle>
                <CardDescription>
                  Manage API keys for third-party integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-api-key">AI Assistant API Key</Label>
                  <Input 
                    id="ai-api-key" 
                    type="password" 
                    value={aiApiKey} 
                    onChange={(e) => setAiApiKey(e.target.value)}
                    placeholder="Enter your AI provider API key"
                  />
                  <p className="text-sm text-muted-foreground">
                    Used for AI-powered features and patient analysis
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stripe-key">Stripe API Key</Label>
                  <Input 
                    id="stripe-key" 
                    type="password" 
                    value={stripeKey} 
                    onChange={(e) => setStripeKey(e.target.value)}
                    placeholder="Enter your Stripe API key"
                  />
                  <p className="text-sm text-muted-foreground">
                    Used for payment processing and billing
                  </p>
                </div>

                <Button onClick={handleSaveApiKeys}>Save API Keys</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security & Compliance</CardTitle>
                <CardDescription>
                  Configure security settings and compliance features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">HIPAA Compliance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enforces strict HIPAA data protection rules
                      </p>
                    </div>
                    <Switch 
                      checked={hipaaMode} 
                      onCheckedChange={setHipaaMode} 
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">SOC 2 Compliance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Follows SOC 2 security and availability standards
                      </p>
                    </div>
                    <Switch 
                      checked={soc2Mode} 
                      onCheckedChange={setSoc2Mode} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="encryption-key">Data Encryption Key</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="encryption-key" 
                      type="password" 
                      value={encryptionKey} 
                      onChange={(e) => setEncryptionKey(e.target.value)}
                      placeholder="Enter your encryption key"
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={handleGenerateKey}>
                      Generate
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Used to encrypt sensitive patient data at rest
                  </p>
                </div>

                <Button onClick={handleSaveCompliance}>Save Compliance Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure global system behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input 
                    id="session-timeout" 
                    type="number" 
                    defaultValue={15} 
                    min={1}
                    max={60}
                  />
                  <p className="text-sm text-muted-foreground">
                    Automatically log out inactive users after this period
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="failed-login">Failed Login Attempts</Label>
                  <Input 
                    id="failed-login" 
                    type="number" 
                    defaultValue={5} 
                    min={1}
                    max={10}
                  />
                  <p className="text-sm text-muted-foreground">
                    Lock accounts after this many consecutive failed login attempts
                  </p>
                </div>

                <Button>Save System Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Configure data retention and backup policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="data-retention">Data Retention Period (days)</Label>
                  <Input 
                    id="data-retention" 
                    type="number" 
                    value={dataRetention}
                    onChange={(e) => setDataRetention(e.target.value)}
                    min={30}
                  />
                  <p className="text-sm text-muted-foreground">
                    How long to retain patient data before archiving
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backup-schedule">Automatic Backup Schedule</Label>
                  <select 
                    id="backup-schedule"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    defaultValue="daily"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <p className="text-sm text-muted-foreground">
                    How frequently to backup all system data
                  </p>
                </div>

                <Button>Save Data Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
