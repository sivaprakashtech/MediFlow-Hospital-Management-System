import { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import DemoModePanel from '../ui/DemoModePanel';
import { DashboardSkeleton } from '../ui/LoadingSkeleton';

function PageLoader() {
  return <DashboardSkeleton />;
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#fafbfc] dark:bg-[#0a0e17]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto scrollbar-thin" role="main">
          <div className="p-4 lg:p-8 max-w-[1600px] mx-auto">
            <Suspense fallback={<PageLoader />}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Outlet />
              </motion.div>
            </Suspense>
          </div>
        </main>
      </div>
      <DemoModePanel />
    </div>
  );
}
