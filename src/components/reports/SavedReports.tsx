
import React from "react";
import { SavedReportsProvider } from "./saved-reports/SavedReportsContext";
import SavedReportsContent from "./saved-reports/SavedReportsContent";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Filter, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SavedReports = () => {
  return (
    <SavedReportsProvider>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Saved Reports</CardTitle>
            <CardDescription>
              Access and manage your saved reports
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="favorites">Favorites</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="recent">Recently Run</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm">
              <Star className="h-4 w-4 mr-2" />
              <span>Favorites</span>
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Scheduled</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <SavedReportsContent />
        </CardContent>
      </Card>
    </SavedReportsProvider>
  );
};

export default SavedReports;
