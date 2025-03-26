import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  CheckCircle, Shield, Code, Database, Users, Calendar, FileText, 
  Workflow, BarChart, Zap, Network, ChevronLeft, LayoutDashboard, Users as UsersIcon
} from "lucide-react";

const PhaseCard = ({ 
  title, 
  description, 
  children 
}: { 
  title: string; 
  description: string; 
  children: React.ReactNode 
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const FeatureItem = ({ 
  title, 
  icon: Icon, 
  children 
}: { 
  title: string; 
  icon: React.ElementType; 
  children: React.ReactNode 
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="rounded-full bg-primary/10 p-2">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h4 className="font-medium">{title}</h4>
      </div>
      <div className="pl-9 text-muted-foreground">{children}</div>
    </div>
  );
};

const OpenCRMRoadmap = () => {
  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="outline" size="sm" asChild className="w-fit">
          <Link to="/roadmap" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Roadmap
          </Link>
        </Button>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link to="/dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Demo Dashboard
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link to="/healthcare-crm" className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4" />
              CRM Strategies
            </Link>
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-3">OpenCRM Strategic Roadmap</h2>
        <p className="text-muted-foreground text-lg mb-6">
          A comprehensive plan for developing a HIPAA-compliant healthcare CRM system from concept to deployment.
        </p>
        
        <div className="bg-primary/5 p-4 rounded-lg mb-8">
          <h3 className="text-xl font-medium mb-2">Project Overview:</h3>
          <p className="mb-4">
            OpenCRM aims to create a best-in-class healthcare relationship management platform that prioritizes:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Exceptional usability for clinical and administrative staff</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Rigorous security and compliance (HIPAA, SOC 2)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Seamless patient engagement across multiple channels</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Scalable architecture supporting healthcare interoperability</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Workflow automation to reduce administrative burden</span>
            </li>
          </ul>
        </div>
      </div>

      <Tabs defaultValue="phases" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="phases">Development Phases</TabsTrigger>
          <TabsTrigger value="features">Core Features</TabsTrigger>
        </TabsList>
        
        <TabsContent value="phases" className="mt-6">
          <PhaseCard
            title="Phase 1: Foundation, Strategy, and Compliance Framework"
            description="Establish the product requirements, target audience, and compliance foundation"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="prd">
                <AccordionTrigger>Product Requirements Document (PRD) - MVP Focus</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Define core features for MVP (Patient Profile/Timeline, Secure Messaging, Scheduling, Forms)</li>
                    <li>• Identify initial target user segment (small practices, digital health startups)</li>
                    <li>• Articulate key differentiators (usability, FHIR integration, transparent pricing)</li>
                    <li>• Define measurable success metrics for MVP launch</li>
                    <li>• Commit to HIPAA and SOC 2 compliance from day one</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="compliance">
                <AccordionTrigger>HIPAA & SOC 2 Compliance Strategy</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Document Security Rule and Privacy Rule safeguards</li>
                    <li>• Define SOC 2 scope (initially Security Trust Services Criterion)</li>
                    <li>• Create foundational policies (Risk Management, Data Governance, Access Control)</li>
                    <li>• Outline BAA management procedures for vendors and clients</li>
                    <li>• Define compliance oversight roles and responsibilities</li>
                    <li>• Plan initial risk assessments and internal audits</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </PhaseCard>
          
          <PhaseCard
            title="Phase 2: Architecture, Technology Stack, and Security Design"
            description="Design the technical foundation with security and scalability at the forefront"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="architecture">
                <AccordionTrigger>Scalable, Secure Multi-Tenant System Architecture</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Create architecture diagrams (modular/microservices approach)</li>
                    <li>• Specify multi-tenancy model with proper isolation</li>
                    <li>• Detail API strategy (API-first, RESTful, FHIR support)</li>
                    <li>• Define infrastructure components and cloud strategy</li>
                    <li>• Ensure architecture supports HIPAA/SOC 2 requirements</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="tech-stack">
                <AccordionTrigger>Technology Stack and Development Tooling</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Select backend and frontend frameworks</li>
                    <li>• Choose appropriate databases with encryption capabilities</li>
                    <li>• Define containerization and orchestration strategy</li>
                    <li>• Select CI/CD and Infrastructure-as-Code tools</li>
                    <li>• Implement monitoring/logging stack for compliance</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="security">
                <AccordionTrigger>Comprehensive Security Architecture & Controls</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Design authentication strategy (OAuth 2.0/OIDC, MFA)</li>
                    <li>• Implement fine-grained Role-Based Access Control (RBAC)</li>
                    <li>• Specify encryption methods (TLS 1.2+, AES-256)</li>
                    <li>• Plan for secure secret management</li>
                    <li>• Define secure coding guidelines and testing</li>
                    <li>• Design comprehensive audit logging mechanism</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </PhaseCard>
          
          <PhaseCard
            title="Phase 3: Core Feature Development (Iterative & Test-Driven)"
            description="Build the essential modules that form the foundation of the CRM"
          >
            <p className="text-muted-foreground mb-4">
              Develop each module iteratively with constant feedback from stakeholders, emphasizing usability, security, and avoiding common healthcare CRM pitfalls.
            </p>
            <p className="text-muted-foreground mb-4">
              See the "Core Features" tab for detailed development plans for each module.
            </p>
            <div className="mt-4 p-3 bg-primary/5 rounded-lg">
              <p className="italic text-center">
                "The architecture and technical choices made in Phase 2 will inform the implementation details of each feature module in Phase 3."
              </p>
            </div>
          </PhaseCard>
          
          <PhaseCard
            title="Phase 4: Testing, Compliance Validation, and Deployment"
            description="Ensure quality, security, and regulatory compliance before launch"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="testing">
                <AccordionTrigger>Comprehensive Testing Strategy</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Implement automated testing (unit, integration, end-to-end)</li>
                    <li>• Conduct security testing (penetration testing, vulnerability scanning)</li>
                    <li>• Perform load and performance testing</li>
                    <li>• Complete user acceptance testing with real healthcare staff</li>
                    <li>• Test backup and disaster recovery procedures</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="compliance-validation">
                <AccordionTrigger>Compliance Validation</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Conduct formal HIPAA risk assessment</li>
                    <li>• Perform SOC 2 readiness assessment</li>
                    <li>• Review all policies and procedures</li>
                    <li>• Ensure BAAs are in place with all vendors</li>
                    <li>• Prepare for formal SOC 2 audit</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="deployment">
                <AccordionTrigger>Deployment Strategy</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Finalize infrastructure deployment scripts</li>
                    <li>• Implement blue/green deployment model</li>
                    <li>• Create detailed rollback procedures</li>
                    <li>• Establish production monitoring and alerting</li>
                    <li>• Document incident response procedures</li>
                    <li>• Train support team on the platform</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </PhaseCard>
        </TabsContent>
        
        <TabsContent value="features" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FeatureItem title="Patient Profile & Data Management" icon={Users}>
                  <ul className="space-y-1">
                    <li>• Comprehensive patient demographics and history</li>
                    <li>• Timeline view of all patient interactions</li>
                    <li>• Duplicate detection and merging</li>
                    <li>• Custom fields and tagging system</li>
                    <li>• RBAC-controlled access with full audit trail</li>
                  </ul>
                </FeatureItem>
                
                <FeatureItem title="Digital Intake & Forms" icon={FileText}>
                  <ul className="space-y-1">
                    <li>• Customizable form builder with conditional logic</li>
                    <li>• HIPAA-compliant e-signature capture</li>
                    <li>• Secure document uploads</li>
                    <li>• Mobile-responsive form design</li>
                    <li>• Robust consent management and tracking</li>
                  </ul>
                </FeatureItem>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Communication & Scheduling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FeatureItem title="Unified Communication Hub" icon={Users}>
                  <ul className="space-y-1">
                    <li>• Secure omnichannel messaging (SMS, email, portal)</li>
                    <li>• Shared inbox with assignment and status tracking</li>
                    <li>• Message templates with variables</li>
                    <li>• Communication consent management</li>
                    <li>• Encrypted PHI transmission with audit logs</li>
                  </ul>
                </FeatureItem>
                
                <FeatureItem title="Smart Scheduling & Appointments" icon={Calendar}>
                  <ul className="space-y-1">
                    <li>• Provider calendar with configurable availability</li>
                    <li>• Patient self-scheduling interface</li>
                    <li>• Automated multi-channel reminders</li>
                    <li>• Waitlist functionality</li>
                    <li>• FHIR-compatible API for EHR integration</li>
                  </ul>
                </FeatureItem>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Workflow & Collaboration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FeatureItem title="Workflow Automation Engine" icon={Workflow}>
                  <ul className="space-y-1">
                    <li>• Visual flow builder for creating workflows</li>
                    <li>• Multiple trigger types (events, time-based)</li>
                    <li>• Automated actions (messages, tasks, updates)</li>
                    <li>• Conditional branching logic</li>
                    <li>• Execution logging for troubleshooting</li>
                  </ul>
                </FeatureItem>
                
                <FeatureItem title="Task Management & Collaboration" icon={CheckCircle}>
                  <ul className="space-y-1">
                    <li>• Task creation, assignment, and tracking</li>
                    <li>• Due dates and priority management</li>
                    <li>• Dashboard views for assigned tasks</li>
                    <li>• Internal commenting on tasks</li>
                    <li>• Integration with patient timeline</li>
                  </ul>
                </FeatureItem>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Technical Foundation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FeatureItem title="Security & Compliance" icon={Shield}>
                  <ul className="space-y-1">
                    <li>• HIPAA and SOC 2 compliant infrastructure</li>
                    <li>• End-to-end encryption of sensitive data</li>
                    <li>• Comprehensive audit logging</li>
                    <li>• Fine-grained access controls</li>
                    <li>• Regular security assessments</li>
                  </ul>
                </FeatureItem>
                
                <FeatureItem title="EHR Integration Layer" icon={Network}>
                  <ul className="space-y-1">
                    <li>• FHIR-based API endpoints</li>
                    <li>• HL7 integration capability</li>
                    <li>• Patient demographic sync</li>
                    <li>• Conflict resolution for data updates</li>
                    <li>• Robust error handling and logging</li>
                  </ul>
                </FeatureItem>
                
                <FeatureItem title="Analytics & Reporting" icon={BarChart}>
                  <ul className="space-y-1">
                    <li>• Key operational metrics tracking</li>
                    <li>• Role-based dashboards</li>
                    <li>• Customizable date ranges and filters</li>
                    <li>• Privacy-respecting data aggregation</li>
                    <li>• Foundation for future custom reporting</li>
                  </ul>
                </FeatureItem>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card className="border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle>Implementation Considerations</CardTitle>
          <CardDescription>Challenges and key success factors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Key Challenges:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Maintaining stringent regulatory compliance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Balancing feature richness with simplicity and usability</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Ensuring data security while enabling integration flexibility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Navigating the complex healthcare data interoperability landscape</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Success Factors:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Maintaining a relentless focus on usability and user experience</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Building compliance into architecture from day one</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Creating a robust, extensible API-first foundation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Iterative development with continuous stakeholder feedback</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-primary/5 rounded-lg text-center">
            <p className="italic">
              "OpenCRM's success hinges on delivering exceptional usability while maintaining the highest standards of data security and compliance, creating a platform that healthcare providers can trust with their most sensitive patient relationships."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OpenCRMRoadmap;
