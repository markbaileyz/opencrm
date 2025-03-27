
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { ButtonCustom } from "./ui/button-custom";
import { ArrowRight, CheckCircle, Users, Shield, BarChart, Clipboard, Stethoscope, ClipboardCheck, Star, Headset } from "lucide-react";
import ResponsiveImage from "./ui/responsive-image";
import { Card, CardContent } from "./ui/card";

const Hero = () => {
  const location = useLocation();
  
  // Function to smoothly scroll to a section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Link component that handles both router links and anchor links
  const Link = ({ to, children, ...props }: { to: string, children: React.ReactNode, [key: string]: any }) => {
    if (to.startsWith('#')) {
      return (
        <a
          href={to}
          onClick={(e) => {
            e.preventDefault();
            const sectionId = to.substring(1);
            scrollToSection(sectionId);
          }}
          {...props}
        >
          {children}
        </a>
      );
    }
    
    return <RouterLink to={to} {...props}>{children}</RouterLink>;
  };

  return (
    <section className="pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden" id="home">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <CheckCircle className="mr-1 h-3.5 w-3.5" />
                Healthcare-specific CRM
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Transform Your Patient Relationships
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Join over 10,000 healthcare practices that use OpenCRM to streamline operations, enhance patient care, and deliver exceptional healthcare experiences.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/login">
                <ButtonCustom size="lg" className="group font-medium">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </ButtonCustom>
              </Link>
              <Link to="#features">
                <ButtonCustom variant="outline" size="lg" className="font-medium">
                  See Features
                </ButtonCustom>
              </Link>
            </div>
          </div>
          
          <div className="relative animate-fade-left">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-3xl transform rotate-1 blur-xl"></div>
            <div className="glass rounded-3xl p-1 relative z-10 border border-white/20 shadow-xl overflow-hidden">
              <ResponsiveImage 
                src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=2000"
                alt="Healthcare professionals discussing patient data on a tablet" 
                className="w-full h-full rounded-2xl"
                aspectRatio="16/9"
              />
              
              <div className="absolute bottom-8 left-8 right-8 glass-dark rounded-xl p-4 shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Patient Satisfaction</h4>
                      <p className="text-2xl font-bold">+38%</p>
                    </div>
                  </div>
                  <div className="h-10 w-[1px] bg-border"></div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <ClipboardCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Check-in Time</h4>
                      <p className="text-2xl font-bold">-65%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass absolute -bottom-6 -right-6 p-4 rounded-xl shadow-lg animate-fade-up delay-300">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">HIPAA Compliant</p>
                  <p className="text-xs text-muted-foreground">Secure Patient Data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 animate-fade-up delay-400">
          <StatBox value="10k+" label="Healthcare Providers" />
          <StatBox value="99.9%" label="Uptime" />
          <StatBox value="24/7" label="Support" />
          <StatBox value="1M+" label="Patients Managed" />
        </div>
        
        {/* Perspective Sections */}
        <div className="mt-32 space-y-32">
          {/* Admin's Perspective */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-up">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Headset className="mr-1 h-3.5 w-3.5" />
                  Admin Dashboard
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                Simplify Front Desk Operations
              </h2>
              <p className="text-lg text-muted-foreground">
                Streamline check-ins, appointment scheduling, and patient communications with our intuitive admin interface designed specifically for healthcare practices.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
                  <span>One-click patient check-in with digital forms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
                  <span>Intelligent scheduling with double-booking prevention</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
                  <span>Automated appointment reminders and confirmations</span>
                </li>
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-3xl transform rotate-1 blur-xl"></div>
              <div className="glass rounded-3xl p-1 relative z-10 border border-white/20 shadow-xl overflow-hidden">
                <ResponsiveImage 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000"
                  alt="Admin using healthcare CRM at reception desk" 
                  className="w-full h-full rounded-2xl"
                  aspectRatio="16/9"
                />
                
                <div className="absolute bottom-8 left-8 right-8 glass-dark rounded-xl p-4 shadow-lg backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Reception Efficiency</h4>
                        <p className="text-2xl font-bold">+58%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Doctor's Perspective */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-3xl transform rotate-1 blur-xl"></div>
              <div className="glass rounded-3xl p-1 relative z-10 border border-white/20 shadow-xl overflow-hidden">
                <ResponsiveImage 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2000"
                  alt="Doctor reviewing patient records on tablet" 
                  className="w-full h-full rounded-2xl"
                  aspectRatio="16/9"
                />
                
                <div className="absolute bottom-8 left-8 right-8 glass-dark rounded-xl p-4 shadow-lg backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <Stethoscope className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Patients Per Day</h4>
                        <p className="text-2xl font-bold">+42%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 space-y-6 animate-fade-up">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Stethoscope className="mr-1 h-3.5 w-3.5" />
                  Doctor's Dashboard
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                Spend Less Time on Records, More Time with Patients
              </h2>
              <p className="text-lg text-muted-foreground">
                Access complete patient histories, test results, and appointment notes in seconds. Make informed decisions faster with our intuitive doctor's interface.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
                  <span>Instant access to complete patient medical history</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
                  <span>Voice dictation for quick note-taking between appointments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
                  <span>Automated follow-up scheduling and reminders</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Nurse's Perspective */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-up">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Clipboard className="mr-1 h-3.5 w-3.5" />
                  Nurse's Workflow
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                Streamline Patient Care Coordination
              </h2>
              <p className="text-lg text-muted-foreground">
                Efficiently manage patient intake, vitals recording, and care coordination. Ensure nothing falls through the cracks with task management and automated alerts.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
                  <span>Digital vitals recording with abnormality alerts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
                  <span>Medication administration scheduling and tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
                  <span>Patient education materials at your fingertips</span>
                </li>
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-3xl transform rotate-1 blur-xl"></div>
              <div className="glass rounded-3xl p-1 relative z-10 border border-white/20 shadow-xl overflow-hidden">
                <ResponsiveImage 
                  src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=2000"
                  alt="Nurse using tablet for patient care" 
                  className="w-full h-full rounded-2xl"
                  aspectRatio="16/9"
                />
                
                <div className="absolute bottom-8 left-8 right-8 glass-dark rounded-xl p-4 shadow-lg backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <BarChart className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Documentation Time</h4>
                        <p className="text-2xl font-bold">-45%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trusted By Section */}
        <div className="mt-32 animate-fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
              Trusted by Leading Healthcare Providers
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Join thousands of healthcare facilities that trust OpenCRM to optimize their patient experience and streamline operations.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="p-4 glass rounded-xl hover:shadow-lg transition-all duration-300">
              <img src="/logos/acme.svg" alt="Acme Healthcare" className="h-10 w-auto" />
            </div>
            <div className="p-4 glass rounded-xl hover:shadow-lg transition-all duration-300">
              <img src="/logos/globex.svg" alt="Globex Hospitals" className="h-10 w-auto" />
            </div>
            <div className="p-4 glass rounded-xl hover:shadow-lg transition-all duration-300">
              <img src="/logos/hooli.svg" alt="Hooli Medical" className="h-10 w-auto" />
            </div>
            <div className="p-4 glass rounded-xl hover:shadow-lg transition-all duration-300">
              <img src="/logos/stark.svg" alt="Stark Health" className="h-10 w-auto" />
            </div>
          </div>
        </div>

        {/* Testimonials Preview */}
        <div className="mt-32 animate-fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
              What Healthcare Professionals Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hear from healthcare professionals who have transformed their practice with OpenCRM.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="OpenCRM cut our patient check-in time by 70% and dramatically improved our scheduling efficiency."
              name="Dr. Sarah Johnson"
              role="Medical Director"
              facility="Westside Medical Center"
            />
            <TestimonialCard
              quote="The intuitive interface means our staff needed minimal training. We were up and running in days, not weeks."
              name="Michael Chen"
              role="Practice Manager"
              facility="Family Care Associates"
            />
            <TestimonialCard
              quote="Patient satisfaction scores have increased by 35% since implementing OpenCRM across our five locations."
              name="Dr. James Wilson"
              role="Chief Medical Officer"
              facility="Regional Health Partners"
            />
          </div>
          
          <div className="mt-12 text-center">
            <Link to="#testimonials">
              <ButtonCustom variant="outline" size="lg" className="font-medium group">
                Read More Success Stories
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonCustom>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Stat box component
interface StatBoxProps {
  value: string;
  label: string;
}

const StatBox = ({ value, label }: StatBoxProps) => (
  <div className="glass rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-white/10">
    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">{value}</p>
    <p className="text-sm text-muted-foreground mt-1 font-medium">{label}</p>
  </div>
);

// Testimonial card component
interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  facility: string;
}

const TestimonialCard = ({ quote, name, role, facility }: TestimonialCardProps) => (
  <Card className="glass border-white/10 hover:shadow-lg transition-all duration-300">
    <CardContent className="p-6">
      <div className="mb-4">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-primary fill-primary" />
          ))}
        </div>
      </div>
      <p className="mb-6 text-foreground">{quote}</p>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{role}, {facility}</p>
      </div>
    </CardContent>
  </Card>
);

export default Hero;
