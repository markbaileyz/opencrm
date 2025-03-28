
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Building2, Network, BarChart3, Activity, Users, TrendingUp } from "lucide-react";
import { useOrganizations } from "@/context/OrganizationsContext";
import OrganizationNetworkGraph from './OrganizationNetworkGraph';
import OrganizationSizeDistribution from "@/components/organizations/OrganizationSizeDistribution";
import OrganizationTypeChart from "@/components/organizations/OrganizationTypeChart";

const OrganizationInsightsDashboard: React.FC = () => {
  const { organizations } = useOrganizations();
  
  // Calculate organization metrics
  const totalOrganizations = organizations.length;
  const activeOrganizations = organizations.filter(org => org.status === "Active").length;
  const totalEmployees = organizations.reduce((sum, org) => {
    // Use a default value for employees if not defined
    const employeeCount = org.size === "Small" ? 10 : 
                         org.size === "Medium" ? 50 : 
                         org.size === "Large" ? 200 : 
                         org.size === "Enterprise" ? 500 : 0;
    return sum + employeeCount;
  }, 0);
  const avgDeals = Math.round(Math.random() * 15) + 5; // Mock data
  
  // Industries distribution based on types
  const industries = organizations.reduce((acc, org) => {
    const industry = org.type || 'Other'; // Use type as a proxy for industry
    acc[industry] = (acc[industry] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topIndustries = Object.entries(industries)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, count]) => ({ name, count }));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Organization Insights</h2>
          <p className="text-muted-foreground">
            Comprehensive analytics and relationship mapping for your organization network
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{totalOrganizations}</div>
              <Building2 className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round(totalOrganizations * 0.15)} new this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{activeOrganizations}</div>
              <Activity className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round(totalOrganizations * 0.7)}% engagement rate
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{totalEmployees.toLocaleString()}</div>
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Avg. {Math.round(totalEmployees / totalOrganizations)} per organization
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{avgDeals}</div>
              <TrendingUp className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {avgDeals > 10 ? '+12%' : '-5%'} from last quarter
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="relationships">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="relationships" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            <span>Relationships</span>
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Distribution</span>
          </TabsTrigger>
          <TabsTrigger value="industry" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span>Industry</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="relationships" className="mt-0 space-y-4">
          <OrganizationNetworkGraph />
        </TabsContent>
        
        <TabsContent value="distribution" className="mt-0 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <OrganizationSizeDistribution />
            <OrganizationTypeChart />
          </div>
        </TabsContent>
        
        <TabsContent value="industry" className="mt-0 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Industry Distribution</CardTitle>
              <CardDescription>Breakdown of organizations by industry</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topIndustries.map((industry, i) => (
                  <div key={industry.name} className="flex items-center">
                    <div className="w-36 flex-shrink-0 font-medium">{industry.name}</div>
                    <div className="w-full">
                      <div className="h-3 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-primary"
                          style={{ 
                            width: `${(industry.count / totalOrganizations) * 100}%`,
                            opacity: 1 - (i * 0.2) 
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-10 text-right font-medium">
                      {industry.count}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizationInsightsDashboard;
