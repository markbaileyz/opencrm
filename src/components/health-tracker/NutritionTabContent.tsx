
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Apple, Pizza, Coffee, Utensils } from "lucide-react";

const NutritionTabContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Today's Nutrition</CardTitle>
            <CardDescription>1,840 / 2,200 calories</CardDescription>
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
            <Button variant="outline" size="sm" className="w-full">View Details</Button>
          </CardFooter>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Water Intake</CardTitle>
            <CardDescription>1.6 / 2.5 liters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative pt-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-100 text-blue-700">
                    64% of daily goal
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-16 mb-4 text-xs flex rounded-full bg-blue-100 mt-3">
                <div style={{ width: "64%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
                  6 glasses
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">Log Water</Button>
          </CardFooter>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Remaining Calories</CardTitle>
            <CardDescription>360 calories left</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-green-500"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - 0.84)}
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-2xl font-bold">84%</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">Adjust Goals</Button>
          </CardFooter>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Progress</CardTitle>
            <CardDescription>5/7 days on target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    i < 5 ? "bg-green-500 text-white" : i === 5 ? "bg-yellow-500 text-white" : "bg-gray-200"
                  }`}>
                    {day}
                  </div>
                  <span className="text-xs">{i + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">View History</Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Meal Tracking</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Log Meal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="today">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <MealCard 
                    title="Breakfast"
                    time="7:30 AM"
                    calories={420}
                    items={["Oatmeal with banana", "Greek yogurt", "Coffee"]}
                    icon={<Coffee className="h-5 w-5 text-amber-600" />}
                  />
                  
                  <MealCard 
                    title="Lunch"
                    time="12:15 PM"
                    calories={650}
                    items={["Grilled chicken salad", "Whole grain bread", "Apple"]}
                    icon={<Utensils className="h-5 w-5 text-green-600" />}
                  />
                  
                  <MealCard 
                    title="Snack"
                    time="3:45 PM"
                    calories={180}
                    items={["Almonds", "Protein bar"]}
                    icon={<Apple className="h-5 w-5 text-red-600" />}
                  />
                  
                  <MealCard 
                    title="Dinner"
                    time="7:00 PM"
                    calories={590}
                    items={["Salmon", "Brown rice", "Roasted vegetables"]}
                    icon={<Pizza className="h-5 w-5 text-blue-600" />}
                  />
                </div>
                
                <div className="flex justify-center">
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Meal
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="yesterday">
              <div className="p-8 text-center text-muted-foreground">
                <p>Yesterday's meal data is available in the full version.</p>
                <Button variant="outline" className="mt-4">View Yesterday's Meals</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="p-8 text-center text-muted-foreground">
                <p>Your meal history is available in the full version.</p>
                <Button variant="outline" className="mt-4">View Meal History</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper component for meal cards
interface MealCardProps {
  title: string;
  time: string;
  calories: number;
  items: string[];
  icon: React.ReactNode;
}

const MealCard: React.FC<MealCardProps> = ({ title, time, calories, items, icon }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          <CardDescription>{time}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm font-medium">{calories} calories</div>
          <ul className="text-sm text-muted-foreground space-y-1">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="ghost" size="sm" className="w-full text-xs">Edit</Button>
      </CardFooter>
    </Card>
  );
};

export default NutritionTabContent;
