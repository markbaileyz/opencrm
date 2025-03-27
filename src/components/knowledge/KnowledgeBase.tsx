
import React, { useState } from "react";
import { Search, BookOpen, FileQuestion, Info, ExternalLink, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqItems = [
    {
      id: "basics-1",
      category: "basics",
      question: "What is OpenCRM?",
      answer: "OpenCRM is an open-source customer relationship management system designed to help businesses manage their interactions with customers and prospects. It provides tools for contact management, sales pipeline tracking, email integration, and reporting."
    },
    {
      id: "basics-2",
      category: "basics",
      question: "How do I get started with OpenCRM?",
      answer: "To get started with OpenCRM, create an account, import your contacts, set up your sales pipeline stages, and customize your dashboard to display the metrics most important to your business. Our onboarding wizard will guide you through these steps."
    },
    {
      id: "basics-3",
      category: "basics",
      question: "Is OpenCRM suitable for small businesses?",
      answer: "Yes, OpenCRM is designed to scale with your business. Small businesses can use the core features without being overwhelmed, while larger organizations can take advantage of more advanced capabilities as they grow."
    },
    {
      id: "contacts-1",
      category: "contacts",
      question: "How do I import contacts into OpenCRM?",
      answer: "You can import contacts by going to Contacts > Import/Export and selecting a CSV or Excel file containing your contact data. OpenCRM will guide you through mapping your file columns to the appropriate contact fields."
    },
    {
      id: "contacts-2",
      category: "contacts",
      question: "Can I merge duplicate contacts?",
      answer: "Yes, OpenCRM has a duplicate detection system. When duplicates are found, you'll be prompted to review and merge them. You can select which data to keep from each duplicate record."
    },
    {
      id: "deals-1",
      category: "deals",
      question: "How do I create a new deal?",
      answer: "To create a new deal, navigate to the Deals section and click the 'New Deal' button. Fill in the deal details, including name, value, associated contacts or organizations, and the current stage in your sales pipeline."
    },
    {
      id: "reports-1",
      category: "reports",
      question: "Can I schedule reports to be emailed automatically?",
      answer: "Yes, you can schedule any saved report to be emailed automatically. Go to Reports > Saved Reports, select a report, and click 'Schedule'. You can set the frequency (daily, weekly, monthly) and specify recipients."
    },
    {
      id: "security-1",
      category: "security",
      question: "Is my data secure in OpenCRM?",
      answer: "OpenCRM implements industry-standard security measures, including data encryption, secure authentication, and regular security audits. You can also enable two-factor authentication for additional account security."
    }
  ];
  
  const caseStudies = [
    {
      id: "case-1",
      title: "Healthcare Provider Improves Patient Relationships",
      industry: "Healthcare",
      challenge: "A mid-sized healthcare provider struggled to maintain consistent communication with patients across multiple departments.",
      solution: "Implemented OpenCRM with custom healthcare fields and automated appointment reminders.",
      results: "90% reduction in missed appointments and 45% increase in patient satisfaction scores within six months.",
      logoUrl: "/placeholder.svg"
    },
    {
      id: "case-2",
      title: "Manufacturing Company Streamlines Sales Process",
      industry: "Manufacturing",
      challenge: "A manufacturing company had a disjointed sales process with long sales cycles and poor visibility into deal progress.",
      solution: "Deployed OpenCRM with customized pipeline stages and integrated product catalog.",
      results: "Reduced sales cycle by 35% and increased deal close rate by 28% in the first year.",
      logoUrl: "/placeholder.svg"
    },
    {
      id: "case-3",
      title: "Real Estate Agency Enhances Client Management",
      industry: "Real Estate",
      challenge: "A growing real estate agency struggled to track client preferences and property viewings across their team of agents.",
      solution: "Implemented OpenCRM with property linking features and automated follow-up sequences.",
      results: "40% increase in successful matches between clients and properties, 25% reduction in time to close deals.",
      logoUrl: "/placeholder.svg"
    }
  ];
  
  const categories = [
    { id: "all", label: "All Categories", icon: <Info className="h-4 w-4" /> },
    { id: "basics", label: "CRM Basics", icon: <Info className="h-4 w-4" /> },
    { id: "contacts", label: "Contacts", icon: <BookOpen className="h-4 w-4" /> },
    { id: "deals", label: "Deals & Sales", icon: <FileQuestion className="h-4 w-4" /> },
    { id: "reports", label: "Reports", icon: <FileText className="h-4 w-4" /> },
    { id: "security", label: "Security", icon: <FileQuestion className="h-4 w-4" /> },
  ];
  
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Filter FAQ items based on search query and category
  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Filter case studies based on search query
  const filteredCaseStudies = caseStudies.filter(study => 
    searchQuery === "" || 
    study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    study.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    study.challenge.toLowerCase().includes(searchQuery.toLowerCase()) ||
    study.solution.toLowerCase().includes(searchQuery.toLowerCase()) ||
    study.results.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Knowledge Base</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions and learn how other organizations are using OpenCRM successfully.
        </p>
      </div>

      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <Input
            placeholder="Search knowledge base..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <Tabs defaultValue="faq" className="space-y-8">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <FileQuestion className="h-4 w-4" />
              <span>Frequently Asked Questions</span>
            </TabsTrigger>
            <TabsTrigger value="case-studies" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Case Studies</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="faq" className="space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {categories.map(category => (
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

          {filteredFAQs.length === 0 ? (
            <div className="text-center py-8">
              <FileQuestion className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No FAQ matches your search</h3>
              <p className="text-muted-foreground mt-1">Try different keywords or categories</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-start gap-2">
                      <span>{faq.question}</span>
                      <Badge variant="outline" className="ml-2 capitalize">
                        {faq.category}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-2 pb-4 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </TabsContent>

        <TabsContent value="case-studies">
          {filteredCaseStudies.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No case studies match your search</h3>
              <p className="text-muted-foreground mt-1">Try different keywords</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCaseStudies.map((study) => (
                <Card key={study.id} className="overflow-hidden flex flex-col h-full">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge>{study.industry}</Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{study.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Challenge</h4>
                        <p className="text-sm text-muted-foreground">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Solution</h4>
                        <p className="text-sm text-muted-foreground">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Results</h4>
                        <p className="text-sm text-muted-foreground">{study.results}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button variant="outline" size="sm" className="w-full">
                      <span>Read Full Case Study</span>
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeBase;
