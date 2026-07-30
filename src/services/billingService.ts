import httpClient from './httpClient';
import { mockApi } from './mockAdapter';
import { apiConfig } from './config';
import { PaginatedRequest, PaginatedResponse } from './types';
import { Invoice } from '../types';

export const billingService = {
  async getAll(params: PaginatedRequest = {}): Promise<PaginatedResponse<Invoice>> {
    if (apiConfig.useMock) {
      return mockApi.getInvoices(params) as unknown as PaginatedResponse<Invoice>;
    }
    const { data } = await httpClient.get('/invoices', { params });
    return data;
  },

  async create(invoice: Partial<Invoice>): Promise<Invoice> {
    if (apiConfig.useMock) {
      return { ...invoice, id: `INV-${Date.now()}` } as Invoice;
    }
    const { data } = await httpClient.post('/invoices', invoice);
    return data;
  },
};
