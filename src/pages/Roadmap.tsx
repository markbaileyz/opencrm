
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CRMFeaturesList from "@/components/CRMFeaturesList";
import { Toaster } from "@/components/ui/toaster";
import { FilterType } from "@/components/roadmap/FeatureFilters";
import { SortType } from "@/components/CRMFeaturesList";
import { ButtonCustom } from "@/components/ui/button-custom";

// Import refactored components
import RoadmapHeader from "@/components/roadmap/RoadmapHeader";
import StrategicPlan from "@/components/roadmap/StrategicPlan";
import RoadmapCTA from "@/components/roadmap/RoadmapCTA";
import ScrollToTopButton from "@/components/roadmap/ScrollToTopButton";

const Roadmap = () => {
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
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
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-end mb-8">
            <Link to="/mind-map">
              <ButtonCustom variant="outline">
                View Mind Map
              </ButtonCustom>
            </Link>
          </div>
        </div>
        
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
