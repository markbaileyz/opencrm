
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type NotificationType = "task" | "message" | "system" | "meeting";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationType;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Task Assigned",
    message: "You've been assigned to follow up with Acme Corp.",
    time: "10 minutes ago",
    read: false,
    type: "task"
  },
  {
    id: "2",
    title: "Meeting Reminder",
    message: "Your meeting with John Doe starts in 30 minutes.",
    time: "25 minutes ago",
    read: false,
    type: "meeting"
  },
  {
    id: "3",
    title: "New Message",
    message: "Sarah sent you a message regarding the project deadline.",
    time: "1 hour ago",
    read: true,
    type: "message"
  },
  {
    id: "4",
    title: "System Update",
    message: "OpenSRM will be updated tonight at 2 AM. Expect brief downtime.",
    time: "3 hours ago",
    read: true,
    type: "system"
  }
];

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      variant: "success"
    });
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getTypeIcon = (type: NotificationType) => {
    switch(type) {
      case "task":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800">Task</Badge>;
      case "message":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Message</Badge>;
      case "system":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">System</Badge>;
      case "meeting":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Meeting</Badge>;
      default:
        return null;
    }
  };

  // Simulate a new notification arriving
  useEffect(() => {
    const timer = setTimeout(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: "Deal Update",
        message: "The deal with TechCorp has moved to negotiation stage.",
        time: "Just now",
        read: false,
        type: "task"
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      
      toast({
        title: "New notification",
        description: newNotification.title,
        variant: "info"
      });
    }, 45000); // 45 seconds after component mounts
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm" 
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>
      
      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80 z-50 shadow-lg animate-in fade-in-50 slide-in-from-top-5">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
                  Mark all as read
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="max-h-80 overflow-y-auto p-0">
            {notifications.length > 0 ? (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={cn(
                      "p-3 hover:bg-muted/50 relative border-b last:border-b-0",
                      notification.read ? "bg-background" : "bg-muted/30"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(notification.type)}
                          <p className="font-medium text-sm">{notification.title}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => markAsRead(notification.id)}
                          >
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => dismissNotification(notification.id)}
                        >
                          <X className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-muted-foreground text-sm">No notifications</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationCenter;
