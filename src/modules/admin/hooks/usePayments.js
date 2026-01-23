import { useState, useEffect } from 'react';
import { fetchTransactions, releasePayment, generateFinancialReport } from '../services/paymentApi';

const usePayments = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalHeld: 0, totalReleased: 0, failedCount: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchTransactions();
      setTransactions(data);
      calculateStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const held = data.filter(t => t.status === 'Held in Escrow').reduce((sum, t) => sum + t.amount, 0);
    const released = data.filter(t => t.status === 'Released').reduce((sum, t) => sum + t.amount, 0);
    const failed = data.filter(t => t.status === 'Failed').length;
    setStats({ totalHeld: held, totalReleased: released, failedCount: failed });
  };

  const handleRelease = async (txnId) => {
    if (!window.confirm("Confirm: Release this escrow payment to the worker?")) return;
    await releasePayment(txnId);
    
    // Optimistic Update
    const updatedData = transactions.map(txn => 
      txn.id === txnId ? { ...txn, status: "Released" } : txn
    );
    setTransactions(updatedData);
    calculateStats(updatedData);
  };

  const handleDownloadReport = async () => {
    await generateFinancialReport();
    alert("Financial Report has been generated and downloaded.");
  };

  return { transactions, stats, loading, handleRelease, handleDownloadReport };
};

export default usePayments;