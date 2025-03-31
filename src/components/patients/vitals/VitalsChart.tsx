
import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Dot } from "recharts";
import { AlertCircle } from "lucide-react";
import { VitalsChartData } from "@/hooks/useVitalsData";

interface VitalsChartProps {
  data: VitalsChartData[];
  vitalType: "bloodPressure" | "heartRate" | "temperature" | "oxygenSaturation" | "weight";
  title: string;
  description?: string;
  unit: string;
  normalRange?: { min: number; max: number };
}

const VitalsChart: React.FC<VitalsChartProps> = ({
  data,
  vitalType,
  title,
  description,
  unit,
  normalRange
}) => {
  // Calculate statistics for outlier detection
  const statistics = useMemo(() => {
    if (!data || data.length === 0) return { mean: 0, stdDev: 0 };
    
    let values: number[] = [];
    
    if (vitalType === "bloodPressure") {
      // For blood pressure, we'll use systolic values
      values = data.map(item => item.systolic);
    } else {
      values = data.map(item => item[vitalType]);
    }
    
    // Calculate mean
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = sum / values.length;
    
    // Calculate standard deviation
    const squareDiffs = values.map(value => {
      const diff = value - mean;
      return diff * diff;
    });
    const avgSquareDiff = squareDiffs.reduce((acc, val) => acc + val, 0) / squareDiffs.length;
    const stdDev = Math.sqrt(avgSquareDiff);
    
    return { mean, stdDev };
  }, [data, vitalType]);
  
  // Define what counts as an outlier (2 standard deviations from the mean)
  const isOutlier = (value: number) => {
    return Math.abs(value - statistics.mean) > statistics.stdDev * 2;
  };
  
  // Custom dot to highlight outliers
  const CustomizedDot = (props: any) => {
    const { cx, cy, value, dataKey } = props;
    
    // Skip if the dot position isn't defined
    if (!cx || !cy) return null;
    
    // Check if this value is an outlier
    const isValueOutlier = isOutlier(value);
    
    if (isValueOutlier) {
      return (
        <g>
          <circle cx={cx} cy={cy} r={6} fill="#ef4444" />
          <circle cx={cx} cy={cy} r={4} fill="#ef4444" stroke="white" strokeWidth={1} />
        </g>
      );
    }
    
    return <circle cx={cx} cy={cy} r={3} fill="#8884d8" />;
  };
  
  // Generate appropriate chart based on vital type
  const renderChart = () => {
    if (vitalType === "bloodPressure") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value: number, name: string) => [
                `${value} mmHg`, 
                name === "systolic" ? "Systolic" : "Diastolic"
              ]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            {normalRange && (
              <>
                <ReferenceLine y={normalRange.max} stroke="#ef4444" strokeDasharray="3 3" />
                <ReferenceLine y={normalRange.min} stroke="#ef4444" strokeDasharray="3 3" />
              </>
            )}
            <Line 
              type="monotone" 
              dataKey="systolic" 
              stroke="#8884d8" 
              name="Systolic" 
              dot={<CustomizedDot />} 
            />
            <Line 
              type="monotone" 
              dataKey="diastolic" 
              stroke="#82ca9d" 
              name="Diastolic" 
              dot={<CustomizedDot />} 
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }
    
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [`${value} ${unit}`, title]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          {normalRange && (
            <>
              <ReferenceLine y={normalRange.max} stroke="#ef4444" strokeDasharray="3 3" />
              <ReferenceLine y={normalRange.min} stroke="#ef4444" strokeDasharray="3 3" />
            </>
          )}
          <Line 
            type="monotone" 
            dataKey={vitalType} 
            stroke="#8884d8" 
            dot={<CustomizedDot />} 
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          <>
            {renderChart()}
            {normalRange && (
              <div className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium">Normal range:</span> {normalRange.min} - {normalRange.max} {unit}
              </div>
            )}
            {data.some(item => {
              if (vitalType === "bloodPressure") {
                return isOutlier(item.systolic) || isOutlier(item.diastolic);
              }
              return isOutlier(item[vitalType]);
            }) && (
              <div className="mt-2 flex items-center text-sm text-red-500">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>Outliers detected. These values deviate significantly from the patient's baseline.</span>
              </div>
            )}
          </>
        ) : (
          <div className="py-8 text-center text-muted-foreground">No data available</div>
        )}
      </CardContent>
    </Card>
  );
};

export default VitalsChart;
