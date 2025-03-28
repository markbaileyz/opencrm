
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useHealthData } from "@/hooks/health-tracker/useHealthData";
import { format, parseISO, subDays } from "date-fns";

interface HealthTrendsChartProps {
  metricType: "bloodPressure" | "heartRate" | "temperature" | "oxygenSaturation" | "glucoseLevel";
  timeRange: string;
}

const HealthTrendsChart: React.FC<HealthTrendsChartProps> = ({ metricType, timeRange }) => {
  const { vitalRecords } = useHealthData();
  
  // Prepare data for chart based on the metric type
  const prepareChartData = () => {
    if (!vitalRecords.length) return [];
    
    // Sort records by date (newest first)
    const sortedRecords = [...vitalRecords].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Filter records based on time range
    const filteredRecords = sortedRecords.filter(record => {
      const recordDate = new Date(record.date);
      const now = new Date();
      
      switch (timeRange) {
        case "day":
          return recordDate >= subDays(now, 1);
        case "week":
          return recordDate >= subDays(now, 7);
        case "month":
          return recordDate >= subDays(now, 30);
        case "quarter":
          return recordDate >= subDays(now, 90);
        case "year":
          return recordDate >= subDays(now, 365);
        default:
          return true;
      }
    });

    // Transform data for chart
    return filteredRecords.map(record => {
      let value1, value2;
      
      switch (metricType) {
        case "bloodPressure":
          value1 = record.systolic;
          value2 = record.diastolic;
          break;
        case "heartRate":
          value1 = record.heartRate;
          break;
        case "temperature":
          value1 = record.temperature;
          break;
        case "oxygenSaturation":
          value1 = record.oxygenSaturation;
          break;
        case "glucoseLevel":
          value1 = record.glucoseLevel;
          break;
        default:
          value1 = 0;
      }
      
      return {
        date: format(parseISO(record.date), "MMM dd"),
        value1,
        value2
      };
    }).reverse(); // Reverse to show oldest to newest
  };

  const chartData = prepareChartData();
  
  // Get correct labels and colors based on metric type
  const getChartConfig = () => {
    switch (metricType) {
      case "bloodPressure":
        return {
          title: "Blood Pressure Trends",
          description: "Systolic and diastolic pressure over time",
          yAxisLabel: "mmHg",
          line1Color: "#ef4444",
          line1Name: "Systolic",
          line2Color: "#3b82f6",
          line2Name: "Diastolic",
          showSecondLine: true
        };
      case "heartRate":
        return {
          title: "Heart Rate Trends",
          description: "Beats per minute over time",
          yAxisLabel: "BPM",
          line1Color: "#ef4444",
          line1Name: "Heart Rate",
          showSecondLine: false
        };
      case "temperature":
        return {
          title: "Temperature Trends",
          description: "Body temperature over time",
          yAxisLabel: "°F",
          line1Color: "#f97316",
          line1Name: "Temperature",
          showSecondLine: false
        };
      case "oxygenSaturation":
        return {
          title: "Oxygen Saturation Trends",
          description: "SpO2 percentage over time",
          yAxisLabel: "%",
          line1Color: "#06b6d4",
          line1Name: "Oxygen",
          showSecondLine: false
        };
      case "glucoseLevel":
        return {
          title: "Glucose Level Trends",
          description: "Blood glucose over time",
          yAxisLabel: "mg/dL",
          line1Color: "#8b5cf6",
          line1Name: "Glucose",
          showSecondLine: false
        };
      default:
        return {
          title: "Health Metric Trends",
          description: "Health metrics over time",
          yAxisLabel: "Value",
          line1Color: "#3b82f6",
          line1Name: "Metric",
          showSecondLine: false
        };
    }
  };
  
  const config = getChartConfig();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis 
                  stroke="#6b7280"
                  label={{ 
                    value: config.yAxisLabel, 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#ffffff", borderRadius: "6px", border: "1px solid #e5e7eb" }}
                  formatter={(value: any) => [value, config.line1Name]}
                />
                <Legend verticalAlign="bottom" height={36} />
                <Line
                  type="monotone"
                  dataKey="value1"
                  name={config.line1Name}
                  stroke={config.line1Color}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                {config.showSecondLine && (
                  <Line
                    type="monotone"
                    dataKey="value2"
                    name={config.line2Name}
                    stroke={config.line2Color}
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-80 text-muted-foreground">
            No data available for the selected time range
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthTrendsChart;
