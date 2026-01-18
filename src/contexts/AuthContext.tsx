import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  credits: number;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
  updateCredits: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - admin@admin.com / admin = admin user
    if (email === 'admin@admin.com' && password === 'admin') {
      setUser({
        id: '1',
        username: 'Admin',
        email: 'admin@admin.com',
        credits: 1000,
        isAdmin: true,
      });
    } else {
      setUser({
        id: '2',
        username: 'Player123',
        email: email,
        credits: 50,
        isAdmin: false,
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (username: string, email: string, _password: string) => {
    setUser({
      id: Date.now().toString(),
      username,
      email,
      credits: 10,
      isAdmin: false,
    });
  };

  const updateCredits = (amount: number) => {
    if (user) {
      setUser({ ...user, credits: user.credits + amount });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateCredits }}>
      {children}
    </AuthContext.Provider>
  );
};
