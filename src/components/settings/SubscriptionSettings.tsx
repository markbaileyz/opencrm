
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CheckCircle, ChevronRight, User, Users, Building2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  billingPeriod: "monthly" | "annually";
  features: PlanFeature[];
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For individuals and small teams just getting started.",
    price: "$15",
    billingPeriod: "monthly",
    features: [
      { name: "Up to 500 contacts", included: true },
      { name: "2 users", included: true },
      { name: "Basic reports", included: true },
      { name: "Email integration", included: true },
      { name: "Calendar integration", included: false },
      { name: "API access", included: false },
      { name: "Custom fields", included: false },
      { name: "Advanced automation", included: false },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "For growing teams that need more features and flexibility.",
    price: "$45",
    billingPeriod: "monthly",
    features: [
      { name: "Up to 5,000 contacts", included: true },
      { name: "10 users", included: true },
      { name: "Advanced reports", included: true },
      { name: "Email integration", included: true },
      { name: "Calendar integration", included: true },
      { name: "API access", included: true },
      { name: "Custom fields", included: true },
      { name: "Advanced automation", included: false },
    ],
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with complex needs.",
    price: "$99",
    billingPeriod: "monthly",
    features: [
      { name: "Unlimited contacts", included: true },
      { name: "Unlimited users", included: true },
      { name: "Custom reports", included: true },
      { name: "Email integration", included: true },
      { name: "Calendar integration", included: true },
      { name: "API access", included: true },
      { name: "Custom fields", included: true },
      { name: "Advanced automation", included: true },
    ],
  },
];

const SubscriptionSettings: React.FC = () => {
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState("professional");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly");
  const [showPlans, setShowPlans] = useState(false);

  const handleChangePlan = (planId: string) => {
    setCurrentPlan(planId);
    setShowPlans(false);
    
    toast({
      title: "Plan changed",
      description: `Your subscription has been updated to the ${plans.find(p => p.id === planId)?.name} plan.`,
    });
  };

  const toggleBillingPeriod = () => {
    const newPeriod = billingPeriod === "monthly" ? "annually" : "monthly";
    setBillingPeriod(newPeriod);
    
    toast({
      title: "Billing period changed",
      description: `Your billing period has been updated to ${newPeriod}.`,
    });
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "starter":
        return <User className="h-5 w-5" />;
      case "professional":
        return <Users className="h-5 w-5" />;
      case "enterprise":
        return <Building2 className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
        <CardDescription>
          Manage your subscription plan and billing information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Plan */}
          <div className="bg-muted/30 p-5 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Current Plan</h3>
                <div className="flex items-center mt-1">
                  {getPlanIcon(currentPlan)}
                  <h2 className="text-xl font-bold ml-2">
                    {plans.find(p => p.id === currentPlan)?.name}
                    {plans.find(p => p.id === currentPlan)?.isPopular && (
                      <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
                        Popular
                      </Badge>
                    )}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {plans.find(p => p.id === currentPlan)?.description}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {plans.find(p => p.id === currentPlan)?.price}
                  <span className="text-sm font-normal text-muted-foreground">/{billingPeriod}</span>
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => setShowPlans(!showPlans)}
                >
                  Change Plan
                </Button>
              </div>
            </div>
          </div>
          
          {/* Billing Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Billing Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/20 p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-muted p-2 rounded-md">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Credit Card</p>
                      <p className="text-sm text-muted-foreground">Visa ending in 4242</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
              
              <div className="bg-muted/20 p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Billing Period</p>
                    <p className="text-sm text-muted-foreground capitalize">{billingPeriod}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={toggleBillingPeriod}
                  >
                    Switch to {billingPeriod === "monthly" ? "Annual" : "Monthly"}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-muted/20 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Next Billing Date</p>
                  <p className="text-sm text-muted-foreground">June 15, 2024</p>
                </div>
                <Button variant="ghost" size="sm">View Invoices</Button>
              </div>
            </div>
          </div>
          
          {/* Plans comparison when "Change Plan" is clicked */}
          {showPlans && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-4">Available Plans</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div 
                    key={plan.id}
                    className={cn(
                      "border rounded-lg p-5",
                      plan.isPopular && "border-primary/50",
                      currentPlan === plan.id && "bg-primary/5 border-primary"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold">{plan.name}</h4>
                      {plan.isPopular && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-2xl font-bold mb-2">
                      {plan.price}
                      <span className="text-sm font-normal text-muted-foreground">/{billingPeriod}</span>
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                    
                    <Button 
                      variant={currentPlan === plan.id ? "default" : "outline"}
                      className="w-full mb-4"
                      onClick={() => handleChangePlan(plan.id)}
                      disabled={currentPlan === plan.id}
                    >
                      {currentPlan === plan.id ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Current Plan
                        </>
                      ) : (
                        <>
                          Select Plan
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    
                    <Separator className="my-4" />
                    
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li 
                          key={index}
                          className={cn(
                            "flex items-start text-sm",
                            !feature.included && "text-muted-foreground"
                          )}
                        >
                          <CheckCircle 
                            className={cn(
                              "mr-2 h-4 w-4 mt-0.5",
                              feature.included ? "text-primary" : "text-muted-foreground opacity-50"
                            )} 
                          />
                          <span>{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionSettings;
