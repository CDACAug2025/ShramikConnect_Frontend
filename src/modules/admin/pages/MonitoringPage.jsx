import React from 'react';
import useAdminDashboard from '../hooks/useAdminDashboard';
import StatCard from '../components/StatCard';
import LogTable from '../components/LogTable';

const MonitoringPage = () => {
  const { stats, logs, loading, error } = useAdminDashboard();

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  if (error) return <div className="alert alert-danger m-5">{error}</div>;

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">System Health Dashboard</h2>
            <p className="text-muted">Real-time platform counters and server status.</p>
          </div>
          <div className="badge bg-success bg-opacity-10 text-success fs-6 px-3 py-2 border border-success">
            ● System Healthy
          </div>
        </div>

        {/* --- SECTION 1: USER & FINANCIAL STATS --- */}
        <h6 className="fw-bold text-secondary text-uppercase small mb-3">User & Revenue Metrics</h6>
        <div className="row g-3 mb-4">
          {/* Total Users */}
          <div className="col-md-3">
            <StatCard title="Total Users" value={stats.totalUsers} color="primary" icon="👥" />
          </div>
          {/* Active Users (24h) */}
          <div className="col-md-3">
            <StatCard title="Active (24h)" value={stats.activeUsers24h} color="info" icon="⚡" />
          </div>
          {/* Total Revenue */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body border-start border-4 border-warning d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-uppercase text-muted small fw-bold mb-1">Total Revenue</h6>
                  <h3 className="mb-0 fw-bold text-dark">₹{stats.totalRevenue?.toLocaleString()}</h3>
                </div>
                <div className="text-warning opacity-50 fs-1">💰</div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: JOB PERFORMANCE --- */}
        <h6 className="fw-bold text-secondary text-uppercase small mb-3">Job Statistics</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <StatCard title="Total Jobs Posted" value={stats.totalJobs} color="secondary" icon="📢" />
          </div>
          <div className="col-md-4">
            <StatCard title="Ongoing Jobs" value={stats.ongoingJobs} color="primary" icon="⏳" />
          </div>
          <div className="col-md-4">
            <StatCard title="Completed Jobs" value={stats.completedJobs} color="success" icon="✅" />
          </div>
        </div>

        {/* --- SECTION 3: SYSTEM HEALTH & LOGS --- */}
        <div className="row g-4">
          
          {/* System Uptime Card */}
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header bg-white fw-bold py-3">Server Health</div>
              <div className="card-body text-center py-4">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle border border-4 border-success text-success mb-3" style={{ width: '120px', height: '120px' }}>
                  <h3 className="mb-0 fw-bold">{stats.uptime}</h3>
                </div>
                <p className="text-muted mb-0">Uptime Status</p>
                <small className="text-secondary">Last restart: {stats.lastRestart}</small>
              </div>
            </div>
          </div>

          {/* Error Logs Table */}
          <div className="col-md-8">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header bg-white fw-bold py-3 d-flex justify-content-between">
                <span>System Logs & Errors</span>
                <span className="badge bg-danger">Issues Detected</span>
              </div>
              <div className="card-body p-0">
                <LogTable logs={logs} />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MonitoringPage;