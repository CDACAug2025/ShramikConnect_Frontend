import { useEffect, useState } from "react";
import {
  getCompletedJobs,
  getPastContracts,
  getPaymentHistory
} from "../services/jobHistoryService";

export const useJobHistory = () => {
  const [jobs, setJobs] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const [j, c, p] = await Promise.all([
        getCompletedJobs(),
        getPastContracts(),
        getPaymentHistory()
      ]);

      setJobs(j.data);
      setContracts(c.data);
      setPayments(p.data);
    } catch (err) {
      setError(err.response?.status === 403 ? 'Access denied. Please login again.' : 'Failed to load job history');
      console.error('Job history error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return {
    jobs,
    contracts,
    payments,
    loading,
    error
  };
};
