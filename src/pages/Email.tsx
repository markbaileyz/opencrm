
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import MobileEmailView from "@/components/email/mobile/MobileEmailView";
import DesktopEmailView from "@/components/email/desktop/DesktopEmailView";
import ResponsiveContainer from "@/components/ui/responsive-container";
import { EmailProvider } from "@/context/EmailContext";

const EmailPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="h-full">
        <EmailProvider>
          <ResponsiveContainer
            mobileView={<MobileEmailView />}
            desktopView={<DesktopEmailView />}
            className="h-full"
          />
        </EmailProvider>
      </div>
    </DashboardLayout>
  );
};

export default EmailPage;
