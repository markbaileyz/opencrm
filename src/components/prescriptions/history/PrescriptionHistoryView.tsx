
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter, Search } from "lucide-react";
import PrescriptionHistoryTable from "./PrescriptionHistoryTable";
import PrescriptionHistoryFilters from "./PrescriptionHistoryFilters";
import { DateRange } from "react-day-picker";

interface PrescriptionHistoryViewProps {
  patientId?: string;
}

const PrescriptionHistoryView: React.FC<PrescriptionHistoryViewProps> = ({ patientId }) => {
  const [activeTab, setActiveTab] = useState<"active" | "expired" | "all">("active");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search prescriptions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <CalendarIcon className="h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  "Date Range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-primary/10" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <PrescriptionHistoryFilters 
          onSelectMedication={setSelectedMedication} 
          selectedMedication={selectedMedication} 
        />
      )}

      <Tabs defaultValue="active" value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">
            Active
            <Badge variant="outline" className="ml-2">12</Badge>
          </TabsTrigger>
          <TabsTrigger value="expired">
            Expired
            <Badge variant="outline" className="ml-2">8</Badge>
          </TabsTrigger>
          <TabsTrigger value="all">
            All
            <Badge variant="outline" className="ml-2">20</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-4">
          <PrescriptionHistoryTable 
            status="active" 
            searchQuery={searchQuery} 
            dateRange={dateRange} 
            medicationFilter={selectedMedication} 
          />
        </TabsContent>
        
        <TabsContent value="expired" className="mt-4">
          <PrescriptionHistoryTable 
            status="expired" 
            searchQuery={searchQuery} 
            dateRange={dateRange} 
            medicationFilter={selectedMedication} 
          />
        </TabsContent>
        
        <TabsContent value="all" className="mt-4">
          <PrescriptionHistoryTable 
            status="all" 
            searchQuery={searchQuery} 
            dateRange={dateRange} 
            medicationFilter={selectedMedication} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PrescriptionHistoryView;
