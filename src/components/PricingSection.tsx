
import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Pricing Item Component
interface PricingItemProps {
  children: React.ReactNode;
}

const PricingItem = ({ children }: PricingItemProps) => {
  return (
    <li className="flex items-center text-sm">
      <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
};

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 dark-gradient relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-4 shadow-sm bg-blue-500/20 text-blue-300 border border-blue-400/30">
            Pricing Plans
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up text-white">
            Simple, transparent pricing
          </h2>
          <div className="flex items-center justify-center mb-6">
            <Separator className="w-12 bg-blue-400/30" />
            <span className="mx-4 text-blue-300 font-medium">No Hidden Fees</span>
            <Separator className="w-12 bg-blue-400/30" />
          </div>
          <p className="text-lg text-white/70 animate-fade-up delay-100">
            Choose the plan that works best for your practice
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="dark-card p-6 border-white/5 animate-fade-up delay-200 hover:border-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:translate-y-[-3px]">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-white">Starter</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold text-white">$49</span>
                <span className="text-blue-300 ml-1">/month</span>
              </div>
              <p className="text-white/60 text-sm mt-2">
                Perfect for solo practitioners just getting started
              </p>
            </div>
            
            <ul className="space-y-3 mb-6 text-white/80">
              <PricingItem>Up to 100 patients</PricingItem>
              <PricingItem>Basic messaging</PricingItem>
              <PricingItem>Appointment scheduling</PricingItem>
              <PricingItem>Patient portal</PricingItem>
            </ul>
            
            <Link to="/login">
              <ButtonCustom variant="outline" className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/20">
                Get Started
              </ButtonCustom>
            </Link>
          </div>
          
          {/* Pro Plan */}
          <div className="dark-card p-8 border-blue-500/30 relative animate-fade-up delay-300 hover:border-blue-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:translate-y-[-3px]">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg">
              MOST POPULAR
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium text-white">Professional</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold text-white">$99</span>
                <span className="text-blue-300 ml-1">/month</span>
              </div>
              <p className="text-white/60 text-sm mt-2">
                For growing practices with advanced needs
              </p>
            </div>
            
            <ul className="space-y-3 mb-6 text-white/80">
              <PricingItem>Unlimited patients</PricingItem>
              <PricingItem>Advanced messaging</PricingItem>
              <PricingItem>Team collaboration</PricingItem>
              <PricingItem>Document management</PricingItem>
              <PricingItem>Custom templates</PricingItem>
              <PricingItem>Analytics dashboard</PricingItem>
            </ul>
            
            <Link to="/login">
              <ButtonCustom className="w-full bg-blue-600 hover:bg-blue-700 text-white border-none">
                Get Started
              </ButtonCustom>
            </Link>
          </div>
          
          {/* Enterprise Plan */}
          <div className="dark-card p-6 border-white/5 animate-fade-up delay-400 hover:border-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:translate-y-[-3px]">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-white">Enterprise</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold text-white">Custom</span>
              </div>
              <p className="text-white/60 text-sm mt-2">
                For large healthcare organizations with specialized requirements
              </p>
            </div>
            
            <ul className="space-y-3 mb-6 text-white/80">
              <PricingItem>All Professional features</PricingItem>
              <PricingItem>Dedicated account manager</PricingItem>
              <PricingItem>Custom integrations</PricingItem>
              <PricingItem>Priority support</PricingItem>
              <PricingItem>Advanced security features</PricingItem>
              <PricingItem>Custom branding</PricingItem>
            </ul>
            
            <Link to="/login">
              <ButtonCustom variant="outline" className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/20">
                Contact Sales
              </ButtonCustom>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PricingItem };
export default PricingSection;
