
import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

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

const PricingSection = () => {
  return (
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
  );
};

export { PricingItem };
export default PricingSection;
