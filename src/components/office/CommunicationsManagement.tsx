
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, MessageCircle, Bell, Users, Mail, Phone, Plus, Filter } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  sender: string;
  senderInitials: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  category: 'announcement' | 'message' | 'notification';
  priority?: 'low' | 'medium' | 'high';
}

const CommunicationsManagement: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("messages");
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("all-staff");
  const [selectedCategory, setSelectedCategory] = useState("message");
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [filterCategory, setFilterCategory] = useState("all");
  
  // Sample data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Dr. Smith",
      senderInitials: "DS",
      senderAvatar: undefined,
      content: "Staff meeting will be held in Room 202 at 3PM today.",
      timestamp: new Date(2023, 10, 15, 9, 30),
      isRead: true,
      category: 'announcement'
    },
    {
      id: "2",
      sender: "Sarah Johnson",
      senderInitials: "SJ",
      senderAvatar: undefined,
      content: "Can someone cover my shift this Thursday?",
      timestamp: new Date(2023, 10, 14, 14, 15),
      isRead: false,
      category: 'message'
    },
    {
      id: "3",
      sender: "Admin",
      senderInitials: "A",
      senderAvatar: undefined,
      content: "New guidelines for patient check-in procedures are now available.",
      timestamp: new Date(2023, 10, 14, 10, 0),
      isRead: true,
      category: 'notification',
      priority: 'high'
    },
    {
      id: "4",
      sender: "Michael Chang",
      senderInitials: "MC",
      senderAvatar: undefined,
      content: "Reminder: Complete your compliance training by end of week.",
      timestamp: new Date(2023, 10, 13, 15, 45),
      isRead: true,
      category: 'announcement'
    },
  ]);
  
  // Sample list of staff
  const staffMembers = [
    { id: 'all-staff', name: 'All Staff' },
    { id: 'doctors', name: 'Doctors' },
    { id: 'nurses', name: 'Nurses' },
    { id: 'admin', name: 'Admin Staff' },
    { id: 'reception', name: 'Reception' },
    { id: 'dr-smith', name: 'Dr. Smith' },
    { id: 'dr-johnson', name: 'Dr. Johnson' },
    { id: 'nurse-wilson', name: 'Nurse Wilson' }
  ];
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "Me",
      senderInitials: "ME",
      content: messageText,
      timestamp: new Date(),
      isRead: true,
      category: selectedCategory as 'announcement' | 'message' | 'notification',
      priority: selectedPriority as 'low' | 'medium' | 'high'
    };
    
    setMessages([newMessage, ...messages]);
    setMessageText("");
    
    // Get recipient display name
    const recipientName = staffMembers.find(member => member.id === selectedRecipient)?.name || selectedRecipient;
    
    toast({
      title: "Message Sent",
      description: `Your ${selectedCategory} has been sent to ${recipientName}.`
    });
  };
  
  const markAsRead = (messageId: string) => {
    setMessages(messages.map(message => 
      message.id === messageId 
        ? { ...message, isRead: true } 
        : message
    ));
  };
  
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         message.sender.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === 'all' || message.category === filterCategory;
    
    return matchesSearch && matchesFilter;
  });
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${formatTime(date)}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${formatTime(date)}`;
    } else {
      return `${date.toLocaleDateString()} ${formatTime(date)}`;
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'announcement':
        return <Bell className="h-4 w-4 mr-1" />;
      case 'message':
        return <MessageCircle className="h-4 w-4 mr-1" />;
      case 'notification':
        return <Bell className="h-4 w-4 mr-1" />;
      default:
        return <MessageCircle className="h-4 w-4 mr-1" />;
    }
  };
  
  const getPriorityBadge = (priority?: 'low' | 'medium' | 'high') => {
    if (!priority) return null;
    
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 ml-2">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 ml-2">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 ml-2">Low</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Office Communications</CardTitle>
        <CardDescription>
          Manage internal communications, announcements, and notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full md:w-[400px] mb-4">
            <TabsTrigger value="messages">
              <MessageCircle className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="announcements">
              <Bell className="h-4 w-4 mr-2" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="compose">
              <Send className="h-4 w-4 mr-2" />
              Compose
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Communications</SelectItem>
                  <SelectItem value="message">Messages</SelectItem>
                  <SelectItem value="announcement">Announcements</SelectItem>
                  <SelectItem value="notification">Notifications</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="rounded-md border">
              {filteredMessages.length > 0 ? (
                <div className="divide-y">
                  {filteredMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`p-4 transition-colors hover:bg-muted/50 ${!message.isRead ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}
                      onClick={() => markAsRead(message.id)}
                    >
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={message.senderAvatar} />
                          <AvatarFallback>{message.senderInitials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              <span className="font-medium">{message.sender}</span>
                              <Badge variant="outline" className="ml-2 bg-gray-100 text-gray-800 flex items-center gap-1">
                                {getCategoryIcon(message.category)}
                                {message.category.charAt(0).toUpperCase() + message.category.slice(1)}
                              </Badge>
                              {getPriorityBadge(message.priority)}
                            </div>
                            <span className="text-xs text-muted-foreground">{formatDate(message.timestamp)}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No messages found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="announcements" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Recent Announcements</h3>
              <Button size="sm" onClick={() => setActiveTab("compose")}>
                <Plus className="h-4 w-4 mr-2" />
                New Announcement
              </Button>
            </div>
            
            <div className="rounded-md border">
              {filteredMessages.filter(m => m.category === 'announcement').length > 0 ? (
                <div className="divide-y">
                  {filteredMessages
                    .filter(m => m.category === 'announcement')
                    .map((message) => (
                      <div key={message.id} className="p-4 transition-colors hover:bg-muted/50">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={message.senderAvatar} />
                            <AvatarFallback>{message.senderInitials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{message.sender}</span>
                              <span className="text-xs text-muted-foreground">{formatDate(message.timestamp)}</span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No announcements</h3>
                  <p className="text-muted-foreground">
                    Create a new announcement to share important information
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="compose" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
                    <SelectTrigger>
                      <Users className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-staff">All Staff</SelectItem>
                      <SelectItem value="doctors">Doctors</SelectItem>
                      <SelectItem value="nurses">Nurses</SelectItem>
                      <SelectItem value="admin">Admin Staff</SelectItem>
                      <SelectItem value="reception">Reception</SelectItem>
                      <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                      <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                      <SelectItem value="nurse-wilson">Nurse Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-grow">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Message type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="message">Message</SelectItem>
                        <SelectItem value="announcement">Announcement</SelectItem>
                        <SelectItem value="notification">Notification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-grow">
                    <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Textarea 
                placeholder="Type your message here..." 
                className="min-h-[200px]"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setActiveTab("messages")}>
                  Cancel
                </Button>
                <Button 
                  className="flex items-center gap-2" 
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-lg font-medium mb-4">Communication Channels</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <Mail className="h-4 w-4 mr-2" />
              Email Communications
            </Button>
            <Button variant="outline" className="justify-start">
              <Phone className="h-4 w-4 mr-2" />
              Voice Messages
            </Button>
            <Button variant="outline" className="justify-start">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat Channels
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationsManagement;
