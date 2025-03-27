
import React, { useState } from "react";
import { Search, Book, HelpCircle, CaseStudy, ArrowRight, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // FAQ Data
  const faqCategories = [
    {
      id: "general",
      title: "General Questions",
      questions: [
        {
          id: "what-is-crm",
          question: "What is a CRM system?",
          answer: "A Customer Relationship Management (CRM) system is a technology for managing all your company's relationships and interactions with customers and potential customers. The goal is to improve business relationships, stay connected to customers, streamline processes, and improve profitability."
        },
        {
          id: "why-use-crm",
          question: "Why should my organization use a CRM?",
          answer: "CRM systems help businesses keep customer contact details up to date, track every customer interaction, and manage customer accounts. They help you improve customer relationships, increase customer satisfaction and retention, and drive sales growth."
        },
        {
          id: "data-security",
          question: "How secure is my data in OpenCRM?",
          answer: "OpenCRM employs enterprise-grade security measures, including data encryption at rest and in transit, regular security audits, role-based access controls, and compliance with major security standards. Your data is backed up regularly and protected against unauthorized access."
        }
      ]
    },
    {
      id: "features",
      title: "Features & Functionality",
      questions: [
        {
          id: "integrations",
          question: "What integrations does OpenCRM support?",
          answer: "OpenCRM integrates with a wide range of business tools including email platforms (Gmail, Outlook), calendar applications, marketing automation tools, social media platforms, document management systems, and various analytics and reporting tools."
        },
        {
          id: "mobile-access",
          question: "Can I access OpenCRM on mobile devices?",
          answer: "Yes, OpenCRM is fully responsive and works on mobile phones and tablets. There are also dedicated mobile apps for iOS and Android that provide optimized experiences for managing your CRM data on the go."
        }
      ]
    },
    {
      id: "setup",
      title: "Setup & Configuration",
      questions: [
        {
          id: "implementation-time",
          question: "How long does it take to implement OpenCRM?",
          answer: "Implementation time varies based on your organization's size and requirements. A basic setup can be completed in a few days, while more complex implementations with custom integrations may take several weeks. Our implementation team works closely with you to establish a realistic timeline."
        },
        {
          id: "data-migration",
          question: "How do I migrate my existing CRM data to OpenCRM?",
          answer: "OpenCRM provides several data migration paths. You can use our import tools for CSV or Excel files, use our API for programmatic data transfer, or work with our migration specialists who can help transfer data from popular CRM platforms while maintaining relationships between records."
        }
      ]
    }
  ];
  
  // Case Studies Data
  const caseStudies = [
    {
      id: "healthcare-provider",
      title: "Healthcare Provider Improves Patient Engagement by 45%",
      industry: "Healthcare",
      challenge: "A multi-location healthcare provider struggled with tracking patient interactions across departments, leading to fragmented care experiences.",
      solution: "Implemented OpenCRM with custom healthcare modules for patient relationship management, appointment scheduling, and care coordination.",
      results: "45% increase in patient engagement, 30% reduction in missed appointments, and improved care coordination across specialties.",
      logoSrc: "/placeholder.svg"
    },
    {
      id: "financial-services",
      title: "Financial Services Firm Increases Client Retention by 28%",
      industry: "Financial Services",
      challenge: "A financial advisory firm had difficulty maintaining comprehensive client profiles and tracking complex interactions across different financial products.",
      solution: "Deployed OpenCRM with financial services integrations, automated client review reminders, and opportunity tracking.",
      results: "28% improvement in client retention, 15% increase in cross-selling success rate, and more efficient compliance reporting.",
      logoSrc: "/placeholder.svg"
    },
    {
      id: "manufacturing",
      title: "Manufacturing Company Streamlines Sales Cycle by 35%",
      industry: "Manufacturing",
      challenge: "A mid-sized manufacturer faced extended sales cycles and poor visibility into the pipeline, with sales teams using disconnected tools.",
      solution: "Implemented OpenCRM with inventory integration, custom quotation process, and mobile access for field representatives.",
      results: "35% reduction in sales cycle length, 22% increase in sales team productivity, and improved quote accuracy resulting in higher margins.",
      logoSrc: "/placeholder.svg"
    }
  ];

  // Filter FAQs based on search query
  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  // Filter case studies based on search query
  const filteredCaseStudies = caseStudies.filter(
    study => study.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             study.industry.toLowerCase().includes(searchQuery.toLowerCase()) || 
             study.challenge.toLowerCase().includes(searchQuery.toLowerCase()) || 
             study.solution.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Knowledge Base</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions, explore case studies, and learn how to get the most out of OpenCRM.
        </p>
      </div>

      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <Input
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
            icon={<Search className="h-4 w-4" />}
          />
        </div>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span>FAQs</span>
          </TabsTrigger>
          <TabsTrigger value="case-studies" className="flex items-center gap-2">
            <CaseStudy className="h-4 w-4" />
            <span>Case Studies</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          {searchQuery && filteredFAQs.length === 0 ? (
            <div className="text-center py-8">
              <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No FAQs match your search</h3>
              <p className="text-muted-foreground mt-1">Try a different search term or browse all categories</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <>
              {filteredFAQs.map((category) => (
                <div key={category.id} className="bg-card rounded-lg border shadow-sm">
                  <div className="bg-muted px-6 py-4 rounded-t-lg border-b">
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                  </div>
                  <Accordion type="single" collapsible className="px-6 py-2">
                    {category.questions.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="py-4 hover:no-underline text-left">
                          <span className="font-medium">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </>
          )}
        </TabsContent>

        <TabsContent value="case-studies" className="space-y-8">
          {searchQuery && filteredCaseStudies.length === 0 ? (
            <div className="text-center py-8">
              <CaseStudy className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No case studies match your search</h3>
              <p className="text-muted-foreground mt-1">Try a different search term or browse all case studies</p>
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
                <div key={study.id} className="bg-card rounded-lg border shadow-sm overflow-hidden flex flex-col h-full">
                  <div className="p-1 bg-muted">
                    <img 
                      src={study.logoSrc} 
                      alt={`${study.industry} company logo`}
                      className="h-32 w-full object-contain mix-blend-darken"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {study.industry}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{study.title}</h3>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="challenge">
                        <AccordionTrigger className="py-2">
                          <span className="font-medium text-sm">Challenge</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm">
                          {study.challenge}
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="solution">
                        <AccordionTrigger className="py-2">
                          <span className="font-medium text-sm">Solution</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm">
                          {study.solution}
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="results">
                        <AccordionTrigger className="py-2">
                          <span className="font-medium text-sm">Results</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm">
                          {study.results}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <div className="mt-auto pt-4">
                      <Button variant="outline" className="w-full" size="sm">
                        View Full Case Study
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeBase;
