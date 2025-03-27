
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileEmailView from "@/components/email/mobile/MobileEmailView";
import DesktopEmailView from "@/components/email/desktop/DesktopEmailView";
import ResponsiveContainer from "@/components/ui/responsive-container";
import { EmailProvider } from "@/context/EmailContext";

const EmailPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <EmailProvider>
          <ResponsiveContainer
            mobileView={<MobileEmailView />}
            desktopView={<DesktopEmailView />}
            className="h-full"
          />
        </EmailProvider>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmailPage;
