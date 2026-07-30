/**
 * Service Layer Types
 * Standardized request/response interfaces for API communication.
 */

export interface PaginatedRequest {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: string | number | boolean | undefined;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, string[]>;
}

export interface ServiceState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

export interface PaginatedServiceState<T> {
  data: T[];
  loading: boolean;
  error: ApiError | null;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
