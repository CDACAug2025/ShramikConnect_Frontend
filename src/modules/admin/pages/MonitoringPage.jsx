import React from 'react';
import useAdminDashboard from '../hooks/useAdminDashboard';
import StatCard from '../components/StatCard';
import LogTable from '../components/LogTable'; 

const MonitoringPage = () => {
  const { stats, logs, loading, error } = useAdminDashboard();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50 py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger shadow-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        
        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold text-dark mb-1">Platform Monitoring</h2>
          <p className="text-muted">Real-time system performance and error logs.</p>
        </div>

        {/* Stats Row */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-sm-6 col-md-3">
            <StatCard title="Active Users" value={stats.activeUsers} color="primary" icon="👥" />
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <StatCard title="Active Jobs" value={stats.activeJobs} color="success" icon="💼" />
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <StatCard title="Transactions" value={stats.totalTransactions} color="warning" icon="💳" />
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <StatCard title="Server Status" value={stats.serverStatus} color="info" icon="🖥️" />
          </div>
        </div>

        {/* Logs Section */}
        <div className="card shadow border-0 rounded-3 overflow-hidden">
          <div className="card-header bg-white py-3 border-bottom">
            <h5 className="mb-0 fw-bold text-danger">System Error Logs</h5>
          </div>
          <div className="card-body p-0">
            <LogTable logs={logs} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default MonitoringPage;