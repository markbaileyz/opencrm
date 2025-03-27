
import React from "react";
import StatBox from "./StatBox";

interface StatsGridProps {
  stats: Array<{
    value: string;
    label: string;
  }>;
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 animate-fade-up delay-400">
      {stats.map((stat, index) => (
        <StatBox key={index} value={stat.value} label={stat.label} />
      ))}
    </div>
  );
};

export default StatsGrid;
