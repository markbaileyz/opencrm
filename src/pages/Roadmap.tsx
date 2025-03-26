
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CRMFeaturesList from "@/components/CRMFeaturesList";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter, FileText, Search, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import { FilterType } from "@/components/roadmap/FeatureFilters";
import { SortType } from "@/components/CRMFeaturesList";

const Roadmap = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [activeSort, setActiveSort] = useState<SortType>("popular");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Function to handle smooth scrolling to features list
  const scrollToFeatures = () => {
    document.getElementById('features-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to scroll back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-gradient-to-b from-primary/10 to-background pt-16 pb-12 mb-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">NextCRM Product Roadmap</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              See what features we've implemented and what's coming next in our development journey.
              Use the filters below to focus on specific feature statuses.
            </p>
            <div className="flex justify-center items-center gap-2">
              <Button 
                variant="outline" 
                className="mx-auto"
                onClick={scrollToFeatures}
              >
                Explore Our Roadmap <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-primary/10" : ""}
              >
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter features</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setShowSearch(!showSearch)}
                className={showSearch ? "bg-primary/10" : ""}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search features</span>
              </Button>
            </div>
            
            {showSearch && (
              <div className="mt-4 max-w-md mx-auto animate-fade-down">
                <Input
                  type="text"
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
            )}
            
            {showFilters && (
              <div className="mt-4 max-w-lg mx-auto p-4 border rounded-lg bg-card animate-fade-down">
                <h3 className="text-lg font-medium mb-2">Filter Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Status</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant={activeFilter === "all" ? "default" : "outline"}
                        onClick={() => setActiveFilter("all")}
                      >
                        All
                      </Button>
                      <Button 
                        size="sm" 
                        variant={activeFilter === "implemented" ? "default" : "outline"}
                        onClick={() => setActiveFilter("implemented")}
                      >
                        Implemented
                      </Button>
                      <Button 
                        size="sm" 
                        variant={activeFilter === "coming-soon" ? "default" : "outline"}
                        onClick={() => setActiveFilter("coming-soon")}
                      >
                        Coming Soon
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Sort By</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant={activeSort === "popular" ? "default" : "outline"}
                        onClick={() => setActiveSort("popular")}
                      >
                        Most Popular
                      </Button>
                      <Button 
                        size="sm" 
                        variant={activeSort === "az" ? "default" : "outline"}
                        onClick={() => setActiveSort("az")}
                      >
                        A-Z
                      </Button>
                      <Button 
                        size="sm" 
                        variant={activeSort === "za" ? "default" : "outline"}
                        onClick={() => setActiveSort("za")}
                      >
                        Z-A
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="container mx-auto px-4 mb-12 text-center">
          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-2xl font-bold mb-3">Strategic Development Plan</h2>
            <p className="text-muted-foreground mb-6">
              Explore our comprehensive OpenCRM strategic roadmap - a detailed plan for developing a HIPAA-compliant healthcare CRM system.
            </p>
            <Button asChild>
              <Link to="/open-crm-roadmap" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                View OpenCRM Roadmap
              </Link>
            </Button>
          </div>
        </div>
        
        <div id="features-list">
          <CRMFeaturesList 
            searchQuery={searchQuery} 
            filterType={activeFilter}
            sortOption={activeSort}
            categoryFilter={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to see the CRM in action?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Try out the existing features and provide feedback to help us improve.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contacts">Manage Contacts</Link>
            </Button>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 rounded-full shadow-md"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-4 w-4" />
          <span className="sr-only">Back to top</span>
        </Button>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Roadmap;
