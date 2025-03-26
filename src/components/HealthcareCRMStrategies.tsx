
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Users, CreditCard, BarChart } from "lucide-react";

interface StrategyItemProps {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
}

const StrategyItem = ({ title, children, icon: Icon }: StrategyItemProps) => {
  return (
    <Card className="mb-6 transition-all hover:shadow-md border-l-4 border-l-primary">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

const StepsList = ({ steps }: { steps: string[] }) => (
  <div className="mt-3">
    <h4 className="font-medium mb-2">Practical Steps:</h4>
    <ul className="space-y-2">
      {steps.map((step, index) => (
        <li key={index} className="flex items-start">
          <span className="text-sm bg-primary/10 text-primary font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
            {index + 1}
          </span>
          <span className="text-muted-foreground">{step}</span>
        </li>
      ))}
    </ul>
  </div>
);

const HealthcareCRMStrategies = () => {
  const dataSecurity = [
    "Maintain rigorous compliance with HIPAA and SOC 2 Type 2 certification.",
    "Continuously audit and improve security protocols for patient data management.",
    "Enhance patient portals to provide clear, transparent management of consents.",
    "Regularly update system infrastructure to maintain robust security standards.",
    "Implement advanced security features (biometric authentication, encrypted messaging)."
  ];

  const communityEngagement = [
    "Implement user feedback and feature request portals to prioritize platform enhancements.",
    "Conduct regular surveys and use analytics to gather insights into user preferences.",
    "Clearly communicate how feedback shapes ongoing CRM improvements.",
    "Foster a sense of community by highlighting user contributions and suggestions.",
    "Integrate patient education modules tailored to individual health profiles."
  ];

  const paymentOptimization = [
    "Streamline traditional payment gateways to reduce transaction fees and improve reliability.",
    "Offer flexible payment options (e.g., subscriptions, discounts, incentive programs).",
    "Clearly communicate billing processes and provide user-friendly billing statements.",
    "Introduce loyalty or reward programs to incentivize patient engagement and retention.",
    "Implement intelligent billing systems with automated payment plans and personalized billing reminders."
  ];

  const advancedEnhancements = [
    "Integrate AI-driven predictive analytics to personalize patient engagement.",
    "Allow automated workflow customization tailored to healthcare provider needs.",
    "Enhance mobile experience, optimizing usability and accessibility.",
    "Extend advanced integration capabilities with major EHR systems, labs, pharmacies, and telehealth platforms.",
    "Provide real-time analytics dashboards to track interactions, billing, and outcomes.",
    "Automate proactive patient communication (SMS/email reminders, wellness checks).",
    "Build a scalable customer support infrastructure combining self-service tools with responsive human support.",
    "Predictive health interventions to proactively identify at-risk patients for early clinical actions.",
    "Embed a virtual health assistant within the CRM to guide patients through care plans and answer routine inquiries.",
    "Integrate voice and conversational AI interfaces to enable seamless, natural interactions.",
    "Apply emotion and sentiment analysis during patient-provider interactions to dynamically enhance communication.",
    "Create gamified patient journeys to improve engagement, adherence, and health outcomes through personalized milestones and rewards."
  ];

  const challenges = [
    "Maintaining stringent regulatory compliance.",
    "Balancing ease-of-use with robust security measures.",
    "Ensuring effective user engagement without overwhelming operational resources."
  ];

  const recommendations = [
    "Prioritize continuous improvements in data security and user engagement through established, proven methodologies.",
    "Optimize traditional payment channels and incentives to enhance patient satisfaction and retention.",
    "Regularly evaluate and adapt strategies based on user feedback and regulatory requirements.",
    "Leverage advanced analytics, automation, and innovative features to significantly enhance patient engagement and operational efficiency."
  ];

  return (
    <div className="animate-fade-up">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-3">Healthcare CRM Enhancement Strategies</h2>
        <p className="text-muted-foreground text-lg mb-4">
          A comprehensive approach to elevating your healthcare CRM into an industry-leading, innovative solution.
        </p>
        <div className="bg-primary/5 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-medium mb-2">Key Insights:</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Enhance patient data security through existing secure data management practices.</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Foster community engagement using conventional feedback and voting systems.</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Optimize traditional payment processes to improve patient experience and reduce transaction costs.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <StrategyItem title="Data Security" icon={Shield}>
          <p>Protecting patient data is paramount in healthcare. Implementing robust security measures ensures compliance and builds trust.</p>
          <StepsList steps={dataSecurity} />
        </StrategyItem>

        <StrategyItem title="Community Engagement" icon={Users}>
          <p>Building an engaged patient community leads to better health outcomes and increased platform adoption.</p>
          <StepsList steps={communityEngagement} />
        </StrategyItem>

        <StrategyItem title="Payment Process Optimization" icon={CreditCard}>
          <p>Streamlining financial interactions reduces friction and improves both patient satisfaction and business operations.</p>
          <StepsList steps={paymentOptimization} />
        </StrategyItem>

        <StrategyItem title="Advanced CRM Enhancements" icon={BarChart}>
          <p>Leveraging cutting-edge technology to create a next-generation healthcare CRM experience.</p>
          <StepsList steps={advancedEnhancements} />
        </StrategyItem>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Challenges & Considerations</CardTitle>
            <CardDescription>Important factors to consider when implementing these strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {challenges.map((challenge, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle>Recommended Strategy</CardTitle>
            <CardDescription>A balanced approach to CRM enhancement</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-primary/5 rounded-lg text-center">
              <p className="italic">
                "This comprehensive approach ensures patient data integrity, compliance, user satisfaction, and operational efficiency, elevating the CRM to an industry-leading, innovative solution."
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthcareCRMStrategies;
