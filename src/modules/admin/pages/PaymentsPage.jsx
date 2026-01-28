import React from 'react';
import usePayments from '../hooks/usePayments';
import TransactionTable from '../components/TransactionTable';
import StatCard from '../components/StatCard';

const PaymentsPage = () => {
  const { 
    transactions, stats, loading, 
    handleRelease, handleDownloadReport,
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    typeFilter, setTypeFilter
  } = usePayments();

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">Financial Oversight</h2>
            <p className="text-muted mb-0">Audit logs, escrow management, and failure detection.</p>
          </div>
          <button onClick={handleDownloadReport} className="btn btn-dark fw-bold shadow-sm">
            <span className="me-2">⬇</span> Download Report
          </button>
        </div>

        {/* Stats Row */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <StatCard title="Held in Escrow" value={`₹${stats.totalHeld.toLocaleString()}`} color="warning" icon="⏳" />
          </div>
          <div className="col-md-4">
            <StatCard title="Total Processed" value={`₹${stats.totalReleased.toLocaleString()}`} color="success" icon="✅" />
          </div>
          <div className="col-md-4">
            <StatCard title="Failures" value={stats.failedCount} color="danger" icon="⚠️" />
          </div>
        </div>

        {/* --- NEW: Filter Toolbar --- */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-3">
            <div className="row g-3">
              {/* Search */}
              <div className="col-md-4">
                <input 
                  type="text" className="form-control" placeholder="🔍 Search ID, Client or Worker..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {/* Type Filter */}
              <div className="col-md-3">
                <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  <option value="All">All Types</option>
                  <option value="Escrow Deposit">Escrow Deposit</option>
                  <option value="Subscription">Subscription</option>
                  <option value="Store Order">Store Order</option>
                  <option value="Refund">Refund</option>
                </select>
              </div>
              {/* Status Filter */}
              <div className="col-md-3">
                <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="All">All Statuses</option>
                  <option value="Held in Escrow">Held in Escrow</option>
                  <option value="Released">Released</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              {/* Reset */}
              <div className="col-md-2 d-grid">
                <button className="btn btn-outline-secondary" onClick={() => { setSearchQuery(''); setStatusFilter('All'); setTypeFilter('All'); }}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <TransactionTable transactions={transactions} onRelease={handleRelease} />

      </div>
    </div>
  );
};

export default PaymentsPage;