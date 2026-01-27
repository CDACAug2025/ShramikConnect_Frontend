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

  const loadHistory = async () => {
    setLoading(true);
    try {
      const [j, c, p] = await Promise.all([
        getCompletedJobs(),
        getPastContracts(),
        getPaymentHistory()
      ]);

      setJobs(j.data);
      setContracts(c.data);
      setPayments(p.data);
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
    loading
  };
};
