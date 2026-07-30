import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import DashboardLayout from './components/layout/DashboardLayout';
import CommandPalette from './components/ui/CommandPalette';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

// Lazy loaded pages for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Patients = lazy(() => import('./pages/Patients'));
const Doctors = lazy(() => import('./pages/Doctors'));
const Appointments = lazy(() => import('./pages/Appointments'));
const CalendarView = lazy(() => import('./pages/CalendarView'));
const NurseStation = lazy(() => import('./pages/NurseStation'));
const Laboratory = lazy(() => import('./pages/Laboratory'));
const Pharmacy = lazy(() => import('./pages/Pharmacy'));
const Billing = lazy(() => import('./pages/Billing'));
const WardManagement = lazy(() => import('./pages/WardManagement'));
const Reports = lazy(() => import('./pages/Reports'));
const StaffManagement = lazy(() => import('./pages/StaffManagement'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Settings = lazy(() => import('./pages/Settings'));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <CommandPalette />
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="nurse" element={<NurseStation />} />
          <Route path="laboratory" element={<Laboratory />} />
          <Route path="pharmacy" element={<Pharmacy />} />
          <Route path="billing" element={<Billing />} />
          <Route path="ward-management" element={<WardManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="staff" element={<StaffManagement />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}
