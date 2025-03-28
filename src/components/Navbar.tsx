
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import DesktopNav from "./navbar/DesktopNav";
import MobileNav from "./navbar/MobileNav";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";

interface NavbarProps {
  scrollToSection?: (sectionId: string) => void;
}

const Navbar = ({ scrollToSection }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Handle initial hash navigation when page loads
    if (location.hash && location.pathname === '/') {
      const sectionId = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Don't close menu on location change - sections are on same page

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleScrollToSection = (sectionId: string) => {
    // Don't close the mobile menu here, so users can click multiple sections
    
    if (scrollToSection) {
      scrollToSection(sectionId);
    } else {
      if (location.pathname !== '/') {
        // Navigate to home page and then scroll
        navigate('/', { replace: true });
        // Increase timeout to ensure the page has fully loaded
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 200);
      } else {
        // Already on home page, just scroll
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleHomeClick = () => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "py-2 bg-background/80 backdrop-blur-md shadow-sm"
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center z-50" onClick={handleHomeClick}>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            OpenCRM
          </span>
        </Link>

        <DesktopNav isActive={isActive} scrollToSection={handleScrollToSection} />

        <div className="flex items-center md:hidden">
          <button
            className="p-2 rounded-full hover:bg-background/80 hover:shadow-sm transition-all"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileNav 
            isOpen={isMobileMenuOpen}
            isActive={isActive}
            scrollToSection={handleScrollToSection}
            closeMobileMenu={closeMobileMenu}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
