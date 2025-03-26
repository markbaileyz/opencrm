
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import StatsGrid from "./StatsGrid";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NotificationCenter from "./NotificationCenter";
import ProfileMenu from "./ProfileMenu";

interface DashboardHeaderProps {
  isAdmin: boolean;
}

const DashboardHeader = ({ isAdmin }: DashboardHeaderProps) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
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
          <Button variant="outline" size="sm" className="gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="hidden md:inline">AI Assistant</span>
          </Button>
          <ProfileMenu />
        </div>
      </div>
      
      <StatsGrid isAdmin={isAdmin} />
    </div>
  );
};

export default DashboardHeader;
