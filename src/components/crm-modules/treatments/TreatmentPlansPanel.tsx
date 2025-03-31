
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, Calendar, ClipboardList } from "lucide-react";

// Demo data
const treatmentPlansData = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    planName: "Hypertension Management",
    startDate: "2024-04-10",
    endDate: "2024-07-10",
    status: "active",
    provider: "Dr. Michael Lee",
    progress: 40,
    type: "chronic"
  },
  {
    id: 2,
    patientName: "Robert Williams",
    planName: "Physical Therapy - Knee",
    startDate: "2024-03-15",
    endDate: "2024-06-15",
    status: "active",
    provider: "Dr. Emily Chen",
    progress: 65,
    type: "rehabilitation"
  },
  {
    id: 3,
    patientName: "Emily Davis",
    planName: "Diabetes Management",
    startDate: "2024-02-20",
    endDate: "2024-08-20",
    status: "active",
    provider: "Dr. Michael Lee",
    progress: 25,
    type: "chronic"
  },
  {
    id: 4,
    patientName: "James Wilson",
    planName: "Post-Surgery Recovery",
    startDate: "2024-04-05",
    endDate: "2024-05-20",
    status: "active",
    provider: "Dr. Emily Chen",
    progress: 80,
    type: "post-op"
  },
  {
    id: 5,
    patientName: "Maria Garcia",
    planName: "Weight Management",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    status: "on-hold",
    provider: "Dr. Michael Lee",
    progress: 30,
    type: "lifestyle"
  }
];

const TreatmentPlansPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [view, setView] = useState<"list" | "grid">("list");
  
  // Filter treatment plans based on search term and filters
  const filteredTreatmentPlans = treatmentPlansData.filter(plan => {
    const matchesSearch = 
      plan.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      plan.planName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || plan.status === filterStatus;
    const matchesType = filterType === "all" || plan.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "discontinued":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case "chronic":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "rehabilitation":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "post-op":
        return "bg-cyan-100 text-cyan-800 hover:bg-cyan-200";
      case "lifestyle":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search treatment plans..."
              className="w-full pl-8 md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={filterStatus}
            onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="discontinued">Discontinued</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filterType}
            onValueChange={setFilterType}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="chronic">Chronic Care</SelectItem>
              <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
              <SelectItem value="post-op">Post-Operative</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Tabs value={view} onValueChange={(v) => setView(v as "list" | "grid")}>
            <TabsList>
              <TabsTrigger value="list">
                <ClipboardList className="h-4 w-4 mr-1" />
                List
              </TabsTrigger>
              <TabsTrigger value="grid">
                <Calendar className="h-4 w-4 mr-1" />
                Grid
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Treatment Plan
          </Button>
        </div>
      </div>

      <Tabs value={view} className="w-full">
        <TabsContent value="list" className="mt-0">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                {filteredTreatmentPlans.length > 0 ? (
                  filteredTreatmentPlans.map((plan) => (
                    <Card key={plan.id} className="hover:bg-muted/50 cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div>
                            <div className="font-medium text-lg">{plan.planName}</div>
                            <div className="text-sm text-muted-foreground">
                              Patient: {plan.patientName} • Provider: {plan.provider}
                            </div>
                          </div>
                          <div className="flex flex-wrap mt-2 sm:mt-0 gap-2">
                            <Badge variant="outline" className={getStatusColor(plan.status)}>
                              {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                            </Badge>
                            <Badge variant="outline" className={getTypeColor(plan.type)}>
                              {plan.type.charAt(0).toUpperCase() + plan.type.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{plan.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary rounded-full h-2" 
                              style={{ width: `${plan.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="mt-3 text-sm text-muted-foreground">
                          {plan.startDate} to {plan.endDate}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center p-8 border border-dashed rounded-md">
                    <ClipboardList className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No treatment plans found</p>
                    <Button variant="outline" className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Treatment Plan
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTreatmentPlans.length > 0 ? (
              filteredTreatmentPlans.map((plan) => (
                <Card key={plan.id} className="hover:bg-muted/50 cursor-pointer h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{plan.planName}</CardTitle>
                      <Badge variant="outline" className={getStatusColor(plan.status)}>
                        {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-muted-foreground">Patient:</span>
                        <span className="ml-1 font-medium">{plan.patientName}</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Provider:</span>
                        <span className="ml-1">{plan.provider}</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Duration:</span>
                        <span className="ml-1">{plan.startDate} to {plan.endDate}</span>
                      </div>
                      <Badge variant="outline" className={`${getTypeColor(plan.type)} mt-1`}>
                        {plan.type.charAt(0).toUpperCase() + plan.type.slice(1)}
                      </Badge>
                      <div className="pt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{plan.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2" 
                            style={{ width: `${plan.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center p-8 border border-dashed rounded-md">
                <ClipboardList className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No treatment plans found</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Treatment Plan
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TreatmentPlansPanel;
