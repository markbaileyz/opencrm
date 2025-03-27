
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, FileText, Calendar, CreditCard, Stethoscope, 
  ClipboardList, Building, Users, ShieldCheck
} from "lucide-react";
import CategoryTabContent from "./CategoryTabContent";

const CategoryTabs = () => {
  return (
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

      <TabsContent value="patient">
        <CategoryTabContent 
          icon={<User className="h-5 w-5 text-primary" />}
          title="Patient Information"
          description="Comprehensive patient profiles are the foundation of healthcare CRM systems."
          essentialFields={[
            "Full name (first, middle, last)",
            "Date of birth",
            "Gender/sex",
            "Contact information (address, phone, email)",
            "Preferred communication method",
            "Emergency contact information",
            "Patient ID/Medical record number",
            "Preferred language",
            "Marital status",
            "Employment information"
          ]}
          advancedFeatures={[
            "Patient portal access management",
            "Communication preferences & opt-ins",
            "Patient satisfaction scores",
            "Demographic information for reporting",
            "Custom fields for specialty practices",
            "Patient journey mapping",
            "Automated birthday/anniversary greetings",
            "Consent management"
          ]}
        />
      </TabsContent>
      
      <TabsContent value="insurance">
        <CategoryTabContent 
          icon={<ShieldCheck className="h-5 w-5 text-primary" />}
          title="Insurance Information"
          description="Insurance information is critical for healthcare billing and coverage verification."
          essentialFields={[
            "Insurance provider name",
            "Policy/Member ID number",
            "Group number",
            "Coverage start and end dates",
            "Primary insured (if not patient)",
            "Relationship to insured",
            "Plan type (HMO, PPO, etc.)",
            "Copay amounts",
            "Deductible information",
            "Secondary insurance details"
          ]}
          advancedFeatures={[
            "Real-time eligibility verification",
            "Benefit summary integration",
            "Prior authorization tracking",
            "Coverage limitations",
            "Out-of-pocket maximum tracking",
            "Automated coverage expiration alerts",
            "Insurance card scanning",
            "Insurance plan comparison tools"
          ]}
        />
      </TabsContent>
      
      <TabsContent value="contacts">
        <CategoryTabContent 
          icon={<Users className="h-5 w-5 text-primary" />}
          title="Contact Management"
          description="Track all individuals connected to the patient's care network."
          essentialFields={[
            "Primary care physician",
            "Referring provider",
            "Specialists involved in care",
            "Case managers/Social workers",
            "Family/Caregiver contacts",
            "Legal representatives",
            "Pharmacy information",
            "Referral source tracking"
          ]}
          advancedFeatures={[
            "Care team collaboration tools",
            "Secure messaging between providers",
            "Referral management system",
            "Contact relationship mapping",
            "Provider directory integration",
            "Automated referral follow-ups",
            "Contact engagement history"
          ]}
        />
      </TabsContent>
      
      <TabsContent value="appointments">
        <CategoryTabContent 
          icon={<Calendar className="h-5 w-5 text-primary" />}
          title="Appointment Tracking"
          description="Comprehensive appointment management is crucial for healthcare operations."
          essentialFields={[
            "Appointment date and time",
            "Visit type/purpose",
            "Provider assigned",
            "Location/room",
            "Appointment status",
            "Check-in/check-out time",
            "Appointment notes",
            "Follow-up requirements"
          ]}
          advancedFeatures={[
            "Online scheduling portal",
            "Automated appointment reminders",
            "Waitlist management",
            "Recurring appointment setup",
            "Telehealth integration",
            "No-show/cancellation tracking",
            "Resource allocation (equipment, rooms)",
            "Pre-appointment questionnaires"
          ]}
        />
      </TabsContent>
      
      <TabsContent value="billing">
        <CategoryTabContent 
          icon={<CreditCard className="h-5 w-5 text-primary" />}
          title="Billing & Financial"
          description="Financial tracking and billing management are essential for healthcare revenue."
          essentialFields={[
            "Invoice numbers/identifiers",
            "Service date(s)",
            "CPT/procedure codes",
            "Diagnosis codes (ICD-10)",
            "Charge amounts",
            "Payment status",
            "Insurance claim status",
            "Patient payment information",
            "Payment plans"
          ]}
          advancedFeatures={[
            "Automated claim submission",
            "Payment processing integration",
            "Collections management",
            "Financial reporting dashboards",
            "Cost estimator tools",
            "Revenue cycle analytics",
            "Automated patient statements",
            "Denial management tracking"
          ]}
        />
      </TabsContent>
      
      <TabsContent value="medical">
        <CategoryTabContent 
          icon={<Stethoscope className="h-5 w-5 text-primary" />}
          title="Medical Information"
          description="Basic medical information that complements EHR systems."
          essentialFields={[
            "Allergies and alerts",
            "Current medications",
            "Chief complaints",
            "Diagnosis history",
            "Treatment plans",
            "Preventive care schedule",
            "Lab/test results tracking",
            "Vital stats history"
          ]}
          advancedFeatures={[
            "EHR integration",
            "Patient outcome tracking",
            "Care plan management",
            "Clinical decision support",
            "Population health insights",
            "Chronic disease management",
            "Preventive care alerts",
            "Remote patient monitoring integration"
          ]}
        />
      </TabsContent>
      
      <TabsContent value="documents">
        <CategoryTabContent 
          icon={<FileText className="h-5 w-5 text-primary" />}
          title="Document Management"
          description="Manage all patient-related documentation and forms."
          essentialFields={[
            "Signed consent forms",
            "Patient intake forms",
            "Medical records release forms",
            "Advanced directives",
            "Insurance cards",
            "ID verification",
            "Referral documentation",
            "Provider notes"
          ]}
          advancedFeatures={[
            "Electronic signature capture",
            "Document expiration tracking",
            "Form automation",
            "Document version control",
            "Secure document sharing",
            "OCR for scanned documents",
            "HIPAA-compliant storage",
            "Template library"
          ]}
        />
      </TabsContent>
      
      <TabsContent value="tasks">
        <CategoryTabContent 
          icon={<ClipboardList className="h-5 w-5 text-primary" />}
          title="Tasks & Follow-ups"
          description="Task management ensures nothing falls through the cracks in patient care."
          essentialFields={[
            "Task description",
            "Due date/time",
            "Priority level",
            "Assigned to",
            "Related patient",
            "Task status",
            "Task category",
            "Follow-up instructions"
          ]}
          advancedFeatures={[
            "Automated task creation",
            "Task templates",
            "Escalation workflows",
            "Task dependencies",
            "Team task collaboration",
            "Recurring task setup",
            "Mobile task notifications",
            "Task completion analytics"
          ]}
        />
      </TabsContent>
      
      <TabsContent value="organizations">
        <CategoryTabContent 
          icon={<Building className="h-5 w-5 text-primary" />}
          title="Organizations"
          description="Track relationships with healthcare organizations and facilities."
          essentialFields={[
            "Organization name",
            "Organization type",
            "Location(s)",
            "Main contact information",
            "Relationship type",
            "Contract details",
            "Credentialing information",
            "Facility NPI numbers"
          ]}
          advancedFeatures={[
            "Organization hierarchy mapping",
            "Relationship strength scoring",
            "Referral pattern analysis",
            "Contract/agreement management",
            "Organization portal access",
            "Value-based care performance tracking",
            "Network participation management",
            "Partnership opportunity identification"
          ]}
        />
      </TabsContent>
    </Tabs>
  );
};

export default CategoryTabs;
