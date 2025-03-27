
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Github, Mail, Slack, CalendarDays, CreditCard, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  apiKey?: string;
}

const IntegrationSettings: React.FC = () => {
  const { toast } = useToast();
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [zapierWebhook, setZapierWebhook] = useState("");

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "github",
      name: "GitHub",
      description: "Connect your GitHub repositories for version control and issue tracking.",
      icon: <Github className="h-6 w-6" />,
      isActive: false
    },
    {
      id: "slack",
      name: "Slack",
      description: "Get notifications and updates in your Slack workspace.",
      icon: <Slack className="h-6 w-6" />,
      isActive: true,
      apiKey: "xoxb-123456789-abcdefghijk"
    },
    {
      id: "calendar",
      name: "Google Calendar",
      description: "Sync appointments and events with your Google Calendar.",
      icon: <CalendarDays className="h-6 w-6" />,
      isActive: false
    },
    {
      id: "email",
      name: "Email Provider",
      description: "Configure your email service provider for sending notifications.",
      icon: <Mail className="h-6 w-6" />,
      isActive: true,
      apiKey: "SG.abcdefghijklmnopqrstuvwxyz"
    },
    {
      id: "zapier",
      name: "Zapier",
      description: "Connect with thousands of apps through custom Zapier workflows.",
      icon: <ExternalLink className="h-6 w-6" />,
      isActive: false
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "Process payments and manage subscriptions.",
      icon: <CreditCard className="h-6 w-6" />,
      isActive: false
    }
  ]);

  const handleToggleIntegration = (id: string) => {
    setIntegrations(prevIntegrations => 
      prevIntegrations.map(integration => 
        integration.id === id 
          ? { ...integration, isActive: !integration.isActive } 
          : integration
      )
    );
    
    const integration = integrations.find(i => i.id === id);
    if (integration) {
      toast({
        title: `${integration.name} ${integration.isActive ? "disabled" : "enabled"}`,
        description: integration.isActive 
          ? `${integration.name} has been disconnected.` 
          : `${integration.name} has been successfully connected.`,
      });
    }
  };

  const handleConfigureIntegration = (integration: Integration) => {
    setSelectedIntegration(integration);
    setApiKey(integration.apiKey || "");
  };

  const handleSaveApiKey = () => {
    if (!selectedIntegration) return;
    
    setIntegrations(prevIntegrations => 
      prevIntegrations.map(integration => 
        integration.id === selectedIntegration.id 
          ? { ...integration, apiKey, isActive: true } 
          : integration
      )
    );
    
    toast({
      title: "API Key Saved",
      description: `Your ${selectedIntegration.name} API key has been updated.`,
    });
    
    setSelectedIntegration(null);
  };

  const handleSaveZapierWebhook = () => {
    const zapierIntegration = integrations.find(i => i.id === "zapier");
    if (!zapierIntegration) return;
    
    setIntegrations(prevIntegrations => 
      prevIntegrations.map(integration => 
        integration.id === "zapier" 
          ? { ...integration, apiKey: zapierWebhook, isActive: true } 
          : integration
      )
    );
    
    toast({
      title: "Zapier Webhook Saved",
      description: "Your Zapier webhook URL has been saved.",
    });
    
    setSelectedIntegration(null);
  };

  const testZapierWebhook = async () => {
    const zapierUrl = zapierWebhook || integrations.find(i => i.id === "zapier")?.apiKey;
    if (!zapierUrl) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL first",
        variant: "destructive",
      });
      return;
    }

    try {
      await fetch(zapierUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
          source: "OpenCRM",
          timestamp: new Date().toISOString(),
          event: "test_connection"
        }),
      });

      toast({
        title: "Test Sent",
        description: "Test payload sent to Zapier. Check your Zap history to confirm it was triggered.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to trigger the webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>
          Connect your CRM with other services and applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {integrations.map((integration) => (
            <div 
              key={integration.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-muted p-2 rounded-md">
                  {integration.icon}
                </div>
                <div>
                  <h4 className="font-medium">{integration.name}</h4>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {integration.id === "zapier" ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Configure</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Configure Zapier Integration</DialogTitle>
                        <DialogDescription>
                          Enter your Zapier webhook URL to connect with your Zaps.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Webhook URL</label>
                          <Input 
                            value={integration.apiKey || zapierWebhook}
                            onChange={(e) => setZapierWebhook(e.target.value)}
                            placeholder="https://hooks.zapier.com/hooks/catch/123456/abcdef/"
                          />
                          <p className="text-xs text-muted-foreground">
                            Create a Zap with the Webhook trigger to get your webhook URL.
                          </p>
                        </div>
                      </div>
                      <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" onClick={testZapierWebhook}>
                          Test Connection
                        </Button>
                        <Button onClick={handleSaveZapierWebhook}>
                          Save Webhook
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Dialog open={selectedIntegration?.id === integration.id} onOpenChange={(open) => !open && setSelectedIntegration(null)}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleConfigureIntegration(integration)}>
                        Configure
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Configure {integration.name}</DialogTitle>
                        <DialogDescription>
                          Enter your API key to connect with {integration.name}.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">API Key</label>
                          <Input 
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            type="password"
                            placeholder="Enter your API key"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleSaveApiKey}>
                          Save API Key
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
                
                <Switch 
                  checked={integration.isActive}
                  onCheckedChange={() => handleToggleIntegration(integration.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationSettings;
