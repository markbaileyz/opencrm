
import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { sidebarItems } from "@/data/sidebarItems";

const MainLayout: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Healthcare CRM</h1>
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className={cn("hover:text-primary", location.pathname === "/" && "text-primary font-medium")}>
              Dashboard
            </Link>
            <Link to="/patients" className={cn("hover:text-primary", location.pathname === "/patients" && "text-primary font-medium")}>
              Patients
            </Link>
            <Link to="/healthcare-crm" className={cn("hover:text-primary", location.pathname === "/healthcare-crm" && "text-primary font-medium")}>
              Healthcare CRM
            </Link>
            <Link to="/knowledge-base" className={cn("hover:text-primary", location.pathname === "/knowledge-base" && "text-primary font-medium")}>
              Knowledge Base
            </Link>
          </nav>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r hidden md:block">
          <div className="p-4">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-accent transition-colors",
                    location.pathname === item.href && "bg-primary/10 text-primary font-medium"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      
      <footer className="bg-background border-t py-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Healthcare CRM
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
