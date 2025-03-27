
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const activityData = [
  { name: "Mon", emails: 12, calls: 8, meetings: 3 },
  { name: "Tue", emails: 19, calls: 14, meetings: 5 },
  { name: "Wed", emails: 15, calls: 11, meetings: 6 },
  { name: "Thu", emails: 18, calls: 12, meetings: 8 },
  { name: "Fri", emails: 14, calls: 7, meetings: 4 },
  { name: "Sat", emails: 8, calls: 3, meetings: 1 },
  { name: "Sun", emails: 6, calls: 2, meetings: 0 },
];

const contactsOverTimeData = [
  { date: "Jan", newContacts: 23, activeContacts: 120 },
  { date: "Feb", newContacts: 35, activeContacts: 145 },
  { date: "Mar", newContacts: 42, activeContacts: 178 },
  { date: "Apr", newContacts: 29, activeContacts: 189 },
  { date: "May", newContacts: 33, activeContacts: 210 },
  { date: "Jun", newContacts: 38, activeContacts: 223 },
];

const ContactActivityReport = () => {
  const [timeframe, setTimeframe] = useState("week");

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Contact Activity</CardTitle>
            <CardDescription>
              Breakdown of activity types across all contacts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
                <TabsTrigger value="quarter">This Quarter</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="h-80 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activityData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="emails" fill="#3b82f6" name="Emails" />
                  <Bar dataKey="calls" fill="#10b981" name="Calls" />
                  <Bar dataKey="meetings" fill="#8b5cf6" name="Meetings" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">152</div>
                <div className="text-sm text-muted-foreground">Emails Sent</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">87</div>
                <div className="text-sm text-muted-foreground">Calls Made</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">36</div>
                <div className="text-sm text-muted-foreground">Meetings Held</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Contact Growth</CardTitle>
            <CardDescription>
              New and active contacts over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={contactsOverTimeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="newContacts" stroke="#8b5cf6" name="New Contacts" />
                  <Line type="monotone" dataKey="activeContacts" stroke="#3b82f6" name="Active Contacts" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-8">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-muted-foreground">Total Contacts</div>
                  <div className="text-3xl font-bold">1,452</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Growth Rate</div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">+18.5%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactActivityReport;
