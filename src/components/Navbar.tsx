
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ButtonCustom } from "./ui/button-custom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if current path is active
  const isActive = (path: string) => {
    return location.pathname === path;
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
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            NextCRM
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/" active={isActive("/")}>
            Home
          </NavLink>
          <NavLink href="#features" active={false}>
            Features
          </NavLink>
          <NavLink href="#pricing" active={false}>
            Pricing
          </NavLink>
          <NavLink href="#contact" active={false}>
            Contact
          </NavLink>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <ButtonCustom variant="ghost">Login</ButtonCustom>
          </Link>
          <Link to="/login">
            <ButtonCustom>Sign Up</ButtonCustom>
          </Link>
        </div>

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass animate-fade-down py-4">
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            <NavLink href="/" active={isActive("/")} onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink href="#features" active={false} onClick={() => setIsMobileMenuOpen(false)}>
              Features
            </NavLink>
            <NavLink href="#pricing" active={false} onClick={() => setIsMobileMenuOpen(false)}>
              Pricing
            </NavLink>
            <NavLink href="#contact" active={false} onClick={() => setIsMobileMenuOpen(false)}>
              Contact
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

// NavLink Component
interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ href, active, children, onClick }: NavLinkProps) => {
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
