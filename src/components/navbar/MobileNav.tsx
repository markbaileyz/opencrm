
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ButtonCustom } from "../ui/button-custom";
import NavLink from "./NavLink";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

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
    <div className="md:hidden fixed top-[60px] left-0 right-0 bottom-0 z-40 bg-background/95 backdrop-blur-sm animate-in slide-in-from-top duration-300 overflow-y-auto">
      <nav className="container mx-auto px-4 flex flex-col space-y-4 py-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            OpenCRM
          </h2>
          <ThemeToggle />
        </div>
        
        <div className="space-y-3 py-4">
          <NavLink 
            href="/" 
            active={isActive("/")} 
            onClick={handleHomeClick}
            className="text-lg font-medium py-3"
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
            className="text-lg font-medium py-3"
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
            className="text-lg font-medium py-3"
          >
            Pricing
          </NavLink>
          <NavLink 
            href="/healthcare-crm" 
            active={isActive("/healthcare-crm")} 
            onClick={() => handleNavigate("/healthcare-crm")}
            className="text-lg font-medium py-3"
          >
            Healthcare CRM
          </NavLink>
          <NavLink 
            href="/roadmap" 
            active={isActive("/roadmap")} 
            onClick={() => handleNavigate("/roadmap")}
            className="text-lg font-medium py-3"
          >
            Roadmap
          </NavLink>
        </div>
        
        <Link 
          to="/pre-check-in" 
          onClick={closeMobileMenu}
          className="w-full bg-gradient-to-r from-blue-400 to-primary text-white font-semibold rounded-full py-3 px-6 text-center shadow-md hover:shadow-lg transition-all duration-300"
        >
          Pre-Check-In
        </Link>
        
        <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t">
          <Link to="/login" onClick={closeMobileMenu}>
            <ButtonCustom variant="outline" size="lg">
              Login
            </ButtonCustom>
          </Link>
          <Link to="/login" onClick={closeMobileMenu}>
            <ButtonCustom size="lg">Sign Up</ButtonCustom>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
