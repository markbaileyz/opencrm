
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const ComplianceReports: React.FC = () => {
  // Sample data for charts
  const riskAssessmentData = [
    { name: "Data Privacy", risk: 65, mitigation: 40 },
    { name: "Access Control", risk: 45, mitigation: 80 },
    { name: "Network Security", risk: 30, mitigation: 90 },
    { name: "Incident Response", risk: 70, mitigation: 55 },
    { name: "Vendor Management", risk: 85, mitigation: 35 },
    { name: "Physical Security", risk: 25, mitigation: 95 }
  ];

  const complianceByRegulationData = [
    { name: "HIPAA", value: 85 },
    { name: "GDPR", value: 72 },
    { name: "PCI DSS", value: 90 },
    { name: "HITECH", value: 78 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const highRiskItems = [
    { id: 1, area: "Patient Data Encryption", score: 35, impact: "high", status: "attention-needed" },
    { id: 2, area: "Third-party Vendor Access", score: 40, impact: "high", status: "attention-needed" },
    { id: 3, area: "Staff Security Training", score: 45, impact: "medium", status: "in-progress" }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="risk-assessment">
        <TabsList className="mb-4">
          <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
          <TabsTrigger value="regulatory-compliance">Regulatory Compliance</TabsTrigger>
          <TabsTrigger value="high-risk-items">High Risk Items</TabsTrigger>
        </TabsList>
        
        <TabsContent value="risk-assessment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment by Area</CardTitle>
              <CardDescription>Risk levels and mitigation status across key areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={riskAssessmentData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Bar dataKey="risk" fill="#ff4d4f" name="Risk Level" />
                    <Bar dataKey="mitigation" fill="#52c41a" name="Mitigation Level" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="regulatory-compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance by Regulation</CardTitle>
              <CardDescription>Compliance levels across different regulatory frameworks</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[300px] w-full max-w-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={complianceByRegulationData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {complianceByRegulationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Compliance Level']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="high-risk-items" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>High Risk Items</CardTitle>
              <CardDescription>Areas requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {highRiskItems.map(item => (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{item.area}</h3>
                      <Badge 
                        variant="outline" 
                        className={item.impact === "high" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}
                      >
                        {item.impact} impact
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">Risk Score:</span>
                      <span className="font-bold">{item.score}%</span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                    <div className="flex justify-between items-center mt-3">
                      <Badge 
                        variant="outline"
                        className={
                          item.status === "attention-needed" 
                            ? "bg-red-100 text-red-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {item.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.score < 40 ? "Critical" : item.score < 60 ? "High Risk" : "Moderate Risk"}
                      </span>
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

export default ComplianceReports;
