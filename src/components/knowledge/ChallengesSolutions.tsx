
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ThumbsUp, MessageSquare, ArrowRight } from "lucide-react";

// Sample data structure for challenges and solutions
const challengesData = {
  sales: [
    {
      id: "sales-1",
      title: "Long Sales Cycle",
      description: "Deals take too long to close, leading to revenue delays and forecasting challenges.",
      solution: "Implement a structured sales process with clear milestones and follow-up schedules. Use automated reminders and activity tracking to keep deals moving forward. Identify common bottlenecks in your sales cycle and create strategies to address them.",
      industry: "All",
      difficulty: "Medium",
      votes: 45,
      comments: 12
    },
    {
      id: "sales-2",
      title: "Low Conversion Rates",
      description: "Too many leads enter the pipeline but few convert to actual customers.",
      solution: "Improve lead qualification criteria to focus on quality over quantity. Implement lead scoring to prioritize high-potential prospects. Analyze conversion data at each pipeline stage to identify where prospects are dropping off and optimize those areas.",
      industry: "Retail, B2B",
      difficulty: "High",
      votes: 72,
      comments: 24
    },
    {
      id: "sales-3",
      title: "Inconsistent Sales Performance",
      description: "Sales results vary widely among team members and across different time periods.",
      solution: "Standardize sales processes and scripts to ensure consistency. Implement regular training and coaching sessions. Create a knowledge base of successful sales tactics and objection handling techniques that all team members can access.",
      industry: "All",
      difficulty: "Medium",
      votes: 38,
      comments: 9
    }
  ],
  marketing: [
    {
      id: "marketing-1",
      title: "Poor Lead Quality",
      description: "Marketing campaigns generate high volumes of leads that rarely convert to sales.",
      solution: "Refine target audience definitions and buyer personas. Create content that addresses specific pain points of your ideal customers. Implement progressive profiling to gather more qualification data. Establish regular feedback loops between sales and marketing teams.",
      industry: "B2B, SaaS",
      difficulty: "High",
      votes: 56,
      comments: 18
    },
    {
      id: "marketing-2",
      title: "Difficulty Measuring ROI",
      description: "Cannot accurately attribute revenue to specific marketing activities or campaigns.",
      solution: "Implement proper tracking with UTM parameters across all campaigns. Set up multi-touch attribution models in your analytics. Create closed-loop reporting between your CRM and marketing automation tools to track leads from first touch to closed deal.",
      industry: "All",
      difficulty: "High",
      votes: 64,
      comments: 15
    },
    {
      id: "marketing-3",
      title: "Content Engagement Issues",
      description: "Marketing content receives low engagement and fails to drive lead generation.",
      solution: "Conduct audience research to understand content preferences and consumption habits. Develop a content strategy aligned with the buyer's journey. Test different formats, topics, and distribution channels to identify what resonates best with your audience.",
      industry: "Media, Education, B2C",
      difficulty: "Medium",
      votes: 41,
      comments: 7
    }
  ],
  customer: [
    {
      id: "customer-1",
      title: "High Customer Churn",
      description: "Customers leave at a high rate, impacting recurring revenue and growth.",
      solution: "Implement an early warning system that identifies at-risk customers based on product usage, support tickets, and engagement metrics. Create a customer success program with proactive outreach at key points in the customer lifecycle. Conduct exit interviews to understand churn reasons.",
      industry: "SaaS, Subscription Services",
      difficulty: "High",
      votes: 83,
      comments: 31
    },
    {
      id: "customer-2",
      title: "Slow Response Times",
      description: "Customer support takes too long to respond to inquiries and resolve issues.",
      solution: "Implement a ticket prioritization system based on issue severity and customer tier. Create a knowledge base with solutions to common problems that both customers and support staff can access. Use automation for routine inquiries and follow-ups.",
      industry: "All",
      difficulty: "Medium",
      votes: 59,
      comments: 14
    },
    {
      id: "customer-3",
      title: "Limited Customer Insights",
      description: "Lack of data on customer behavior and preferences makes personalization difficult.",
      solution: "Centralize customer data from all touchpoints in your CRM. Implement behavior tracking on your website and in your product. Create custom fields to track relevant industry-specific information. Develop regular voice-of-customer surveys to gather direct feedback.",
      industry: "Retail, Financial Services",
      difficulty: "Medium",
      votes: 47,
      comments: 11
    }
  ],
  technical: [
    {
      id: "technical-1",
      title: "Data Silos",
      description: "Customer information is scattered across multiple systems with no integration.",
      solution: "Map out all systems containing customer data and implement API integrations where possible. Consider middleware solutions for systems without native integration capabilities. Establish a single source of truth for customer data with bi-directional syncing between systems.",
      industry: "All",
      difficulty: "High",
      votes: 76,
      comments: 22
    },
    {
      id: "technical-2",
      title: "Poor Data Quality",
      description: "CRM contains duplicate, outdated, or incomplete customer records.",
      solution: "Implement validation rules and required fields to ensure data completeness. Use data cleansing tools to identify and merge duplicate records. Establish regular data audits and cleaning schedules. Create data governance policies and train staff on proper data entry.",
      industry: "All",
      difficulty: "Medium",
      votes: 69,
      comments: 17
    },
    {
      id: "technical-3",
      title: "Limited Adoption",
      description: "Team members don't consistently use the CRM, leading to incomplete data.",
      solution: "Customize the CRM interface to match team workflows. Provide comprehensive training and create quick reference guides. Demonstrate the value of CRM usage with relevant reports and insights. Consider gamification elements to encourage adoption.",
      industry: "All",
      difficulty: "Medium",
      votes: 54,
      comments: 13
    }
  ]
};

