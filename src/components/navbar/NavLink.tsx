
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
    if (onClick) {
      onClick();
      return;
    }
    
    if (href.startsWith("/#")) {
      e.preventDefault();
      const sectionId = href.substring(2);
      
      if (location.pathname !== '/') {
        navigate(`/#${sectionId}`);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };
  
  if (href.startsWith("/#")) {
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
  
  return (
    <Link
      to={href}
      className={`font-medium text-sm hover-underline ${
        active ? "text-primary" : "text-foreground"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
