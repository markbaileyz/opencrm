
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ButtonCustom } from "../ui/button-custom";
import NavLink from "./NavLink";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface MobileNavProps {
  isOpen: boolean;
  isActive: (path: string) => boolean;
  scrollToSection: (sectionId: string) => void;
  closeMobileMenu: () => void;
}

const MobileNav = ({ isOpen, isActive, scrollToSection, closeMobileMenu }: MobileNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [expandedSections, setExpandedSections] = React.useState<string[]>([]);
  
  if (!isOpen) return null;
  
  const handleHomeClick = () => {
    closeMobileMenu();
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
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
          <button 
            onClick={closeMobileMenu}
            className="p-2 rounded-md hover:bg-muted"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
          <ThemeToggle />
        </div>
        
        <div className="flex flex-col space-y-1 py-6 flex-grow overflow-y-auto">
          {/* Main Navigation Links */}
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
            onClick={() => scrollToSection("features")}
            className="text-lg font-medium py-4 px-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            Features
          </NavLink>
          <NavLink 
            href="/#pricing" 
            active={location.pathname === "/" && location.hash === "#pricing"} 
            onClick={() => scrollToSection("pricing")}
            className="text-lg font-medium py-4 px-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            Pricing
          </NavLink>
          <NavLink 
            href="/healthcare-crm" 
            active={isActive("/healthcare-crm")} 
            onClick={() => {
              closeMobileMenu();
              navigate("/healthcare-crm");
            }}
            className="text-lg font-medium py-4 px-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            Healthcare CRM
          </NavLink>
          <NavLink 
            href="/roadmap" 
            active={isActive("/roadmap")} 
            onClick={() => {
              closeMobileMenu();
              navigate("/roadmap");
            }}
            className="text-lg font-medium py-4 px-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            Roadmap
          </NavLink>
          
          {/* Doctor-specific routes */}
          <div className="border-t pt-2 mt-2">
            <button 
              onClick={() => toggleSection("clinical")}
              className="w-full flex items-center justify-between py-4 px-2 text-lg font-medium rounded-md hover:bg-muted/50 transition-colors"
            >
              <span>Clinical</span>
              {expandedSections.includes("clinical") ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
            
            {expandedSections.includes("clinical") && (
              <div className="pl-4 space-y-1">
                <NavLink 
                  href="/prescriptions" 
                  active={isActive("/prescriptions")} 
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/prescriptions");
                  }}
                  className="text-md font-medium py-3 px-2 rounded-md hover:bg-muted/50 transition-colors"
                >
                  Prescriptions
                </NavLink>
                <NavLink 
                  href="/medications" 
                  active={isActive("/medications")} 
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/medications");
                  }}
                  className="text-md font-medium py-3 px-2 rounded-md hover:bg-muted/50 transition-colors"
                >
                  Medications
                </NavLink>
                <NavLink 
                  href="/clinical-dashboard" 
                  active={isActive("/clinical-dashboard")} 
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/clinical-dashboard");
                  }}
                  className="text-md font-medium py-3 px-2 rounded-md hover:bg-muted/50 transition-colors"
                >
                  Clinical Dashboard
                </NavLink>
              </div>
            )}
          </div>
          
          {/* Admin-specific routes */}
          <div className="border-t pt-2">
            <button 
              onClick={() => toggleSection("admin")}
              className="w-full flex items-center justify-between py-4 px-2 text-lg font-medium rounded-md hover:bg-muted/50 transition-colors"
            >
              <span>Admin</span>
              {expandedSections.includes("admin") ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
            
            {expandedSections.includes("admin") && (
              <div className="pl-4 space-y-1">
                <NavLink 
                  href="/front-desk" 
                  active={isActive("/front-desk")} 
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/front-desk");
                  }}
                  className="text-md font-medium py-3 px-2 rounded-md hover:bg-muted/50 transition-colors"
                >
                  Front Desk
                </NavLink>
                <NavLink 
                  href="/office" 
                  active={isActive("/office")} 
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/office");
                  }}
                  className="text-md font-medium py-3 px-2 rounded-md hover:bg-muted/50 transition-colors"
                >
                  Office
                </NavLink>
                <NavLink 
                  href="/compliance" 
                  active={isActive("/compliance")} 
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/compliance");
                  }}
                  className="text-md font-medium py-3 px-2 rounded-md hover:bg-muted/50 transition-colors"
                >
                  Compliance
                </NavLink>
                <NavLink 
                  href="/admin-settings" 
                  active={isActive("/admin-settings")} 
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/admin-settings");
                  }}
                  className="text-md font-medium py-3 px-2 rounded-md hover:bg-muted/50 transition-colors"
                >
                  Admin Settings
                </NavLink>
                <NavLink 
                  href="/user-management" 
                  active={isActive("/user-management")} 
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/user-management");
                  }}
                  className="text-md font-medium py-3 px-2 rounded-md hover:bg-muted/50 transition-colors"
                >
                  User Management
                </NavLink>
              </div>
            )}
          </div>
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
            {!isAuthenticated ? (
              <>
                <Link to="/login" onClick={closeMobileMenu} className="w-full">
                  <ButtonCustom variant="outline" size="lg" className="w-full">
                    Login
                  </ButtonCustom>
                </Link>
                <Link to="/login" onClick={closeMobileMenu} className="w-full">
                  <ButtonCustom size="lg" className="w-full">Sign Up</ButtonCustom>
                </Link>
              </>
            ) : (
              <Link to="/dashboard" onClick={closeMobileMenu} className="w-full">
                <ButtonCustom size="lg" className="w-full">Dashboard</ButtonCustom>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </motion.div>
  );
};

export default MobileNav;
