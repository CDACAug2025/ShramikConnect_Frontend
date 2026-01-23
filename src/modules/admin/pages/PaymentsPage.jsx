import React from 'react';
import usePayments from '../hooks/usePayments';
import TransactionTable from '../components/TransactionTable';
import StatCard from '../components/StatCard'; // Reusing your existing component

const PaymentsPage = () => {
  const { transactions, stats, loading, handleRelease, handleDownloadReport } = usePayments();

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-50 py-5">
      <div className="spinner-border text-primary"></div>
    </div>
  );

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">Financial Oversight</h2>
            <p className="text-muted mb-0">Audit logs, escrow management, and failure detection.</p>
          </div>
          <button 
            onClick={handleDownloadReport}
            className="btn btn-dark fw-bold shadow-sm"
          >
            <span className="me-2">⬇</span> Download Report
          </button>
        </div>

        {/* Financial Stats Row */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <StatCard 
              title="Held in Escrow" 
              value={`₹${stats.totalHeld.toLocaleString()}`} 
              color="warning" 
              icon="⏳" 
            />
          </div>
          <div className="col-md-4">
            <StatCard 
              title="Total Released" 
              value={`₹${stats.totalReleased.toLocaleString()}`} 
              color="success" 
              icon="✅" 
            />
          </div>
          <div className="col-md-4">
            <StatCard 
              title="Payment Failures" 
              value={stats.failedCount} 
              color="danger" 
              icon="⚠️" 
            />
          </div>
        </div>

        {/* Transaction Log Table */}
        <div className="mb-3">
          <h5 className="fw-bold text-secondary">Transaction Logs</h5>
        </div>
        <TransactionTable transactions={transactions} onRelease={handleRelease} />

      </div>
    </div>
  );
};

export default PaymentsPage;