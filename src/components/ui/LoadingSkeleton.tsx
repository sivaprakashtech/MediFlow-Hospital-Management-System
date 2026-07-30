/**
 * Premium Skeleton Loaders
 * Shimmer-animated loading placeholders for every content type.
 */

interface LoadingSkeletonProps {
  lines?: number;
  className?: string;
}

export default function LoadingSkeleton({ lines = 3, className = '' }: LoadingSkeletonProps) {
  return (
    <div className={`space-y-3 ${className}`} role="status" aria-label="Loading">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton h-4" style={{ width: `${100 - i * 15}%`, animationDelay: `${i * 100}ms` }} />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in" role="status" aria-label="Loading dashboard">
      {/* Hero Banner */}
      <div className="skeleton h-[200px] rounded-2xl" />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="card p-6 space-y-4" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="skeleton h-3 w-20" />
                <div className="skeleton h-7 w-16" />
              </div>
              <div className="skeleton w-11 h-11 rounded-2xl" />
            </div>
            <div className="skeleton h-3 w-28" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-5">
        <div className="lg:col-span-4 card p-6">
          <div className="flex justify-between mb-6">
            <div className="space-y-2">
              <div className="skeleton h-5 w-36" />
              <div className="skeleton h-3 w-24" />
            </div>
            <div className="skeleton h-6 w-16 rounded-lg" />
          </div>
          <div className="flex items-end gap-1 h-[260px]">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="skeleton flex-1 rounded-t-md" style={{ height: `${30 + Math.random() * 60}%`, animationDelay: `${i * 60}ms` }} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 card p-6 space-y-4">
          <div className="skeleton h-5 w-32" />
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="space-y-2" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex justify-between">
                <div className="skeleton h-3 w-20" />
                <div className="skeleton h-3 w-12" />
              </div>
              <div className="skeleton h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading dashboard...</span>
    </div>
  );
}

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="card overflow-hidden" role="status" aria-label="Loading table">
      {/* Header */}
      <div className="flex gap-4 px-5 py-4 border-b border-gray-100 dark:border-gray-700/40 bg-gray-50/50 dark:bg-dark-850/50">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="skeleton h-3 flex-1" style={{ animationDelay: `${i * 60}ms` }} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} className="flex items-center gap-4 px-5 py-4 border-b border-gray-50 dark:border-gray-800/30">
          <div className="skeleton w-9 h-9 rounded-xl flex-shrink-0" style={{ animationDelay: `${row * 40}ms` }} />
          <div className="flex-1 space-y-1.5">
            <div className="skeleton h-3.5 w-36" style={{ animationDelay: `${row * 40 + 20}ms` }} />
            <div className="skeleton h-2.5 w-24" style={{ animationDelay: `${row * 40 + 40}ms` }} />
          </div>
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-6 w-20 rounded-lg" />
        </div>
      ))}
      {/* Pagination */}
      <div className="flex justify-between px-5 py-4">
        <div className="skeleton h-3 w-32" />
        <div className="flex gap-1">
          {[1, 2, 3].map(i => <div key={i} className="skeleton w-8 h-8 rounded-lg" />)}
        </div>
      </div>
      <span className="sr-only">Loading table data...</span>
    </div>
  );
}

export function CardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" role="status" aria-label="Loading cards">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card p-6 space-y-4" style={{ animationDelay: `${i * 60}ms` }}>
          <div className="flex items-center gap-3.5">
            <div className="skeleton w-11 h-11 rounded-xl" />
            <div className="space-y-1.5 flex-1">
              <div className="skeleton h-4 w-32" />
              <div className="skeleton h-3 w-20" />
            </div>
          </div>
          <div className="space-y-2.5">
            {[1, 2, 3, 4].map(j => (
              <div key={j} className="flex justify-between">
                <div className="skeleton h-3 w-20" />
                <div className="skeleton h-3 w-12" />
              </div>
            ))}
          </div>
          <div className="skeleton h-px w-full" />
          <div className="flex justify-between items-center">
            <div className="skeleton h-5 w-14" />
            <div className="skeleton h-8 w-24 rounded-xl" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="card p-6" role="status" aria-label="Loading chart">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="skeleton h-5 w-40" />
          <div className="skeleton h-3 w-28" />
        </div>
        <div className="skeleton h-8 w-20 rounded-lg" />
      </div>
      <div className="flex items-end gap-2 h-[260px]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="skeleton flex-1 rounded-t-md" style={{ height: `${25 + Math.random() * 65}%`, animationDelay: `${i * 50}ms` }} />
        ))}
      </div>
      <span className="sr-only">Loading chart...</span>
    </div>
  );
}

export function CalendarSkeleton() {
  return (
    <div className="card overflow-hidden" role="status" aria-label="Loading calendar">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700/40">
        <div className="skeleton h-5 w-48" />
        <div className="flex gap-1">
          {[1, 2, 3].map(i => <div key={i} className="skeleton w-16 h-8 rounded-lg" />)}
        </div>
      </div>
      {/* Day headers */}
      <div className="grid grid-cols-8 border-b border-gray-100 dark:border-gray-700/40">
        <div className="p-3" />
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <div key={i} className="p-3 text-center border-l border-gray-100 dark:border-gray-700/40">
            <div className="skeleton h-3 w-8 mx-auto mb-1" />
            <div className="skeleton h-6 w-6 mx-auto rounded" />
          </div>
        ))}
      </div>
      {/* Time slots */}
      {Array.from({ length: 8 }).map((_, row) => (
        <div key={row} className="grid grid-cols-8 border-b border-gray-50 dark:border-gray-800/30 min-h-[50px]">
          <div className="p-2 flex justify-end pr-3">
            <div className="skeleton h-3 w-8" />
          </div>
          {Array.from({ length: 7 }).map((_, col) => (
            <div key={col} className="border-l border-gray-50 dark:border-gray-800/30 p-1">
              {Math.random() > 0.7 && <div className="skeleton h-6 w-full rounded-md" style={{ animationDelay: `${(row + col) * 40}ms` }} />}
            </div>
          ))}
        </div>
      ))}
      <span className="sr-only">Loading calendar...</span>
    </div>
  );
}
