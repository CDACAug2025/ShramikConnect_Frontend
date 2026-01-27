import { useEffect, useState } from "react";
import {
  getJobProgress,
  markCompleted
} from "../services/progressService";

export const useProgress = (jobId) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProgress = async () => {
    setLoading(true);
    try {
      const res = await getJobProgress(jobId);
      setProgress(res.data);
    } finally {
      setLoading(false);
    }
  };

  const completeJob = async () => {
    await markCompleted(jobId);
    loadProgress();
  };

  useEffect(() => {
    if (jobId) loadProgress();
  }, [jobId]);

  return {
    progress,
    loading,
    completeJob
  };
};
