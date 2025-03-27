
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ButtonCustom } from "../ui/button-custom";
import NavLink from "./NavLink";

interface DesktopNavProps {
  isActive: (path: string) => boolean;
  scrollToSection: (sectionId: string) => void;
}

const DesktopNav = ({ isActive, scrollToSection }: DesktopNavProps) => {
  const location = useLocation();
  
  return (
    <>
      <nav className="hidden md:flex items-center space-x-8">
        <NavLink href="/" active={isActive("/")} onClick={() => null}>
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
        <NavLink href="/mind-map" active={isActive("/mind-map")} onClick={() => null}>
          Mind Map
        </NavLink>
        <NavLink href="/healthcare-crm" active={isActive("/healthcare-crm")} onClick={() => null}>
          Healthcare CRM
        </NavLink>
        <NavLink href="/roadmap" active={isActive("/roadmap")} onClick={() => null}>
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
