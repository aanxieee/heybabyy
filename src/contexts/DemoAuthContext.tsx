import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  full_name?: string;
}

interface AuthContextType {
  user: User | null;
  session: any | null;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('demo_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setSession({ user: parsedUser });
    }
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    // Demo signup - just create a user object
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      full_name: fullName,
    };
    
    setUser(newUser);
    setSession({ user: newUser });
    localStorage.setItem('demo_user', JSON.stringify(newUser));
    
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Demo login - accept any credentials
    const demoUser: User = {
      id: 'demo-user-123',
      email: email || 'demo@example.com',
      full_name: 'Demo User',
    };
    
    setUser(demoUser);
    setSession({ user: demoUser });
    localStorage.setItem('demo_user', JSON.stringify(demoUser));
    
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    localStorage.removeItem('demo_user');
  };

  const value: AuthContextType = {
    user,
    session,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
