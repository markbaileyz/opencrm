
import React from "react";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowRight, Shield, Clock, Users } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-blue-600/90 z-0"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white to-transparent"></div>
            <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white to-transparent"></div>
          </div>
          
          <div className="relative z-10 p-8 md:p-14 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="lg:pr-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-up">
                  Ready to transform your healthcare practice?
                </h2>
                <p className="text-lg mb-8 text-white/80 animate-fade-up delay-100">
                  Join thousands of healthcare professionals who trust OpenCRM to streamline their patient relationships.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-200">
                  <Link to="/login">
                    <ButtonCustom size="lg" className="group bg-white text-primary hover:bg-white/90">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </ButtonCustom>
                  </Link>
                  <Link to="#features">
                    <ButtonCustom variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                      Learn More
                    </ButtonCustom>
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="p-3 inline-flex rounded-full bg-white/20 mb-4">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">HIPAA Compliant</h3>
                  <p className="text-white/80">Secure platform that meets all healthcare regulatory requirements</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="p-3 inline-flex rounded-full bg-white/20 mb-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                  <p className="text-white/80">Reduce administrative work by up to 40% with automation</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-colors sm:col-span-2">
                  <div className="p-3 inline-flex rounded-full bg-white/20 mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Improve Patient Experience</h3>
                  <p className="text-white/80">Deliver exceptional care with streamlined communication and scheduling</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
