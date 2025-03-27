import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, ThumbsUp, ThumbsDown, ArrowRight } from "lucide-react";
import ResponsiveContainer from "../ui/responsive-container";

const ChallengesSolutions = () => {
  const [activeTab, setActiveTab] = React.useState("sales");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = React.useState<string[]>([]);

  const challenges = [
    {
      id: 1,
      title: "Lead Qualification Bottlenecks",
      description: "Sales teams struggle to efficiently qualify leads, resulting in wasted time on low-potential prospects.",
      area: "sales",
      difficulty: "medium",
      industries: ["retail", "saas"],
      solutions: [
        {
          id: 101,
          title: "AI-Powered Lead Scoring",
          description: "Implement machine learning algorithms to automatically score and prioritize leads based on historical conversion data.",
          votes: 42,
        },
        {
          id: 102,
          title: "Qualification Workflow Automation",
          description: "Create automated workflows with pre-qualification questions that route leads to appropriate sales representatives.",
          votes: 38,
        }
      ]
    },
    {
      id: 2,
      title: "Customer Data Fragmentation",
      description: "Customer information scattered across multiple systems creates an incomplete view of customer relationships.",
      area: "service",
      difficulty: "hard",
      industries: ["healthcare", "financial"],
      solutions: [
        {
          id: 201,
          title: "Unified Customer Data Platform",
          description: "Implement a CDP that aggregates data from all touchpoints to create comprehensive customer profiles.",
          votes: 56,
        }
      ]
    },
    {
      id: 3,
      title: "Campaign Performance Tracking",
      description: "Marketing teams struggle to attribute revenue to specific campaigns and measure true ROI.",
      area: "marketing",
      difficulty: "medium",
      industries: ["retail", "ecommerce"],
      solutions: [
        {
          id: 301,
          title: "Multi-Touch Attribution Modeling",
          description: "Implement advanced attribution models that track customer interactions across all touchpoints.",
          votes: 29,
        },
        {
          id: 302,
          title: "Integrated Campaign Analytics Dashboard",
          description: "Create a unified dashboard that pulls data from all marketing channels to provide comprehensive performance metrics.",
          votes: 35,
        }
      ]
    },
    {
      id: 4,
      title: "Sales Forecast Accuracy",
      description: "Sales managers struggle to create reliable forecasts, leading to resource allocation issues.",
      area: "sales",
      difficulty: "hard",
      industries: ["manufacturing", "saas"],
      solutions: [
        {
          id: 401,
          title: "Predictive Analytics Forecasting",
          description: "Use machine learning models that incorporate historical data, market trends, and sales activities to generate accurate forecasts.",
          votes: 48,
        }
      ]
    },
    {
      id: 5,
      title: "Customer Churn Prevention",
      description: "Identifying at-risk customers before they churn remains challenging for many service teams.",
      area: "service",
      difficulty: "medium",
      industries: ["saas", "telecom"],
      solutions: [
        {
          id: 501,
          title: "Early Warning System",
          description: "Implement a predictive churn model that identifies at-risk customers based on behavior patterns and engagement metrics.",
          votes: 52,
        },
        {
          id: 502,
          title: "Proactive Engagement Program",
          description: "Create automated workflows that trigger personalized outreach when customers show signs of disengagement.",
          votes: 39,
        }
      ]
    },
    {
      id: 6,
      title: "Content Personalization at Scale",
      description: "Delivering personalized content to different audience segments efficiently.",
      area: "marketing",
      difficulty: "medium",
      industries: ["ecommerce", "media"],
      solutions: [
        {
          id: 601,
          title: "Dynamic Content Engine",
          description: "Implement a system that automatically tailors content based on user behavior, preferences, and segment.",
          votes: 44,
        }
      ]
    }
  ];

  const filteredChallenges = challenges
    .filter(challenge => challenge.area === activeTab)
    .filter(challenge => {
      if (searchQuery === "") return true;
      return (
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter(challenge => {
      if (selectedDifficulty.length === 0) return true;
      return selectedDifficulty.includes(challenge.difficulty);
    })
    .filter(challenge => {
      if (selectedIndustries.length === 0) return true;
      return challenge.industries.some(industry => selectedIndustries.includes(industry));
    });

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty) 
        : [...prev, difficulty]
    );
  };

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry) 
        ? prev.filter(i => i !== industry) 
        : [...prev, industry]
    );
  };

  const clearFilters = () => {
    setSelectedDifficulty([]);
    setSelectedIndustries([]);
    setSearchQuery("");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleVote = (challengeId: number, solutionId: number, voteType: 'up' | 'down') => {
    console.log(`Voted ${voteType} for solution ${solutionId} of challenge ${challengeId}`);
    // In a real app, this would update state or call an API
  };

  // Mobile optimized filters
  const MobileFilters = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground">Difficulty</h4>
        <div className="flex flex-wrap gap-2">
          {["easy", "medium", "hard"].map(difficulty => (
            <Badge 
              key={difficulty}
              variant={selectedDifficulty.includes(difficulty) ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => handleDifficultyChange(difficulty)}
            >
              {difficulty}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground">Industry</h4>
        <div className="flex flex-wrap gap-2">
          {["retail", "saas", "healthcare", "financial", "ecommerce", "manufacturing", "telecom", "media"].map(industry => (
            <Badge 
              key={industry}
              variant={selectedIndustries.includes(industry) ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => handleIndustryChange(industry)}
            >
              {industry}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
  
  // Desktop optimized filters
  const DesktopFilters = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-3">Difficulty</h4>
          <div className="space-y-2">
            {["easy", "medium", "hard"].map(difficulty => (
              <div key={difficulty} className="flex items-center space-x-2">
                <Checkbox 
                  id={`difficulty-${difficulty}`}
                  checked={selectedDifficulty.includes(difficulty)}
                  onCheckedChange={() => handleDifficultyChange(difficulty)}
                />
                <label 
                  htmlFor={`difficulty-${difficulty}`}
                  className="text-sm capitalize cursor-pointer"
                >
                  {difficulty}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-3">Industry</h4>
          <div className="space-y-2">
            {["retail", "saas", "healthcare", "financial", "ecommerce", "manufacturing", "telecom", "media"].map(industry => (
              <div key={industry} className="flex items-center space-x-2">
                <Checkbox 
                  id={`industry-${industry}`}
                  checked={selectedIndustries.includes(industry)}
                  onCheckedChange={() => handleIndustryChange(industry)}
                />
                <label 
                  htmlFor={`industry-${industry}`}
                  className="text-sm capitalize cursor-pointer"
                >
                  {industry}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Challenges & Solutions</h2>
          <p className="text-muted-foreground">
            Browse common CRM challenges and recommended solutions by business area.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search challenges..."
              className="w-full md:w-[200px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="hidden md:block">
          <DesktopFilters />
        </div>
        
        {showFilters && (
          <div className="md:hidden">
            <Card>
              <CardContent className="pt-6">
                <MobileFilters />
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="md:col-span-3 space-y-6">
          <Tabs defaultValue="sales" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="sales" className="flex-1 md:flex-none">Sales</TabsTrigger>
              <TabsTrigger value="marketing" className="flex-1 md:flex-none">Marketing</TabsTrigger>
              <TabsTrigger value="service" className="flex-1 md:flex-none">Service</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6 space-y-6">
              {filteredChallenges.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No challenges found matching your criteria.</p>
                  <Button variant="link" onClick={clearFilters}>Clear filters</Button>
                </div>
              ) : (
                filteredChallenges.map(challenge => (
                  <Card key={challenge.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{challenge.title}</CardTitle>
                          <CardDescription className="mt-2">{challenge.description}</CardDescription>
                        </div>
                        <Badge className={cn("ml-2", getDifficultyColor(challenge.difficulty))}>
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {challenge.industries.map(industry => (
                          <Badge key={industry} variant="outline" className="capitalize">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium mb-4">Recommended Solutions</h4>
                      <div className="space-y-4">
                        {challenge.solutions.map(solution => (
                          <div key={solution.id} className="p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-start justify-between">
                              <div>
                                <h5 className="font-medium">{solution.title}</h5>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {solution.description}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <span>{solution.votes}</span>
                                <span className="text-muted-foreground">votes</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 px-2"
                                  onClick={() => handleVote(challenge.id, solution.id, 'up')}
                                >
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  Helpful
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 px-2"
                                  onClick={() => handleVote(challenge.id, solution.id, 'down')}
                                >
                                  <ThumbsDown className="h-4 w-4 mr-1" />
                                  Not helpful
                                </Button>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8">
                                Details
                                <ArrowRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ChallengesSolutions;
