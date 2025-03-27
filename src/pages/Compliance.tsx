
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield } from "lucide-react";

const Compliance = () => {
  const [hipaaMode, setHipaaMode] = React.useState(true);
  const [soc2Mode, setSoc2Mode] = React.useState(true);
  const [gdprMode, setGdprMode] = React.useState(false);
  const [ccpaMode, setCcpaMode] = React.useState(false);
  const [dataRetention, setDataRetention] = React.useState("365");
  const { toast } = useToast();

  const handleSaveCompliance = () => {
    toast({
      title: "Compliance Settings Saved",
      description: `Updated compliance settings successfully`,
      variant: "success",
    });
  };

  const handleGenerateDPIA = () => {
    toast({
      title: "Data Protection Impact Assessment",
      description: "DPIA report has been generated and sent to compliance officers",
      variant: "success",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Compliance Management</h1>
            <p className="text-muted-foreground">
              Configure and monitor compliance with healthcare regulations
            </p>
          </div>
        </div>

        <Alert className="bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-400">
          <Shield className="h-4 w-4" />
          <AlertTitle>Admin Only Area</AlertTitle>
          <AlertDescription>
            These settings control system-wide compliance features and may impact all users.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="compliance-settings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="compliance-settings">Compliance Settings</TabsTrigger>
            <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
            <TabsTrigger value="reporting">Compliance Reporting</TabsTrigger>
          </TabsList>

          <TabsContent value="compliance-settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Compliance</CardTitle>
                <CardDescription>
                  Configure which compliance regulations apply to your organization
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

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">GDPR Compliance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enables features required for EU General Data Protection Regulation
                      </p>
                    </div>
                    <Switch 
                      checked={gdprMode} 
                      onCheckedChange={setGdprMode} 
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">CCPA Compliance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enables features required for California Consumer Privacy Act
                      </p>
                    </div>
                    <Switch 
                      checked={ccpaMode} 
                      onCheckedChange={setCcpaMode} 
                    />
                  </div>
                </div>

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

                <Button onClick={handleSaveCompliance}>Save Compliance Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit-logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Audit Logs</CardTitle>
                <CardDescription>
                  View and export logs of all compliance-related activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="bg-muted px-4 py-2 flex items-center justify-between">
                    <div className="font-medium">Date & Time</div>
                    <div className="font-medium">User</div>
                    <div className="font-medium">Action</div>
                    <div className="font-medium">Details</div>
                  </div>
                  <div className="divide-y">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="px-4 py-3 flex items-center justify-between">
                        <div className="text-sm">{new Date(Date.now() - i * 86400000).toLocaleString()}</div>
                        <div className="text-sm">Admin User</div>
                        <div className="text-sm">Settings Changed</div>
                        <div className="text-sm">Modified HIPAA compliance settings</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline">Export Logs</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reporting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Reporting</CardTitle>
                <CardDescription>
                  Generate and view compliance reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Data Protection Impact Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">Generates a comprehensive DPIA report for GDPR compliance</p>
                      <Button size="sm" onClick={handleGenerateDPIA}>Generate DPIA</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">HIPAA Compliance Report</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">Generate a report on your HIPAA compliance status</p>
                      <Button size="sm">Generate Report</Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Access Control Audit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">Review user permissions and access patterns</p>
                      <Button size="sm">Run Audit</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Vulnerability Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">Scan for security vulnerabilities in your system</p>
                      <Button size="sm">Run Assessment</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Compliance;
