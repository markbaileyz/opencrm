import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-background pt-16 pb-12 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                NextCRM
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Comprehensive customer relationship management platform for modern businesses, simplifying client management and service coordination.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">Product</h4>
            <ul className="space-y-3">
              <FooterLink href="/#features" sectionId="features">Features</FooterLink>
              <FooterLink href="/#pricing" sectionId="pricing">Pricing</FooterLink>
              <FooterLink href="/#testimonials" sectionId="testimonials">Testimonials</FooterLink>
              <FooterLink href="/roadmap">Roadmap</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">Company</h4>
            <ul className="space-y-3">
              <FooterLink href="/#about" sectionId="about">About Us</FooterLink>
              <FooterLink href="/#careers" sectionId="careers">Careers</FooterLink>
              <FooterLink href="/#blog" sectionId="blog">Blog</FooterLink>
              <FooterLink href="/#contact" sectionId="contact">Contact</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">Legal</h4>
            <ul className="space-y-3">
              <FooterLink href="/#privacy" sectionId="privacy">Privacy Policy</FooterLink>
              <FooterLink href="/#terms" sectionId="terms">Terms of Service</FooterLink>
              <FooterLink href="/#security" sectionId="security">Security</FooterLink>
              <FooterLink href="/#hipaa" sectionId="hipaa">HIPAA Compliance</FooterLink>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} NextCRM. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <SocialLink href="https://twitter.com" label="Twitter">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </SocialLink>
            <SocialLink href="https://linkedin.com" label="LinkedIn">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </SocialLink>
            <SocialLink href="https://facebook.com" label="Facebook">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  sectionId?: string;
}

const FooterLink = ({ href, children, sectionId }: FooterLinkProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith("/#") && sectionId) {
      e.preventDefault();
      
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
  
  if (href.startsWith("/#") && sectionId) {
    return (
      <li>
        <a
          href={href}
          className="text-muted-foreground hover:text-foreground text-sm transition"
          onClick={handleClick}
        >
          {children}
        </a>
      </li>
    );
  }
  
  return (
    <li>
      <Link
        to={href}
        className="text-muted-foreground hover:text-foreground text-sm transition"
      >
        {children}
      </Link>
    </li>
  );
};

interface SocialLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

const SocialLink = ({ href, label, children }: SocialLinkProps) => {
  return (
    <a
      href={href}
      className="text-muted-foreground hover:text-foreground transition"
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default Footer;
