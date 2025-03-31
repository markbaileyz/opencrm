
import React, { useState, useMemo, useRef, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  ReferenceArea,
  Brush
} from "recharts";
import { VitalsChartData } from "@/hooks/useVitalsData";
import { 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ZoomIn, 
  ZoomOut, 
  RefreshCw,
  Calendar,
  Plus,
  Minus,
  Check,
  X
} from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { format, subDays, subMonths, subYears, parseISO } from "date-fns";

interface VitalSeries {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  normalRange?: { min: number; max: number };
  unit: string;
  axis?: "left" | "right";
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
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year" | "custom">("week");
  const [customStartIndex, setCustomStartIndex] = useState<number | null>(null);
  const [customEndIndex, setCustomEndIndex] = useState<number | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const [vitalSeries, setVitalSeries] = useState<VitalSeries[]>([
    { id: "heartRate", name: "Heart Rate", color: "#ef4444", visible: true, normalRange: { min: 60, max: 100 }, unit: "bpm", axis: "left" },
    { id: "systolic", name: "Blood Pressure (Systolic)", color: "#3b82f6", visible: true, normalRange: { min: 90, max: 130 }, unit: "mmHg", axis: "left" },
    { id: "diastolic", name: "Blood Pressure (Diastolic)", color: "#8b5cf6", visible: false, normalRange: { min: 60, max: 85 }, unit: "mmHg", axis: "left" },
    { id: "temperature", name: "Temperature", color: "#f97316", visible: false, normalRange: { min: 97, max: 99 }, unit: "°F", axis: "right" },
    { id: "oxygenSaturation", name: "Oxygen Saturation", color: "#10b981", visible: false, normalRange: { min: 95, max: 100 }, unit: "%", axis: "right" }
  ]);

  const [showReferenceLine, setShowReferenceLine] = useState(true);
  const [yAxisDomain, setYAxisDomain] = useState<[number, number] | "auto">("auto");
  const [comparisonMode, setComparisonMode] = useState<"overlay" | "stack" | "separate">("overlay");
  const chartRef = useRef<any>(null);

  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const now = new Date();
    let cutoffDate = new Date();
    
    if (timeRange === "week") {
      cutoffDate = subDays(now, 7);
    } else if (timeRange === "month") {
      cutoffDate = subMonths(now, 1);
    } else if (timeRange === "year") {
      cutoffDate = subYears(now, 1);
    } else if (timeRange === "custom" && customStartIndex !== null && customEndIndex !== null) {
      return data.slice(Math.min(customStartIndex, customEndIndex), Math.max(customStartIndex, customEndIndex) + 1);
    }
    
