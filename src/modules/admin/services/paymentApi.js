import axiosInstance from '../../../services/axiosInstance';

// --- MOCK DATA ---
const MOCK_TRANSACTIONS = [
  { id: "TXN-7801", client: "Amit Verma", worker: "Rohan Das", amount: 5000, type: "Escrow Deposit", date: "2026-01-20", status: "Held in Escrow" },
  { id: "TXN-7802", client: "BuildCorp", worker: "Suresh R", amount: 12500, type: "Milestone Release", date: "2026-01-18", status: "Released" },
  { id: "TXN-7803", client: "City Infra", worker: "Manoj K", amount: 2000, type: "Advance", date: "2026-01-22", status: "Failed" },
  { id: "TXN-7804", client: "Amit Verma", worker: "Rohan Das", amount: 1000, type: "Refund", date: "2026-01-23", status: "Refunded" },
  { id: "TXN-7805", client: "TechSpace", worker: "Anil J", amount: 8000, type: "Escrow Deposit", date: "2026-01-23", status: "Held in Escrow" },
];

export const fetchTransactions = async () => {
  // Simulate network delay
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_TRANSACTIONS), 500));
};

export const releasePayment = async (txnId) => {
  console.log(`API: Releasing payment for ${txnId}`);
  return { success: true };
};

export const generateFinancialReport = async () => {
  console.log("API: Generating PDF/CSV Report...");
  return { success: true, url: "/dummy-report.pdf" };
};