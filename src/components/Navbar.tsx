import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ButtonCustom } from "./ui/button-custom";
import { Menu, X } from "lucide-react";

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            OpenSRM
          </span>
        </Link>

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
          <NavLink href="/roadmap" active={isActive("/roadmap")} onClick={() => null}>
            Roadmap
          </NavLink>
          <NavLink href="/mind-map" active={isActive("/mind-map")} onClick={() => null}>
            Mind Map
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

      {isMobileMenuOpen && (
        <div className="md:hidden glass animate-fade-down py-4">
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            <NavLink href="/" active={isActive("/")} onClick={() => setIsMobileMenuOpen(false)}>
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
            <NavLink href="/roadmap" active={isActive("/roadmap")} onClick={() => setIsMobileMenuOpen(false)}>
              Roadmap
            </NavLink>
            <NavLink href="/mind-map" active={isActive("/mind-map")} onClick={() => setIsMobileMenuOpen(false)}>
              Mind Map
            </NavLink>
            <div className="flex space-x-4 pt-2">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <ButtonCustom variant="ghost" size="sm">
                  Login
                </ButtonCustom>
              </Link>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <ButtonCustom size="sm">Sign Up</ButtonCustom>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

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

export default Navbar;
