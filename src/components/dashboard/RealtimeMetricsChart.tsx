
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MetricDataPoint {
  time: string;
  visits: number;
  leads: number;
  conversions: number;
}

const generateRandomData = (points: number): MetricDataPoint[] => {
  const data: MetricDataPoint[] = [];
  let currentDate = new Date();
  
  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMinutes(date.getMinutes() - (i * 15));
    
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    data.push({
      time,
      visits: Math.floor(Math.random() * 80) + 20,
      leads: Math.floor(Math.random() * 40) + 5,
      conversions: Math.floor(Math.random() * 15) + 1
    });
  }
  
  return data;
};

const defaultTimeRanges = [
  { label: "1H", value: "1h", points: 4 },
  { label: "4H", value: "4h", points: 16 },
  { label: "12H", value: "12h", points: 48 },
  { label: "24H", value: "24h", points: 96 }
];

const RealtimeMetricsChart = () => {
  const [timeRange, setTimeRange] = useState(defaultTimeRanges[1].value);
  const [data, setData] = useState<MetricDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadData = (range: string) => {
    setIsLoading(true);
    
    // Find how many data points to generate based on the selected time range
    const rangeObj = defaultTimeRanges.find(r => r.value === range) || defaultTimeRanges[1];
    
    // Simulate API call with a small delay
    setTimeout(() => {
      const newData = generateRandomData(rangeObj.points);
      setData(newData);
      setIsLoading(false);
    }, 800);
  };

  const refreshData = () => {
    loadData(timeRange);
    toast({
      title: "Data refreshed",
      description: `Real-time metrics updated for ${timeRange} view`,
      variant: "success",
    });
  };

  useEffect(() => {
    loadData(timeRange);
    
    // Set up auto-refresh every 3 minutes
    const intervalId = setInterval(() => {
      loadData(timeRange);
    }, 180000);
    
    return () => clearInterval(intervalId);
  }, [timeRange]);

  return (
    <Card className="animate-fade-up">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Real-time Website Metrics</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex bg-muted rounded-md p-1">
              {defaultTimeRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={timeRange === range.value ? "secondary" : "ghost"}
                  size="sm"
                  className="text-xs h-7 px-2"
                  onClick={() => setTimeRange(range.value)}
                  disabled={isLoading}
                >
                  {range.label}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={refreshData}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="area">Area</TabsTrigger>
            </TabsList>
            <div className="flex items-center text-xs gap-4">
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                <span>Visits</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                <span>Leads</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-purple-500"></span>
                <span>Conversions</span>
              </div>
            </div>
          </div>
          
          <TabsContent value="line" className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ecedef" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    border: 'none'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="visits" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="conversions" 
                  stroke="#a855f7" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="area" className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ecedef" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    border: 'none'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="visits" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f620" 
                />
                <Area 
                  type="monotone" 
                  dataKey="leads" 
                  stackId="1"
                  stroke="#22c55e" 
                  fill="#22c55e20" 
                />
                <Area 
                  type="monotone" 
                  dataKey="conversions" 
                  stackId="1"
                  stroke="#a855f7" 
                  fill="#a855f720" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RealtimeMetricsChart;
