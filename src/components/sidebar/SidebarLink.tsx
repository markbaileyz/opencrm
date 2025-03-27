
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const SidebarLink = ({ href, isActive, children, onClick }: SidebarLinkProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "group flex items-center space-x-3 py-2 px-4 rounded-md transition-colors duration-200",
        isActive
          ? "bg-primary/10 text-primary"
          : "hover:bg-accent hover:text-accent-foreground"
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default SidebarLink;
