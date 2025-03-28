
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Patients", value: "1,234", description: "↗︎ 12% from last month" },
          { title: "New Appointments", value: "45", description: "↘︎ 3% from last week" },
          { title: "Completed Tasks", value: "89", description: "↗︎ 7% from yesterday" },
          { title: "Revenue", value: "$12,346", description: "↗︎ 2% from last month" }
        ].map((item, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the Healthcare CRM</CardTitle>
          <CardDescription>
            Get an overview of your key metrics and recent activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder for the main dashboard content.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
