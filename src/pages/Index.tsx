import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/Footer";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <Features />
        
        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
                Simple, transparent pricing
              </h2>
              <p className="text-lg text-muted-foreground animate-fade-up delay-100">
                Choose the plan that works best for your business
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <div className="glass rounded-xl p-6 border border-border animate-fade-up delay-200">
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Starter</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$49</span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">
                    Perfect for solo practitioners just getting started
                  </p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <PricingItem>Up to 100 patients</PricingItem>
                  <PricingItem>Basic messaging</PricingItem>
                  <PricingItem>Appointment scheduling</PricingItem>
                  <PricingItem>Patient portal</PricingItem>
                </ul>
                
                <Link to="/login">
                  <ButtonCustom variant="outline" className="w-full">
                    Get Started
                  </ButtonCustom>
                </Link>
              </div>
              
              {/* Pro Plan */}
              <div className="glass rounded-xl p-8 border-2 border-primary relative animate-fade-up delay-300">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full">
                  MOST POPULAR
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Professional</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$99</span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">
                    For growing practices with advanced needs
                  </p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <PricingItem>Unlimited patients</PricingItem>
                  <PricingItem>Advanced messaging</PricingItem>
                  <PricingItem>Team collaboration</PricingItem>
                  <PricingItem>Document management</PricingItem>
                  <PricingItem>Custom templates</PricingItem>
                  <PricingItem>Analytics dashboard</PricingItem>
                </ul>
                
                <Link to="/login">
                  <ButtonCustom className="w-full">
                    Get Started
                  </ButtonCustom>
                </Link>
              </div>
              
              {/* Enterprise Plan */}
              <div className="glass rounded-xl p-6 border border-border animate-fade-up delay-400">
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Enterprise</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">Custom</span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">
                    For large healthcare organizations with specialized requirements
                  </p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <PricingItem>All Professional features</PricingItem>
                  <PricingItem>Dedicated account manager</PricingItem>
                  <PricingItem>Custom integrations</PricingItem>
                  <PricingItem>Priority support</PricingItem>
                  <PricingItem>Advanced security features</PricingItem>
                  <PricingItem>Custom branding</PricingItem>
                </ul>
                
                <Link to="/login">
                  <ButtonCustom variant="outline" className="w-full">
                    Contact Sales
                  </ButtonCustom>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
                Trusted by businesses everywhere
              </h2>
              <p className="text-lg text-muted-foreground animate-fade-up delay-100">
                See what our customers have to say about us
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                name="Dr. Sarah Johnson"
                role="Family Physician"
                content="Tellescope has transformed my practice. The intuitive interface and seamless patient communication tools have saved us hours each day."
                rating={5}
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1374"
                className="animate-fade-up delay-200"
              />
              
              <TestimonialCard
                name="Dr. Michael Chen"
                role="Pediatrician"
                content="My staff loves the scheduling system, and patients appreciate the modern experience. Worth every penny for the time saved and improved patient satisfaction."
                rating={5}
                image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1374"
                className="animate-fade-up delay-300"
              />
              
              <TestimonialCard
                name="Jessica Rivera"
                role="Practice Manager"
                content="The customer support is exceptional. They've been responsive to our needs and continuously improve the platform based on our feedback."
                rating={4}
                image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1374"
                className="animate-fade-up delay-400"
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="glass rounded-xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 z-0"></div>
              
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
                  Ready to transform your business?
                </h2>
                <p className="text-lg mb-8 animate-fade-up delay-100">
                  Join thousands of businesses who trust NextCRM to streamline their customer relationships.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-200">
                  <Link to="/login">
                    <ButtonCustom size="lg" className="group">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </ButtonCustom>
                  </Link>
                  <Link to="#features">
                    <ButtonCustom variant="outline" size="lg">
                      Learn More
                    </ButtonCustom>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Pricing Item Component
interface PricingItemProps {
  children: React.ReactNode;
}

const PricingItem = ({ children }: PricingItemProps) => {
  return (
    <li className="flex items-center text-sm">
      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
};

export default Index;
