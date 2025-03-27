
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const pipelineData = [
  { name: "Leads", value: 235, color: "#3b82f6" },
  { name: "Qualified", value: 145, color: "#10b981" },
  { name: "Proposal", value: 87, color: "#8b5cf6" },
  { name: "Negotiation", value: 42, color: "#f97316" },
  { name: "Closed", value: 68, color: "#6366f1" }
];

const conversionData = [
  { stage: "Leads → Qualified", rate: 62, previous: 58 },
  { stage: "Qualified → Proposal", rate: 48, previous: 45 },
  { stage: "Proposal → Negotiation", rate: 38, previous: 35 },
  { stage: "Negotiation → Closed", rate: 72, previous: 68 },
];

const averageTimeData = [
  { stage: "Lead", days: 3.5 },
  { stage: "Qualified", days: 7.2 },
  { stage: "Proposal", days: 12.8 },
  { stage: "Negotiation", days: 8.5 },
  { stage: "Closed", days: 2.5 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PipelineAnalysisReport = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Distribution</CardTitle>
            <CardDescription>
              Current distribution of deals across pipeline stages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pipelineData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pipelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
              {pipelineData.map((stage) => (
                <div key={stage.name} className="text-center">
                  <div className="text-sm text-muted-foreground">{stage.name}</div>
                  <div className="font-bold">{stage.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rates</CardTitle>
            <CardDescription>
              Stage-to-stage conversion rates compared to previous period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={conversionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis unit="%" />
                  <Tooltip />
                  <Bar dataKey="rate" name="Current Rate" fill="#3b82f6" />
                  <Bar dataKey="previous" name="Previous Rate" fill="#94a3b8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Average Time in Stage</CardTitle>
            <CardDescription>
              Average number of days deals spend in each pipeline stage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={averageTimeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" unit=" days" />
                  <YAxis dataKey="stage" type="category" />
                  <Tooltip />
                  <Bar dataKey="days" name="Average Days" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Total Avg. Sales Cycle</div>
                  <div className="text-3xl font-bold">34.5 days</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Conversion Rate (Overall)</div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">29.8%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PipelineAnalysisReport;
