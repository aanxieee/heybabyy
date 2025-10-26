import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthApi, setToken } from '@/integrations/api/client';

export interface User {
  id: string;
  email: string;
  full_name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // try load current user
    AuthApi.me().then((u: any) => setUser(u as User)).catch(() => setUser(null)).finally(() => setIsLoading(false));
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const data = await AuthApi.login(email, password);
      if ((data as any).user) setUser((data as any).user as User);
      else setUser(await AuthApi.me() as any);
      return { error: null };
    } catch (e: any) {
      return { error: e };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      await AuthApi.register({ email, password, full_name: fullName });
      // optional auto-login for demos
      await signIn(email, password);
      return { error: null };
    } catch (e: any) {
      return { error: e };
    }
  };

  const signOut = async () => {
    await AuthApi.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
