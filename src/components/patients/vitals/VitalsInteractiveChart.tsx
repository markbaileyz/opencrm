
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Legend
} from "recharts";
import { VitalsChartData } from "@/hooks/useVitalsData";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

interface VitalSeries {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  normalRange?: { min: number; max: number };
}

interface VitalsInteractiveChartProps {
  data: VitalsChartData[];
  title: string;
  description?: string;
}

const VitalsInteractiveChart: React.FC<VitalsInteractiveChartProps> = ({
  data,
  title,
  description
}) => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  const [vitalSeries, setVitalSeries] = useState<VitalSeries[]>([
    { id: "heartRate", name: "Heart Rate", color: "#ef4444", visible: true, normalRange: { min: 60, max: 100 } },
    { id: "systolic", name: "Blood Pressure (Systolic)", color: "#3b82f6", visible: true, normalRange: { min: 90, max: 130 } },
    { id: "diastolic", name: "Blood Pressure (Diastolic)", color: "#8b5cf6", visible: true, normalRange: { min: 60, max: 85 } },
    { id: "temperature", name: "Temperature", color: "#f97316", visible: false, normalRange: { min: 97, max: 99 } },
    { id: "oxygenSaturation", name: "Oxygen Saturation", color: "#10b981", visible: false, normalRange: { min: 95, max: 100 } }
  ]);

  // Filter data based on selected time range
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const now = new Date();
    let cutoffDate = new Date();
    
    if (timeRange === "week") {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (timeRange === "month") {
      cutoffDate.setMonth(now.getMonth() - 1);
    } else {
      cutoffDate.setFullYear(now.getFullYear() - 1);
    }
    
    return data.filter(item => new Date(item.date) >= cutoffDate);
  }, [data, timeRange]);

  // Toggle vital series visibility
  const toggleSeriesVisibility = (seriesId: string) => {
    setVitalSeries(prev => 
      prev.map(series => 
        series.id === seriesId 
          ? { ...series, visible: !series.visible } 
          : series
      )
    );
  };

  // Calculate statistics for outlier detection
  const seriesStatistics = useMemo(() => {
    const stats: Record<string, { mean: number, stdDev: number }> = {};
    
    vitalSeries.forEach(series => {
      if (data && data.length > 0) {
        const values = data.map(item => (item as any)[series.id] || 0);
        const sum = values.reduce((acc, val) => acc + val, 0);
        const mean = sum / values.length;
        
        const squareDiffs = values.map(value => {
          const diff = value - mean;
          return diff * diff;
        });
        const avgSquareDiff = squareDiffs.reduce((acc, val) => acc + val, 0) / squareDiffs.length;
        const stdDev = Math.sqrt(avgSquareDiff);
        
        stats[series.id] = { mean, stdDev };
      } else {
        stats[series.id] = { mean: 0, stdDev: 0 };
      }
    });
    
    return stats;
  }, [data, vitalSeries]);

  // Check if a value is an outlier (more than 2 standard deviations from the mean)
  const isOutlier = (seriesId: string, value: number) => {
    const stats = seriesStatistics[seriesId];
    if (!stats) return false;
    return Math.abs(value - stats.mean) > stats.stdDev * 2;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chart">Graph</TabsTrigger>
            <TabsTrigger value="legends">Series</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart">
            {filteredData.length > 0 ? (
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: any, name: any, props: any) => {
                        // Find the series to get correct units
                        const series = vitalSeries.find(s => s.name === name);
                        if (!series) return [value, name];
                        
                        let unit = "";
                        switch (series.id) {
                          case "heartRate": unit = "bpm"; break;
                          case "systolic":
                          case "diastolic": unit = "mmHg"; break;
                          case "temperature": unit = "°F"; break;
                          case "oxygenSaturation": unit = "%"; break;
                          default: unit = "";
                        }
                        
                        return [`${value} ${unit}`, name];
                      }}
                    />
                    <Legend />
                    
                    {vitalSeries.map(series => {
                      if (!series.visible) return null;
                      
                      return (
                        <React.Fragment key={series.id}>
                          <Line 
                            type="monotone" 
                            dataKey={series.id} 
                            stroke={series.color}
                            name={series.name}
                            dot={(props) => {
                              if (!props.payload || props.payload[series.id] === undefined) return null;
                              
                              const value = props.payload[series.id];
                              const isValueOutlier = isOutlier(series.id, value);
                              
                              if (isValueOutlier) {
                                return (
                                  <svg x={props.cx - 6} y={props.cy - 6} width={12} height={12}>
                                    <circle cx="6" cy="6" r="6" fill={series.color} />
                                    <circle cx="6" cy="6" r="4" fill={series.color} stroke="white" strokeWidth="1" />
                                  </svg>
                                );
                              }
                              
                              return (
                                <circle cx={props.cx} cy={props.cy} r={3} fill={series.color} />
                              );
                            }}
                          />
                          
                          {series.normalRange && series.visible && (
                            <>
                              <ReferenceLine 
                                y={series.normalRange.max} 
                                stroke={series.color} 
                                strokeDasharray="3 3" 
                                strokeOpacity={0.5}
                              />
                              <ReferenceLine 
                                y={series.normalRange.min} 
                                stroke={series.color} 
                                strokeDasharray="3 3" 
                                strokeOpacity={0.5}
                              />
                            </>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">No data available</div>
            )}
            
            {filteredData.length > 0 && (
              <div className="mt-4">
                {vitalSeries.some(series => {
                  if (!series.visible) return false;
                  return filteredData.some(item => {
                    const value = (item as any)[series.id];
                    return value !== undefined && isOutlier(series.id, value);
                  });
                }) && (
                  <div className="flex items-center text-sm text-red-500">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>Outliers detected. These values deviate significantly from the patient's baseline.</span>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="legends">
            <div className="space-y-2">
              {vitalSeries.map(series => (
                <div key={series.id} className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: series.color }}
                    />
                    <span>{series.name}</span>
                  </div>
                  <button
                    onClick={() => toggleSeriesVisibility(series.id)}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {series.visible ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VitalsInteractiveChart;
