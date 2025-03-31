
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const UserInfo = () => {
  const { user } = useAuth();
  
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const getRoleColor = (role: string) => {
    switch(role) {
      case "admin": return "bg-red-500/10 text-red-600 border-red-200";
      case "power-user": return "bg-purple-500/10 text-purple-600 border-purple-200";
      case "doctor": return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "nurse": return "bg-green-500/10 text-green-600 border-green-200";
      case "front-desk": return "bg-amber-500/10 text-amber-600 border-amber-200";
      case "patient": return "bg-cyan-500/10 text-cyan-600 border-cyan-200";
      default: return "bg-gray-500/10 text-gray-600 border-gray-200";
    }
  };
  
  const formatRole = (role: string | undefined) => {
    if (!role) return "User";
    return role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Get primary role from user's roles array
  const getPrimaryRole = () => {
    if (!user || !user.roles || !user.roles.length) return undefined;
    return user.roles[0];
  };
  
  return (
    <div className="mb-4 px-4">
      <Link to="/" className="flex items-center text-lg font-semibold">
        OpenCRM
      </Link>
      {user && (
        <div className="mt-4 flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.photoURL} alt={user.displayName || ""} />
            <AvatarFallback>{getInitials(user.displayName || user.email)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">{user.displayName || user.email}</div>
            {user.roles && user.roles.length > 0 && (
              <Badge variant="outline" className={`mt-1 text-xs ${getRoleColor(user.roles[0])}`}>
                {formatRole(getPrimaryRole())}
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
