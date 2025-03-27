
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import DesktopNav from "./navbar/DesktopNav";
import MobileNav from "./navbar/MobileNav";

const Navbar = () => {
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
      }, 100);
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`, { replace: true });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 glass shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            OpenCRM
          </span>
        </Link>

        <DesktopNav isActive={isActive} scrollToSection={scrollToSection} />

        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      <MobileNav 
        isOpen={isMobileMenuOpen}
        isActive={isActive}
        scrollToSection={scrollToSection}
        closeMobileMenu={closeMobileMenu}
      />
    </header>
  );
};

export default Navbar;
