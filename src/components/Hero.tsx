import React from "react";
import { useLocation } from "react-router-dom";
import { Headset, Stethoscope, Clipboard, BarChart, Users, ClipboardCheck, Star, Shield } from "lucide-react";

import MainHero from "./hero/MainHero";
import StatsGrid from "./hero/StatsGrid";
import PerspectiveSection from "./hero/PerspectiveSection";
import TestimonialsPreview from "./hero/TestimonialsPreview";
import TrustedBySection from "./hero/TrustedBySection";

interface HeroProps {
  scrollToSection?: (sectionId: string) => void;
}

const Hero = ({ scrollToSection }: HeroProps) => {
  const location = useLocation();
  
  // Function to smoothly scroll to a section
  const handleScrollToSection = (sectionId: string) => {
    if (scrollToSection) {
      scrollToSection(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Stats data
  const statsData = [
    { value: "10k+", label: "Healthcare Providers" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
    { value: "1M+", label: "Patients Managed" }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "OpenCRM cut our patient check-in time by 70% and dramatically improved our scheduling efficiency.",
      name: "Dr. Sarah Johnson",
      role: "Medical Director",
      facility: "Westside Medical Center"
    },
    {
      quote: "The intuitive interface means our staff needed minimal training. We were up and running in days, not weeks.",
      name: "Michael Chen",
      role: "Practice Manager",
      facility: "Family Care Associates"
    },
    {
      quote: "Patient satisfaction scores have increased by 35% since implementing OpenCRM across our five locations.",
      name: "Dr. James Wilson",
      role: "Chief Medical Officer",
      facility: "Regional Health Partners"
    }
  ];
  
  // Partner logos - updated with correct paths that will work in production
  const partnerLogos = [
    "/logos/stark.svg",
    "/logos/acme.svg",
    "/logos/globex.svg",
    "/logos/hooli.svg"
  ];

  return (
    <section className="overflow-hidden" id="home">
      <div className="mx-auto">
        {/* Main Hero */}
        <MainHero scrollToSection={handleScrollToSection} />
        
        {/* Statistics */}
        <StatsGrid stats={statsData} />
        
        {/* Industry Solutions Section (formerly Trusted By) */}
        <TrustedBySection 
          title="Explore Our Industry Solutions"
          description="Specialized CRM solutions tailored for different industries with features designed to meet your unique needs"
          logos={partnerLogos}
        />
        
        {/* Perspective Sections */}
        <div className="mt-32 space-y-32 container mx-auto px-4 md:px-6">
          {/* Admin's Perspective */}
          <PerspectiveSection
            title="Admin Dashboard"
            icon={<Headset className="mr-1 h-3.5 w-3.5" />}
            heading="Simplify Front Desk Operations"
            description="Streamline check-ins, appointment scheduling, and patient communications with our intuitive admin interface designed specifically for healthcare practices."
            features={[
              "One-click patient check-in with digital forms",
              "Intelligent scheduling with double-booking prevention",
              "Automated appointment reminders and confirmations"
            ]}
            imageSrc="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000"
            imageAlt="Admin using healthcare CRM at reception desk"
            statIcon={<Star className="h-5 w-5 text-primary" />}
            statLabel="Reception Efficiency"
            statValue="+58%"
          />
          
          {/* Doctor's Perspective */}
          <PerspectiveSection
            title="Doctor's Dashboard"
            icon={<Stethoscope className="mr-1 h-3.5 w-3.5" />}
            heading="Spend Less Time on Records, More Time with Patients"
            description="Access complete patient histories, test results, and appointment notes in seconds. Make informed decisions faster with our intuitive doctor's interface."
            features={[
              "Instant access to complete patient medical history",
              "Voice dictation for quick note-taking between appointments",
              "Automated follow-up scheduling and reminders"
            ]}
            imageSrc="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2000"
            imageAlt="Doctor reviewing patient records on tablet"
            statIcon={<Stethoscope className="h-5 w-5 text-primary" />}
            statLabel="Patients Per Day"
            statValue="+42%"
            isReversed={true}
          />
          
          {/* Nurse's Perspective */}
          <PerspectiveSection
            title="Nurse's Workflow"
            icon={<Clipboard className="mr-1 h-3.5 w-3.5" />}
            heading="Streamline Patient Care Coordination"
            description="Efficiently manage patient intake, vitals recording, and care coordination. Ensure nothing falls through the cracks with task management and automated alerts."
            features={[
              "Digital vitals recording with abnormality alerts",
              "Medication administration scheduling and tracking",
              "Patient education materials at your fingertips"
            ]}
            imageSrc="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=2000"
            imageAlt="Nurse using tablet for patient care"
            statIcon={<BarChart className="h-5 w-5 text-primary" />}
            statLabel="Documentation Time"
            statValue="-45%"
          />
        </div>

        {/* Testimonials Preview */}
        <div className="mt-32 container mx-auto px-4 md:px-6">
          <TestimonialsPreview
            title="What Healthcare Professionals Say"
            description="Hear from healthcare professionals who have transformed their practice with OpenCRM."
            testimonials={testimonials}
            scrollToSection={handleScrollToSection}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