    return data.filter(item => new Date(item.date) >= cutoffDate);
  }, [data, timeRange, customStartIndex, customEndIndex]);

  const toggleSeriesVisibility = (seriesId: string) => {
    setVitalSeries(prev => 
      prev.map(series => 
        series.id === seriesId 
          ? { ...series, visible: !series.visible } 
          : series
      )
    );
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };
  
  const handleResetZoom = () => {
    setZoomLevel(1);
    setCustomStartIndex(null);
    setCustomEndIndex(null);
    setTimeRange("week");
  };

  const handleMouseDown = (e: any) => {
    if (timeRange !== "custom") return;
    setIsSelecting(true);
    setCustomStartIndex(e.activeTooltipIndex);
  };

  const handleMouseMove = (e: any) => {
    if (!isSelecting || !e.activeTooltipIndex || timeRange !== "custom") return;
    setCustomEndIndex(e.activeTooltipIndex);
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    if (customStartIndex !== null && customEndIndex !== null) {
      // Perform any additional actions needed when selection is complete
    } else {
      setCustomStartIndex(null);
      setCustomEndIndex(null);
    }
  };

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

  const isOutlier = (seriesId: string, value: number) => {
    const stats = seriesStatistics[seriesId];
    if (!stats) return false;
    return Math.abs(value - stats.mean) > stats.stdDev * 2;
  };

  const visibleSeries = useMemo(() => {
    return vitalSeries.filter(series => series.visible);
  }, [vitalSeries]);

  const yDomains = useMemo(() => {
    if (yAxisDomain !== "auto" || !visibleSeries.length) {
      return { left: yAxisDomain, right: yAxisDomain };
    }

    const leftSeries = visibleSeries.filter(s => s.axis === "left");
    const rightSeries = visibleSeries.filter(s => s.axis === "right");
    
    const getMinMax = (seriesList: VitalSeries[]) => {
      if (!seriesList.length) return [0, 100] as [number, number];
      
      let min = Number.MAX_VALUE;
      let max = Number.MIN_VALUE;
      
      seriesList.forEach(series => {
        filteredData.forEach(item => {
          const value = (item as any)[series.id];
          if (value !== undefined) {
            min = Math.min(min, value);
            max = Math.max(max, value);
          }
        });
        
        if (series.normalRange) {
          min = Math.min(min, series.normalRange.min);
          max = Math.max(max, series.normalRange.max);
        }
      });
      
      const padding = (max - min) * 0.1;
      return [Math.max(0, min - padding), max + padding] as [number, number];
    };
    
    return {
      left: leftSeries.length ? getMinMax(leftSeries) : [0, 100],
      right: rightSeries.length ? getMinMax(rightSeries) : [0, 100]
    };
  }, [filteredData, visibleSeries, yAxisDomain]);

  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center space-x-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={zoomLevel <= 1}>
                      <Minus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Zoom Out</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleZoomIn}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Zoom In</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleResetZoom}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset View</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {vitalSeries.map(series => (
            <Badge
              key={series.id}
              variant={series.visible ? "default" : "outline"}
              className="cursor-pointer"
              style={{ backgroundColor: series.visible ? series.color : undefined }}
              onClick={() => toggleSeriesVisibility(series.id)}
            >
              {series.name}
              {series.visible ? (
                <Eye className="ml-1 h-3 w-3" />
              ) : (
                <EyeOff className="ml-1 h-3 w-3" />
              )}
            </Badge>
          ))}
        </div>
        
        {timeRange === "custom" && (
          <div className="mt-3 text-xs text-muted-foreground">
            {customStartIndex !== null && customEndIndex !== null ? (
              <>Custom range selected. <Button variant="link" size="sm" className="h-auto p-0" onClick={handleResetZoom}>Reset</Button></>
            ) : (
              "Click and drag on the chart to select a custom date range"
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chart">Graph</TabsTrigger>
            <TabsTrigger value="series">Customize</TabsTrigger>
            <TabsTrigger value="data">Data Table</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart">
            {filteredData.length > 0 ? (
              <div 
                className="h-[400px] w-full" 
                style={{ transform: zoomLevel > 1 ? `scale(${zoomLevel})` : undefined, transformOrigin: 'center' }}
                onMouseLeave={() => {
                  if (isSelecting) {
                    setIsSelecting(false);
                    if (!customEndIndex) {
                      setCustomStartIndex(null);
                    }
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={filteredData} 
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    ref={chartRef}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis 
                      yAxisId="left" 
                      orientation="left" 
                      domain={yDomains.left} 
                      label={{ value: 'Left Axis', angle: -90, position: 'insideLeft' }} 
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      domain={yDomains.right} 
                      label={{ value: 'Right Axis', angle: 90, position: 'insideRight' }} 
                    />
                    <RechartsTooltip 
                      formatter={(value: any, name: any, props: any) => {
                        const series = vitalSeries.find(s => s.name === name);
                        if (!series) return [value, name];
                        return [`${value} ${series.unit}`, name];
                      }}
                    />
                    <Legend />
                    <Brush 
                      dataKey="date" 
                      height={30} 
                      stroke="#8884d8"
                      startIndex={filteredData.length > 10 ? filteredData.length - 10 : 0}
                    />
                    
                    {isSelecting && customStartIndex !== null && customEndIndex !== null && (
                      <ReferenceArea 
                        x1={filteredData[customStartIndex]?.date} 
                        x2={filteredData[customEndIndex]?.date} 
                        strokeOpacity={0.3}
                        fill="#8884d8"
                        fillOpacity={0.3} 
                      />
                    )}
                    
                    {vitalSeries.map(series => {
                      if (!series.visible) return null;
                      
                      return (
                        <React.Fragment key={series.id}>
                          <Line 
                            type="monotone" 
                            dataKey={series.id} 
                            stroke={series.color}
                            name={series.name}
                            yAxisId={series.axis || "left"}
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
                            activeDot={{ r: 5, strokeWidth: 1, stroke: "#fff" }}
                          />
                          
                          {showReferenceLine && series.normalRange && series.visible && (
                            <>
                              <ReferenceLine 
                                y={series.normalRange.max} 
                                stroke={series.color} 
                                strokeDasharray="3 3" 
                                strokeOpacity={0.5}
                                yAxisId={series.axis || "left"}
                              />
                              <ReferenceLine 
                                y={series.normalRange.min} 
                                stroke={series.color} 
                                strokeDasharray="3 3" 
                                strokeOpacity={0.5}
                                yAxisId={series.axis || "left"}
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
          
          <TabsContent value="series">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Series Visibility</h3>
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
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground mr-2">{series.unit}</span>
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
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Chart Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="showReferenceLines" 
                        checked={showReferenceLine}
                        onCheckedChange={(checked) => setShowReferenceLine(!!checked)}
                      />
                      <label 
                        htmlFor="showReferenceLines" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Show Normal Range Lines
                      </label>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-medium mb-1">Comparison Mode</h4>
                      <Select value={comparisonMode} onValueChange={(value) => setComparisonMode(value as any)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select comparison mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="overlay">Overlay</SelectItem>
                          <SelectItem value="stack">Stacked</SelectItem>
                          <SelectItem value="separate">Separate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="data">
            <div className="rounded-md border overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                    {vitalSeries.filter(s => s.visible).map(series => (
                      <th 
                        key={series.id} 
                        scope="col" 
                        className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                        style={{ color: series.color }}
                      >
                        {series.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-gray-200">
                  {filteredData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-muted/50">
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        {item.date}
                      </td>
                      {vitalSeries.filter(s => s.visible).map(series => {
                        const value = (item as any)[series.id];
                        const isOutlierValue = value !== undefined && isOutlier(series.id, value);
                        return (
                          <td 
                            key={series.id} 
                            className={`px-4 py-2 whitespace-nowrap text-sm ${isOutlierValue ? 'font-bold' : ''}`}
                          >
                            {value !== undefined ? (
                              <>
                                {value} {series.unit}
                                {isOutlierValue && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger className="ml-1">
                                        <AlertCircle className="inline h-3 w-3 text-red-500" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Outlier value</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VitalsInteractiveChart;
