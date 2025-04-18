
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ButtonCustom } from "../ui/button-custom";
import NavLink from "./NavLink";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface DesktopNavProps {
  isActive: (path: string) => boolean;
  scrollToSection: (sectionId: string) => void;
}

const DesktopNav = ({ isActive, scrollToSection }: DesktopNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleHomeClick = () => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleNavigate = (path: string) => {
    navigate(path, { replace: true });
  };
  
  return (
    <>
      <nav className="hidden md:flex items-center space-x-8">
        <NavLink href="/" active={isActive("/")} onClick={handleHomeClick}>
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
        <NavLink href="/healthcare-crm" active={isActive("/healthcare-crm")} onClick={() => handleNavigate("/healthcare-crm")}>
          Healthcare CRM
        </NavLink>
        <NavLink href="/roadmap" active={isActive("/roadmap")} onClick={() => handleNavigate("/roadmap")}>
          Roadmap
        </NavLink>
        <NavLink 
          href="/pre-check-in" 
          active={isActive("/pre-check-in")} 
          onClick={() => handleNavigate("/pre-check-in")}
          className="bg-primary/10 text-primary font-semibold rounded-full px-4 py-1 transition-colors hover:bg-primary/20"
        >
          Pre-Check-In
        </NavLink>
      </nav>

      <div className="hidden md:flex items-center space-x-4">
        <ThemeToggle />
        <Link to="/login">
          <ButtonCustom variant="ghost">Login</ButtonCustom>
        </Link>
        <Link to="/login">
          <ButtonCustom>Sign Up</ButtonCustom>
        </Link>
      </div>
    </>
  );
};

export default DesktopNav;
