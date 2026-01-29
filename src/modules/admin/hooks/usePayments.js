import { useState, useEffect } from 'react';

const usePayments = () => {
  const [transactions, setTransactions] = useState([]);
  const [escrowFunds, setEscrowFunds] = useState([]); // Keeping mock for Escrow if no DB table yet
  const [loading, setLoading] = useState(true);

  // ✅ FETCH REAL DATA FROM BACKEND
  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/payments');
      const data = await response.json();
      setTransactions(data); // Set Real DB Data
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // ... (Keep your existing downloadReport and releaseEscrow functions here) ...
  const downloadReport = () => { /* ... keep existing logic ... */ };
  const releaseEscrow = (id) => { /* ... keep existing logic ... */ };

  return { transactions, escrowFunds, loading, downloadReport, releaseEscrow };
};

export default usePayments;