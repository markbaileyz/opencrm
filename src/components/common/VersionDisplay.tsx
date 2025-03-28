
import React from "react";
import { VERSION } from "@/version";

interface VersionDisplayProps {
  className?: string;
}

const VersionDisplay: React.FC<VersionDisplayProps> = ({ className = "" }) => {
  return (
    <div className={`text-xs text-muted-foreground ${className}`}>
      Version {VERSION.toString()}
    </div>
  );
};

export default VersionDisplay;
