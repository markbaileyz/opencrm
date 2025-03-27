
import React from "react";
import { Settings as SettingsIcon } from "lucide-react";

interface SettingsHeaderProps {
  title: string;
  description: string;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ title, description }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-2">
          {description}
        </p>
      </div>
      <SettingsIcon className="h-8 w-8 text-muted-foreground" />
    </div>
  );
};

export default SettingsHeader;
