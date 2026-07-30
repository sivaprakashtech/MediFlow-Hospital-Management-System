/**
 * Services Layer - Barrel Export
 * All API services are exported from here for clean imports.
 */
export { patientService } from './patientService';
export { doctorService } from './doctorService';
export { appointmentService } from './appointmentService';
export { billingService } from './billingService';
export { labService } from './labService';
export { pharmacyService } from './pharmacyService';
export { dashboardService } from './dashboardService';
export { default as httpClient, tokenManager } from './httpClient';
export { apiConfig } from './config';
export { mockApi } from './mockAdapter';
export type { PaginatedRequest, PaginatedResponse, ApiResponse, ApiError, ServiceState, PaginatedServiceState } from './types';
