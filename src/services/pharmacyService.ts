import httpClient from './httpClient';
import { mockApi } from './mockAdapter';
import { apiConfig } from './config';
import { PaginatedRequest, PaginatedResponse } from './types';
import { Medicine } from '../types';

export const pharmacyService = {
  async getAll(params: PaginatedRequest = {}): Promise<PaginatedResponse<Medicine>> {
    if (apiConfig.useMock) {
      return mockApi.getMedicines(params) as unknown as PaginatedResponse<Medicine>;
    }
    const { data } = await httpClient.get('/medicines', { params });
    return data;
  },
};
