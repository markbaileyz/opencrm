
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Info, AlertTriangle } from "lucide-react";

// Sample data - in a real app this would come from an API or database
const generateSampleData = (days: number, vitalType: string) => {
  const data = [];
  const now = new Date();
  
  // Base values for different vitals
  const baseValues = {
    bloodPressure: { systolic: 120, diastolic: 80, variance: 10 },
    heartRate: { value: 75, variance: 8 },
    temperature: { value: 98.6, variance: 0.4 },
    oxygenSaturation: { value: 98, variance: 2 },
    bloodSugar: { value: 100, variance: 15 }
  };
  
  // Create some abnormal readings
  const abnormalIndices = [Math.floor(days * 0.3), Math.floor(days * 0.7)];
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    const isAbnormal = abnormalIndices.includes(i);
    
    let entry: any = {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      timestamp: date.toISOString(),
    };
    
    // Add different values based on vital type
    switch (vitalType) {
      case 'bloodPressure':
        const systolicVariance = isAbnormal ? 25 : baseValues.bloodPressure.variance;
        const diastolicVariance = isAbnormal ? 15 : baseValues.bloodPressure.variance;
        
        entry.systolic = baseValues.bloodPressure.systolic + 
          (Math.random() * 2 - 1) * systolicVariance + 
          (isAbnormal ? 15 : 0);
        
        entry.diastolic = baseValues.bloodPressure.diastolic + 
          (Math.random() * 2 - 1) * diastolicVariance + 
          (isAbnormal ? 10 : 0);
        
        entry.isAbnormal = isAbnormal || 
          entry.systolic > 140 || entry.systolic < 100 || 
          entry.diastolic > 90 || entry.diastolic < 60;
        break;
        
      case 'heartRate':
        const hrVariance = isAbnormal ? 25 : baseValues.heartRate.variance;
        entry.value = baseValues.heartRate.value + 
          (Math.random() * 2 - 1) * hrVariance + 
          (isAbnormal ? 20 : 0);
        entry.isAbnormal = isAbnormal || entry.value > 100 || entry.value < 50;
        break;
        
      case 'temperature':
        const tempVariance = isAbnormal ? 1.5 : baseValues.temperature.variance;
        entry.value = baseValues.temperature.value + 
          (Math.random() * 2 - 1) * tempVariance + 
          (isAbnormal ? 1.2 : 0);
        entry.isAbnormal = isAbnormal || entry.value > 99.5 || entry.value < 97.7;
        break;
        
      case 'oxygenSaturation':
        const o2Variance = isAbnormal ? 8 : baseValues.oxygenSaturation.variance;
        entry.value = baseValues.oxygenSaturation.value + 
          (Math.random() * 2 - 1) * o2Variance - 
          (isAbnormal ? 6 : 0); // Abnormal is lower for O2
        entry.isAbnormal = isAbnormal || entry.value < 92;
        break;
        
      case 'bloodSugar':
        const bsVariance = isAbnormal ? 50 : baseValues.bloodSugar.variance;
        entry.value = baseValues.bloodSugar.value + 
          (Math.random() * 2 - 1) * bsVariance + 
          (isAbnormal ? 70 : 0);
        entry.isAbnormal = isAbnormal || entry.value > 140 || entry.value < 70;
        break;
    }
    
    data.push(entry);
  }
  
  return data;
};

interface VitalsHistoryChartProps {
  patientId?: string;
  initialVitalType?: string;
  className?: string;
}

