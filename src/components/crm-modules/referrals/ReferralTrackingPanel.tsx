
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UsersRound, Plus, ArrowUpRight, TrendingUp, Filter } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ReferralSource {
  id: string;
  name: string;
  type: "provider" | "patient" | "partner" | "marketing" | "other";
  count: number;
  conversionRate: number;
  trend: "up" | "down" | "stable";
}

interface Referral {
  id: string;
  patientName: string;
  sourceName: string;
  sourceType: "provider" | "patient" | "partner" | "marketing" | "other";
  date: string;
  status: "new" | "contacted" | "scheduled" | "converted" | "lost";
  notes?: string;
}

const sampleReferralSources: ReferralSource[] = [
  {
    id: "1",
    name: "Dr. Michael Johnson",
    type: "provider",
    count: 24,
    conversionRate: 72,
    trend: "up"
  },
  {
    id: "2",
    name: "City Health Partners",
    type: "partner",
    count: 18,
    conversionRate: 61,
    trend: "stable"
  },
  {
    id: "3",
    name: "Patient Referral Program",
    type: "patient",
    count: 15,
    conversionRate: 53,
    trend: "up"
  },
  {
    id: "4", 
    name: "Health Fair Campaign",
    type: "marketing",
    count: 12,
    conversionRate: 42,
    trend: "down"
  },
  {
    id: "5",
    name: "Website Contact Form",
    type: "marketing",
    count: 8,
    conversionRate: 38,
    trend: "stable"
  }
];

const sampleReferrals: Referral[] = [
  {
    id: "ref1",
    patientName: "Emma Thompson",
    sourceName: "Dr. Michael Johnson",
    sourceType: "provider",
    date: "2023-06-12",
    status: "converted",
    notes: "Referred for specialized cardiology consultation"
  },
  {
    id: "ref2",
    patientName: "James Wilson",
    sourceName: "City Health Partners",
    sourceType: "partner",
    date: "2023-06-14",
    status: "scheduled",
    notes: "Follow-up appointment scheduled for next week"
  },
  {
    id: "ref3",
    patientName: "Sophia Garcia",
    sourceName: "Patient Referral Program",
    sourceType: "patient",
    date: "2023-06-15",
    status: "contacted",
  },
  {
    id: "ref4",
    patientName: "William Brown",
    sourceName: "Health Fair Campaign",
    sourceType: "marketing",
    date: "2023-06-17",
    status: "new",
  },
  {
    id: "ref5",
    patientName: "Olivia Martinez",
    sourceName: "Dr. Michael Johnson",
    sourceType: "provider",
    date: "2023-06-18",
    status: "new",
    notes: "Referred for diabetes management consultation"
  }
];

const ReferralTrackingPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { toast } = useToast();
  const [referralSources, setReferralSources] = useState<ReferralSource[]>(sampleReferralSources);
  const [referrals, setReferrals] = useState<Referral[]>(sampleReferrals);

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />;
      default:
        return <div className="h-4 w-4 border-t border-gray-300" />;
    }
  };

  const getReferralStatusBadge = (status: Referral["status"]) => {
    switch (status) {
      case "new":
        return <Badge variant="outline">New</Badge>;
      case "contacted":
        return <Badge variant="secondary">Contacted</Badge>;
      case "scheduled":
        return <Badge variant="default">Scheduled</Badge>;
      case "converted":
        return <Badge className="bg-green-500">Converted</Badge>;
      case "lost":
        return <Badge variant="destructive">Lost</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAddReferral = () => {
    toast({
      title: "Add Referral",
      description: "The add referral form will be implemented soon",
    });
  };

  const handleViewDetails = (id: string) => {
    toast({
      title: "View Referral Details",
      description: `Viewing details for referral ${id}`,
    });
  };

  const sourceTypeCount = referralSources.reduce((acc, source) => {
    acc[source.type] = (acc[source.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-xl">Referral Tracking</CardTitle>
            <CardDescription>Monitor and manage patient referrals</CardDescription>
          </div>
          <Button onClick={handleAddReferral}>
            <Plus className="h-4 w-4 mr-2" />
            Add Referral
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sources">Referral Sources</TabsTrigger>
            <TabsTrigger value="referrals">Recent Referrals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{referrals.length}</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      (referrals.filter(r => r.status === "converted").length / referrals.length) * 100
                    )}%
                  </div>
                  <p className="text-xs text-muted-foreground">Overall average</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Source Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Object.keys(sourceTypeCount).length}</div>
                  <p className="text-xs text-muted-foreground">Active categories</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Top Source</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-md font-bold truncate">
                    {referralSources.sort((a, b) => b.count - a.count)[0]?.name}
                  </div>
                  <p className="text-xs text-muted-foreground">By referral volume</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Top Referral Sources</h3>
              <p className="text-xs text-muted-foreground mb-2">
                Sources with the highest conversion rates
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Referrals</TableHead>
                    <TableHead className="text-right">Conversion</TableHead>
                    <TableHead className="text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referralSources
                    .sort((a, b) => b.conversionRate - a.conversionRate)
                    .slice(0, 3)
                    .map(source => (
                      <TableRow key={source.id}>
                        <TableCell>{source.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {source.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{source.count}</TableCell>
                        <TableCell className="text-right">{source.conversionRate}%</TableCell>
                        <TableCell className="text-right">
                          {getTrendIcon(source.trend)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="sources" className="space-y-4">
            <div className="flex justify-between mb-2">
              <h3 className="text-sm font-medium">All Referral Sources</h3>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Referrals</TableHead>
                  <TableHead className="text-right">Conversion</TableHead>
                  <TableHead className="text-right">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referralSources.map(source => (
                  <TableRow key={source.id}>
                    <TableCell>{source.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {source.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{source.count}</TableCell>
                    <TableCell className="text-right">{source.conversionRate}%</TableCell>
                    <TableCell className="text-right">
                      {getTrendIcon(source.trend)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="referrals" className="space-y-4">
            <div className="flex justify-between mb-2">
              <h3 className="text-sm font-medium">Recent Referrals</h3>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrals.map(referral => (
                  <TableRow key={referral.id}>
                    <TableCell>{referral.patientName}</TableCell>
                    <TableCell>
                      <div>{referral.sourceName}</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {referral.sourceType}
                      </div>
                    </TableCell>
                    <TableCell>{referral.date}</TableCell>
                    <TableCell>{getReferralStatusBadge(referral.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewDetails(referral.id)}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReferralTrackingPanel;
