
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const UserInfo = () => {
  const { user } = useAuth();
  
  return (
    <div className="mb-4 px-4">
      <Link to="/" className="flex items-center text-lg font-semibold">
        OpenCRM
      </Link>
      {user && (
        <div className="mt-2 text-sm text-muted-foreground flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          {user.displayName || user.email} ({user.role})
        </div>
      )}
    </div>
  );
};

export default UserInfo;
