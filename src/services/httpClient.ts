/**
 * HTTP Client
 * Enterprise Axios instance with interceptors, token management, and retry logic.
 */
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { apiConfig, TOKEN_KEY, RETRY_COUNT, RETRY_DELAY } from './config';
import { ApiError } from './types';

// Create Axios instance
const httpClient: AxiosInstance = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ─── Request Interceptor ─────────────────────────────────────────────────────
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Attach auth token if available
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add correlation ID for request tracking
    config.headers['X-Request-ID'] = crypto.randomUUID?.() || Date.now().toString();

    // Add timestamp
    config.headers['X-Request-Time'] = new Date().toISOString();

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ─── Response Interceptor ────────────────────────────────────────────────────
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retryCount?: number };

    // Handle 401 - Token expired
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      // In production: redirect to login or attempt token refresh
      // window.location.href = '/login';
    }

    // Handle 403 - Insufficient permissions
    if (error.response?.status === 403) {
      console.error('[Auth] Insufficient permissions for this resource');
    }

    // Handle 429 - Rate limiting
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      console.warn(`[RateLimit] Too many requests. Retry after ${retryAfter}s`);
    }

    // Retry logic for network errors and 5xx
    if (
      (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' || (error.response?.status && error.response.status >= 500)) &&
      (!originalRequest._retryCount || originalRequest._retryCount < RETRY_COUNT)
    ) {
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      const delay = RETRY_DELAY * Math.pow(2, originalRequest._retryCount - 1); // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay));
      return httpClient(originalRequest);
    }

    // Normalize error response
    const apiError: ApiError = {
      message: getErrorMessage(error),
      code: error.code || 'UNKNOWN_ERROR',
      status: error.response?.status || 0,
      details: (error.response?.data as Record<string, unknown>)?.errors as Record<string, string[]> | undefined,
    };

    return Promise.reject(apiError);
  }
);

function getErrorMessage(error: AxiosError): string {
  if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
    return (error.response.data as { message: string }).message;
  }
  if (error.code === 'ECONNABORTED') return 'Request timed out. Please try again.';
  if (error.code === 'ERR_NETWORK') return 'Network error. Please check your connection.';
  if (error.response?.status === 404) return 'Resource not found.';
  if (error.response?.status === 422) return 'Validation error. Please check your input.';
  if (error.response?.status === 500) return 'Server error. Please try again later.';
  return error.message || 'An unexpected error occurred.';
}

// ─── Token Management ────────────────────────────────────────────────────────
export const tokenManager = {
  getToken: (): string | null => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string): void => localStorage.setItem(TOKEN_KEY, token),
  removeToken: (): void => localStorage.removeItem(TOKEN_KEY),
  isAuthenticated: (): boolean => !!localStorage.getItem(TOKEN_KEY),
};

export default httpClient;
