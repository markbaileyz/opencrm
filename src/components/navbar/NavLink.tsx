
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ href, active, children, onClick }: NavLinkProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    // If custom onClick handler is provided, use that
    if (onClick) {
      e.preventDefault();
      onClick();
      return;
    }
    
    // Special handling for home link
    if (href === "/") {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    
    // Handle hash links (section links within the homepage)
    if (href.startsWith("/#")) {
      e.preventDefault();
      const sectionId = href.substring(2);
      
      if (location.pathname !== '/') {
        // Navigate to home page with the hash
        navigate(`/#${sectionId}`);
      } else {
        // We're already on the home page, just scroll to section
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }
    
    // If we're already on the target route, prevent default navigation
    if (location.pathname === href) {
      e.preventDefault();
      return;
    }
  };
  
  // For home or hash links, use anchor tag with our custom handler
  if (href === "/" || href.startsWith("/#")) {
    return (
      <a
        href={href}
        className={`font-medium text-sm hover-underline text-left ${
          active ? "text-primary" : "text-foreground"
        }`}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }
  
  // For other links, use React Router's Link
  return (
    <Link
      to={href}
      className={`font-medium text-sm hover-underline ${
        active ? "text-primary" : "text-foreground"
      }`}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
