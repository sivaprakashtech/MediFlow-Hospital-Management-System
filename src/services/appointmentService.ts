import httpClient from './httpClient';
import { mockApi } from './mockAdapter';
import { apiConfig } from './config';
import { PaginatedRequest, PaginatedResponse } from './types';
import { Appointment } from '../types';

export const appointmentService = {
  async getAll(params: PaginatedRequest = {}): Promise<PaginatedResponse<Appointment>> {
    if (apiConfig.useMock) {
      return mockApi.getAppointments(params) as unknown as PaginatedResponse<Appointment>;
    }
    const { data } = await httpClient.get('/appointments', { params });
    return data;
  },

  async create(appointment: Partial<Appointment>): Promise<Appointment> {
    if (apiConfig.useMock) {
      return { ...appointment, id: `apt-${Date.now()}` } as Appointment;
    }
    const { data } = await httpClient.post('/appointments', appointment);
    return data;
  },

  async cancel(id: string): Promise<void> {
    if (apiConfig.useMock) return;
    await httpClient.patch(`/appointments/${id}`, { status: 'cancelled' });
  },
};
