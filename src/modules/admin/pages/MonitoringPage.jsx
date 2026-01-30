import React from 'react';
import AdminLayout from '../layouts/AdminLayout'; // ✅ Import Layout
import useAdminDashboard from '../hooks/useAdminDashboard';

const MonitoringPage = () => {
  const { stats, logs, loading, error } = useAdminDashboard();

  if (loading) return (
    <AdminLayout>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </AdminLayout>
  );

  if (error) return (
    <AdminLayout>
      <div className="alert alert-danger m-4" role="alert">
        {error}
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="w-100">
        
        {/* --- Header Section --- */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">System Health Dashboard</h2>
            <p className="text-muted mb-0">Real-time platform counters and server status.</p>
          </div>
          <button className={`btn ${stats.status === 'Healthy' ? 'btn-outline-success' : 'btn-outline-danger'} fw-bold px-4`}>
            ● {stats.status === 'Healthy' ? 'System Healthy' : 'System Issues'}
          </button>
        </div>

        {/* --- ROW 1: USER & REVENUE METRICS --- */}
        <h6 className="text-uppercase text-secondary small fw-bold mb-3">User & Revenue Metrics</h6>
        <div className="row g-3 mb-4">
          {/* Card 1: Total Users */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center justify-content-between h-100">
              <div>
                <h6 className="text-muted text-uppercase small mb-1">Total Users</h6>
                <h2 className="fw-bold text-dark mb-0">{stats.totalUsers}</h2>
              </div>
              <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle">
                <i className="bi bi-people-fill fs-4"></i>
              </div>
            </div>
          </div>

          {/* Card 2: Active Users */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center justify-content-between h-100" style={{ borderLeft: '4px solid #0dcaf0' }}>
              <div>
                <h6 className="text-muted text-uppercase small mb-1">Active (24h)</h6>
                <h2 className="fw-bold text-dark mb-0">{stats.activeUsers}</h2>
              </div>
              <div className="text-info p-3">
                <i className="bi bi-lightning-fill fs-4"></i>
              </div>
            </div>
          </div>

          {/* Card 3: Revenue */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center justify-content-between h-100" style={{ borderLeft: '4px solid #ffc107' }}>
              <div>
                <h6 className="text-muted text-uppercase small mb-1">Total Revenue</h6>
                <h2 className="fw-bold text-dark mb-0">₹{stats.totalRevenue?.toLocaleString()}</h2>
              </div>
              <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-circle">
                <i className="bi bi-currency-rupee fs-4"></i>
              </div>
            </div>
          </div>
        </div>

        {/* --- ROW 2: JOB STATISTICS --- */}
        <h6 className="text-uppercase text-secondary small fw-bold mb-3">Job Statistics</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center justify-content-between h-100" style={{ borderLeft: '4px solid #6610f2' }}>
              <div>
                <h6 className="text-muted text-uppercase small mb-1">Total Jobs Posted</h6>
                <h2 className="fw-bold text-dark mb-0">{stats.totalJobs}</h2>
              </div>
              <div className="text-primary bg-opacity-10 p-2 rounded">
                 📢
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center justify-content-between h-100" style={{ borderLeft: '4px solid #0d6efd' }}>
              <div>
                <h6 className="text-muted text-uppercase small mb-1">Ongoing Jobs</h6>
                <h2 className="fw-bold text-dark mb-0">{stats.ongoingJobs}</h2>
              </div>
              <div className="text-primary p-2">
                 ⏳
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center justify-content-between h-100" style={{ borderLeft: '4px solid #198754' }}>
              <div>
                <h6 className="text-muted text-uppercase small mb-1">Completed Jobs</h6>
                <h2 className="fw-bold text-dark mb-0">{stats.completedJobs}</h2>
              </div>
              <div className="text-success p-2">
                 ✅
              </div>
            </div>
          </div>
        </div>

        {/* --- ROW 3: SERVER HEALTH & LOGS --- */}
        <div className="row g-4">
          
          {/* Left: Server Uptime Circle */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm h-100 p-4">
              <h6 className="fw-bold text-dark mb-4">Server Health</h6>
              <div className="d-flex flex-column align-items-center justify-content-center h-75">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center border border-5 border-success text-success fw-bold"
                  style={{ width: '150px', height: '150px', fontSize: '1.5rem' }}
                >
                  {stats.uptime}
                </div>
                <p className="text-muted mt-3 small">Uptime Status</p>
              </div>
            </div>
          </div>

          {/* Right: System Logs Table */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm h-100 overflow-hidden">
              <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">System Logs & Errors</h6>
                {logs.some(l => l.level === 'ERROR') && <span className="badge bg-danger">Issues Detected</span>}
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 small">
                  <thead className="bg-light text-secondary text-uppercase">
                    <tr>
                      <th className="ps-4">Timestamp</th>
                      <th>Level</th>
                      <th>Module</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.length > 0 ? logs.map((log, index) => (
                      <tr key={index}>
                        <td className="ps-4 text-muted">{log.timestamp ? new Date(log.timestamp).toLocaleString() : 'N/A'}</td>
                        <td>
                          <span className={`badge ${log.level === 'ERROR' ? 'bg-danger' : 'bg-info bg-opacity-10 text-info'}`}>
                            {log.level || 'INFO'}
                          </span>
                        </td>
                        <td className="fw-bold text-dark">{log.module || 'SYSTEM'}</td>
                        <td>{log.message}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan="4" className="text-center py-4 text-muted">No logs available.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default MonitoringPage;