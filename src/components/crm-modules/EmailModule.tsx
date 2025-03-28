
import React from "react";
import { Card } from "@/components/ui/card";

const EmailModule: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-1">Email Integration</h2>
        <p className="text-muted-foreground">Manage your email communications</p>
      </div>
      
      <Card className="p-6">
        <iframe 
          src="/email" 
          className="w-full h-[800px] border-none"
          title="Email Integration" 
        />
      </Card>
    </div>
  );
};

export default EmailModule;
