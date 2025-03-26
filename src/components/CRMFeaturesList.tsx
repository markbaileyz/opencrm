
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define feature categories and their features
interface Feature {
  name: string;
  description: string;
  implemented?: boolean;
  comingSoon?: boolean;
}

interface FeatureCategory {
  name: string;
  features: Feature[];
}

const featuresList: FeatureCategory[] = [
  {
    name: "Contact Management",
    features: [
      {
        name: "Contact Database",
        description: "Store and manage all your customer contacts in one place",
        implemented: true,
      },
      {
        name: "Contact Organization",
        description: "Tag, segment, and categorize contacts",
        implemented: true,
      },
      {
        name: "Import/Export",
        description: "Easily import and export contact data",
        implemented: true,
      },
    ],
  },
  {
    name: "Lead Management",
    features: [
      {
        name: "Lead Capture",
        description: "Capture leads from various sources",
        implemented: true,
      },
      {
        name: "Lead Scoring",
        description: "Score leads based on engagement and potential",
        comingSoon: true,
      },
      {
        name: "Lead Nurturing",
        description: "Nurture leads through automated workflows",
        implemented: true,
      },
      {
        name: "Lead Conversion",
        description: "Convert qualified leads into customers with streamlined processes",
        implemented: true,
      },
      {
        name: "Lead Source Tracking",
        description: "Track and analyze which sources generate the most valuable leads",
        implemented: true,
      },
    ],
  },
  {
    name: "Sales Pipeline",
    features: [
      {
        name: "Deal Tracking",
        description: "Track deals through your sales pipeline",
        implemented: true,
      },
      {
        name: "Sales Analytics",
        description: "Analyze sales data and performance",
        implemented: true,
      },
      {
        name: "Forecasting",
        description: "Forecast future sales and revenue",
        comingSoon: true,
      },
      {
        name: "Opportunity Management",
        description: "Manage and prioritize sales opportunities",
        implemented: true,
      },
      {
        name: "Sales Goals",
        description: "Set and track sales targets for individuals and teams",
        implemented: true,
      },
    ],
  },
  {
    name: "Customer Service",
    features: [
      {
        name: "Ticket Management",
        description: "Manage customer service tickets and support requests",
        implemented: true,
      },
      {
        name: "Knowledge Base",
        description: "Create and maintain a customer knowledge base",
        implemented: true,
      },
      {
        name: "Service Analytics",
        description: "Analyze customer service performance and satisfaction metrics",
        implemented: true,
      },
      {
        name: "Live Chat Support",
        description: "Engage with customers through real-time chat support",
        implemented: true,
      },
      {
        name: "Customer Feedback",
        description: "Collect and analyze customer feedback to improve service",
        implemented: true,
      },
    ],
  },
  {
    name: "Marketing",
    features: [
      {
        name: "Email Campaigns",
        description: "Create and send personalized email campaigns",
        implemented: true,
      },
      {
        name: "Campaign Analytics",
        description: "Track and analyze marketing campaign performance",
        implemented: true,
      },
      {
        name: "Automation",
        description: "Automate marketing workflows and tasks",
        implemented: true,
      },
      {
        name: "Social Media Integration",
        description: "Connect and manage social media accounts within the CRM",
        implemented: true,
      },
      {
        name: "Content Calendar",
        description: "Plan and schedule marketing content across channels",
        implemented: true,
      },
    ],
  },
];

type FilterType = "all" | "implemented" | "coming-soon";

const CRMFeaturesList = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  
  const filteredFeaturesList = featuresList.map(category => ({
    ...category,
    features: category.features.filter(feature => {
      if (filter === "all") return true;
      if (filter === "implemented") return feature.implemented;
      if (filter === "coming-soon") return feature.comingSoon;
      return true;
    })
  })).filter(category => category.features.length > 0);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">NextCRM Roadmap</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our planned features and current development status. We're constantly
          improving NextCRM to meet your business needs.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border rounded-l-lg ${
              filter === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:bg-muted"
            }`}
            onClick={() => setFilter("all")}
          >
            All Features
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
              filter === "implemented"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:bg-muted"
            }`}
            onClick={() => setFilter("implemented")}
          >
            Implemented
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border-t border-b border-r rounded-r-lg ${
              filter === "coming-soon"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:bg-muted"
            }`}
            onClick={() => setFilter("coming-soon")}
          >
            Coming Soon
          </button>
        </div>
      </div>

      {filteredFeaturesList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No features found matching the selected filter.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {filteredFeaturesList.map((category) => (
            <div key={category.name} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">{category.name}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.features.map((feature) => (
                  <Card 
                    key={feature.name}
                    className="transition-all hover:shadow-md"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{feature.name}</CardTitle>
                        {feature.implemented && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Implemented
                          </span>
                        )}
                        {feature.comingSoon && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CRMFeaturesList;
