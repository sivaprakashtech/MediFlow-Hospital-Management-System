/**
 * useService — Universal data-fetching hook
 *
 * Provides loading state, error handling, and refetch capability.
 * Accepts a service function that returns a Promise and re-fetches
 * whenever the function reference changes (use useCallback for stability).
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiError } from '../services/types';

interface UseServiceOptions {
  /** Whether to fetch immediately on mount. Default: true */
  immediate?: boolean;
}

interface UseServiceReturn<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

export function useService<T>(
  serviceFn: () => Promise<T>,
  deps: unknown[] = [],
  options: UseServiceOptions = {}
): UseServiceReturn<T> {
  const { immediate = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<ApiError | null>(null);
  const mountedRef = useRef(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceFn();
      if (mountedRef.current) setData(result);
    } catch (err) {
      if (mountedRef.current) setError(err as ApiError);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    if (immediate) fetchData();
    return () => { mountedRef.current = false; };
  }, [fetchData, immediate]);

  return { data, loading, error, refetch: fetchData };
}
