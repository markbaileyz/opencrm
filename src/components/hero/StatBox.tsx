
import React from "react";

interface StatBoxProps {
  value: string;
  label: string;
}

const StatBox = ({ value, label }: StatBoxProps) => (
  <div className="glass rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-white/10">
    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">{value}</p>
    <p className="text-sm text-muted-foreground mt-1 font-medium">{label}</p>
  </div>
);

export default StatBox;
