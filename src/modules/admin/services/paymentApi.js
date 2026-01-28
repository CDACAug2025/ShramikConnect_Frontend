import axiosInstance from '../../../services/axiosInstance';

// --- UPDATED MOCK TRANSACTIONS ---
const MOCK_TRANSACTIONS = [
  { id: "TXN-7801", client: "Amit Verma", worker: "Rohan Das", amount: 5000, type: "Escrow Deposit", date: "2026-01-20", status: "Held in Escrow" },
  { id: "TXN-7802", client: "BuildCorp", worker: "System", amount: 4999, type: "Subscription", date: "2026-01-18", status: "Completed" },
  { id: "TXN-7803", client: "City Infra", worker: "Manoj K", amount: 2000, type: "Advance", date: "2026-01-22", status: "Failed" },
  { id: "TXN-7804", client: "Rohan Das", worker: "System", amount: 450, type: "Store Order", date: "2026-01-23", status: "Completed" },
  { id: "TXN-7805", client: "TechSpace", worker: "Anil J", amount: 8000, type: "Milestone Release", date: "2026-01-23", status: "Released" },
  { id: "TXN-7806", client: "Amit Verma", worker: "Rohan Das", amount: 1000, type: "Refund", date: "2026-01-24", status: "Refunded" },
];

export const fetchTransactions = async () => {
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