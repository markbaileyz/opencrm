
import React, { createContext, useContext, useState } from 'react';

interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (roles: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  hasRole: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mock authentication state - in a real app this would use a proper auth system
  const [user, setUser] = useState<User | null>({
    uid: '123',
    displayName: 'Dr. Jane Smith',
    email: 'jane.smith@example.com',
    photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    roles: ['doctor', 'admin'],
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Mock login logic
      if (email === 'admin@example.com' && password === 'password') {
        setUser({
          uid: '123',
          displayName: 'Admin User',
          email: 'admin@example.com',
          photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
          roles: ['admin'],
        });
      } else if (email === 'doctor@example.com' && password === 'password') {
        setUser({
          uid: '456',
          displayName: 'Dr. Jane Smith',
          email: 'doctor@example.com',
          photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
          roles: ['doctor'],
        });
      } else if (email === 'nurse@example.com' && password === 'password') {
        setUser({
          uid: '789',
          displayName: 'Nurse Johnson',
          email: 'nurse@example.com',
          photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Johnson',
          roles: ['nurse'],
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    setIsLoading(true);
    // Mock logout logic
    try {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const hasRole = (roles: string | string[]) => {
    if (!user) return false;
    
    const userRoles = user.roles || [];
    
    if (typeof roles === 'string') {
      return userRoles.includes(roles);
    }
    
    return roles.some(role => userRoles.includes(role));
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasRole,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
