
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from "recharts";
import { Deal } from "@/types/deal";
import { formatCurrency } from "@/lib/utils";

interface DealAnalyticsProps {
  deals: Deal[];
}

const DealAnalytics: React.FC<DealAnalyticsProps> = ({ deals }) => {
  // Color palette for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  // Data preparation for stage distribution
  const stageData = [
    { name: "Lead", value: deals.filter(d => d.stage === "lead").length },
    { name: "Qualification", value: deals.filter(d => d.stage === "qualification").length },
    { name: "Proposal", value: deals.filter(d => d.stage === "proposal").length },
    { name: "Negotiation", value: deals.filter(d => d.stage === "negotiation").length },
    { name: "Closed Won", value: deals.filter(d => d.stage === "closed-won").length },
    { name: "Closed Lost", value: deals.filter(d => d.stage === "closed-lost").length },
  ].filter(item => item.value > 0);
  
  // Data preparation for value by stage
  const valueByStageData = [
    { name: "Lead", value: deals.filter(d => d.stage === "lead").reduce((sum, deal) => sum + deal.value, 0) },
    { name: "Qualification", value: deals.filter(d => d.stage === "qualification").reduce((sum, deal) => sum + deal.value, 0) },
    { name: "Proposal", value: deals.filter(d => d.stage === "proposal").reduce((sum, deal) => sum + deal.value, 0) },
    { name: "Negotiation", value: deals.filter(d => d.stage === "negotiation").reduce((sum, deal) => sum + deal.value, 0) },
    { name: "Closed Won", value: deals.filter(d => d.stage === "closed-won").reduce((sum, deal) => sum + deal.value, 0) },
  ].filter(item => item.value > 0);
  
  // Data preparation for win probability distribution
  const winProbabilityData = [
    { name: "0-20%", value: deals.filter(d => d.probability >= 0 && d.probability < 20).length },
    { name: "20-40%", value: deals.filter(d => d.probability >= 20 && d.probability < 40).length },
    { name: "40-60%", value: deals.filter(d => d.probability >= 40 && d.probability < 60).length },
    { name: "60-80%", value: deals.filter(d => d.probability >= 60 && d.probability < 80).length },
    { name: "80-100%", value: deals.filter(d => d.probability >= 80 && d.probability <= 100).length },
  ].filter(item => item.value > 0);

  // Helper function to format currency values in tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border p-2 rounded shadow-sm">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-muted-foreground">{`Value: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

  // Helper function for pie chart labels
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Calculate total pipeline value
  const totalPipelineValue = deals
    .filter(d => d.stage !== "closed-lost")
    .reduce((sum, deal) => sum + deal.value, 0);
  
  // Calculate weighted pipeline value (based on probabilities)
  const weightedPipelineValue = deals
    .filter(d => d.stage !== "closed-lost")
    .reduce((sum, deal) => sum + (deal.value * (deal.probability / 100)), 0);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Pipeline Analytics</span>
          <div className="flex gap-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Total Pipeline:</span>{" "}
              <span className="font-bold">{formatCurrency(totalPipelineValue)}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Weighted Pipeline:</span>{" "}
              <span className="font-bold">{formatCurrency(weightedPipelineValue)}</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stages">
          <TabsList className="mb-6">
            <TabsTrigger value="stages">Deal Stages</TabsTrigger>
            <TabsTrigger value="values">Deal Values</TabsTrigger>
            <TabsTrigger value="probability">Win Probability</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stages" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={140}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="values" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={valueByStageData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => formatCurrency(value, false)} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                  {valueByStageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="probability" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={winProbabilityData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" name="Number of Deals" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DealAnalytics;
