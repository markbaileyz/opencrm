
import React from "react";

interface DashboardHeaderProps {
  isAdmin: boolean;
}

const DashboardHeader = ({ isAdmin }: DashboardHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground">
        {isAdmin ? "Welcome to your admin dashboard" : "Welcome to your NextCRM dashboard"}
      </p>
    </div>
  );
};

export default DashboardHeader;
