import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, AlertTriangle, Package, TrendingDown, Download } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SearchInput from '../components/ui/SearchInput';
import StatusBadge from '../components/ui/StatusBadge';
import Pagination from '../components/ui/Pagination';
import { usePagination } from '../hooks/usePagination';
import { useToast } from '../components/ui/Toast';
import { medicines as allMedicines } from '../data';

export default function Pharmacy() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { success } = useToast();

  const categories = useMemo(() => [...new Set(allMedicines.map(m => m.category))].sort(), []);

  const filtered = useMemo(() => {
    return allMedicines.filter((med) => {
      const matchSearch = med.name.toLowerCase().includes(search.toLowerCase()) ||
        med.manufacturer.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === 'all' || med.category === categoryFilter;
      const matchStatus = statusFilter === 'all' || med.status === statusFilter;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [search, categoryFilter, statusFilter]);

  const { currentPage, pageSize, totalPages, paginatedRange, goToPage, changePageSize } = usePagination({
    totalItems: filtered.length,
    initialPageSize: 15,
  });

  const paginatedMeds = filtered.slice(paginatedRange.start, paginatedRange.end);
  const lowStockCount = allMedicines.filter(m => m.status === 'low_stock').length;
  const outOfStockCount = allMedicines.filter(m => m.status === 'out_of_stock').length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pharmacy Inventory"
        subtitle={`${allMedicines.length} medicines · ${categories.length} categories`}
        breadcrumb={['Dashboard', 'Pharmacy']}
        actions={
          <div className="flex gap-3">
            <button onClick={() => success('Export Started', 'Generating inventory report...')} className="btn-secondary gap-2">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="btn-primary gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Medicine</span>
            </button>
          </div>
        }
      />

      {/* Alerts */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="flex flex-wrap gap-3">
          {lowStockCount > 0 && (
            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-warning-50 dark:bg-warning-500/10 border border-warning-200/80 dark:border-warning-800/40 rounded-xl">
              <AlertTriangle className="w-4 h-4 text-warning-600" aria-hidden="true" />
              <span className="text-sm font-medium text-warning-700 dark:text-warning-400">{lowStockCount} medicines low on stock</span>
            </div>
          )}
          {outOfStockCount > 0 && (
            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-danger-50 dark:bg-danger-500/10 border border-danger-200/80 dark:border-danger-800/40 rounded-xl">
              <Package className="w-4 h-4 text-danger-600" aria-hidden="true" />
              <span className="text-sm font-medium text-danger-700 dark:text-danger-400">{outOfStockCount} medicines out of stock</span>
            </div>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchInput value={search} onChange={(v) => { setSearch(v); goToPage(1); }} placeholder="Search medicines..." className="flex-1" />
          <div className="flex gap-3">
            <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); goToPage(1); }} className="input-field w-auto text-sm" aria-label="Category filter">
              <option value="all">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); goToPage(1); }} className="input-field w-auto text-sm" aria-label="Stock status filter">
              <option value="all">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr className="border-b border-gray-100/80 dark:border-gray-700/40 bg-gray-50/50 dark:bg-dark-850/50">
                <th className="table-header">Medicine</th>
                <th className="table-header">Category</th>
                <th className="table-header hidden lg:table-cell">Manufacturer</th>
                <th className="table-header">Stock</th>
                <th className="table-header">Price</th>
                <th className="table-header hidden md:table-cell">Expiry</th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMeds.map((med) => (
                <tr key={med.id} className="table-row">
                  <td className="table-cell">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{med.name}</p>
                    <p className="text-[11px] text-gray-400 font-mono">{med.batchNumber}</p>
                  </td>
                  <td className="table-cell text-sm text-gray-600 dark:text-gray-400">{med.category}</td>
                  <td className="table-cell text-sm text-gray-600 dark:text-gray-400 hidden lg:table-cell">{med.manufacturer}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{med.quantity}</span>
                      {med.quantity < med.minStock && med.quantity > 0 && (
                        <TrendingDown className="w-3.5 h-3.5 text-warning-500" aria-label="Below minimum stock" />
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400">Min: {med.minStock}</p>
                  </td>
                  <td className="table-cell text-sm font-semibold text-gray-900 dark:text-white">${med.unitPrice}</td>
                  <td className="table-cell text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell">{med.expiryDate}</td>
                  <td className="table-cell"><StatusBadge status={med.status} /></td>
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
