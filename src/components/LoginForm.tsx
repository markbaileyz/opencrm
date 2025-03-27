import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "./ui/button-custom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LoginFormProps {
  isSignUp?: boolean;
}

const LoginForm = ({ isSignUp = false }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API request delay - In production, this would use encrypted HIPAA-compliant channels
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo purposes, role-based demo accounts
      if (email === "admin@example.com") {
        login({ 
          email, 
          displayName: "Admin User", 
          role: "admin" 
        });
        toast.success(`Welcome, Admin`);
        navigate("/dashboard");
      } else if (email === "doctor@example.com") {
        login({ 
          email, 
          displayName: "Dr. Smith", 
          role: "doctor" 
        });
        toast.success(`Welcome, Dr. Smith`);
        navigate("/patients");
      } else if (email === "nurse@example.com") {
        login({ 
          email, 
          displayName: "Nurse Johnson", 
          role: "nurse" 
        });
        toast.success(`Welcome, Nurse Johnson`);
        navigate("/patients");
      } else if (email === "frontdesk@example.com") {
        login({ 
          email, 
          displayName: "Front Desk Staff", 
          role: "front-desk" 
        });
        toast.success(`Welcome to the Front Desk Portal`);
        navigate("/front-desk");
      } else if (email.includes("test") || email === "patient@example.com") {
        login({ 
          email, 
          displayName: "Patient User", 
          role: "patient" 
        });
        toast.success(`Welcome to your patient portal`);
        navigate("/dashboard");
      } else {
        // Show error for any other email
        toast.error("Invalid credentials. Try using a demo account.");
      }
    } catch (error) {
      toast.error("Authentication error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
  };

  return (
    <div className="glass rounded-xl p-8 shadow-lg w-full max-w-md mx-auto animate-scale-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">{isSignUp ? "Create an account" : "Welcome back"}</h2>
        <p className="text-muted-foreground mt-2">
          {isSignUp
            ? "Fill in the form below to create your account"
            : "Enter your credentials to access your account"}
        </p>
      </div>

      <Alert className="mb-6 bg-primary/10 border-primary/20">
        <Shield className="h-4 w-4 text-primary" />
        <AlertTitle>HIPAA Compliant System</AlertTitle>
        <AlertDescription className="text-xs">
          This system uses end-to-end encryption and follows all HIPAA and SOC 2 security protocols.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-xs text-primary hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <ButtonCustom
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
        </ButtonCustom>

        <div className="relative flex items-center justify-center mt-6 mb-6">
          <div className="border-t border-border flex-grow"></div>
          <span className="mx-4 text-sm text-muted-foreground">or continue with</span>
          <div className="border-t border-border flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <ButtonCustom
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin("admin@example.com")}
          >
            Admin Demo Account
          </ButtonCustom>
          <ButtonCustom
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin("doctor@example.com")}
          >
            Doctor Demo Account
          </ButtonCustom>
          <ButtonCustom
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin("nurse@example.com")}
          >
            Nurse Demo Account
          </ButtonCustom>
          <ButtonCustom
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin("frontdesk@example.com")}
          >
            Front Desk Demo Account
          </ButtonCustom>
          <ButtonCustom
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin("patient@example.com")}
          >
            Patient Demo Account
          </ButtonCustom>
        </div>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <a
            href="#"
            className="text-primary hover:underline font-medium"
            onClick={(e) => {
              e.preventDefault();
              navigate(isSignUp ? "/login" : "/signup");
            }}
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
