import axiosInstance from '../../../services/axiosInstance';

// --- MOCK DATA ---
const MOCK_PLANS = [
  { id: 1, name: "Basic Worker", price: 0, interval: "Monthly", features: ["Job Search", "Basic Profile"], isActive: true },
  { id: 2, name: "Pro Worker", price: 199, interval: "Monthly", features: ["Priority Listing", "SMS Alerts", "Verified Badge"], isActive: true },
  { id: 3, name: "Enterprise Client", price: 4999, interval: "Yearly", features: ["Unlimited Postings", "Dedicated Support", "API Access"], isActive: false }, // Currently disabled
];

const MOCK_SUBSCRIPTIONS = [
  { id: "SUB-101", user: "Rohan Das", plan: "Pro Worker", startDate: "2026-01-01", status: "Active", nextBilling: "2026-02-01" },
  { id: "SUB-102", user: "BuildCorp", plan: "Enterprise Client", startDate: "2025-06-15", status: "Active", nextBilling: "2026-06-15" },
  { id: "SUB-103", user: "Amit Verma", plan: "Pro Worker", startDate: "2025-12-01", status: "Expired", nextBilling: "-" },
];

export const fetchPlans = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_PLANS), 500));
};

export const fetchSubscriptions = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_SUBSCRIPTIONS), 500));
};

export const updatePlan = async (id, updates) => {
  console.log(`API: Updating plan ${id}`, updates);
  return { success: true };
};

export const createPlan = async (newPlan) => {
  console.log("API: Creating new plan", newPlan);
  return { success: true, id: Date.now() };
};