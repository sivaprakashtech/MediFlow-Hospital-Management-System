import httpClient from './httpClient';
import { mockApi } from './mockAdapter';
import { apiConfig } from './config';
import { DashboardStats, ChartData, Activity } from '../types';

export interface DashboardData {
  stats: DashboardStats;
  revenueChart: ChartData[];
  patientChart: ChartData[];
  departmentData: ChartData[];
  bedOccupancy: ChartData[];
  activities: Activity[];
}

export const dashboardService = {
  async getData(): Promise<DashboardData> {
    if (apiConfig.useMock) {
      return mockApi.getDashboardStats();
    }
    const { data } = await httpClient.get('/dashboard');
    return data;
  },
};
