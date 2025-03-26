
import React from "react";

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
        comingSoon: true,
      },
    ],
  },
  {
    name: "Lead Management",
    features: [
      {
        name: "Lead Capture",
        description: "Capture leads from various sources",
        comingSoon: true,
      },
      {
        name: "Lead Scoring",
        description: "Score leads based on engagement and potential",
      },
      {
        name: "Lead Nurturing",
        description: "Nurture leads through automated workflows",
      },
    ],
  },
  {
    name: "Sales Pipeline",
    features: [
      {
        name: "Deal Tracking",
        description: "Track deals through your sales pipeline",
        comingSoon: true,
      },
      {
        name: "Sales Analytics",
        description: "Analyze sales data and performance",
      },
      {
        name: "Forecasting",
        description: "Forecast future sales and revenue",
      },
    ],
  },
  {
    name: "Customer Service",
    features: [
      {
        name: "Ticket Management",
        description: "Manage customer service tickets",
      },
      {
        name: "Knowledge Base",
        description: "Create and maintain a customer knowledge base",
      },
      {
        name: "Service Analytics",
        description: "Analyze customer service performance",
      },
    ],
  },
  {
    name: "Marketing",
    features: [
      {
        name: "Email Campaigns",
        description: "Create and send personalized email campaigns",
      },
      {
        name: "Campaign Analytics",
        description: "Track and analyze marketing campaign performance",
      },
      {
        name: "Automation",
        description: "Automate marketing workflows and tasks",
      },
    ],
  },
];

const CRMFeaturesList = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">NextCRM Roadmap</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our planned features and current development status. We're constantly
          improving NextCRM to meet your business needs.
        </p>
      </div>

      <div className="space-y-16">
        {featuresList.map((category) => (
          <div key={category.name} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">{category.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.features.map((feature) => (
                <div 
                  key={feature.name}
                  className="border rounded-lg p-6 transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold">{feature.name}</h3>
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
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CRMFeaturesList;
