
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import StatsGrid from "./StatsGrid";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NotificationCenter from "./NotificationCenter";
import ProfileMenu from "./ProfileMenu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export interface DashboardHeaderProps {
  isAdmin: boolean;
}

const DashboardHeader = ({ isAdmin }: DashboardHeaderProps) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
    if (searchQuery.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for "${searchQuery}"`,
      });
    }
  };
  
  const handleAIAssistant = () => {
    if (!aiQuery.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setAiQuery("");
      setIsAIDialogOpen(false);
      
      toast({
        title: "AI Assistant Response",
        description: "Your query has been processed. Check the dashboard for insights.",
        variant: "success",
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.displayName || "User"}</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your customers today
          </p>
        </div>
        <div className="flex w-full md:w-auto gap-2 items-center">
          <form onSubmit={handleSearch} className="relative w-full md:w-[240px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <NotificationCenter />
          <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
            <Button 
              onClick={() => setIsAIDialogOpen(true)} 
              variant="outline" 
              size="sm" 
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden md:inline">AI Assistant</span>
            </Button>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ask the AI Assistant</DialogTitle>
                <DialogDescription>
                  Describe what you need help with, and our AI will analyze your data and provide insights.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <Textarea 
                  placeholder="e.g., Show me the contacts with the highest activity this month" 
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsAIDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAIAssistant} disabled={isProcessing || !aiQuery.trim()}>
                  {isProcessing ? "Processing..." : "Get Insights"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <ProfileMenu />
        </div>
      </div>
      
      <StatsGrid isAdmin={isAdmin} />
    </div>
  );
};

export default DashboardHeader;
