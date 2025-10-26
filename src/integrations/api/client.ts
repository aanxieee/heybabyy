// Simple REST client compatible with Django REST Framework or FastAPI
// Uses localStorage for storing JWT access tokens
// Supports demo mode via import.meta.env.VITE_DEMO_AUTH === 'true'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8000';

const DEMO_MODE = (import.meta.env.VITE_DEMO_AUTH as string) === 'true';

export function getToken() {
  return localStorage.getItem('access_token');
}

export function setToken(token: string | null) {
  if (token) {
    localStorage.setItem('access_token', token);
  } else {
    localStorage.removeItem('access_token');
  }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as unknown as T;
  return (await res.json()) as T;
}

// Minimal auth endpoints - adjust to your backend URLs
export const AuthApi = {
  // Expected DRF SimpleJWT or FastAPI JWT login
  async login(email: string, password: string) {
    if (DEMO_MODE) {
      // Demo: fake token
      const fake = { access: 'demo.token', user: { id: 'demo', email, full_name: 'Demo User' } };
      setToken(fake.access);
      return fake;
    }
    const data = await apiFetch<{ access: string; refresh?: string; user?: any }>(
      '/api/auth/login/',
      { method: 'POST', body: JSON.stringify({ email, password }) }
    );
    setToken(data.access);
    return data;
  },

  async register(payload: { email: string; password: string; full_name?: string }) {
    if (DEMO_MODE) {
      return { id: 'demo-user', ...payload };
    }
    return apiFetch('/api/auth/register/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async me() {
    if (DEMO_MODE) {
      return { id: 'demo', email: 'demo@example.com', full_name: 'Demo User' };
    }
    return apiFetch('/api/auth/me/');
  },

  async logout() {
    setToken(null);
    if (!DEMO_MODE) {
      try { await apiFetch('/api/auth/logout/', { method: 'POST' }); } catch {}
    }
  },
};
