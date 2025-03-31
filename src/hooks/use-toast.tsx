
import React from "react";
import { toast } from "sonner";

// Interface for toast options
interface ToastOptions {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
}

export const useToast = () => {
  const showToast = ({ title, description, action, variant = "default", duration }: ToastOptions) => {
    switch (variant) {
      case "success":
        return toast.success(title, {
          description,
          action,
          duration,
        });
      case "error":
        return toast.error(title, {
          description,
          action,
          duration,
        });
      case "warning":
        return toast.warning(title, {
          description,
          action,
          duration,
        });
      case "info":
        return toast.info(title, {
          description,
          action,
          duration,
        });
      default:
        return toast(title, {
          description,
          action,
          duration,
        });
    }
  };

  return {
    toast: showToast,
    dismiss: toast.dismiss,
  };
};
