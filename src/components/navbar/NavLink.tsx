
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const NavLink = ({ href, active, children, onClick, className }: NavLinkProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If custom onClick handler is provided, use that
    if (onClick) {
      onClick();
      return;
    }
    
    // Special handling for home link
    if (href === "/") {
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    
    // Handle hash links (section links within the homepage)
    if (href.startsWith("/#")) {
      const sectionId = href.substring(2);
      
      if (location.pathname !== '/') {
        // Navigate to home page first if we're not there
        navigate('/', { replace: true });
        // Set a timeout to ensure the home page renders completely
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      } else {
        // We're already on the home page, just scroll to section
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }
    
    // For all other regular page links
    navigate(href, { replace: true });
  };
  
  return (
    <Link
      to={href}
      className={cn(
        "font-medium text-sm hover-underline",
        active ? "text-primary" : "text-foreground",
        className
      )}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
