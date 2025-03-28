
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { CallRecord } from "@/types/call";

interface CallTypeDistributionProps {
  calls: CallRecord[];
}

const CallTypeDistribution: React.FC<CallTypeDistributionProps> = ({ calls }) => {
  // Calculate call type distribution
  const incoming = calls.filter(call => call.type === "incoming").length;
  const outgoing = calls.filter(call => call.type === "outgoing").length;
  const missed = calls.filter(call => call.type === "missed").length;
  const scheduled = calls.filter(call => call.type === "scheduled").length;
  
  const data = [
    { name: "Incoming", value: incoming, color: "#22c55e" },
    { name: "Outgoing", value: outgoing, color: "#3b82f6" },
    { name: "Missed", value: missed, color: "#ef4444" },
    { name: "Scheduled", value: scheduled, color: "#a855f7" }
  ].filter(item => item.value > 0);
  
  if (data.length === 0) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">No call data available</div>;
  }
  
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} calls`, 'Count']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CallTypeDistribution;
