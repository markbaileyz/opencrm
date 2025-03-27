
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, FileText, Calendar, CreditCard, Stethoscope, 
  ClipboardList, Building, Users, ShieldCheck
} from "lucide-react";

const HealthcareCRMStrategies = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Healthcare CRM Essentials
        </h1>
        <p className="text-lg text-muted-foreground">
          Effective healthcare customer relationship management requires capturing comprehensive data across multiple domains. Here's what a robust healthcare CRM should include:
        </p>
      </div>

      <Tabs defaultValue="patient" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 h-auto">
          <TabsTrigger value="patient" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 items-center">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Patient</span>
          </TabsTrigger>
          <TabsTrigger value="insurance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 items-center">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden md:inline">Insurance</span>
          </TabsTrigger>
          <TabsTrigger value="contacts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 items-center">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Contacts</span>
          </TabsTrigger>
          <TabsTrigger value="appointments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 items-center">
            <Calendar className="h-4 w-4" />
            <span className="hidden md:inline">Appointments</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 items-center">
            <CreditCard className="h-4 w-4" />
            <span className="hidden md:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="medical" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 items-center">
            <Stethoscope className="h-4 w-4" />
            <span className="hidden md:inline">Medical</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 items-center">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Documents</span>
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 items-center">
            <ClipboardList className="h-4 w-4" />
            <span className="hidden md:inline">Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="organizations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 items-center">
            <Building className="h-4 w-4" />
            <span className="hidden md:inline">Organizations</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="patient" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Comprehensive patient profiles are the foundation of healthcare CRM systems.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Essential Fields</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Full name (first, middle, last)</li>
                    <li>Date of birth</li>
                    <li>Gender/sex</li>
                    <li>Contact information (address, phone, email)</li>
                    <li>Preferred communication method</li>
                    <li>Emergency contact information</li>
                    <li>Patient ID/Medical record number</li>
                    <li>Preferred language</li>
                    <li>Marital status</li>
                    <li>Employment information</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Advanced Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Patient portal access management</li>
                    <li>Communication preferences & opt-ins</li>
                    <li>Patient satisfaction scores</li>
                    <li>Demographic information for reporting</li>
                    <li>Custom fields for specialty practices</li>
                    <li>Patient journey mapping</li>
                    <li>Automated birthday/anniversary greetings</li>
                    <li>Consent management</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insurance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Insurance Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Insurance information is critical for healthcare billing and coverage verification.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Essential Fields</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Insurance provider name</li>
                    <li>Policy/Member ID number</li>
                    <li>Group number</li>
                    <li>Coverage start and end dates</li>
                    <li>Primary insured (if not patient)</li>
                    <li>Relationship to insured</li>
                    <li>Plan type (HMO, PPO, etc.)</li>
                    <li>Copay amounts</li>
                    <li>Deductible information</li>
                    <li>Secondary insurance details</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Advanced Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Real-time eligibility verification</li>
                    <li>Benefit summary integration</li>
                    <li>Prior authorization tracking</li>
                    <li>Coverage limitations</li>
                    <li>Out-of-pocket maximum tracking</li>
                    <li>Automated coverage expiration alerts</li>
                    <li>Insurance card scanning</li>
                    <li>Insurance plan comparison tools</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Contact Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Track all individuals connected to the patient's care network.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Essential Fields</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Primary care physician</li>
                    <li>Referring provider</li>
                    <li>Specialists involved in care</li>
                    <li>Case managers/Social workers</li>
                    <li>Family/Caregiver contacts</li>
                    <li>Legal representatives</li>
                    <li>Pharmacy information</li>
                    <li>Referral source tracking</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Advanced Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Care team collaboration tools</li>
                    <li>Secure messaging between providers</li>
                    <li>Referral management system</li>
                    <li>Contact relationship mapping</li>
                    <li>Provider directory integration</li>
                    <li>Automated referral follow-ups</li>
                    <li>Contact engagement history</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Appointment Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Comprehensive appointment management is crucial for healthcare operations.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Essential Fields</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Appointment date and time</li>
                    <li>Visit type/purpose</li>
                    <li>Provider assigned</li>
                    <li>Location/room</li>
                    <li>Appointment status</li>
                    <li>Check-in/check-out time</li>
                    <li>Appointment notes</li>
                    <li>Follow-up requirements</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Advanced Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Online scheduling portal</li>
                    <li>Automated appointment reminders</li>
                    <li>Waitlist management</li>
                    <li>Recurring appointment setup</li>
                    <li>Telehealth integration</li>
                    <li>No-show/cancellation tracking</li>
                    <li>Resource allocation (equipment, rooms)</li>
                    <li>Pre-appointment questionnaires</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Billing & Financial
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Financial tracking and billing management are essential for healthcare revenue.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Essential Fields</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Invoice numbers/identifiers</li>
                    <li>Service date(s)</li>
                    <li>CPT/procedure codes</li>
                    <li>Diagnosis codes (ICD-10)</li>
                    <li>Charge amounts</li>
                    <li>Payment status</li>
                    <li>Insurance claim status</li>
                    <li>Patient payment information</li>
                    <li>Payment plans</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Advanced Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Automated claim submission</li>
                    <li>Payment processing integration</li>
                    <li>Collections management</li>
                    <li>Financial reporting dashboards</li>
                    <li>Cost estimator tools</li>
                    <li>Revenue cycle analytics</li>
                    <li>Automated patient statements</li>
                    <li>Denial management tracking</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="medical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-primary" />
                Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Basic medical information that complements EHR systems.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Essential Fields</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Allergies and alerts</li>
                    <li>Current medications</li>
                    <li>Chief complaints</li>
                    <li>Diagnosis history</li>
                    <li>Treatment plans</li>
                    <li>Preventive care schedule</li>
                    <li>Lab/test results tracking</li>
                    <li>Vital stats history</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Advanced Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>EHR integration</li>
                    <li>Patient outcome tracking</li>
                    <li>Care plan management</li>
                    <li>Clinical decision support</li>
                    <li>Population health insights</li>
                    <li>Chronic disease management</li>
                    <li>Preventive care alerts</li>
                    <li>Remote patient monitoring integration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Document Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Manage all patient-related documentation and forms.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Essential Fields</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Signed consent forms</li>
                    <li>Patient intake forms</li>
                    <li>Medical records release forms</li>
                    <li>Advanced directives</li>
                    <li>Insurance cards</li>
                    <li>ID verification</li>
                    <li>Referral documentation</li>
                    <li>Provider notes</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Advanced Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Electronic signature capture</li>
                    <li>Document expiration tracking</li>
                    <li>Form automation</li>
                    <li>Document version control</li>
                    <li>Secure document sharing</li>
                    <li>OCR for scanned documents</li>
                    <li>HIPAA-compliant storage</li>
                    <li>Template library</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                Tasks & Follow-ups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Task management ensures nothing falls through the cracks in patient care.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Essential Fields</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Task description</li>
                    <li>Due date/time</li>
                    <li>Priority level</li>
                    <li>Assigned to</li>
                    <li>Related patient</li>
                    <li>Task status</li>
                    <li>Task category</li>
                    <li>Follow-up instructions</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Advanced Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Automated task creation</li>
                    <li>Task templates</li>
                    <li>Escalation workflows</li>
                    <li>Task dependencies</li>
                    <li>Team task collaboration</li>
                    <li>Recurring task setup</li>
                    <li>Mobile task notifications</li>
                    <li>Task completion analytics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="organizations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Organizations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Track relationships with healthcare organizations and facilities.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Essential Fields</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Organization name</li>
                    <li>Organization type</li>
                    <li>Location(s)</li>
                    <li>Main contact information</li>
                    <li>Relationship type</li>
                    <li>Contract details</li>
                    <li>Credentialing information</li>
                    <li>Facility NPI numbers</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Advanced Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Organization hierarchy mapping</li>
                    <li>Relationship strength scoring</li>
                    <li>Referral pattern analysis</li>
                    <li>Contract/agreement management</li>
                    <li>Organization portal access</li>
                    <li>Value-based care performance tracking</li>
                    <li>Network participation management</li>
                    <li>Partnership opportunity identification</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="space-y-4 pt-8">
        <h2 className="text-2xl font-bold tracking-tight">Key CRM Enhancements for Healthcare</h2>
        <p className="text-muted-foreground">Modern healthcare CRMs should include these advanced capabilities:</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Interoperability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Seamless integration with EHRs, billing systems, telehealth platforms, and other healthcare tools for unified workflows.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Real-time Eligibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Direct connections to insurance providers for instant verification of coverage, benefits, and authorization status.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Telehealth Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Dedicated fields for virtual care management including video visit links, technical notes, and digital waiting rooms.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Intelligent Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                AI-powered appointment optimization that accounts for provider availability, room utilization, and equipment needs.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Patient Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Automated outreach tools for appointment reminders, health education, follow-ups, and preventive care notifications.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Population Health</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Analytics tools to identify care gaps, track quality measures, and manage patient cohorts for targeted interventions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthcareCRMStrategies;