const VitalsHistoryChart: React.FC<VitalsHistoryChartProps> = ({ 
  patientId, 
  initialVitalType = "bloodPressure",
  className = ""
}) => {
  const [vitalType, setVitalType] = useState(initialVitalType);
  const [timeRange, setTimeRange] = useState("30");
  const [data, setData] = useState<any[]>([]);
  const [anomalies, setAnomalies] = useState<any[]>([]);
  const [statistics, setStatistics] = useState<any>({});
  
  // Load data when vitalType or timeRange changes
  useEffect(() => {
    // In a real app, this would be an API call using the patientId, vitalType, and timeRange
    const newData = generateSampleData(parseInt(timeRange), vitalType);
    setData(newData);
    
    // Find anomalies
    const anomalyPoints = newData.filter(point => point.isAbnormal);
    setAnomalies(anomalyPoints);
    
    // Calculate statistics
    if (vitalType === 'bloodPressure') {
      const systolicValues = newData.map(d => d.systolic);
      const diastolicValues = newData.map(d => d.diastolic);
      
      setStatistics({
        systolic: {
          avg: Number((systolicValues.reduce((a, b) => a + b, 0) / systolicValues.length).toFixed(1)),
          min: Math.min(...systolicValues).toFixed(1),
          max: Math.max(...systolicValues).toFixed(1)
        },
        diastolic: {
          avg: Number((diastolicValues.reduce((a, b) => a + b, 0) / diastolicValues.length).toFixed(1)),
          min: Math.min(...diastolicValues).toFixed(1),
          max: Math.max(...diastolicValues).toFixed(1)
        }
      });
    } else {
      const values = newData.map(d => d.value);
      
      setStatistics({
        avg: Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)),
        min: Math.min(...values).toFixed(1),
        max: Math.max(...values).toFixed(1)
      });
    }
  }, [vitalType, timeRange, patientId]);
  
  const getVitalLabel = () => {
    switch (vitalType) {
      case 'bloodPressure': return 'Blood Pressure';
      case 'heartRate': return 'Heart Rate';
      case 'temperature': return 'Temperature';
      case 'oxygenSaturation': return 'Oxygen Saturation';
      case 'bloodSugar': return 'Blood Sugar';
      default: return 'Vital Sign';
    }
  };
  
  const getVitalUnit = () => {
    switch (vitalType) {
      case 'bloodPressure': return 'mmHg';
      case 'heartRate': return 'bpm';
      case 'temperature': return '°F';
      case 'oxygenSaturation': return '%';
      case 'bloodSugar': return 'mg/dL';
      default: return '';
    }
  };
  
  const getNormalRange = () => {
    switch (vitalType) {
      case 'bloodPressure': return 'Systolic: 100-140 mmHg, Diastolic: 60-90 mmHg';
      case 'heartRate': return '60-100 bpm';
      case 'temperature': return '97.7-99.5 °F';
      case 'oxygenSaturation': return '95-100%';
      case 'bloodSugar': return 'Fasting: 70-100 mg/dL';
      default: return '';
    }
  };
  
  const getYAxisDomain = () => {
    switch (vitalType) {
      case 'bloodPressure': return [40, 180];
      case 'heartRate': return [40, 140];
      case 'temperature': return [96, 103];
      case 'oxygenSaturation': return [80, 100];
      case 'bloodSugar': return [40, 240];
      default: return ['auto', 'auto'];
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Patient Vitals History</CardTitle>
            <CardDescription>Historical tracking and trends analysis</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={vitalType} onValueChange={setVitalType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select vital sign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bloodPressure">Blood Pressure</SelectItem>
                <SelectItem value="heartRate">Heart Rate</SelectItem>
                <SelectItem value="temperature">Temperature</SelectItem>
                <SelectItem value="oxygenSaturation">Oxygen Saturation</SelectItem>
                <SelectItem value="bloodSugar">Blood Sugar</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 Days</SelectItem>
                <SelectItem value="14">14 Days</SelectItem>
                <SelectItem value="30">30 Days</SelectItem>
                <SelectItem value="90">90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {anomalies.length > 0 && (
            <Alert variant="warning" className="bg-yellow-50 dark:bg-yellow-950/30">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {anomalies.length} abnormal value{anomalies.length > 1 ? 's' : ''} detected. Highlighted on chart.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="bg-muted/40 p-4 rounded-md">
            <div className="h-[300px]">
              {vitalType === 'bloodPressure' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" />
                    <YAxis domain={getYAxisDomain() as [number, number]} />
                    <Tooltip
                      formatter={(value: number) => [`${value} ${getVitalUnit()}`, '']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <ReferenceLine y={140} stroke="red" strokeDasharray="3 3" label={{ value: 'High Systolic', position: 'right', fill: 'red', fontSize: 10 }} />
                    <ReferenceLine y={90} stroke="red" strokeDasharray="3 3" label={{ value: 'High Diastolic', position: 'right', fill: 'red', fontSize: 10 }} />
                    
                    <Line 
                      type="monotone" 
                      dataKey="systolic" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      dot={false}
                      activeDot={(props: any) => {
                        // Find if this point is an anomaly
                        const isAnomaly = anomalies.some(a => 
                          a.timestamp === data[props.index].timestamp && 
                          (a.systolic === data[props.index].systolic)
                        );
                        
                        return (
                          <circle
                            {...props}
                            r={isAnomaly ? 6 : 4}
                            stroke={isAnomaly ? "#f43f5e" : "#3b82f6"}
                            strokeWidth={isAnomaly ? 2 : 1}
                            fill={isAnomaly ? "#fee2e2" : "#3b82f6"}
                          />
                        );
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="diastolic" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                      dot={false}
                      activeDot={(props: any) => {
                        // Find if this point is an anomaly
                        const isAnomaly = anomalies.some(a => 
                          a.timestamp === data[props.index].timestamp && 
                          (a.diastolic === data[props.index].diastolic)
                        );
                        
                        return (
                          <circle
                            {...props}
                            r={isAnomaly ? 6 : 4}
                            stroke={isAnomaly ? "#f43f5e" : "#10b981"}
                            strokeWidth={isAnomaly ? 2 : 1}
                            fill={isAnomaly ? "#fee2e2" : "#10b981"}
                          />
                        );
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" />
                    <YAxis domain={getYAxisDomain() as [number, number]} />
                    <Tooltip
                      formatter={(value: number) => [`${value} ${getVitalUnit()}`, '']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      dot={false}
                      activeDot={(props: any) => {
                        // Find if this point is an anomaly
                        const isAnomaly = anomalies.some(a => 
                          a.timestamp === data[props.index].timestamp
                        );
                        
                        return (
                          <circle
                            {...props}
                            r={isAnomaly ? 6 : 4}
                            stroke={isAnomaly ? "#f43f5e" : "#3b82f6"}
                            strokeWidth={isAnomaly ? 2 : 1}
                            fill={isAnomaly ? "#fee2e2" : "#3b82f6"}
                          />
                        );
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/40 p-4 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">{getVitalLabel()} Statistics</h3>
              </div>
              {vitalType === 'bloodPressure' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm text-muted-foreground mb-2">Systolic {getVitalUnit()}</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-background p-2 rounded-md text-center">
                        <div className="text-xs text-muted-foreground">Avg</div>
                        <div className="text-lg font-medium">{statistics.systolic?.avg}</div>
                      </div>
                      <div className="bg-background p-2 rounded-md text-center">
                        <div className="text-xs text-muted-foreground">Min</div>
                        <div className="text-lg font-medium">{statistics.systolic?.min}</div>
                      </div>
                      <div className="bg-background p-2 rounded-md text-center">
                        <div className="text-xs text-muted-foreground">Max</div>
                        <div className="text-lg font-medium">{statistics.systolic?.max}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm text-muted-foreground mb-2">Diastolic {getVitalUnit()}</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-background p-2 rounded-md text-center">
                        <div className="text-xs text-muted-foreground">Avg</div>
                        <div className="text-lg font-medium">{statistics.diastolic?.avg}</div>
                      </div>
                      <div className="bg-background p-2 rounded-md text-center">
                        <div className="text-xs text-muted-foreground">Min</div>
                        <div className="text-lg font-medium">{statistics.diastolic?.min}</div>
                      </div>
                      <div className="bg-background p-2 rounded-md text-center">
                        <div className="text-xs text-muted-foreground">Max</div>
                        <div className="text-lg font-medium">{statistics.diastolic?.max}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-background p-2 rounded-md text-center">
                      <div className="text-xs text-muted-foreground">Average</div>
                      <div className="text-lg font-medium">{statistics.avg}</div>
                    </div>
                    <div className="bg-background p-2 rounded-md text-center">
                      <div className="text-xs text-muted-foreground">Minimum</div>
                      <div className="text-lg font-medium">{statistics.min}</div>
                    </div>
                    <div className="bg-background p-2 rounded-md text-center">
                      <div className="text-xs text-muted-foreground">Maximum</div>
                      <div className="text-lg font-medium">{statistics.max}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-muted/40 p-4 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">Reference Information</h3>
              </div>
              <p className="text-sm mb-2">
                <span className="font-medium">Normal Range:</span> {getNormalRange()}
              </p>
              
              {anomalies.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium mb-1">Abnormal Readings</h4>
                  <div className="max-h-[100px] overflow-y-auto text-sm">
                    {anomalies.slice(0, 3).map((anomaly, index) => (
                      <div key={index} className="mb-1 text-red-500 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        <span>
                          {anomaly.date}: 
                          {vitalType === 'bloodPressure' 
                            ? ` ${anomaly.systolic}/${anomaly.diastolic} ${getVitalUnit()}`
                            : ` ${anomaly.value.toFixed(1)} ${getVitalUnit()}`
                          }
                        </span>
                      </div>
                    ))}
                    {anomalies.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        + {anomalies.length - 3} more abnormal readings
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VitalsHistoryChart;