const ChallengesSolutions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("sales");
  
  // Filter challenges based on search query
  const filterChallenges = (challenges: any[]) => {
    if (!searchQuery) return challenges;
    
    return challenges.filter(challenge => 
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.solution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.industry.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const filteredSales = filterChallenges(challengesData.sales);
  const filteredMarketing = filterChallenges(challengesData.marketing);
  const filteredCustomer = filterChallenges(challengesData.customer);
  const filteredTechnical = filterChallenges(challengesData.technical);
  
  // Check if any results match the search query
  const hasResults = 
    filteredSales.length > 0 || 
    filteredMarketing.length > 0 || 
    filteredCustomer.length > 0 || 
    filteredTechnical.length > 0;
  
  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Common Challenges & Solutions</h1>
          <p className="text-muted-foreground">
            Explore practical solutions to common CRM challenges across various business functions.
          </p>
        </div>
        
        <div className="relative max-w-md mx-auto w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search challenges & solutions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          {searchQuery && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2"
              onClick={() => setSearchQuery("")}
            >
              Clear
            </Button>
          )}
        </div>
        
        {searchQuery && (
          <div className="text-sm text-muted-foreground text-center">
            {hasResults ? 
              `Showing results for "${searchQuery}"` : 
              `No results found for "${searchQuery}"`
            }
          </div>
        )}
        
        <Tabs defaultValue="sales" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sales">Sales Challenges</TabsTrigger>
            <TabsTrigger value="marketing">Marketing Challenges</TabsTrigger>
            <TabsTrigger value="customer">Customer Service</TabsTrigger>
            <TabsTrigger value="technical">Technical Issues</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="mt-6">
            {renderChallengesList(filteredSales)}
          </TabsContent>
          
          <TabsContent value="marketing" className="mt-6">
            {renderChallengesList(filteredMarketing)}
          </TabsContent>
          
          <TabsContent value="customer" className="mt-6">
            {renderChallengesList(filteredCustomer)}
          </TabsContent>
          
          <TabsContent value="technical" className="mt-6">
            {renderChallengesList(filteredTechnical)}
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Share Your Own Challenge</CardTitle>
            <CardDescription>
              Have you solved a CRM challenge not listed here? Share your experience to help others.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Submit Your Solution</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
  
  // Helper function to render challenges list
  function renderChallengesList(challenges: any[]) {
    if (challenges.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No challenges match your search criteria.</p>
          {searchQuery && (
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </Button>
          )}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 gap-6">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{challenge.title}</CardTitle>
                  <CardDescription className="mt-2">{challenge.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className={`${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </Badge>
                  <Badge variant="outline">{challenge.industry}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-medium mb-2">Recommended Solution:</h4>
                <p className="text-muted-foreground">{challenge.solution}</p>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 flex justify-between">
              <div className="flex gap-4 items-center">
                <span className="flex items-center gap-1 text-sm">
                  <ThumbsUp className="h-4 w-4" /> {challenge.votes}
                </span>
                <span className="flex items-center gap-1 text-sm">
                  <MessageSquare className="h-4 w-4" /> {challenge.comments}
                </span>
              </div>
              <Button size="sm" variant="ghost" className="gap-1">
                View Full Solution <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
};

export default ChallengesSolutions;
