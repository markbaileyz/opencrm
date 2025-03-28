
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { StaffMember } from "@/types/office";
import { useStaffSchedule } from "./useStaffSchedule";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const ScheduleView: React.FC = () => {
  const { 
    staffMembers, 
    selectedDate, 
    setSelectedDate, 
    selectedView, 
    setSelectedView,
    selectedStaffId,
    setSelectedStaffId,
    scheduleEvents,
    isAddEventOpen,
    setIsAddEventOpen
  } = useStaffSchedule();
  
  const getStaffName = (staffId: string): string => {
    const staff = staffMembers.find(s => s.id === staffId);
    return staff ? staff.name : "Unknown";
  };
  
  const getEventStatusColor = (status: string): string => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800 border-green-400";
      case "tentative": return "bg-amber-100 text-amber-800 border-amber-400";
      case "cancelled": return "bg-red-100 text-red-800 border-red-400";
      default: return "bg-slate-100 text-slate-800 border-slate-400";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Office Schedule</h2>
        
        <div className="flex gap-2">
          <Select 
            value={selectedView} 
            onValueChange={setSelectedView}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="month">Month View</SelectItem>
              <SelectItem value="staff">Staff View</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={() => setIsAddEventOpen(true)}>
            <CalendarIcon className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left sidebar with calendar picker and staff list */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border w-full"
            />
            
            <div className="px-4 py-2 border-t">
              <h3 className="text-sm font-medium mb-2">Staff</h3>
              <div className="space-y-1">
                <Button 
                  variant={selectedStaffId === "all" ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => setSelectedStaffId("all")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  All Staff
                </Button>
                
                {staffMembers.map((staff) => (
                  <Button 
                    key={staff.id}
                    variant={selectedStaffId === staff.id ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    size="sm"
                    onClick={() => setSelectedStaffId(staff.id)}
                  >
                    {staff.name}
                    {staff.status !== "active" && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        {staff.status}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main schedule content */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>{format(selectedDate, "MMMM d, yyyy")}</CardTitle>
            <CardDescription>
              {selectedStaffId === "all" 
                ? "Viewing all staff schedules" 
                : `Viewing schedule for ${getStaffName(selectedStaffId)}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="schedule" className="space-y-4">
              <TabsList>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>
              
              <TabsContent value="schedule" className="space-y-4">
                {scheduleEvents.length > 0 ? (
                  <div className="space-y-2">
                    {scheduleEvents.map((event, index) => (
                      <div key={index} className="flex items-center p-2 border rounded hover:bg-slate-50">
                        <div className="flex-shrink-0 w-16 text-sm text-gray-500">
                          {event.startTime}
                        </div>
                        <div className="flex-grow ml-4">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-gray-500">
                            {getStaffName(event.staffId)}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <Badge variant="outline" className={getEventStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CalendarIcon className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-1">No events scheduled</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      There are no events scheduled for this date and staff selection.
                    </p>
                    <Button onClick={() => setIsAddEventOpen(true)}>
                      Add New Event
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="availability">
                <div className="space-y-4">
                  {selectedStaffId === "all" ? (
                    staffMembers.map((staff) => (
                      <Card key={staff.id}>
                        <CardHeader className="py-3">
                          <CardTitle className="text-base">{staff.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(staff.availability).map(([day, hours]) => (
                              <div key={day} className="flex items-start">
                                <div className="w-24 font-medium capitalize">{day}:</div>
                                <div>{hours}</div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="space-y-2">
                      {staffMembers
                        .filter(staff => staff.id === selectedStaffId)
                        .map(staff => (
                          <div key={staff.id} className="space-y-4">
                            <h3 className="text-lg font-medium">{staff.name} Availability</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {Object.entries(staff.availability).map(([day, hours]) => (
                                <div key={day} className="flex flex-col p-3 border rounded-lg">
                                  <span className="text-sm font-medium capitalize mb-1">{day}</span>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                    <span>{hours}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleView;
