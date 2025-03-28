
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface TopWorkflow {
  name: string;
  count: number;
  successCount: number;
  branchCount: number;
  avgBranchesPerExecution: number;
  successRate: number;
}

interface TopWorkflowsChartProps {
  topWorkflows: TopWorkflow[];
}

const TopWorkflowsChart: React.FC<TopWorkflowsChartProps> = ({ topWorkflows }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Workflows</CardTitle>
        <CardDescription>Most frequently executed workflows</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topWorkflows}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "successRate") return [`${Number(value).toFixed(1)}%`, 'Success Rate'];
                  return [`${value} executions`, name === "count" ? 'Total' : 'Successful'];
                }}
              />
              <Bar dataKey="count" fill="#8884d8" name="Total Executions" />
              <Bar dataKey="successCount" fill="#82ca9d" name="Successful" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopWorkflowsChart;
