import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { useLanguage } from './LanguageContext';

interface User {
  id: string;
  username: string;
  email: string;
  credits: number;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthReady: boolean;
  isMockSession: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
  updateCredits: (amount: number) => void;
  syncCredits: (credits: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const TOKEN_STORAGE_KEY = 'auth_token';
const MOCK_SESSION_STORAGE_KEY = 'mock_admin_session';
const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1.0';
const DEMO_ADMIN_EMAIL = 'admin@admin.com';
const DEMO_ADMIN_PASSWORD = 'admin';

interface ApiErrorPayload {
  ok: false;
  error?: {
    message?: string;
  };
}

interface UserPayload {
  uuid: string;
  email: string;
  name: string;
  admin?: boolean;
  credits?: number;
  userConfigs?: Array<{
    locale?: string;
  }>;
}

interface LoginSuccessPayload {
  ok: true;
  data: {
    user: UserPayload;
    token: string;
    expiresIn: string;
  };
}

interface MeSuccessPayload {
  ok: true;
  data: UserPayload;
}

const mapApiUserToAuthUser = (apiUser: UserPayload): User => ({
  id: apiUser.uuid,
  username: apiUser.name,
  email: apiUser.email,
  credits: apiUser.credits ?? 1000,
  isAdmin: Boolean(apiUser.admin),
});

const getApiErrorMessage = (payload: unknown, fallback: string) => {
  if (typeof payload !== 'object' || payload === null) return fallback;
  const maybeError = payload as ApiErrorPayload;
  return maybeError.error?.message ?? fallback;
};

async function parseJson<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function fetchMe(token: string) {
  const response = await fetch(`${API_BASE_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await parseJson<MeSuccessPayload | ApiErrorPayload>(response);

  if (!response.ok || !payload || payload.ok !== true) {
    throw new Error(getApiErrorMessage(payload, 'Unable to fetch current user.'));
  }

  return payload.data;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { applyLocale } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isMockSession, setIsMockSession] = useState(false);

  const applyLocaleFromUserConfigs = (apiUser: UserPayload) => {
    const locale = apiUser.userConfigs?.[0]?.locale;
    applyLocale(locale);
  };

  useEffect(() => {
    const restoreSession = async () => {
      const isStoredMockSession = localStorage.getItem(MOCK_SESSION_STORAGE_KEY) === 'true';
      if (isStoredMockSession) {
        setUser({
          id: 'demo-admin',
          username: 'Admin',
          email: DEMO_ADMIN_EMAIL,
          credits: 1000,
          isAdmin: true,
        });
        setIsMockSession(true);
        setIsAuthReady(true);
        return;
      }

      const token = localStorage.getItem(TOKEN_STORAGE_KEY);

      if (!token) {
        setIsAuthReady(true);
        return;
      }

      try {
        const currentUser = await fetchMe(token);
        applyLocaleFromUserConfigs(currentUser);
        setUser(mapApiUserToAuthUser(currentUser));
      } catch {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setUser(null);
      } finally {
        setIsAuthReady(true);
      }
    };

    void restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    if (email === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.setItem(MOCK_SESSION_STORAGE_KEY, 'true');
      setIsMockSession(true);
      setUser({
        id: 'demo-admin',
        username: 'Admin',
        email: DEMO_ADMIN_EMAIL,
        credits: 1000,
        isAdmin: true,
      });
      return;
    }

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const payload = await parseJson<LoginSuccessPayload | ApiErrorPayload>(response);

    if (!response.ok || !payload || payload.ok !== true) {
      throw new Error(getApiErrorMessage(payload, 'Invalid email or password.'));
    }

    localStorage.setItem(TOKEN_STORAGE_KEY, payload.data.token);
    localStorage.removeItem(MOCK_SESSION_STORAGE_KEY);
    setIsMockSession(false);
    applyLocaleFromUserConfigs(payload.data.user);
    setUser(mapApiUserToAuthUser(payload.data.user));
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(MOCK_SESSION_STORAGE_KEY);
    setIsMockSession(false);
    setUser(null);
  };

  const register = async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username, email, password }),
    });

    const payload = await parseJson<MeSuccessPayload | ApiErrorPayload>(response);

    if (!response.ok || !payload || payload.ok !== true) {
      throw new Error(getApiErrorMessage(payload, 'Unable to create user.'));
    }

    await login(email, password);
  };

  const updateCredits = (amount: number) => {
    if (user) {
      setUser({ ...user, credits: user.credits + amount });
    }
  };

  const syncCredits = (credits: number) => {
    setUser((currentUser) => {
      if (!currentUser) return currentUser;
      return {
        ...currentUser,
        credits,
      };
    });
  };

  const value = useMemo(
    () => ({
      user,
      isAuthReady,
      isMockSession,
      login,
      logout,
      register,
      updateCredits,
      syncCredits,
    }),
    [user, isAuthReady, isMockSession]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
