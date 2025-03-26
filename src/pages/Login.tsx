
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="mb-8 text-center">
        <Link to="/" className="inline-block">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            NextCRM
          </span>
        </Link>
      </div>
      
      <LoginForm />
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Test accounts available for demo purposes.</p>
        <p className="mt-1">
          <Link to="/" className="text-primary hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
