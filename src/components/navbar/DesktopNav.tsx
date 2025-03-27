
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ButtonCustom } from "../ui/button-custom";
import NavLink from "./NavLink";

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
      </nav>

      <div className="hidden md:flex items-center space-x-4">
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
