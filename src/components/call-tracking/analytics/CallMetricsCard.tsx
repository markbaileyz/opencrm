
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock, Calendar } from "lucide-react";

interface CallMetricsCardProps {
  title: string;
  value: number | string;
  trend: "up" | "down" | "neutral";
  trendValue?: number;
  icon: "phone" | "phone-incoming" | "phone-outgoing" | "phone-missed" | "clock" | "calendar";
  description: string;
}

const CallMetricsCard: React.FC<CallMetricsCardProps> = ({
  title,
  value,
  trend,
  trendValue = 0,
  icon,
  description
}) => {
  const renderIcon = () => {
    switch (icon) {
      case "phone":
        return <Phone className="h-5 w-5 text-primary" />;
      case "phone-incoming":
        return <PhoneIncoming className="h-5 w-5 text-green-500" />;
      case "phone-outgoing":
        return <PhoneOutgoing className="h-5 w-5 text-blue-500" />;
      case "phone-missed":
        return <PhoneMissed className="h-5 w-5 text-red-500" />;
      case "clock":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "calendar":
        return <Calendar className="h-5 w-5 text-indigo-500" />;
      default:
        return <Phone className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-medium text-sm text-muted-foreground">{title}</h3>
            <div className="text-2xl font-bold">{value}</div>
          </div>
          <div className="p-2 rounded-full bg-primary/10">
            {renderIcon()}
          </div>
        </div>
        
        <div className="mt-4 flex items-center text-sm">
          {trend === "up" ? (
            <div className="flex items-center text-green-600">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>{trendValue}%</span>
            </div>
          ) : trend === "down" ? (
            <div className="flex items-center text-red-600">
              <ArrowDown className="h-4 w-4 mr-1" />
              <span>{trendValue}%</span>
            </div>
          ) : (
            <div className="flex items-center text-muted-foreground">
              <span>No change</span>
            </div>
          )}
          <span className="ml-2 text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallMetricsCard;
