
import React, { useState } from "react";
import { ArrowLeft, LineChart, Plus, Filter, Activity, Heart, Weight, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HealthTrackerPage = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("week");

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleBack} size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Health Tracker</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Measurement
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative max-w-md">
            <Input 
              placeholder="Search health metrics..." 
              className="max-w-md"
              icon={<LineChart className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24 Hours</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last 90 Days</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="vitals">
          <TabsList>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vitals" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <VitalCard 
                title="Blood Pressure"
                value="120/80"
                trend="-5%"
                trendDirection="down"
                icon={<Heart className="h-5 w-5 text-red-500" />}
                unit="mmHg"
                lastUpdated="Today, 9:30 AM"
              />
              <VitalCard 
                title="Heart Rate"
                value="72"
                trend="+3"
                trendDirection="up"
                icon={<Activity className="h-5 w-5 text-red-500" />}
                unit="bpm"
                lastUpdated="Today, 9:30 AM"
              />
              <VitalCard 
                title="Weight"
                value="165"
                trend="-2"
                trendDirection="down"
                icon={<Weight className="h-5 w-5 text-blue-500" />}
                unit="lbs"
                lastUpdated="Yesterday, 7:45 PM"
              />
              <VitalCard 
                title="Blood Oxygen"
                value="98"
                trend="+1"
                trendDirection="up"
                icon={<Droplets className="h-5 w-5 text-blue-500" />}
                unit="%"
                lastUpdated="Today, 9:30 AM"
              />
              <VitalCard 
                title="Body Temperature"
                value="98.6"
                trend="0"
                trendDirection="neutral"
                icon={<Activity className="h-5 w-5 text-orange-500" />}
                unit="°F"
                lastUpdated="2 days ago"
              />
              <Card className="hover:shadow-md transition-shadow border-dashed border-2">
                <CardContent className="flex items-center justify-center h-full py-8">
                  <Button variant="ghost" className="flex flex-col items-center gap-2">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                    <span className="text-muted-foreground">Add New Vital</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ActivityCard 
                title="Steps"
                value="8,742"
                goal="10,000"
                completion={87}
                icon={<Activity className="h-5 w-5" />}
                lastUpdated="Today, ongoing"
              />
              <ActivityCard 
                title="Distance"
                value="3.2"
                goal="5"
                completion={64}
                icon={<Activity className="h-5 w-5" />}
                unit="miles"
                lastUpdated="Today, ongoing"
              />
              <ActivityCard 
                title="Active Minutes"
                value="42"
                goal="60"
                completion={70}
                icon={<Activity className="h-5 w-5" />}
                unit="min"
                lastUpdated="Today, ongoing"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="sleep" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Last Night's Sleep</CardTitle>
                  <CardDescription>7h 42m total</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Deep Sleep</span>
                      <span>2h 15m</span>
                    </div>
                    <Progress value={30} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Light Sleep</span>
                      <span>4h 10m</span>
                    </div>
                    <Progress value={53} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>REM Sleep</span>
                      <span>1h 17m</span>
                    </div>
                    <Progress value={17} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Today's Nutrition</CardTitle>
                  <CardDescription>1,840 calories consumed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Carbs</span>
                      <span>210g / 250g</span>
                    </div>
                    <Progress value={84} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Protein</span>
                      <span>95g / 120g</span>
                    </div>
                    <Progress value={79} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Fat</span>
                      <span>62g / 70g</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">Log Food</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface VitalCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
  icon: React.ReactNode;
  unit: string;
  lastUpdated: string;
}

const VitalCard: React.FC<VitalCardProps> = ({ 
  title, 
  value, 
  trend, 
  trendDirection, 
  icon,
  unit,
  lastUpdated
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {icon}
        </div>
        <CardDescription>{lastUpdated}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
          <Badge 
            variant={trendDirection === "neutral" ? "outline" : "default"} 
            className={`ml-auto ${
              trendDirection === "down" ? "bg-green-500" : 
              trendDirection === "up" ? "bg-red-500" : ""
            }`}
          >
            {trend}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">View History</Button>
      </CardFooter>
    </Card>
  );
};

interface ActivityCardProps {
  title: string;
  value: string;
  goal: string;
  completion: number;
  icon: React.ReactNode;
  unit?: string;
  lastUpdated: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ 
  title, 
  value, 
  goal, 
  completion, 
  icon,
  unit,
  lastUpdated
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {icon}
        </div>
        <CardDescription>{lastUpdated}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            <span className="text-sm text-muted-foreground ml-auto">Goal: {goal} {unit}</span>
          </div>
          <div className="space-y-1">
            <Progress value={completion} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{completion}% of daily goal</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">View Activity</Button>
      </CardFooter>
    </Card>
  );
};

export default HealthTrackerPage;
