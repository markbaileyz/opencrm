
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Bell, CalendarClock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RefillReminderProps {
  medicationName: string;
  refills?: number;
  expiryDate?: string;
  daysSupply?: number;
}

const RefillReminder: React.FC<RefillReminderProps> = ({
  medicationName,
  refills = 0,
  expiryDate,
  daysSupply = 30,
}) => {
  const [isReminderSet, setIsReminderSet] = useState(false);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      daysBeforeRefill: "7",
      notificationType: "email",
    },
  });
  
  const handleSetReminder = (data: any) => {
    toast({
      title: "Refill Reminder Set",
      description: `You will be reminded ${data.daysBeforeRefill} days before your ${medicationName} needs to be refilled.`,
    });
    
    setIsReminderSet(true);
    
    // In a real application, this would save the reminder to a database
  };
  
  const calculatedRefillDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + daysSupply);
    return today.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bell className="h-5 w-5 text-blue-500" />
          Refill Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Refills remaining:</span>
            <span className={`font-medium ${refills <= 1 ? "text-amber-600" : ""}`}>
              {refills} {refills === 1 ? "refill" : "refills"}
            </span>
          </div>
          
          {expiryDate && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Prescription expires:</span>
              <span className="font-medium">{expiryDate}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Next refill date (est.):</span>
            <span className="font-medium">{calculatedRefillDate()}</span>
          </div>
        </div>
        
        {refills <= 1 && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4 flex gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">Low on refills</p>
              <p className="text-xs text-amber-700 mt-1">
                Contact your healthcare provider soon to renew your prescription.
              </p>
            </div>
          </div>
        )}
        
        {!isReminderSet ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSetReminder)} className="space-y-3">
              <FormField
                control={form.control}
                name="daysBeforeRefill"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Remind me before refill</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select days" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="3">3 days before</SelectItem>
                        <SelectItem value="5">5 days before</SelectItem>
                        <SelectItem value="7">1 week before</SelectItem>
                        <SelectItem value="14">2 weeks before</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notificationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Notification type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select notification type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="app">App notification</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">Set Reminder</Button>
            </form>
          </Form>
        ) : (
          <div>
            <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4 flex gap-2">
              <CalendarClock className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">Reminder set</p>
                <p className="text-xs text-green-700 mt-1">
                  You'll be notified before your next refill date.
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsReminderSet(false)}
            >
              Modify Reminder
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RefillReminder;
