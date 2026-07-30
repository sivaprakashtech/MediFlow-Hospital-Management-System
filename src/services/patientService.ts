/**
 * Patient Service
 * Abstracts patient data access. Uses mock adapter in development,
 * swappable to HTTP calls for production backend.
 */
import httpClient from './httpClient';
import { mockApi } from './mockAdapter';
import { apiConfig } from './config';
import { PaginatedRequest, PaginatedResponse } from './types';
import { Patient } from '../types';

export const patientService = {
  async getAll(params: PaginatedRequest = {}): Promise<PaginatedResponse<Patient>> {
    if (apiConfig.useMock) {
      return mockApi.getPatients(params) as unknown as PaginatedResponse<Patient>;
    }
    const { data } = await httpClient.get('/patients', { params });
    return data;
  },

  async getById(id: string): Promise<Patient | null> {
    if (apiConfig.useMock) {
      const result = await mockApi.getPatientById(id);
      return result as Patient | null;
    }
    const { data } = await httpClient.get(`/patients/${id}`);
    return data;
  },

  async create(patient: Partial<Patient>): Promise<Patient> {
    if (apiConfig.useMock) {
      // Simulate creation
      return { ...patient, id: `pat-${Date.now()}` } as Patient;
    }
    const { data } = await httpClient.post('/patients', patient);
    return data;
  },

  async update(id: string, updates: Partial<Patient>): Promise<Patient> {
    if (apiConfig.useMock) {
      return { id, ...updates } as Patient;
    }
    const { data } = await httpClient.patch(`/patients/${id}`, updates);
    return data;
  },

  async delete(id: string): Promise<void> {
    if (apiConfig.useMock) {
      return;
    }
    await httpClient.delete(`/patients/${id}`);
  },
};
