
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const MobileEmailFilters: React.FC = () => {
  const [dateRange, setDateRange] = useState<Date | undefined>(undefined);
  const [hasAttachments, setHasAttachments] = useState(false);
  const [readStatus, setReadStatus] = useState("all");
  
  return (
    <div className="space-y-6 py-4">
      <h3 className="font-medium text-lg">Email Filters</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="from">From</Label>
          <Input id="from" placeholder="Sender email or name" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="Contains text" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date-range">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange ? format(dateRange, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateRange}
                onSelect={setDateRange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Separator />
        
        <div className="space-y-2">
          <Label htmlFor="importance">Priority</Label>
          <Select>
            <SelectTrigger id="importance">
              <SelectValue placeholder="Any priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High priority</SelectItem>
              <SelectItem value="normal">Normal priority</SelectItem>
              <SelectItem value="low">Low priority</SelectItem>
              <SelectItem value="any">Any priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="has-attachments" 
            checked={hasAttachments}
            onCheckedChange={setHasAttachments}
          />
          <Label htmlFor="has-attachments">Has attachments</Label>
        </div>
        
        <div className="space-y-2">
          <Label>Read status</Label>
          <RadioGroup value={readStatus} onValueChange={setReadStatus}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="read" id="read" />
              <Label htmlFor="read">Read</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unread" id="unread" />
              <Label htmlFor="unread">Unread</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">Reset</Button>
        <Button className="flex-1">Apply Filters</Button>
      </div>
    </div>
  );
};

export default MobileEmailFilters;
