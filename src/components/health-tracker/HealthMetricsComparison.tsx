
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { useHealthData } from "@/hooks/health-tracker/useHealthData";

interface HealthMetricsComparisonProps {
  timeRange: string;
}

const HealthMetricsComparison: React.FC<HealthMetricsComparisonProps> = ({ timeRange }) => {
  const { vitalRecords } = useHealthData();
  
  // Calculate averages for the most recent records based on time range
  const calculateAverages = () => {
    if (!vitalRecords.length) return null;
    
    // Get baseline values (typically normal ranges)
    const baselineValues = {
      systolic: 120,
      diastolic: 80,
      heartRate: 72,
      temperature: 98.6,
      oxygenSaturation: 98,
      glucoseLevel: 99
    };
    
    // Filter recent records based on time range
    const recordsToUse = vitalRecords.slice(0, determineRecordCount());
    
    // Calculate averages
    const totals = recordsToUse.reduce((acc, record) => {
      return {
        systolic: acc.systolic + record.systolic,
        diastolic: acc.diastolic + record.diastolic,
        heartRate: acc.heartRate + record.heartRate,
        temperature: acc.temperature + (record.temperature || 0),
        oxygenSaturation: acc.oxygenSaturation + (record.oxygenSaturation || 0),
        glucoseLevel: acc.glucoseLevel + (record.glucoseLevel || 0),
      };
    }, {
      systolic: 0,
      diastolic: 0,
      heartRate: 0,
      temperature: 0,
      oxygenSaturation: 0,
      glucoseLevel: 0,
    });
    
    const count = recordsToUse.length;
    
    return {
      systolic: {
        name: "Systolic BP",
        average: Math.round(totals.systolic / count),
        baseline: baselineValues.systolic,
        unit: "mmHg",
        diff: Math.round((totals.systolic / count) - baselineValues.systolic)
      },
      diastolic: {
        name: "Diastolic BP",
        average: Math.round(totals.diastolic / count),
        baseline: baselineValues.diastolic,
        unit: "mmHg",
        diff: Math.round((totals.diastolic / count) - baselineValues.diastolic)
      },
      heartRate: {
        name: "Heart Rate",
        average: Math.round(totals.heartRate / count),
        baseline: baselineValues.heartRate,
        unit: "bpm",
        diff: Math.round((totals.heartRate / count) - baselineValues.heartRate)
      },
      temperature: {
        name: "Temperature",
        average: +(totals.temperature / count).toFixed(1),
        baseline: baselineValues.temperature,
        unit: "°F",
        diff: +(totals.temperature / count - baselineValues.temperature).toFixed(1)
      },
      oxygenSaturation: {
        name: "Oxygen",
        average: Math.round(totals.oxygenSaturation / count),
        baseline: baselineValues.oxygenSaturation,
        unit: "%",
        diff: Math.round((totals.oxygenSaturation / count) - baselineValues.oxygenSaturation)
      },
      glucoseLevel: {
        name: "Glucose",
        average: Math.round(totals.glucoseLevel / count),
        baseline: baselineValues.glucoseLevel,
        unit: "mg/dL",
        diff: Math.round((totals.glucoseLevel / count) - baselineValues.glucoseLevel)
      }
    };
  };
  
  // Determine how many recent records to include based on time range
  const determineRecordCount = () => {
    switch (timeRange) {
      case "day": return 1;
      case "week": return 7;
      case "month": return 30;
      case "quarter": return 90;
      case "year": return 365;
      default: return 7; // Default to week
    }
  };
  
  const averages = calculateAverages();
  
  // Prepare data for the bar chart
  const getBarChartData = () => {
    if (!averages) return [];
    
    return [
      {
        name: "Blood Pressure",
        actual: averages.systolic.average,
        baseline: averages.systolic.baseline,
        diff: averages.systolic.diff,
        unit: "mmHg"
      },
      {
        name: "Heart Rate",
        actual: averages.heartRate.average,
        baseline: averages.heartRate.baseline,
        diff: averages.heartRate.diff,
        unit: "bpm"
      },
      {
        name: "Temperature",
        actual: averages.temperature.average,
        baseline: averages.temperature.baseline,
        diff: averages.temperature.diff,
        unit: "°F"
      },
      {
        name: "Oxygen",
        actual: averages.oxygenSaturation.average,
        baseline: averages.oxygenSaturation.baseline,
        diff: averages.oxygenSaturation.diff,
        unit: "%"
      },
      {
        name: "Glucose",
        actual: averages.glucoseLevel.average,
        baseline: averages.glucoseLevel.baseline,
        diff: averages.glucoseLevel.diff,
        unit: "mg/dL"
      }
    ];
  };
  
  // Prepare data for difference chart
  const getDifferenceChartData = () => {
    if (!averages) return [];
    
    return [
      { name: "Systolic", value: averages.systolic.diff, fill: averages.systolic.diff > 0 ? "#ef4444" : "#10b981" },
      { name: "Diastolic", value: averages.diastolic.diff, fill: averages.diastolic.diff > 0 ? "#ef4444" : "#10b981" },
      { name: "Heart Rate", value: averages.heartRate.diff, fill: averages.heartRate.diff > 0 ? "#ef4444" : "#10b981" },
      { name: "Temperature", value: averages.temperature.diff, fill: averages.temperature.diff > 0 ? "#ef4444" : "#10b981" },
      { name: "Oxygen", value: averages.oxygenSaturation.diff, fill: averages.oxygenSaturation.diff < 0 ? "#ef4444" : "#10b981" },
      { name: "Glucose", value: averages.glucoseLevel.diff, fill: averages.glucoseLevel.diff > 0 ? "#ef4444" : "#10b981" }
    ];
  };
  
  const barChartData = getBarChartData();
  const diffChartData = getDifferenceChartData();
  
  const getTimeRangeText = () => {
    switch (timeRange) {
      case "day": return "24 hours";
      case "week": return "7 days";
      case "month": return "30 days";
      case "quarter": return "90 days";
      case "year": return "year";
      default: return "selected period";
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Health Metrics Analysis</CardTitle>
        <CardDescription>Comparing your metrics to baselines for the last {getTimeRangeText()}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="comparison" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="comparison">Metrics Comparison</TabsTrigger>
            <TabsTrigger value="differences">Differences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="comparison" className="h-80">
            {barChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    formatter={(value, name, props) => {
                      return [`${value} ${props.payload.unit}`, name === "actual" ? "Your Average" : "Baseline"];
                    }}
                    contentStyle={{ backgroundColor: "#ffffff", borderRadius: "6px", border: "1px solid #e5e7eb" }}
                  />
                  <Legend />
                  <Bar dataKey="actual" name="Your Average" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="baseline" name="Baseline" fill="#9ca3af" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No data available for the selected time range
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="differences" className="h-80">
            {diffChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={diffChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    formatter={(value) => [`${value > 0 ? '+' : ''}${value}`, "Difference from baseline"]}
                    contentStyle={{ backgroundColor: "#ffffff", borderRadius: "6px", border: "1px solid #e5e7eb" }}
                  />
                  <Legend />
                  <ReferenceLine y={0} stroke="#6b7280" />
                  <Bar dataKey="value" name="Difference from baseline" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No data available for the selected time range
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HealthMetricsComparison;
