
import React from "react";

interface StatBoxProps {
  value: string;
  label: string;
}

const StatBox = ({ value, label }: StatBoxProps) => (
  <div className="bg-[#0a1527]/90 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-white/10 shadow-md">
    <p className="text-3xl font-bold text-white">{value}</p>
    <p className="text-sm text-white/70 mt-1 font-medium">{label}</p>
  </div>
);

export default StatBox;
