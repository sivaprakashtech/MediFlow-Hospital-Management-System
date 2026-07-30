import httpClient from './httpClient';
import { mockApi } from './mockAdapter';
import { apiConfig } from './config';
import { PaginatedRequest, PaginatedResponse } from './types';
import { Doctor } from '../types';

export const doctorService = {
  async getAll(params: PaginatedRequest = {}): Promise<PaginatedResponse<Doctor>> {
    if (apiConfig.useMock) {
      return mockApi.getDoctors(params) as unknown as PaginatedResponse<Doctor>;
    }
    const { data } = await httpClient.get('/doctors', { params });
    return data;
  },

  async getById(id: string): Promise<Doctor | null> {
    if (apiConfig.useMock) {
      const result = await mockApi.getDoctorById(id);
      return result as Doctor | null;
    }
    const { data } = await httpClient.get(`/doctors/${id}`);
    return data;
  },
};
