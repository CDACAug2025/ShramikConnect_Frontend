import { useEffect, useState } from "react";
import { getClientDashboard } from "../services/clientDashboardApi";

const ClientDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await getClientDashboard();
        setDashboardData(response.data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const recentJobs = dashboardData?.recentJobs || [];

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Client Dashboard</h1>
      
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5>Active Jobs</h5>
              <h2>{stats.activeJobs || 0}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5>Completed</h5>
              <h2>{stats.completedJobs || 0}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h5>Total Spent</h5>
              <h2>₹{stats.totalSpent || 0}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5>Pending Applications</h5>
              <h2>{stats.pendingApplications || 0}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h4>Recent Jobs</h4>
        </div>
        <div className="card-body">
          {recentJobs.length === 0 ? (
            <p className="text-muted">No jobs posted yet.</p>
          ) : (
            recentJobs.map(job => (
              <div key={job.jobId} className="d-flex justify-content-between align-items-center border-bottom py-2">
                <div>
                  <strong>{job.title}</strong>
                  <br />
                  <small className="text-muted">Applications: {job.applicationCount}</small>
                </div>
                <span className={`badge ${
                  job.status === 'COMPLETED' ? 'bg-success' :
                  job.status === 'IN_PROGRESS' ? 'bg-primary' :
                  'bg-secondary'
                }`}>{job.status}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardPage;