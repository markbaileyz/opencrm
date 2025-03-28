
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useHealthData } from "@/hooks/health-tracker/useHealthData";
import { format, parseISO, subDays } from "date-fns";

interface HealthMetricsComparisonProps {
  timeRange: string;
}

type ComparisonData = {
  name: string;
  current: number;
  previous: number;
};

const HealthMetricsComparison: React.FC<HealthMetricsComparisonProps> = ({ timeRange }) => {
  const { vitalRecords, nutritionRecords } = useHealthData();
  
  // Helper function to filter records based on timeRange
  const filterRecordsByTimeRange = (records: any[], dateField: string = 'date') => {
    if (!records.length) return [];
    
    const now = new Date();
    let daysToSubtract = 7; // default to week
    
    switch (timeRange) {
      case "day":
        daysToSubtract = 1;
        break;
      case "week":
        daysToSubtract = 7;
        break;
      case "month":
        daysToSubtract = 30;
        break;
      case "quarter":
        daysToSubtract = 90;
        break;
      case "year":
        daysToSubtract = 365;
        break;
    }
    
    return records.filter(record => {
      const recordDate = new Date(record[dateField]);
      return recordDate >= subDays(now, daysToSubtract);
    });
  };
  
  // Calculate average metrics for the current period
  const calculateCurrentMetrics = () => {
    const filteredVitals = filterRecordsByTimeRange(vitalRecords);
    const filteredNutrition = filterRecordsByTimeRange(nutritionRecords);
    
    if (!filteredVitals.length) return null;
    
    // Vital metrics
    const avgSystolic = filteredVitals.reduce((sum, record) => sum + record.systolic, 0) / filteredVitals.length;
    const avgDiastolic = filteredVitals.reduce((sum, record) => sum + record.diastolic, 0) / filteredVitals.length;
    const avgHeartRate = filteredVitals.reduce((sum, record) => sum + record.heartRate, 0) / filteredVitals.length;
    const avgTemperature = filteredVitals.reduce((sum, record) => sum + (record.temperature || 0), 0) / filteredVitals.length;
    const avgOxygen = filteredVitals.reduce((sum, record) => sum + (record.oxygenSaturation || 0), 0) / filteredVitals.length;
    
    // Nutrition metrics
    const avgCalories = filteredNutrition.length > 0 
      ? filteredNutrition.reduce((sum, record) => sum + record.calories, 0) / filteredNutrition.length
      : 0;
    const avgProtein = filteredNutrition.length > 0 
      ? filteredNutrition.reduce((sum, record) => sum + record.protein, 0) / filteredNutrition.length
      : 0;
    
    return {
      systolic: avgSystolic,
      diastolic: avgDiastolic,
      heartRate: avgHeartRate,
      temperature: avgTemperature,
      oxygenSaturation: avgOxygen,
      calories: avgCalories,
      protein: avgProtein
    };
  };
  
  // Calculate metrics for the previous period
  const calculatePreviousMetrics = () => {
    const now = new Date();
    let daysToSubtract = 7; // default to week
    
    switch (timeRange) {
      case "day":
        daysToSubtract = 1;
        break;
      case "week":
        daysToSubtract = 7;
        break;
      case "month":
        daysToSubtract = 30;
        break;
      case "quarter":
        daysToSubtract = 90;
        break;
      case "year":
        daysToSubtract = 365;
        break;
    }
    
    const previousStart = subDays(now, daysToSubtract * 2);
    const previousEnd = subDays(now, daysToSubtract);
    
    const previousVitals = vitalRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= previousStart && recordDate < previousEnd;
    });
    
    const previousNutrition = nutritionRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= previousStart && recordDate < previousEnd;
    });
    
    if (!previousVitals.length) return null;
    
    // Vital metrics
    const avgSystolic = previousVitals.reduce((sum, record) => sum + record.systolic, 0) / previousVitals.length;
    const avgDiastolic = previousVitals.reduce((sum, record) => sum + record.diastolic, 0) / previousVitals.length;
    const avgHeartRate = previousVitals.reduce((sum, record) => sum + record.heartRate, 0) / previousVitals.length;
    const avgTemperature = previousVitals.reduce((sum, record) => sum + (record.temperature || 0), 0) / previousVitals.length;
    const avgOxygen = previousVitals.reduce((sum, record) => sum + (record.oxygenSaturation || 0), 0) / previousVitals.length;
    
    // Nutrition metrics
    const avgCalories = previousNutrition.length > 0 
      ? previousNutrition.reduce((sum, record) => sum + record.calories, 0) / previousNutrition.length
      : 0;
    const avgProtein = previousNutrition.length > 0 
      ? previousNutrition.reduce((sum, record) => sum + record.protein, 0) / previousNutrition.length
      : 0;
    
    return {
      systolic: avgSystolic,
      diastolic: avgDiastolic,
      heartRate: avgHeartRate,
      temperature: avgTemperature,
      oxygenSaturation: avgOxygen,
      calories: avgCalories,
      protein: avgProtein
    };
  };
  
  // Prepare data for the chart
  const prepareComparisonData = () => {
    const currentMetrics = calculateCurrentMetrics();
    const previousMetrics = calculatePreviousMetrics();
    
    if (!currentMetrics || !previousMetrics) {
      return [];
    }
    
    const data: ComparisonData[] = [
      {
        name: "Systolic BP",
        current: Math.round(currentMetrics.systolic),
        previous: Math.round(previousMetrics.systolic)
      },
      {
        name: "Diastolic BP",
        current: Math.round(currentMetrics.diastolic),
        previous: Math.round(previousMetrics.diastolic)
      },
      {
        name: "Heart Rate",
        current: Math.round(currentMetrics.heartRate),
        previous: Math.round(previousMetrics.heartRate)
      },
      {
        name: "Temperature",
        current: Number(currentMetrics.temperature.toFixed(1)),
        previous: Number(previousMetrics.temperature.toFixed(1))
      },
      {
        name: "O₂ Sat",
        current: Math.round(currentMetrics.oxygenSaturation),
        previous: Math.round(previousMetrics.oxygenSaturation)
      }
    ];
    
    return data;
  };
  
  const comparisonData = prepareComparisonData();
  
  const formatTimeRange = () => {
    switch (timeRange) {
      case "day":
        return "Today vs Yesterday";
      case "week":
        return "This Week vs Last Week";
      case "month":
        return "This Month vs Last Month";
      case "quarter":
        return "This Quarter vs Last Quarter";
      case "year":
        return "This Year vs Last Year";
      default:
        return "Current vs Previous";
    }
  };
  
  const getChangeLabel = (current: number, previous: number) => {
    if (previous === 0) return "+100%";
    const percentChange = ((current - previous) / previous) * 100;
    return percentChange > 0 ? `+${percentChange.toFixed(1)}%` : `${percentChange.toFixed(1)}%`;
  };
  
  const isImprovement = (metric: string, current: number, previous: number) => {
    // For blood pressure and heart rate, lower is generally better
    if (metric.includes("BP") || metric === "Heart Rate") {
      return current < previous;
    }
    // For oxygen saturation, higher is better (up to a point)
    else if (metric === "O₂ Sat") {
      return current > previous && current <= 100;
    }
    // For temperature, closer to 98.6°F is better
    else if (metric === "Temperature") {
      const normalTemp = 98.6;
      return Math.abs(current - normalTemp) < Math.abs(previous - normalTemp);
    }
    // For other metrics, assume higher is better
    return current > previous;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Health Metrics Comparison</CardTitle>
        <CardDescription>{formatTimeRange()}</CardDescription>
      </CardHeader>
      <CardContent>
        {comparisonData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  formatter={(value: any) => [value, ""]}
                  contentStyle={{ backgroundColor: "#ffffff", borderRadius: "6px", border: "1px solid #e5e7eb" }}
                />
                <Legend />
                <Bar 
                  dataKey="current" 
                  name="Current" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                  label={(props) => {
                    const { x, y, width, value, index } = props;
                    const previousValue = comparisonData[index].previous;
                    
                    // Type assertion to make TypeScript happy
                    const typedValue = value as number;
                    const typedPreviousValue = previousValue as number;
                    
                    // Only show labels if there's a significant difference
                    if (Math.abs(typedValue - typedPreviousValue) / typedPreviousValue < 0.02) {
                      return null;
                    }
                    
                    const isPositive = isImprovement(comparisonData[index].name, typedValue, typedPreviousValue);
                    
                    return (
                      <text 
                        x={x + width / 2} 
                        y={y - 10} 
                        fill={isPositive ? "#10b981" : "#ef4444"} 
                        textAnchor="middle" 
                        fontSize={12}
                      >
                        {getChangeLabel(typedValue, typedPreviousValue)}
                      </text>
                    );
                  }}
                />
                <Bar 
                  dataKey="previous" 
                  name="Previous" 
                  fill="#94a3b8" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-80 text-muted-foreground">
            Not enough data available for comparison
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthMetricsComparison;
