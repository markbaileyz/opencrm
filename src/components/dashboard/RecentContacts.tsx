
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "lead" | "prospect" | "customer" | "inactive";
  lastContact: string;
  profileImage?: string;
}

const RecentContacts = () => {
  const navigate = useNavigate();
  
  // Mock data - in a real app this would come from an API or context
  const recentContacts: Contact[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@healthcareinc.com",
      company: "Healthcare Inc.",
      status: "lead",
      lastContact: "2023-07-15",
      profileImage: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael@medicalgroup.com",
      company: "Medical Group LLC",
      status: "prospect",
      lastContact: "2023-07-18"
    },
    {
      id: "3",
      name: "Emma Wilson",
      email: "emma@hospitalnetwork.org",
      company: "Hospital Network",
      status: "customer",
      lastContact: "2023-07-20",
      profileImage: "https://randomuser.me/api/portraits/women/63.jpg"
    }
  ];
  
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Recent Contacts</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 text-xs"
          onClick={() => navigate('/contacts')}
        >
          View all
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentContacts.map((contact) => (
            <div key={contact.id} className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                {contact.profileImage ? (
                  <AvatarImage src={contact.profileImage} alt={contact.name} />
                ) : null}
                <AvatarFallback>
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{contact.name}</p>
                  <Badge 
                    variant={
                      contact.status === "lead" ? "outline" : 
                      contact.status === "prospect" ? "secondary" : 
                      contact.status === "customer" ? "default" : 
                      "destructive"
                    }
                    className="text-xs"
                  >
                    {contact.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{contact.company}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarDays className="mr-1 h-3 w-3" />
                  Last contact: {formatDate(contact.lastContact)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentContacts;
