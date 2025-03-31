
import React, { useState } from "react";
import { FilterType } from "@/components/roadmap/FeatureFilters";
import { SortType } from "@/components/CRMFeaturesList";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CRMFeaturesList from "@/components/CRMFeaturesList";

// Import refactored components
import RoadmapProjectProgress from "@/components/roadmap/RoadmapProjectProgress";
import RoadmapHeader from "@/components/roadmap/RoadmapHeader";
import StrategicPlan from "@/components/roadmap/StrategicPlan";
import RoadmapCTA from "@/components/roadmap/RoadmapCTA";
import ScrollToTopButton from "@/components/roadmap/ScrollToTopButton";

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
  
  // Scroll functions
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
  
  // Core content to be reused in both dashboard and standalone modes
  const roadmapContent = (
    <>
      <div className="container mx-auto px-4 py-8">
        <RoadmapProjectProgress completionStats={completionStats} />
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
    </>
  );
  
  // If this is being rendered inside the dashboard, skip the navbar and footer
  if (isDashboard) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          {roadmapContent}
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
        {roadmapContent}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Roadmap;
