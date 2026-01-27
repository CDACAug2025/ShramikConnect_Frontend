import { useEffect, useState } from "react";
import {
  generateContract,
  getContract,
  signContract
} from "../services/contractService";

export const useContract = (jobId) => {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadContract = async () => {
    setLoading(true);
    try {
      const res = await getContract(jobId);
      setContract(res.data);
    } finally {
      setLoading(false);
    }
  };

  const create = async (data) => {
    await generateContract(data);
    loadContract();
  };

  const sign = async (id) => {
    await signContract(id);
    loadContract();
  };

  useEffect(() => {
    if (jobId) loadContract();
  }, [jobId]);

  return {
    contract,
    loading,
    create,
    sign
  };
};
