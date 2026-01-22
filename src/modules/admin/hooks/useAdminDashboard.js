import { useState, useEffect } from 'react';
import { fetchMonitoringStats, fetchSystemLogs } from '../services/adminDashboardApi';

const useAdminDashboard = () => {
  const [stats, setStats] = useState({
    activeUsers: 0,
    activeJobs: 0,
    totalTransactions: 0,
    serverStatus: 'Unknown'
  });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch both stats and logs in parallel
      const [statsData, logsData] = await Promise.all([
        fetchMonitoringStats(),
        fetchSystemLogs()
      ]);
      setStats(statsData);
      setLogs(logsData);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard monitoring data.");
    } finally {
      setLoading(false);
    }
  };

  return { stats, logs, loading, error };
};

export default useAdminDashboard;