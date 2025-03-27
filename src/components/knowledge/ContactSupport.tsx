
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ContactSupport: React.FC = () => {
  return (
    <div className="bg-muted p-6 rounded-lg mt-8">
      <h3 className="font-semibold text-lg mb-2">Can't find what you're looking for?</h3>
      <p className="text-muted-foreground mb-4">Our support team is ready to assist you with any questions or issues.</p>
      <div className="flex flex-wrap gap-4">
        <Button>Contact Support</Button>
        <Button variant="outline">Submit a Feature Request</Button>
        <Link to="/pre-check-in">
          <Button variant="default" className="bg-primary">Pre-Check-In</Button>
        </Link>
      </div>
    </div>
  );
};

export default ContactSupport;
