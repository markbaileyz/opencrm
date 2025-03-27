
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ChevronRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Knowledge base data structure
const knowledgeBaseData = {
  faq: [
    {
      category: "General",
      questions: [
        {
          id: "faq-1",
          question: "What is OpenCRM?",
          answer: "OpenCRM is a comprehensive customer relationship management solution designed to help businesses manage interactions with current and potential customers. It includes tools for contact management, sales pipeline tracking, marketing automation, and customer service."
        },
        {
          id: "faq-2",
          question: "How do I get started with OpenCRM?",
          answer: "To get started with OpenCRM, create an account, set up your organization profile, import your contacts or add them manually, and customize your dashboard. Our onboarding wizard will guide you through the essential steps to set up your CRM environment."
        },
        {
          id: "faq-3",
          question: "Is OpenCRM suitable for small businesses?",
          answer: "Yes, OpenCRM is designed to scale with your business. It offers flexible pricing plans and features that cater to small businesses, startups, and enterprise organizations alike."
        }
      ]
    },
    {
      category: "Features",
      questions: [
        {
          id: "feat-1",
          question: "What features are included in contact management?",
          answer: "Contact management includes storing contact information, communication history, activity tracking, tagging and segmentation, custom fields, follow-up reminders, and import/export capabilities."
        },
        {
          id: "feat-2",
          question: "How does the sales pipeline work?",
          answer: "The sales pipeline visualizes your sales process stages from lead to closed deal. You can customize stages, move deals between stages with drag-and-drop, track progress, and get insights on conversion rates and bottlenecks."
        },
        {
          id: "feat-3",
          question: "Can I integrate with other tools?",
          answer: "Yes, OpenCRM offers various integrations with email services, calendar applications, payment processors, marketing automation tools, and more. We also provide an API for custom integrations."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          id: "tech-1",
          question: "Is my data secure with OpenCRM?",
          answer: "OpenCRM uses industry-standard security practices, including data encryption, regular backups, role-based access controls, and optional two-factor authentication. We comply with data protection regulations and undergo regular security audits."
        },
        {
          id: "tech-2",
          question: "What browsers are supported?",
          answer: "OpenCRM works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to the latest version for optimal performance."
        },
        {
          id: "tech-3",
          question: "Can I access OpenCRM on mobile devices?",
          answer: "Yes, OpenCRM has a responsive design that works on smartphones and tablets. We also offer dedicated mobile apps for iOS and Android for a better experience on mobile devices."
        }
      ]
    }
  ],
  guides: [
    {
      id: "guide-1",
      title: "Getting Started Guide",
      description: "Step-by-step instructions for new users",
      steps: 5,
      estimatedTime: "15 min",
      link: "/guides/getting-started"
    },
    {
      id: "guide-2",
      title: "Sales Pipeline Setup",
      description: "Configure your ideal sales process",
      steps: 7,
      estimatedTime: "20 min",
      link: "/guides/sales-pipeline"
    },
    {
      id: "guide-3",
      title: "Email Integration",
      description: "Connect your email accounts with OpenCRM",
      steps: 4,
      estimatedTime: "10 min",
      link: "/guides/email-integration"
    },
    {
      id: "guide-4",
      title: "Reporting and Analytics",
      description: "Learn how to generate insights from your data",
      steps: 6,
      estimatedTime: "25 min",
      link: "/guides/reporting"
    }
  ],
  resources: [
    {
      id: "res-1",
      title: "Video Tutorials",
      description: "Watch demonstrations of key features",
      count: 24,
      link: "/resources/videos"
    },
    {
      id: "res-2",
      title: "Webinars",
      description: "Recorded training sessions and best practices",
      count: 12,
      link: "/resources/webinars"
    },
    {
      id: "res-3",
      title: "Templates",
      description: "Downloadable templates for emails, reports, and more",
      count: 35,
      link: "/resources/templates"
    },
    {
      id: "res-4",
      title: "API Documentation",
      description: "Technical guides for developers",
      count: 1,
      link: "/resources/api"
    }
  ]
};

const KnowledgeBase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("faq");
  
  // Filter FAQ questions based on search query
  const filteredFAQs = knowledgeBaseData.faq.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);
  
  // Filter guides based on search query
  const filteredGuides = knowledgeBaseData.guides.filter(
    guide => guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter resources based on search query
  const filteredResources = knowledgeBaseData.resources.filter(
    resource => resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Check if any results match the search query
  const hasResults = 
    filteredFAQs.length > 0 || 
    filteredGuides.length > 0 || 
    filteredResources.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Find answers to common questions, guides, and resources to help you get the most out of OpenCRM.
          </p>
        </div>
        
        <div className="relative max-w-md mx-auto w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search knowledge base..."
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
        
        <Tabs defaultValue="faq" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">
              Frequently Asked Questions
            </TabsTrigger>
            <TabsTrigger value="guides">
              Guides
            </TabsTrigger>
            <TabsTrigger value="resources">
              Resources
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq" className="mt-6">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((category, index) => (
                <div key={category.category} className={index > 0 ? "mt-8" : ""}>
                  <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="p-2 text-muted-foreground">
                            {item.answer}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No FAQ items match your search criteria.</p>
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
            )}
          </TabsContent>
          
          <TabsContent value="guides" className="mt-6">
            {filteredGuides.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredGuides.map((guide) => (
                  <Card key={guide.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">{guide.steps} steps</Badge>
                          <span className="text-sm text-muted-foreground">{guide.estimatedTime}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1">
                          View Guide <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No guides match your search criteria.</p>
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
            )}
          </TabsContent>
          
          <TabsContent value="resources" className="mt-6">
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{resource.count} {resource.count === 1 ? 'item' : 'items'}</Badge>
                        <Button variant="ghost" size="sm" className="gap-1">
                          Access <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No resources match your search criteria.</p>
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
            )}
          </TabsContent>
        </Tabs>
        
        <div className="bg-muted p-6 rounded-lg mt-8">
          <h3 className="font-semibold text-lg mb-2">Can't find what you're looking for?</h3>
          <p className="text-muted-foreground mb-4">Our support team is ready to assist you with any questions or issues.</p>
          <div className="flex flex-wrap gap-4">
            <Button>Contact Support</Button>
            <Button variant="outline">Submit a Feature Request</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
