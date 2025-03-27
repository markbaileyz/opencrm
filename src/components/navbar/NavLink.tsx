
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
        navigate('/', { replace: true });
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
        // Force navigation to home page first if we're not there
        navigate('/', { replace: true });
        // Set a larger timeout to ensure the home page renders completely
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 200);
      } else {
        // We're already on the home page, just scroll to section
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }
    
    // For standard page links, let Link handle it
    // But prevent navigation if we're already on the target route
    if (location.pathname === href) {
      e.preventDefault();
    }
  };
  
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
