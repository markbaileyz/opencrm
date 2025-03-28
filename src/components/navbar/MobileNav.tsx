
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ButtonCustom } from "../ui/button-custom";
import NavLink from "./NavLink";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MobileNavProps {
  isOpen: boolean;
  isActive: (path: string) => boolean;
  scrollToSection: (sectionId: string) => void;
  closeMobileMenu: () => void;
}

const MobileNav = ({ isOpen, isActive, scrollToSection, closeMobileMenu }: MobileNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!isOpen) return null;
  
  const handleHomeClick = () => {
    closeMobileMenu();
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleNavigate = (path: string) => {
    closeMobileMenu();
    navigate(path, { replace: true });
  };
  
  return (
    <motion.div 
      className="md:hidden fixed top-[60px] left-0 right-0 bottom-0 z-40 bg-background/95 backdrop-blur-sm overflow-y-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <nav className="container mx-auto px-4 flex flex-col h-full">
        <div className="flex items-center justify-between py-4 border-b">
          <ThemeToggle />
        </div>
        
        <div className="flex flex-col space-y-1 py-6 flex-grow">
          <NavLink 
            href="/" 
            active={isActive("/")} 
            onClick={handleHomeClick}
            className="text-lg font-medium py-4 px-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            Home
          </NavLink>
          <NavLink 
            href="/#features" 
            active={location.pathname === "/" && location.hash === "#features"} 
            onClick={() => {
              closeMobileMenu();
              scrollToSection("features");
            }}
            className="text-lg font-medium py-4 px-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            Features
          </NavLink>
          <NavLink 
            href="/#pricing" 
            active={location.pathname === "/" && location.hash === "#pricing"} 
            onClick={() => {
              closeMobileMenu();
              scrollToSection("pricing");
            }}
            className="text-lg font-medium py-4 px-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            Pricing
          </NavLink>
          <NavLink 
            href="/healthcare-crm" 
            active={isActive("/healthcare-crm")} 
            onClick={() => handleNavigate("/healthcare-crm")}
            className="text-lg font-medium py-4 px-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            Healthcare CRM
          </NavLink>
          <NavLink 
            href="/roadmap" 
            active={isActive("/roadmap")} 
            onClick={() => handleNavigate("/roadmap")}
            className="text-lg font-medium py-4 px-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            Roadmap
          </NavLink>
        </div>
        
        <div className="mt-auto py-6 border-t">
          <Link 
            to="/pre-check-in" 
            onClick={closeMobileMenu}
            className="block w-full mb-6 bg-gradient-to-r from-blue-400 to-primary text-white font-semibold rounded-full py-3 px-6 text-center shadow-md hover:shadow-lg transition-all duration-300"
          >
            Pre-Check-In
          </Link>
          
          <div className="flex items-center justify-center gap-3">
            <Link to="/login" onClick={closeMobileMenu} className="w-full">
              <ButtonCustom variant="outline" size="lg" className="w-full">
                Login
              </ButtonCustom>
            </Link>
            <Link to="/login" onClick={closeMobileMenu} className="w-full">
              <ButtonCustom size="lg" className="w-full">Sign Up</ButtonCustom>
            </Link>
          </div>
        </div>
      </nav>
    </motion.div>
  );
};

export default MobileNav;
