
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

interface ScrollToTopButtonProps {
  scrollToTop: () => void;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ scrollToTop }) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-6 right-6 rounded-full shadow-md"
      onClick={scrollToTop}
    >
      <ArrowUp className="h-4 w-4" />
      <span className="sr-only">Back to top</span>
    </Button>
  );
};

export default ScrollToTopButton;
