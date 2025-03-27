
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  TrendingUp,
  BarChart, 
  Clock, 
  PieChart,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface MobileStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  onClick?: () => void;
}

const MobileStat: React.FC<MobileStatProps> = ({ icon, label, value, trend, onClick }) => {
  const trendColor = trend === "up" 
    ? "text-green-500" 
    : trend === "down" 
      ? "text-red-500" 
      : "text-muted-foreground";

  return (
    <Button 
      variant="outline" 
      className="flex items-center justify-start w-full p-3 h-auto" 
      onClick={onClick}
    >
      <div className="mr-3 p-2 bg-primary/10 rounded-full">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-medium">{label}</p>
        <p className={`text-xl font-bold ${trendColor}`}>{value}</p>
      </div>
      <ArrowRight className="h-4 w-4 ml-2 text-muted-foreground" />
    </Button>
  );
};

const MobileChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-3 gap-2 mb-6">
      <Button 
        variant="outline" 
        className="flex flex-col items-center justify-center p-3 h-20" 
        onClick={() => navigate("/contacts")}
      >
        <Users className="h-5 w-5 mb-1" />
        <span className="text-xs">Contacts</span>
      </Button>
      
      <Button 
        variant="outline" 
        className="flex flex-col items-center justify-center p-3 h-20" 
        onClick={() => navigate("/calendar")}
      >
        <Calendar className="h-5 w-5 mb-1" />
        <span className="text-xs">Calendar</span>
      </Button>
      
      <Button 
        variant="outline" 
        className="flex flex-col items-center justify-center p-3 h-20" 
        onClick={() => navigate("/deals")}
      >
        <BarChart className="h-5 w-5 mb-1" />
        <span className="text-xs">Deals</span>
      </Button>
    </div>
  );
};

const MobileDashboard: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.email.includes("admin");
  const navigate = useNavigate();
  
  // Activity data for a simple chart
  const activityData = [42, 65, 48, 72, 58, 63];
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      
      <QuickActions />
      
      <div className="space-y-3">
        <MobileStat 
          icon={<Users className="h-5 w-5 text-primary" />}
          label="Total Customers"
          value={isAdmin ? "1,284" : "763"}
          trend="up"
          onClick={() => navigate("/contacts")}
        />
        
        <MobileStat 
          icon={<Calendar className="h-5 w-5 text-primary" />}
          label="Meetings Today"
          value={isAdmin ? "18" : "8"}
          trend="up"
          onClick={() => navigate("/calendar")}
        />
        
        <MobileStat 
          icon={<MessageSquare className="h-5 w-5 text-primary" />}
          label="Unread Messages"
          value={isAdmin ? "28" : "12"}
          trend="neutral"
          onClick={() => navigate("/email")}
        />
        
        <MobileStat 
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          label="Customer Satisfaction"
          value={isAdmin ? "92%" : "94%"}
          trend="up"
          onClick={() => navigate("/reports")}
        />
      </div>
      
      <Separator className="my-6" />
      
      <MobileChartCard title="Recent Activity">
        <div className="flex items-end justify-between h-24 mb-2">
          {activityData.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-6 bg-primary rounded-t" 
                style={{ height: `${value}%` }}
              ></div>
              <span className="text-xs mt-1">{['M', 'T', 'W', 'T', 'F', 'S'][index]}</span>
            </div>
          ))}
        </div>
      </MobileChartCard>
      
      <MobileChartCard title="Upcoming">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">Client Meeting</h4>
              <p className="text-xs text-muted-foreground">Today, 2:00 PM</p>
            </div>
            <Button variant="outline" size="sm">View</Button>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <PieChart className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">Quarterly Review</h4>
              <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
            </div>
            <Button variant="outline" size="sm">View</Button>
          </div>
        </div>
      </MobileChartCard>
      
      <MobileChartCard title="Pipeline">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Qualification</span>
              <span className="text-muted-foreground">8 deals</span>
            </div>
            <Progress value={25} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Proposal</span>
              <span className="text-muted-foreground">12 deals</span>
            </div>
            <Progress value={48} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Negotiation</span>
              <span className="text-muted-foreground">5 deals</span>
            </div>
            <Progress value={20} className="h-2" />
          </div>
          <Button size="sm" onClick={() => navigate("/deals")} className="w-full mt-2">
            View All Deals
          </Button>
        </div>
      </MobileChartCard>
    </div>
  );
};

export default MobileDashboard;
