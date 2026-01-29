// import { useState, useEffect, useMemo } from 'react';
// import { fetchTransactions, releasePayment, generateFinancialReport } from '../services/paymentApi';

// const usePayments = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({ totalHeld: 0, totalReleased: 0, failedCount: 0 });

//   // --- NEW: Filter State ---
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [typeFilter, setTypeFilter] = useState('All');

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     setLoading(true);
//     try {
//       const data = await fetchTransactions();
//       setTransactions(data);
//       calculateStats(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateStats = (data) => {
//     const held = data.filter(t => t.status === 'Held in Escrow').reduce((sum, t) => sum + t.amount, 0);
//     const released = data.filter(t => t.status === 'Released' || t.status === 'Completed').reduce((sum, t) => sum + t.amount, 0);
//     const failed = data.filter(t => t.status === 'Failed').length;
//     setStats({ totalHeld: held, totalReleased: released, failedCount: failed });
//   };

//   const handleRelease = async (txnId) => {
//     if (!window.confirm("Confirm: Release this payment?")) return;
//     await releasePayment(txnId);
    
//     // Optimistic Update
//     const updatedData = transactions.map(txn => 
//       txn.id === txnId ? { ...txn, status: "Released" } : txn
//     );
//     setTransactions(updatedData);
//     calculateStats(updatedData);
//   };

//   const handleDownloadReport = async () => {
//     await generateFinancialReport();
//     alert("Financial Report downloaded.");
//   };

//   // --- NEW: Filtering Logic ---
//   const filteredTransactions = useMemo(() => {
//     return transactions.filter(txn => {
//       // 1. Search (ID, Client, or Worker)
//       const searchLower = searchQuery.toLowerCase();
//       const matchesSearch = 
//         txn.id.toLowerCase().includes(searchLower) ||
//         txn.client.toLowerCase().includes(searchLower) ||
//         txn.worker.toLowerCase().includes(searchLower);

//       // 2. Status Filter
//       const matchesStatus = statusFilter === 'All' || txn.status === statusFilter;

//       // 3. Type Filter
//       const matchesType = typeFilter === 'All' || txn.type === typeFilter;

//       return matchesSearch && matchesStatus && matchesType;
//     });
//   }, [transactions, searchQuery, statusFilter, typeFilter]);

//   return { 
//     transactions: filteredTransactions, // Return filtered list
//     stats, 
//     loading, 
//     handleRelease, 
//     handleDownloadReport,
//     // Export filter setters
//     searchQuery, setSearchQuery,
//     statusFilter, setStatusFilter,
//     typeFilter, setTypeFilter
//   };
// };

// export default usePayments;