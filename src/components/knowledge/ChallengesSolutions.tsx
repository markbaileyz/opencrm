
import React, { useState } from "react";
import { Search, BookOpen, ShieldCheck, Clock, Users, Database, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: "security" | "performance" | "adoption" | "data" | "integration";
  impact: "low" | "medium" | "high" | "critical";
  solutions: Solution[];
}

interface Solution {
  id: string;
  title: string;
  steps: string[];
  resources?: string[];
}

const ChallengesSolutions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const challengeCategories = [
    { id: "security", label: "Security", icon: <ShieldCheck className="h-4 w-4" /> },
    { id: "performance", label: "Performance", icon: <Clock className="h-4 w-4" /> },
    { id: "adoption", label: "User Adoption", icon: <Users className="h-4 w-4" /> },
    { id: "data", label: "Data Management", icon: <Database className="h-4 w-4" /> },
    { id: "integration", label: "Integration", icon: <BookOpen className="h-4 w-4" /> },
  ];
  
  const challenges: Challenge[] = [
    {
      id: "sec-1",
      title: "Securing Sensitive Customer Data",
      description: "Organizations often struggle with properly securing personal and financial information in their CRM, leading to potential data breaches and compliance issues.",
      category: "security",
      impact: "critical",
      solutions: [
        {
          id: "sec-1-sol-1",
          title: "Implement Role-Based Access Controls",
          steps: [
            "Define user roles based on job responsibilities",
            "Configure field-level security to restrict sensitive data",
            "Implement IP restrictions for admin access",
            "Enable two-factor authentication for all users",
            "Regularly audit user permissions and access logs"
          ],
          resources: [
            "Security Settings Documentation",
            "Compliance Best Practices Guide"
          ]
        },
        {
          id: "sec-1-sol-2",
          title: "Enable Data Encryption",
          steps: [
            "Configure encryption for data at rest",
            "Set up TLS/SSL for data in transit",
            "Implement API security measures",
            "Create secure data backup procedures"
          ]
        }
      ]
    },
    {
      id: "perf-1",
      title: "Slow CRM Performance with Large Data Sets",
      description: "As organizations accumulate more data, many experience performance degradation, leading to user frustration and decreased productivity.",
      category: "performance",
      impact: "high",
      solutions: [
        {
          id: "perf-1-sol-1",
          title: "Optimize Database Performance",
          steps: [
            "Implement regular database maintenance",
            "Create optimized indexes for commonly searched fields",
            "Archive historical data not needed for daily operations",
            "Configure caching for frequently accessed data"
          ]
        },
        {
          id: "perf-1-sol-2",
          title: "Optimize User Interface",
          steps: [
            "Limit records displayed per page",
            "Implement lazy loading for complex components",
            "Optimize custom code and components",
            "Use client-side caching where appropriate"
          ]
        }
      ]
    },
    {
      id: "adopt-1",
      title: "Low User Adoption Rates",
      description: "Many organizations struggle with getting employees to consistently use the CRM system, resulting in incomplete data and reduced ROI.",
      category: "adoption",
      impact: "high",
      solutions: [
        {
          id: "adopt-1-sol-1",
          title: "Develop Comprehensive Training Program",
          steps: [
            "Create role-specific training materials",
            "Implement a phased training approach",
            "Develop quick reference guides for common tasks",
            "Schedule regular refresher training sessions",
            "Create a knowledge base of FAQs and tutorials"
          ]
        },
        {
          id: "adopt-1-sol-2",
          title: "Improve User Experience",
          steps: [
            "Customize layouts to match department workflows",
            "Implement single sign-on for easier access",
            "Create automation for repetitive tasks",
            "Gather and act on user feedback",
            "Recognize and reward active CRM users"
          ]
        }
      ]
    },
    {
      id: "data-1",
      title: "Maintaining Data Quality and Consistency",
      description: "Organizations often struggle with duplicate records, inconsistent data formats, and incomplete information, reducing CRM effectiveness.",
      category: "data",
      impact: "medium",
      solutions: [
        {
          id: "data-1-sol-1",
          title: "Implement Data Validation Rules",
          steps: [
            "Create required fields for essential information",
            "Set up data format validation",
            "Implement picklists for standardized inputs",
            "Configure duplicate detection rules",
            "Create data completeness scoring"
          ]
        },
        {
          id: "data-1-sol-2",
          title: "Establish Data Governance Processes",
          steps: [
            "Appoint data stewards within each department",
            "Create clear data entry guidelines",
            "Schedule regular data quality reviews",
            "Set up automated data cleansing routines",
            "Develop data quality metrics and reporting"
          ]
        }
      ]
    },
    {
      id: "int-1",
      title: "Integrating CRM with Legacy Systems",
      description: "Many organizations struggle to connect their CRM with existing legacy systems, resulting in data silos and duplicate data entry.",
      category: "integration",
      impact: "high",
      solutions: [
        {
          id: "int-1-sol-1",
          title: "Develop API Integration Strategy",
          steps: [
            "Map data structures between systems",
            "Implement middleware for complex integrations",
            "Create robust error handling processes",
            "Establish data synchronization schedules",
            "Monitor integration performance"
          ]
        },
        {
          id: "int-1-sol-2",
          title: "Use Pre-built Connectors",
          steps: [
            "Evaluate available integration tools and connectors",
            "Configure bidirectional data syncing",
            "Test integrations thoroughly in staging environment",
            "Document integration points and data mappings",
            "Train users on cross-system workflows"
          ]
        }
      ]
    }
  ];
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security": return <ShieldCheck className="h-4 w-4" />;
      case "performance": return <Clock className="h-4 w-4" />;
      case "adoption": return <Users className="h-4 w-4" />;
      case "data": return <Database className="h-4 w-4" />;
      case "integration": return <BookOpen className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Filter challenges based on search query and category
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = searchQuery === "" || 
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.solutions.some(sol => sol.title.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === null || challenge.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Common Challenges & Solutions</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover solutions to common CRM implementation challenges and best practices for overcoming them.
        </p>
      </div>

      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <Input
            placeholder="Search challenges and solutions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
            icon={<Search className="h-4 w-4" />}
          />
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button 
            variant={activeCategory === null ? "default" : "outline"} 
            size="sm" 
            onClick={() => setActiveCategory(null)}
            className="rounded-full"
          >
            All Categories
          </Button>
          
          {challengeCategories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="rounded-full flex items-center gap-1"
            >
              {category.icon}
              <span>{category.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {filteredChallenges.length === 0 ? (
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">No challenges match your search</h3>
          <p className="text-muted-foreground mt-1">Try a different search term or category</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchQuery("");
              setActiveCategory(null);
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredChallenges.map((challenge) => (
            <Card key={challenge.id} className="overflow-hidden">
              <CardHeader className="bg-muted border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {getCategoryIcon(challenge.category)}
                      <Badge variant="outline" className="capitalize">
                        {challenge.category.replace('-', ' ')}
                      </Badge>
                      <Badge className={`ml-2 ${getImpactColor(challenge.impact)}`}>
                        {challenge.impact} impact
                      </Badge>
                    </div>
                    <CardTitle>{challenge.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {challenge.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Recommended Solutions
                </h3>
                
                <Tabs defaultValue={challenge.solutions[0].id} className="w-full">
                  <TabsList className="w-full mb-4 grid" style={{ gridTemplateColumns: `repeat(${challenge.solutions.length}, 1fr)` }}>
                    {challenge.solutions.map((solution) => (
                      <TabsTrigger key={solution.id} value={solution.id}>
                        {solution.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {challenge.solutions.map((solution) => (
                    <TabsContent key={solution.id} value={solution.id} className="space-y-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Implementation Steps</h4>
                          <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                            {solution.steps.map((step, idx) => (
                              <li key={idx} className="pl-2">{step}</li>
                            ))}
                          </ol>
                        </div>
                        
                        {solution.resources && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Additional Resources</h4>
                            <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                              {solution.resources.map((resource, idx) => (
                                <li key={idx} className="pl-2">
                                  <Button variant="link" className="p-0 h-auto" onClick={() => {}}>
                                    {resource}
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChallengesSolutions;
