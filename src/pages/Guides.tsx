
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import VideoTutorials from "@/components/guides/VideoTutorials";
import CommunityForums from "@/components/guides/CommunityForums";
import GuidesHeader from "@/components/guides/GuidesHeader";
import GuideCardsGrid from "@/components/guides/GuideCardsGrid";
import AllGuidesSection from "@/components/guides/AllGuidesSection";
import DocumentationSection from "@/components/guides/DocumentationSection";

const Guides = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <GuidesHeader />
        <GuideCardsGrid />
        <VideoTutorials />
        <CommunityForums />
        <AllGuidesSection />
        <DocumentationSection />
      </div>
    </DashboardLayout>
  );
};

export default Guides;
