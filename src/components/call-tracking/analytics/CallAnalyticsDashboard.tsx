
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed } from "lucide-react";
import CallVolumeMetric from "./CallVolumeMetric";
import CallDurationMetric from "./CallDurationMetric";
import CallTypeDistribution from "./CallTypeDistribution";
import { CallRecord } from "@/types/call";

interface CallAnalyticsDashboardProps {
  totalCalls: number;
  inboundCalls: number;
  outboundCalls: number;
  missedCalls: number;
  avgDuration: number;
  calls: CallRecord[];
}

const CallAnalyticsDashboard: React.FC<CallAnalyticsDashboardProps> = ({
  totalCalls,
  inboundCalls,
  outboundCalls,
  missedCalls,
  avgDuration,
  calls
}) => {
  // Calculate percentages for distribution chart
  const inboundPercentage = totalCalls > 0 ? Math.round((inboundCalls / totalCalls) * 100) : 0;
  const outboundPercentage = totalCalls > 0 ? Math.round((outboundCalls / totalCalls) * 100) : 0;
  
  // Prepare data for call volume by day chart
  const getCallsByDay = () => {
    const dayCount = new Map<string, { total: number, incoming: number, outgoing: number, missed: number }>();
    const today = new Date();
    const days = [];
    
    // Generate last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayStr = date.toLocaleDateString('en-US', { weekday: 'short' });
      dayCount.set(dayStr, { total: 0, incoming: 0, outgoing: 0, missed: 0 });
      days.push(dayStr);
    }
    
    // Count calls per day
    calls.forEach(call => {
      const callDate = new Date(call.date);
      const dayStr = callDate.toLocaleDateString('en-US', { weekday: 'short' });
      
      if (dayCount.has(dayStr)) {
        const counts = dayCount.get(dayStr)!;
        counts.total += 1;
        
        if (call.type === "incoming") {
          counts.incoming += 1;
        } else if (call.type === "outgoing") {
          counts.outgoing += 1;
        } else if (call.type === "missed") {
          counts.missed += 1;
        }
      }
    });
    
    // Convert to array for chart
    return days.map(day => ({
      day,
      total: dayCount.get(day)!.total,
      incoming: dayCount.get(day)!.incoming,
      outgoing: dayCount.get(day)!.outgoing,
      missed: dayCount.get(day)!.missed
    }));
  };
  
  const callsByDay = getCallsByDay();
  
  // Prepare data for call type distribution pie chart
  const callTypeData = [
    { name: "Incoming", value: inboundCalls, color: "#3b82f6" },
    { name: "Outgoing", value: outboundCalls, color: "#22c55e" },
    { name: "Missed", value: missedCalls, color: "#ef4444" }
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CallVolumeMetric
          totalCalls={totalCalls}
          inboundCalls={inboundCalls}
          outboundCalls={outboundCalls}
          missedCalls={missedCalls}
          icon={<Phone className="h-4 w-4" />}
        />
        
        <CallDurationMetric
          avgDuration={avgDuration}
          icon={<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>}
        />
        
        <CallTypeDistribution
          inboundPercentage={inboundPercentage}
          outboundPercentage={outboundPercentage}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Call Volume by Day</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={callsByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="incoming" name="Incoming" fill="#3b82f6" />
                <Bar dataKey="outgoing" name="Outgoing" fill="#22c55e" />
                <Bar dataKey="missed" name="Missed" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Call Type Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={callTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {callTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CallAnalyticsDashboard;
