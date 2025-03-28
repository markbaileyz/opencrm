
import React from "react";
import Roadmap from "./Roadmap";
import DashboardLayout from "@/components/DashboardLayout";

const DashboardRoadmap = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Product Roadmap</h1>
      <p className="text-muted-foreground mb-8">
        Track the development progress and upcoming features of our Healthcare CRM platform.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-medium mb-4">Recently Launched</h2>
          <ul className="space-y-3">
            <li className="p-3 bg-background rounded-md">Patient portal integration</li>
            <li className="p-3 bg-background rounded-md">Automated appointment reminders</li>
            <li className="p-3 bg-background rounded-md">Billing system integration</li>
          </ul>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-medium mb-4">In Development</h2>
          <ul className="space-y-3">
            <li className="p-3 bg-background rounded-md">Telehealth video conferencing</li>
            <li className="p-3 bg-background rounded-md">Mobile app for practitioners</li>
            <li className="p-3 bg-background rounded-md">Enhanced analytics dashboard</li>
          </ul>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-medium mb-4">Coming Soon</h2>
          <ul className="space-y-3">
            <li className="p-3 bg-background rounded-md">AI-powered patient insights</li>
            <li className="p-3 bg-background rounded-md">Multi-location support</li>
            <li className="p-3 bg-background rounded-md">Custom workflow builder</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoadmap;
