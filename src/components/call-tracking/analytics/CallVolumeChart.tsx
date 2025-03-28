
import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { CallRecord } from "@/types/call";
import { format, subDays, eachDayOfInterval, startOfDay, endOfDay } from "date-fns";

interface CallVolumeChartProps {
  calls: CallRecord[];
  timeRange: "today" | "week" | "month" | "quarter";
}

const CallVolumeChart: React.FC<CallVolumeChartProps> = ({ calls, timeRange }) => {
  const chartData = useMemo(() => {
    const now = new Date();
    let interval;
    let dateFormat;
    
    // Set the date range based on the timeRange prop
    switch (timeRange) {
      case "today":
        interval = eachDayOfInterval({ start: now, end: now });
        dateFormat = "ha";
        break;
      case "week":
        interval = eachDayOfInterval({ start: subDays(now, 6), end: now });
        dateFormat = "EEE";
        break;
      case "month":
        interval = eachDayOfInterval({ start: subDays(now, 29), end: now });
        dateFormat = "MMM d";
        break;
      case "quarter":
        interval = eachDayOfInterval({ start: subDays(now, 89), end: now });
        dateFormat = "MMM";
        break;
      default:
        interval = eachDayOfInterval({ start: subDays(now, 6), end: now });
        dateFormat = "EEE";
    }
    
    return interval.map(date => {
      const dayStart = startOfDay(date);
      const dayEnd = endOfDay(date);
      
      const dayCalls = calls.filter(call => {
        const callDate = new Date(call.timestamp);
        return callDate >= dayStart && callDate <= dayEnd;
      });
      
      const incoming = dayCalls.filter(call => call.type === "incoming").length;
      const outgoing = dayCalls.filter(call => call.type === "outgoing").length;
      const missed = dayCalls.filter(call => call.type === "missed").length;
      
      return {
        date: format(date, dateFormat),
        incoming,
        outgoing,
        missed,
        total: incoming + outgoing + missed
      };
    });
  }, [calls, timeRange]);
  
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="incoming" stackId="a" name="Incoming" fill="#22c55e" />
          <Bar dataKey="outgoing" stackId="a" name="Outgoing" fill="#3b82f6" />
          <Bar dataKey="missed" stackId="a" name="Missed" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CallVolumeChart;
