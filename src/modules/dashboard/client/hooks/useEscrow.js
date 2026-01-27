import { useEffect, useState } from "react";
import {
  createEscrowOrder,
  getPaymentStatus,
  releasePayment
} from "../services/escrowService";

export const useEscrow = (jobId) => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadStatus = async () => {
    setLoading(true);
    try {
      const res = await getPaymentStatus(jobId);
      setPayment(res.data);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async () => {
    const res = await createEscrowOrder(jobId);
    return res.data; // Razorpay order
  };

  const release = async () => {
    await releasePayment(jobId);
    loadStatus();
  };

  useEffect(() => {
    if (jobId) loadStatus();
  }, [jobId]);

  return {
    payment,
    loading,
    createOrder,
    release
  };
};
