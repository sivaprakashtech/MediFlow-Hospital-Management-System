import httpClient from './httpClient';
import { mockApi } from './mockAdapter';
import { apiConfig } from './config';
import { PaginatedRequest, PaginatedResponse } from './types';
import { LabTest } from '../types';

export const labService = {
  async getAll(params: PaginatedRequest = {}): Promise<PaginatedResponse<LabTest>> {
    if (apiConfig.useMock) {
      return mockApi.getLabTests(params) as unknown as PaginatedResponse<LabTest>;
    }
    const { data } = await httpClient.get('/lab-tests', { params });
    return data;
  },
};
