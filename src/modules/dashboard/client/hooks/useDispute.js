import { useEffect, useState } from "react";
import {
  raiseDispute,
  getDisputeByJob
} from "../services/disputeService";

export const useDispute = (jobId) => {
  const [dispute, setDispute] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadDispute = async () => {
    setLoading(true);
    try {
      const res = await getDisputeByJob(jobId);
      setDispute(res.data);
    } finally {
      setLoading(false);
    }
  };

  const createDispute = async (data) => {
    await raiseDispute(data);
    loadDispute();
  };

  useEffect(() => {
    if (jobId) loadDispute();
  }, [jobId]);

  return {
    dispute,
    loading,
    createDispute
  };
};
