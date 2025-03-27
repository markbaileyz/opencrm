
import React, { createContext, useContext, useState, useEffect } from "react";

// Enhanced User interface with expanded roles
interface User {
  email: string;
  displayName?: string;
  photoURL?: string;
  role: "admin" | "power-user" | "doctor" | "nurse" | "patient" | "front-desk";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => void;
  uploadProfileImage: (file: File) => Promise<string>;
  hasRole: (roles: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
  uploadProfileImage: async () => "",
  hasRole: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing user in localStorage on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const updateProfile = (profileData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const uploadProfileImage = async (file: File): Promise<string> => {
    // In a real application, this would upload to a secure HIPAA-compliant storage
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoURL = e.target?.result as string;
        if (user) {
          updateProfile({ photoURL });
        }
        resolve(photoURL);
      };
      reader.readAsDataURL(file);
    });
  };

  // Role-based authorization helper
  const hasRole = (roles: string | string[]): boolean => {
    if (!user) return false;
    
    const rolesToCheck = Array.isArray(roles) ? roles : [roles];
    return rolesToCheck.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      updateProfile, 
      uploadProfileImage,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};
