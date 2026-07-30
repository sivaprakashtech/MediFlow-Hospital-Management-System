import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, DollarSign, CreditCard, FileText, TrendingUp, Download } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SearchInput from '../components/ui/SearchInput';
import StatusBadge from '../components/ui/StatusBadge';
import Pagination from '../components/ui/Pagination';
import { usePagination } from '../hooks/usePagination';
import { useToast } from '../components/ui/Toast';
import { invoices as allInvoices } from '../data';

export default function Billing() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { success } = useToast();

  const filtered = useMemo(() => {
    return allInvoices.filter((inv) => {
      const matchSearch = inv.patientName.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || inv.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const { currentPage, pageSize, totalPages, paginatedRange, goToPage, changePageSize } = usePagination({
    totalItems: filtered.length,
    initialPageSize: 12,
  });

  const paginatedInvoices = filtered.slice(paginatedRange.start, paginatedRange.end);

  const stats = useMemo(() => ({
    totalCollected: allInvoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0),
    pendingAmount: allInvoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.total, 0),
    overdueAmount: allInvoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.total, 0),
    totalInvoices: allInvoices.length,
  }), []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing & Invoices"
        subtitle={`${allInvoices.length.toLocaleString()} invoices · $${(stats.totalCollected / 1000).toFixed(0)}K collected`}
        breadcrumb={['Dashboard', 'Billing']}
        actions={
          <div className="flex gap-3">
            <button onClick={() => success('Export Started', 'Financial report generating...')} className="btn-secondary gap-2">
              <Download className="w-4 h-4" /> Export
            </button>
            <button onClick={() => success('Invoice', 'New invoice creation form opened.')} className="btn-primary gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create Invoice</span>
            </button>
          </div>
        }
      />

      {/* Financial Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Collected', value: `$${(stats.totalCollected / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-success-600 dark:text-success-400', bg: 'bg-success-50 dark:bg-success-500/10' },
          { label: 'Pending', value: `$${(stats.pendingAmount / 1000).toFixed(0)}K`, icon: CreditCard, color: 'text-warning-600 dark:text-warning-400', bg: 'bg-warning-50 dark:bg-warning-500/10' },
          { label: 'Overdue', value: `$${(stats.overdueAmount / 1000).toFixed(0)}K`, icon: FileText, color: 'text-danger-600 dark:text-danger-400', bg: 'bg-danger-50 dark:bg-danger-500/10' },
          { label: 'Total Invoices', value: stats.totalInvoices.toLocaleString(), icon: TrendingUp, color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-950/40' },
        ].map((stat) => (
          <div key={stat.label} className="card p-5">
            <div className="flex items-center gap-3.5">
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchInput value={search} onChange={(v) => { setSearch(v); goToPage(1); }} placeholder="Search by patient or invoice ID..." className="flex-1" />
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); goToPage(1); }} className="input-field w-auto text-sm" aria-label="Payment status filter">
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr className="border-b border-gray-100/80 dark:border-gray-700/40 bg-gray-50/50 dark:bg-dark-850/50">
                <th className="table-header">Invoice</th>
                <th className="table-header">Patient</th>
                <th className="table-header hidden md:table-cell">Date</th>
                <th className="table-header">Amount</th>
                <th className="table-header">Status</th>
                <th className="table-header hidden lg:table-cell">Payment</th>
                <th className="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInvoices.map((inv) => (
                <tr key={inv.id} className="table-row">
                  <td className="table-cell">
                    <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 font-mono">{inv.id}</span>
                  </td>
                  <td className="table-cell text-sm font-medium text-gray-900 dark:text-white">{inv.patientName}</td>
                  <td className="table-cell text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell">{inv.date}</td>
                  <td className="table-cell text-sm font-bold text-gray-900 dark:text-white">${inv.total.toLocaleString()}</td>
                  <td className="table-cell"><StatusBadge status={inv.status} /></td>
                  <td className="table-cell text-sm text-gray-500 hidden lg:table-cell">{inv.paymentMethod || '—'}</td>
                  <td className="table-cell text-right">
                    <button onClick={() => success('Invoice Details', `Loading invoice ${inv.id} — ${inv.patientName}`)} className="btn-secondary text-xs py-1.5 px-3">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={pageSize} onPageChange={goToPage} onPageSizeChange={changePageSize} />
      </motion.div>
    </div>
  );
}
