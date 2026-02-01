import React from 'react';
import useAdminDashboard from '../hooks/useAdminDashboard';

const MonitoringPage = () => {
    const { stats, logs, loading, error } = useAdminDashboard();

    if (loading) return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{ minHeight: '70vh' }}>
            <div className="spinner-grow text-primary mb-3" style={{ width: '3rem', height: '3rem' }}></div>
            <h5 className="text-dark fw-bold">Connecting to Cluster...</h5>
            <p className="text-muted small">Aggregating real-time telemetry data.</p>
        </div>
    );

    if (error) return (
        <div className="alert alert-custom bg-danger bg-opacity-10 text-danger border-danger border-opacity-25 m-4 shadow-sm">
            <i className="bi bi-exclamation-octagon-fill me-2"></i> {error}
        </div>
    );

    return (
        <div className="container-fluid py-4 px-4" style={{ backgroundColor: '#f8f9fc', minHeight: '100vh' }}>
            
            {/* --- 🛡️ PLATFORM STATUS BAR --- */}
            <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)' }}>
                <div className="card-body p-4 d-flex justify-content-between align-items-center text-white">
                    <div>
                        <h2 className="fw-black mb-1" style={{ letterSpacing: '-0.025em' }}>System Monitoring</h2>
                        <p className="opacity-75 small mb-0">Node Status: <span className="text-success fw-bold">Stable</span> | Region: <span className="fw-bold">IN-WEST-1</span></p>
                    </div>
                    <div className="text-end">
                        <div className={`badge rounded-pill px-4 py-2 fs-6 ${stats.status === 'Healthy' ? 'bg-success bg-opacity-25 text-success border border-success' : 'bg-danger bg-opacity-25 text-danger border border-danger'}`}>
                            <span className="spinner-grow spinner-grow-sm me-2" role="status"></span>
                            {stats.status === 'Healthy' ? 'OPERATIONAL' : 'SYSTEM DEGRADED'}
                        </div>
                        <div className="small mt-2 opacity-50">Last Refreshed: {new Date().toLocaleTimeString()}</div>
                    </div>
                </div>
            </div>

            {/* --- 📊 CORE PERFORMANCE METRICS --- */}
            <div className="row g-4 mb-4">
                {[
                    { title: 'User Base', val: stats.totalUsers, icon: 'people', color: '#4f46e5', trend: '+12%' },
                    { title: 'Live Sessions', val: stats.activeUsers, icon: 'broadcast', color: '#0ea5e9', trend: 'Steady' },
                    { title: 'Net Revenue', val: `₹${stats.totalRevenue?.toLocaleString()}`, icon: 'wallet2', color: '#10b981', trend: '+5.4%' }
                ].map((item, i) => (
                    <div className="col-md-4" key={i}>
                        <div className="card border-0 shadow-sm rounded-4 h-100 p-3">
                            <div className="d-flex justify-content-between">
                                <div className="p-3 rounded-3 shadow-sm" style={{ backgroundColor: item.color, color: 'white' }}>
                                    <i className={`bi bi-${item.icon} fs-4`}></i>
                                </div>
                                <div className="text-end">
                                    <span className="badge bg-light text-success extra-small fw-bold">{item.trend}</span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <h6 className="text-muted small text-uppercase fw-bold mb-1">{item.title}</h6>
                                <h2 className="fw-black text-dark mb-0">{item.val}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- 🛠️ WORKLOAD STATISTICS --- */}
            <div className="row g-4 mb-5">
                {[
                    { label: 'Total Jobs', val: stats.totalJobs, color: 'primary', icon: '📢' },
                    { label: 'Ongoing', val: stats.ongoingJobs, color: 'info', icon: '⏳' },
                    { label: 'Completed', val: stats.completedJobs, color: 'success', icon: '✅' }
                ].map((job, idx) => (
                    <div className="col-md-4" key={idx}>
                        <div className="card border-0 shadow-sm rounded-4 p-3 border-start border-5 border-opacity-50" style={{ borderColor: `var(--bs-${job.color})` }}>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <p className="text-muted small mb-0 fw-bold text-uppercase">{job.label}</p>
                                    <h3 className="fw-bold mb-0">{job.val}</h3>
                                </div>
                                <span className="fs-1">{job.icon}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- 🖥️ INFRASTRUCTURE & LOGS --- */}
            <div className="row g-4">
                {/* Left: Uptime Gauge */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm h-100 rounded-4 p-4 text-center">
                        <h6 className="fw-bold text-dark text-start mb-4 text-uppercase small">Infrastructure Uptime</h6>
                        <div className="position-relative d-inline-block mx-auto mt-3">
                            <svg width="180" height="180">
                                <circle cx="90" cy="90" r="80" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                                <circle cx="90" cy="90" r="80" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="502" strokeDashoffset="50" style={{ transition: 'all 1s ease-in-out' }} />
                            </svg>
                            <div className="position-absolute top-50 start-50 translate-middle text-center">
                                <h2 className="fw-black text-dark mb-0">{stats.uptime}</h2>
                                <span className="text-muted extra-small fw-bold">ONLINE</span>
                            </div>
                        </div>
                        <p className="mt-4 text-muted small">Current server uptime since last deployment (IN-WEST-B Node).</p>
                    </div>
                </div>

                {/* Right: Modern Console Logs */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                        <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold mb-0 text-uppercase small">Real-time Event Stream</h6>
                            <button className="btn btn-sm btn-light border fw-bold text-muted">Clear Logs</button>
                        </div>
                        <div className="table-responsive" style={{ maxHeight: '400px' }}>
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light sticky-top">
                                    <tr className="extra-small text-muted fw-bold text-uppercase">
                                        <th className="ps-4">Timestamp</th>
                                        <th>Level</th>
                                        <th>Source</th>
                                        <th>Event Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.length > 0 ? logs.map((log, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td className="ps-4 text-muted extra-small">
                                                {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : 'N/A'}
                                            </td>
                                            <td>
                                                <span className={`badge border rounded-pill ${log.level === 'ERROR' ? 'bg-danger bg-opacity-10 text-danger border-danger border-opacity-25' : 'bg-blue bg-opacity-10 text-primary border-primary border-opacity-25'}`}>
                                                    {log.level || 'INFO'}
                                                </span>
                                            </td>
                                            <td className="fw-bold text-dark small">{log.module || 'CORE'}</td>
                                            <td className="text-secondary small">{log.message}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="4" className="text-center py-5 text-muted">No active logs found in the stream.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonitoringPage;