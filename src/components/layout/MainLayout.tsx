
import React from "react";
import { Outlet } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b">
        <div className="container mx-auto py-4">
          <h1 className="text-2xl font-bold">Healthcare CRM</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-6">
        <Outlet />
      </main>
      
      <footer className="bg-background border-t py-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Healthcare CRM
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
