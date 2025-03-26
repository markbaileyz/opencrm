
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Mail, MailOpen, Send, Trash, Archive, Inbox } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EmailList from "@/components/email/EmailList";
import ComposeEmail from "@/components/email/ComposeEmail";
import { emailData } from "@/data/emailData";

const Email = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const { toast } = useToast();
  
  const handleComposeOpen = () => {
    setIsComposeOpen(true);
  };
  
  const handleComposeSend = (data: any) => {
    console.log("Email sent:", data);
    setIsComposeOpen(false);
    toast({
      title: "Email sent",
      description: "Your email has been sent successfully.",
      variant: "success",
    });
  };
  
  const handleComposeClose = () => {
    setIsComposeOpen(false);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Email</h1>
            <p className="text-muted-foreground">
              Manage your email communications with contacts
            </p>
          </div>
          <Button onClick={handleComposeOpen} className="gap-2">
            <Plus className="h-4 w-4" />
            Compose
          </Button>
        </div>
        
        <Tabs defaultValue="inbox" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="inbox" className="gap-2">
                <Inbox className="h-4 w-4" />
                <span className="hidden sm:inline">Inbox</span>
              </TabsTrigger>
              <TabsTrigger value="sent" className="gap-2">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Sent</span>
              </TabsTrigger>
              <TabsTrigger value="drafts" className="gap-2">
                <MailOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Drafts</span>
              </TabsTrigger>
              <TabsTrigger value="trash" className="gap-2">
                <Trash className="h-4 w-4" />
                <span className="hidden sm:inline">Trash</span>
              </TabsTrigger>
              <TabsTrigger value="archive" className="gap-2">
                <Archive className="h-4 w-4" />
                <span className="hidden sm:inline">Archive</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="inbox" className="mt-0">
            <EmailList 
              emails={emailData.filter(email => email.folder === 'inbox')} 
              folder="inbox" 
            />
          </TabsContent>
          
          <TabsContent value="sent" className="mt-0">
            <EmailList 
              emails={emailData.filter(email => email.folder === 'sent')} 
              folder="sent" 
            />
          </TabsContent>
          
          <TabsContent value="drafts" className="mt-0">
            <EmailList 
              emails={emailData.filter(email => email.folder === 'drafts')} 
              folder="drafts" 
            />
          </TabsContent>
          
          <TabsContent value="trash" className="mt-0">
            <EmailList 
              emails={emailData.filter(email => email.folder === 'trash')} 
              folder="trash" 
            />
          </TabsContent>
          
          <TabsContent value="archive" className="mt-0">
            <EmailList 
              emails={emailData.filter(email => email.folder === 'archive')} 
              folder="archive" 
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <ComposeEmail 
        isOpen={isComposeOpen} 
        onClose={handleComposeClose} 
        onSend={handleComposeSend} 
      />
    </DashboardLayout>
  );
};

export default Email;
