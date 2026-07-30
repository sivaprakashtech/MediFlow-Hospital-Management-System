/**
 * API Configuration
 * Centralized configuration for the HTTP client.
 */

export const apiConfig = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 15000,
  useMock: import.meta.env.VITE_USE_MOCK === 'true',
} as const;

export const TOKEN_KEY = 'hms-auth-token';
export const REFRESH_TOKEN_KEY = 'hms-refresh-token';
export const USER_KEY = 'hms-user';

export const RETRY_COUNT = 3;
export const RETRY_DELAY = 1000; // ms
