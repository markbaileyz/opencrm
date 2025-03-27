
import React from "react";
import { Card, CardTitle } from "@/components/ui/card";

const MobileStats = () => (
  <div className="grid grid-cols-2 gap-3 mt-4">
    <Card className="p-3">
      <CardTitle className="text-xs font-medium">Check-ins</CardTitle>
      <div className="text-xl font-bold mt-2">24</div>
      <p className="text-xs text-muted-foreground">+12% from yesterday</p>
    </Card>
    <Card className="p-3">
      <CardTitle className="text-xs font-medium">Wait Time</CardTitle>
      <div className="text-xl font-bold mt-2">14 min</div>
      <p className="text-xs text-muted-foreground">-3 min from avg</p>
    </Card>
    <Card className="p-3">
      <CardTitle className="text-xs font-medium">Pending</CardTitle>
      <div className="text-xl font-bold mt-2">8</div>
      <p className="text-xs text-muted-foreground">next 2 hours</p>
    </Card>
    <Card className="p-3">
      <CardTitle className="text-xs font-medium">Rooms</CardTitle>
      <div className="text-xl font-bold mt-2">7/12</div>
      <p className="text-xs text-muted-foreground">58% utilization</p>
    </Card>
  </div>
);

export default MobileStats;
