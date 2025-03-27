
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ButtonCustom } from "../ui/button-custom";
import NavLink from "./NavLink";

interface MobileNavProps {
  isOpen: boolean;
  isActive: (path: string) => boolean;
  scrollToSection: (sectionId: string) => void;
  closeMobileMenu: () => void;
}

const MobileNav = ({ isOpen, isActive, scrollToSection, closeMobileMenu }: MobileNavProps) => {
  const location = useLocation();
  
  if (!isOpen) return null;
  
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMobileMenu();
  };
  
  return (
    <div className="md:hidden glass animate-fade-down py-4">
      <nav className="container mx-auto px-4 flex flex-col space-y-4">
        <NavLink href="/" active={isActive("/")} onClick={closeMobileMenu}>
          Home
        </NavLink>
        <NavLink 
          href="/#features" 
          active={location.pathname === "/" && location.hash === "#features"} 
          onClick={() => scrollToSection("features")}
        >
          Features
        </NavLink>
        <NavLink 
          href="/#pricing" 
          active={location.pathname === "/" && location.hash === "#pricing"} 
          onClick={() => scrollToSection("pricing")}
        >
          Pricing
        </NavLink>
        <NavLink href="/roadmap" active={isActive("/roadmap")} onClick={closeMobileMenu}>
          Roadmap
        </NavLink>
        <NavLink href="/mind-map" active={isActive("/mind-map")} onClick={closeMobileMenu}>
          Mind Map
        </NavLink>
        <NavLink href="/healthcare-crm" active={isActive("/healthcare-crm")} onClick={closeMobileMenu}>
          Healthcare CRM
        </NavLink>
        <div className="flex space-x-4 pt-2">
          <Link to="/login" onClick={closeMobileMenu}>
            <ButtonCustom variant="ghost" size="sm">
              Login
            </ButtonCustom>
          </Link>
          <Link to="/login" onClick={closeMobileMenu}>
            <ButtonCustom size="sm">Sign Up</ButtonCustom>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
