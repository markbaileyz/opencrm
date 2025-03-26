
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, RefreshCw, TrendingUp, DollarSign } from "lucide-react";

const KeyMetrics = () => {
  const metrics = [
    {
      id: 1,
      name: "Active Contacts",
      value: "142",
      change: "+12%",
      positive: true,
      icon: <Users className="h-5 w-5 text-blue-500" />
    },
    {
      id: 2,
      name: "Conversion Rate",
      value: "18.3%",
      change: "+2.4%",
      positive: true,
      icon: <RefreshCw className="h-5 w-5 text-green-500" />
    },
    {
      id: 3,
      name: "Growth",
      value: "24.5%",
      change: "+5.2%",
      positive: true,
      icon: <TrendingUp className="h-5 w-5 text-purple-500" />
    },
    {
      id: 4,
      name: "Revenue",
      value: "$12,390",
      change: "-3.2%",
      positive: false,
      icon: <DollarSign className="h-5 w-5 text-yellow-500" />
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 col-span-full">
      {metrics.map((metric) => (
        <Card key={metric.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{metric.name}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
              <div className="bg-muted rounded-full p-2">
                {metric.icon}
              </div>
            </div>
            <div 
              className={`text-xs mt-2 ${
                metric.positive ? "text-green-600" : "text-red-600"
              }`}
            >
              {metric.change} from last month
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KeyMetrics;
