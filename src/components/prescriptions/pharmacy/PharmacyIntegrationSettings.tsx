
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Network, Settings, ShieldCheck, Server, KeyRound } from "lucide-react";

const PharmacyIntegrationSettings: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [primaryProvider, setPrimaryProvider] = useState("surescripts");
  const [apiKey, setApiKey] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [enableDirectTransmission, setEnableDirectTransmission] = useState(true);
  const [enableStatusChecks, setEnableStatusChecks] = useState(true);
  const [autoRefillNotifications, setAutoRefillNotifications] = useState(true);
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings Saved",
        description: "Pharmacy integration settings have been updated successfully."
      });
    }, 1000);
  };

  const handleTestConnection = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Connection Test Successful",
        description: `Successfully connected to ${primaryProvider.toUpperCase()} integration service.`
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            <CardTitle>Primary Integration Provider</CardTitle>
          </div>
          <CardDescription>
            Select your primary e-prescription service provider for transmitting prescriptions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider">Integration Provider</Label>
            <Select value={primaryProvider} onValueChange={setPrimaryProvider}>
              <SelectTrigger>
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="surescripts">Surescripts</SelectItem>
                <SelectItem value="rxnorm">RxNorm</SelectItem>
                <SelectItem value="ncpdp">NCPDP</SelectItem>
                <SelectItem value="custom">Custom API</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input 
              id="apiKey" 
              type="password" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API key for authentication"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endpoint">API Endpoint</Label>
            <Input 
              id="endpoint" 
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="Enter API endpoint URL"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={handleTestConnection}
            disabled={isLoading || !apiKey}
            className="flex items-center gap-1"
          >
            <Server className="h-4 w-4 mr-1" />
            Test Connection
          </Button>
          <Button 
            onClick={handleSaveSettings}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            <KeyRound className="h-4 w-4 mr-1" />
            Save API Settings
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <CardTitle>Integration Options</CardTitle>
          </div>
          <CardDescription>
            Configure how the system communicates with pharmacy systems
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="direct-transmission">Enable Direct Transmission</Label>
              <p className="text-sm text-muted-foreground">
                Allow prescriptions to be sent directly to pharmacy systems
              </p>
            </div>
            <Switch 
              id="direct-transmission" 
              checked={enableDirectTransmission}
              onCheckedChange={setEnableDirectTransmission}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="status-checks">Automatic Status Checks</Label>
              <p className="text-sm text-muted-foreground">
                Periodically check prescription status from pharmacies
              </p>
            </div>
            <Switch 
              id="status-checks" 
              checked={enableStatusChecks}
              onCheckedChange={setEnableStatusChecks}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="refill-notifications">Auto-Refill Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications when pharmacies process refill requests
              </p>
            </div>
            <Switch 
              id="refill-notifications" 
              checked={autoRefillNotifications}
              onCheckedChange={setAutoRefillNotifications}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <CardTitle>Security Settings</CardTitle>
          </div>
          <CardDescription>
            Configure security options for pharmacy communication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Encryption Level</Label>
              <p className="text-sm text-muted-foreground">
                All communications are encrypted using AES-256 bit encryption
              </p>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              AES-256
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Connection Protocol</Label>
              <p className="text-sm text-muted-foreground">
                Secure HTTPS protocol is used for all API communications
              </p>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              HTTPS/TLS 1.3
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Compliance Status</Label>
              <p className="text-sm text-muted-foreground">
                Communication standards meet HIPAA compliance requirements
              </p>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              HIPAA Compliant
            </Badge>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View Security Documentation</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PharmacyIntegrationSettings;
