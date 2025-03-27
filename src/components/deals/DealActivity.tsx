
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Plus, Phone, Mail, Calendar, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface DealActivityProps {
  dealId: string;
}

const DealActivity: React.FC<DealActivityProps> = ({ dealId }) => {
  const { toast } = useToast();
  const [activityType, setActivityType] = React.useState<string>("note");
  const [newActivity, setNewActivity] = React.useState<string>("");
  const [showActivityForm, setShowActivityForm] = React.useState<boolean>(false);

  const handleAddActivity = () => {
    if (!newActivity.trim()) {
      toast({
        title: "Error",
        description: "Activity description cannot be empty",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would call an API
    toast({
      title: "Activity added",
      description: `${activityType} activity added to the deal`,
    });

    // Reset form
    setNewActivity("");
    setShowActivityForm(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "meeting":
        return <Calendar className="h-4 w-4" />;
      case "note":
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  // Sample activities
  const activities = [
    {
      id: "1",
      type: "call",
      description: "Discussed implementation timeline",
      date: new Date(2023, 10, 15, 14, 30),
      user: "Alex Johnson"
    },
    {
      id: "2",
      type: "email",
      description: "Sent proposal document",
      date: new Date(2023, 10, 14, 9, 15),
      user: "Alex Johnson"
    },
    {
      id: "3",
      type: "meeting",
      description: "Initial discovery call with technical team",
      date: new Date(2023, 10, 10, 11, 0),
      user: "Sarah Miller"
    },
    {
      id: "4",
      type: "note",
      description: "Client mentioned they're comparing our offering with Competitor X",
      date: new Date(2023, 10, 5, 16, 45),
      user: "Alex Johnson"
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center">
          <span>Deal Activities</span>
          <Button
            size="sm"
            onClick={() => setShowActivityForm(!showActivityForm)}
            className="gap-1"
          >
            <Plus className="h-4 w-4" />
            {showActivityForm ? "Cancel" : "Add Activity"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showActivityForm && (
          <div className="mb-6 p-4 border rounded-md bg-muted/30">
            <h4 className="text-sm font-medium mb-3">New Activity</h4>
            <div className="space-y-3">
              <div>
                <Select
                  value={activityType}
                  onValueChange={setActivityType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Activity Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="note">Note</SelectItem>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Describe the activity..."
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={handleAddActivity} className="w-full">
                Save Activity
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex gap-3">
                <div className="bg-muted rounded-full p-2 h-8 w-8 flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium capitalize">{activity.type}</div>
                    <div className="text-xs text-muted-foreground">
                      {activity.date.toLocaleString()}
                    </div>
                  </div>
                  <p className="text-sm mt-1">{activity.description}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    by {activity.user}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {activities.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <p>No activities recorded yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DealActivity;
