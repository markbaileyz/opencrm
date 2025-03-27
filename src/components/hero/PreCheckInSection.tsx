
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import ResponsiveImage from "@/components/ui/responsive-image";

const PreCheckInSection = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden my-20 group shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-600/80 z-10 opacity-80"></div>
      
      <ResponsiveImage 
        src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2000"
        alt="Woman using smartphone on bus for pre-check-in" 
        className="w-full h-full object-cover"
        aspectRatio="21/9"
      />
      
      <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-12 text-white">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Skip the Wait with Online Pre-Check-In
          </h2>
          <p className="text-white/90 mb-6 max-w-xl">
            Save time at your next appointment by completing your paperwork online. Our secure pre-check-in process takes just minutes - even while commuting!
          </p>
          
          <Link to="/pre-check-in" className="inline-flex items-center group">
            <div className="flex items-center bg-white text-primary font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group-hover:bg-white/90">
              <Clock className="mr-2 h-5 w-5" />
              Start Pre-Check-In
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
          
          <div className="flex items-center mt-6 text-sm bg-white/20 w-fit px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="mr-2 bg-green-500 h-2 w-2 rounded-full"></span>
            HIPAA Compliant & Secure
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreCheckInSection;
