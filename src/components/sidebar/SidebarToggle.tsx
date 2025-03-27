
import React from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const SidebarToggle = ({ isOpen, onClick }: SidebarToggleProps) => {
  return (
    <button
      onClick={onClick}
      className="md:hidden absolute top-4 left-4 z-50"
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <Menu className="h-6 w-6" />
      )}
    </button>
  );
};

export default SidebarToggle;
