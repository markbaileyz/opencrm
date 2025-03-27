
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "Aug", actual: 3200, forecast: 3200 },
  { month: "Sep", actual: 3400, forecast: 3400 },
  { month: "Oct", actual: null, forecast: 3700 },
  { month: "Nov", actual: null, forecast: 4100 },
  { month: "Dec", actual: null, forecast: 4800 },
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-md shadow-sm">
        <p className="font-medium">{`${label}`}</p>
        {payload[0]?.value && (
          <p className="text-primary">{`Actual: $${payload[0].value.toLocaleString()}`}</p>
        )}
        <p className="text-blue-500">{`Forecast: $${payload[1]?.value?.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const SalesForecastReport = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Forecast</CardTitle>
        <CardDescription>Projected revenue for next 3 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#8884d8" 
                name="Actual" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#82ca9d" 
                name="Forecast" 
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesForecastReport;
