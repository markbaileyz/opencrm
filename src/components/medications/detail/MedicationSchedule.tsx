
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MedicationDose {
  time: string;
  taken: boolean;
  dose: string;
}

interface DailySchedule {
  date: string;
  doses: MedicationDose[];
}

interface MedicationScheduleProps {
  medicationName: string;
  schedule: string;
  weekSchedule?: DailySchedule[];
}

const MedicationSchedule: React.FC<MedicationScheduleProps> = ({
  medicationName,
  schedule,
  weekSchedule = generateDefaultSchedule(schedule),
}) => {
  const { toast } = useToast();
  
  const handleMarkAsTaken = (dateIndex: number, doseIndex: number) => {
    toast({
      title: "Dose marked as taken",
      description: `${medicationName} dose at ${weekSchedule[dateIndex].doses[doseIndex].time} marked as taken.`,
    });
    
    // In a real application, this would update state and possibly persist to a database
  };
  
  const handleSetReminder = () => {
    toast({
      title: "Reminder set",
      description: `You will be reminded to take ${medicationName} as scheduled.`,
    });
    
    // In a real application, this would create actual reminders
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          Medication Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">
            Current schedule: <span className="font-medium text-foreground">{schedule}</span>
          </p>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 mt-2"
            onClick={handleSetReminder}
          >
            <Bell className="h-4 w-4" />
            Set Reminders
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {weekSchedule.map((day, dayIndex) => (
            <Card key={dayIndex} className="overflow-hidden">
              <div className="bg-muted px-3 py-1 border-b">
                <div className="text-sm font-medium">{day.date}</div>
              </div>
              <CardContent className="p-3 space-y-2">
                {day.doses.map((dose, doseIndex) => (
                  <div 
                    key={doseIndex} 
                    className={`flex items-center justify-between border rounded-md p-2 ${
                      dose.taken ? "bg-green-50 border-green-200" : ""
                    }`}
                  >
                    <div>
                      <div className="font-medium">{dose.time}</div>
                      <div className="text-xs text-muted-foreground">{dose.dose}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {dose.taken ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Taken
                        </Badge>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 text-xs"
                          onClick={() => handleMarkAsTaken(dayIndex, doseIndex)}
                        >
                          Mark Taken
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {day.doses.length === 0 && (
                  <div className="text-center py-2 text-muted-foreground text-sm">
                    No doses scheduled
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to generate a default schedule based on the medication schedule string
function generateDefaultSchedule(scheduleString: string): DailySchedule[] {
  const today = new Date();
  const weekSchedule: DailySchedule[] = [];
  const dosePattern = parseDosePattern(scheduleString);

  // Create a schedule for the next 7 days
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);
    
    const formattedDate = formatDate(currentDate);
    const isToday = i === 0;
    
    // Generate doses for this day based on the schedule pattern
    const doses: MedicationDose[] = dosePattern.map(time => ({
      time,
      taken: isToday && new Date().getHours() > parseInt(time.split(':')[0]),
      dose: "Regular dose" // This would come from medication data in a real app
    }));
    
    weekSchedule.push({
      date: formattedDate,
      doses,
    });
  }
  
  return weekSchedule;
}

// Helper function to parse schedule string into dose times
function parseDosePattern(scheduleString: string): string[] {
  // This is a simplified parsing logic - in a real app this would be more sophisticated
  if (scheduleString.includes("Once daily")) {
    return ["09:00"];
  } else if (scheduleString.includes("Twice daily")) {
    return ["09:00", "21:00"];
  } else if (scheduleString.includes("Three times daily")) {
    return ["09:00", "15:00", "21:00"];
  } else if (scheduleString.includes("bedtime")) {
    return ["22:00"];
  } else {
    return ["09:00"]; // Default fallback
  }
}

// Format date to readable string
function formatDate(date: Date): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  
  const isToday = new Date().toDateString() === date.toDateString();
  
  return isToday ? `Today, ${monthName} ${dayOfMonth}` : `${dayName}, ${monthName} ${dayOfMonth}`;
}

export default MedicationSchedule;
