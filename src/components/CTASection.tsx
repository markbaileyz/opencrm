
import React from "react";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
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
  );
};

export default CTASection;
