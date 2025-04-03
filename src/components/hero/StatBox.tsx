
import React from "react";

interface StatBoxProps {
  value: string;
  label: string;
}

const StatBox = ({ value, label }: StatBoxProps) => (
  <div className="bg-white backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm">
    <p className="text-3xl font-bold text-gray-900">{value}</p>
    <p className="text-sm text-gray-500 mt-1 font-medium">{label}</p>
  </div>
);

export default StatBox;
