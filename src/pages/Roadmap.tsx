
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CRMFeaturesList from "@/components/CRMFeaturesList";
import { Toaster } from "@/components/ui/toaster";
import { FilterType } from "@/components/roadmap/FeatureFilters";
import { SortType } from "@/components/CRMFeaturesList";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

// Import refactored components
import RoadmapHeader from "@/components/roadmap/RoadmapHeader";
import StrategicPlan from "@/components/roadmap/StrategicPlan";
import RoadmapCTA from "@/components/roadmap/RoadmapCTA";
import ScrollToTopButton from "@/components/roadmap/ScrollToTopButton";
import { VERSION } from "@/version";

interface RoadmapProps {
  isDashboard?: boolean;
}

const Roadmap: React.FC<RoadmapProps> = ({ isDashboard = false }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [activeSort, setActiveSort] = useState<SortType>("popular");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const scrollToFeatures = () => {
    document.getElementById('features-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Project completion metrics
  const completionStats = {
    total: 140,
    completed: 94,
    inProgress: 26,
    planned: 20
  };
  
  const completionPercentage = Math.round((completionStats.completed / completionStats.total) * 100);
  
  // If this is being rendered inside the dashboard, skip the navbar and footer
  if (isDashboard) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8 bg-card p-6 rounded-lg border shadow">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h1 className="text-3xl font-bold">Project Progress</h1>
                  <p className="text-muted-foreground">Version {VERSION.toString()}</p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Badge variant="outline" className="text-sm">
                    {completionStats.completed} / {completionStats.total} Features
                  </Badge>
                  <Badge variant={completionPercentage > 75 ? "success" : completionPercentage > 50 ? "primary" : "warning"} className="text-sm">
                    {completionPercentage}% Complete
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-background p-4 rounded border flex items-center">
                  <div className="mr-3 p-2 bg-green-500/10 rounded-full">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">{completionStats.completed}</p>
                  </div>
                </div>
                <div className="bg-background p-4 rounded border flex items-center">
                  <div className="mr-3 p-2 bg-blue-500/10 rounded-full">
                    <Check className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold">{completionStats.inProgress}</p>
                  </div>
                </div>
                <div className="bg-background p-4 rounded border flex items-center">
                  <div className="mr-3 p-2 bg-amber-500/10 rounded-full">
                    <Check className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Planned</p>
                    <p className="text-2xl font-bold">{completionStats.planned}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Link to="/mind-map">
                  <ButtonCustom variant="outline">
                    View Mind Map
                  </ButtonCustom>
                </Link>
              </div>
            </div>
          </div>
          
          <RoadmapHeader 
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            activeSort={activeSort}
            setActiveSort={setActiveSort}
            scrollToFeatures={scrollToFeatures}
          />
          
          <StrategicPlan />
          
          <div id="features-list">
            <CRMFeaturesList 
              searchQuery={searchQuery} 
              filterType={activeFilter}
              sortOption={activeSort}
              categoryFilter={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          
          <RoadmapCTA />
          
          <ScrollToTopButton scrollToTop={scrollToTop} />
        </main>
        
        <Toaster />
      </div>
    );
  }
  
  // Original Roadmap for public route with Navbar and Footer
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 bg-card p-6 rounded-lg border shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold">Project Progress</h1>
                <p className="text-muted-foreground">Version {VERSION.toString()}</p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Badge variant="outline" className="text-sm">
                  {completionStats.completed} / {completionStats.total} Features
                </Badge>
                <Badge variant={completionPercentage > 75 ? "success" : completionPercentage > 50 ? "primary" : "warning"} className="text-sm">
                  {completionPercentage}% Complete
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-background p-4 rounded border flex items-center">
                <div className="mr-3 p-2 bg-green-500/10 rounded-full">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{completionStats.completed}</p>
                </div>
              </div>
              <div className="bg-background p-4 rounded border flex items-center">
                <div className="mr-3 p-2 bg-blue-500/10 rounded-full">
                  <Check className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{completionStats.inProgress}</p>
                </div>
              </div>
              <div className="bg-background p-4 rounded border flex items-center">
                <div className="mr-3 p-2 bg-amber-500/10 rounded-full">
                  <Check className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Planned</p>
                  <p className="text-2xl font-bold">{completionStats.planned}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Link to="/mind-map">
                <ButtonCustom variant="outline">
                  View Mind Map
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
        
        <RoadmapHeader 
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          scrollToFeatures={scrollToFeatures}
        />
        
        <StrategicPlan />
        
        <div id="features-list">
          <CRMFeaturesList 
            searchQuery={searchQuery} 
            filterType={activeFilter}
            sortOption={activeSort}
            categoryFilter={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        
        <RoadmapCTA />
        
        <ScrollToTopButton scrollToTop={scrollToTop} />
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Roadmap;
