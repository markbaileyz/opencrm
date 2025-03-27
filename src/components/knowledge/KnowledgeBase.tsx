
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ChevronRight, Search, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useOfflineState } from "@/hooks/use-offline-state";

// Knowledge base data structure with role-based visibility
const knowledgeBaseData = {
  faq: [
    {
      category: "General",
      visibleTo: ["admin", "doctor", "nurse", "front-desk", "patient", "guest"],
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
      visibleTo: ["admin", "doctor", "nurse", "front-desk", "patient", "guest"],
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
      visibleTo: ["admin", "doctor", "nurse", "front-desk"],
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
    },
    {
      category: "Medical Staff",
      visibleTo: ["admin", "doctor", "nurse"],
      questions: [
        {
          id: "med-1",
          question: "How do I access patient records?",
          answer: "Patient records can be accessed from the Patients section. You can search for patients by name, ID, or other identifiers. Click on a patient card to view their complete medical history, test results, and treatment plans."
        },
        {
          id: "med-2",
          question: "Can I share medical notes with other providers?",
          answer: "Yes, medical notes can be shared with other authorized providers within the system. Use the 'Share' option in the patient record to select which providers should have access to specific notes or the entire record."
        },
        {
          id: "med-3",
          question: "How do I schedule lab tests for a patient?",
          answer: "To schedule lab tests, navigate to the patient's record, select the 'Orders' tab, and click 'New Order'. Select the appropriate lab tests, add any relevant notes, and submit the order. The system will notify both the lab and the patient."
        }
      ]
    },
    {
      category: "Front Desk",
      visibleTo: ["admin", "front-desk"],
      questions: [
        {
          id: "desk-1",
          question: "How do I check in a patient?",
          answer: "To check in a patient, go to the Front Desk page and click the 'Check-In' button. Search for the patient by name or ID, verify their information, and complete the check-in process. The system will notify the appropriate provider that the patient has arrived."
        },
        {
          id: "desk-2",
          question: "How do I schedule an appointment?",
          answer: "To schedule an appointment, click the 'Schedule' button on the Front Desk page. Select the provider, date, time, and appointment type. Enter the patient information or select from existing patients. Confirm the appointment details and submit."
        },
        {
          id: "desk-3",
          question: "How do I handle insurance verification?",
          answer: "For insurance verification, access the patient's profile, navigate to the 'Insurance' tab, and verify the current information. You can update details as needed, capture images of insurance cards, and run eligibility checks directly through the integrated verification system."
        }
      ]
    },
    {
      category: "Patients",
      visibleTo: ["patient"],
      questions: [
        {
          id: "pat-1",
          question: "How do I view my upcoming appointments?",
          answer: "You can view your upcoming appointments on your dashboard after logging in. The 'My Appointments' section shows all scheduled visits with date, time, provider, and location details. Click on any appointment for more information or to request changes."
        },
        {
          id: "pat-2",
          question: "How do I request prescription refills?",
          answer: "To request a prescription refill, go to the 'Medications' section of your patient portal. Find the medication you need refilled, click the 'Request Refill' button, and follow the prompts. Your request will be sent to your provider for approval."
        },
        {
          id: "pat-3",
          question: "How do I view my test results?",
          answer: "Test results are available in the 'Results' section of your patient portal. New results will be marked as unread. Click on any result to view details. Your provider may also add notes explaining the results or recommending next steps."
        }
      ]
    },
    {
      category: "Admin",
      visibleTo: ["admin"],
      questions: [
        {
          id: "admin-1",
          question: "How do I add new users to the system?",
          answer: "To add new users, navigate to User Management in the Admin Settings. Click 'Add User', fill in their details including name, email, and role (admin, doctor, nurse, etc.). Set their initial password or send them an invitation to create their own account."
        },
        {
          id: "admin-2",
          question: "How do I configure system-wide settings?",
          answer: "System-wide settings can be configured in the Admin Settings area. Here you can adjust security policies, customize notification templates, set business hours, configure integrations with other systems, and manage global preferences."
        },
        {
          id: "admin-3",
          question: "How do I view audit logs?",
          answer: "Audit logs are available in the Admin Settings under 'Security & Compliance'. This section provides a detailed record of all system activities, including user logins, data access, modifications, and security events. You can filter logs by date, user, or action type."
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
      link: "/guides/getting-started",
      visibleTo: ["admin", "doctor", "nurse", "front-desk", "patient", "guest"]
    },
    {
      id: "guide-2",
      title: "Sales Pipeline Setup",
      description: "Configure your ideal sales process",
      steps: 7,
      estimatedTime: "20 min",
      link: "/guides/sales-pipeline",
      visibleTo: ["admin"]
    },
    {
      id: "guide-3",
      title: "Email Integration",
      description: "Connect your email accounts with OpenCRM",
      steps: 4,
      estimatedTime: "10 min",
      link: "/guides/email-integration",
      visibleTo: ["admin", "doctor", "nurse", "front-desk"]
    },
    {
      id: "guide-4",
      title: "Reporting and Analytics",
      description: "Learn how to generate insights from your data",
      steps: 6,
      estimatedTime: "25 min",
      link: "/guides/reporting",
      visibleTo: ["admin"]
    },
    {
      id: "guide-5",
      title: "Patient Care Workflow",
      description: "Optimize the patient experience from check-in to follow-up",
      steps: 8,
      estimatedTime: "30 min",
      link: "/guides/patient-workflow",
      visibleTo: ["doctor", "nurse", "front-desk"]
    },
    {
      id: "guide-6",
      title: "Using the Patient Portal",
      description: "How to access and use all patient features",
      steps: 5,
      estimatedTime: "15 min",
      link: "/guides/patient-portal",
      visibleTo: ["patient"]
    }
  ],
  resources: [
    {
      id: "res-1",
      title: "Video Tutorials",
      description: "Watch demonstrations of key features",
      count: 24,
      link: "/resources/videos",
      visibleTo: ["admin", "doctor", "nurse", "front-desk", "patient", "guest"]
    },
    {
      id: "res-2",
      title: "Webinars",
      description: "Recorded training sessions and best practices",
      count: 12,
      link: "/resources/webinars",
      visibleTo: ["admin", "doctor", "nurse", "front-desk"]
    },
    {
      id: "res-3",
      title: "Templates",
      description: "Downloadable templates for emails, reports, and more",
      count: 35,
      link: "/resources/templates",
      visibleTo: ["admin", "doctor", "nurse", "front-desk"]
    },
    {
      id: "res-4",
      title: "API Documentation",
      description: "Technical guides for developers",
      count: 1,
      link: "/resources/api",
      visibleTo: ["admin"]
    },
    {
      id: "res-5",
      title: "Patient Education Materials",
      description: "Resources to share with patients",
      count: 18,
      link: "/resources/patient-education",
      visibleTo: ["doctor", "nurse", "front-desk", "patient"]
    }
  ]
};

const KnowledgeBase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("faq");
  const [showAiHelper, setShowAiHelper] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isFetchingAi, setIsFetchingAi] = useState(false);
  const { user } = useAuth();
  const { isOnline, storeOfflineData, getOfflineData } = useOfflineState();
  
  const userRole = user?.role || "guest";
  
  // Filter content based on user role
  const roleFilteredFAQs = knowledgeBaseData.faq.filter(
    category => category.visibleTo.includes(userRole)
  );
  
  const roleFilteredGuides = knowledgeBaseData.guides.filter(
    guide => guide.visibleTo.includes(userRole)
  );
  
  const roleFilteredResources = knowledgeBaseData.resources.filter(
    resource => resource.visibleTo.includes(userRole)
  );
  
  // Filter based on search query
  const filteredFAQs = roleFilteredFAQs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);
  
  const filteredGuides = roleFilteredGuides.filter(
    guide => guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredResources = roleFilteredResources.filter(
    resource => resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Check if any results match the search query
  const hasResults = 
    filteredFAQs.length > 0 || 
    filteredGuides.length > 0 || 
    filteredResources.length > 0;

  // Save data for offline use
  useEffect(() => {
    if (isOnline) {
      storeOfflineData('knowledgeBaseData', knowledgeBaseData);
    }
  }, [isOnline]);

  // Handle AI assistant search
  const handleAiSearch = () => {
    if (!searchQuery.trim()) return;
    
    setShowAiHelper(true);
    setIsFetchingAi(true);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      // Generate a contextual response based on the search query
      const lowerQuery = searchQuery.toLowerCase();
      let response = "I couldn't find a specific answer to your question. Please try refining your search or browse the categories for related information.";
      
      // Simple pattern matching for demo purposes
      if (lowerQuery.includes("appointment") || lowerQuery.includes("schedule")) {
        response = "To schedule an appointment, use the 'Schedule' button on the Front Desk page or Calendar page. You can select the provider, date, time, and appointment type. For existing patients, you can quickly find them in the system. New patients will need to provide their information first.";
      } else if (lowerQuery.includes("patient") && lowerQuery.includes("record")) {
        response = "Patient records can be accessed from the Patients section. You can search by name or ID, then click on a patient card to view their complete profile including medical history, appointments, and insurance information.";
      } else if (lowerQuery.includes("insurance") || lowerQuery.includes("coverage")) {
        response = "For insurance information, check the patient's profile under the 'Insurance' tab. You can verify coverage, update policy details, and run eligibility checks through our integrated verification system.";
      }
      
      setAiResponse(response);
      setIsFetchingAi(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Find answers to common questions, guides, and resources tailored for {userRole === "guest" ? "all users" : userRole + "s"}.
          </p>
        </div>
        
        <div className="relative max-w-md mx-auto w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search knowledge base..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-24"
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
          <Button
            variant="outline"
            size="sm"
            className="absolute right-16 top-1/2 -translate-y-1/2 h-7"
            onClick={handleAiSearch}
            disabled={!searchQuery.trim() || isFetchingAi}
          >
            <Bot className="h-3.5 w-3.5 mr-1" />
            Ask AI
          </Button>
        </div>
        
        {searchQuery && (
          <div className="text-sm text-muted-foreground text-center">
            {hasResults ? 
              `Showing results for "${searchQuery}"` : 
              `No results found for "${searchQuery}"`
            }
          </div>
        )}
        
        {showAiHelper && (
          <Card className="mx-auto max-w-3xl">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  AI Assistant
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowAiHelper(false)}
                  className="h-8 w-8 p-0"
                >
                  ✕
                </Button>
              </div>
              <CardDescription>
                Answering your question: "{searchQuery}"
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isFetchingAi ? (
                <div className="flex items-center justify-center h-20">
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-2 bg-slate-200 rounded"></div>
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-2 text-muted-foreground">
                  {aiResponse}
                </div>
              )}
            </CardContent>
          </Card>
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
