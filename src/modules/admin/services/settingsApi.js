import axiosInstance from '../../../services/axiosInstance';

// --- EXPANDED MOCK DATA ---
const MOCK_SETTINGS = {
  profile: { name: "Admin User", email: "admin@shramik.com", phone: "+91 9876543210" },
  system: { maintenanceMode: false, emailNotifications: true, smsAlerts: true, paymentGateway: true },
  
  // New: Policies
  policies: {
    disputeRules: "1. All disputes must be raised within 7 days.\n2. Evidence is mandatory.",
    jobLimits: { client: 50, worker: 0, organization: 100 }
  },

  // New: Templates
  templates: [
    { id: 1, type: "Welcome Email", content: "Welcome to Shramik Connect! We are glad to have you." },
    { id: 2, type: "Payment Success", content: "Your payment of ₹{amount} was successful." },
    { id: 3, type: "Job Alert", content: "New job posted: {job_title} in your area." }
  ]
};

export const fetchSettings = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_SETTINGS), 500));
};

export const updatePolicies = async (policyData) => {
  console.log("API: Updating Policies", policyData);
  return { success: true };
};

export const updateTemplate = async (id, content) => {
  console.log(`API: Updating Template ${id}`, content);
  return { success: true };
};

export const sendBroadcast = async (message) => {
  console.log("API: Sending Broadcast", message);
  return { success: true };
};

// ... (Keep existing updateProfile, changePassword, updateSystemSettings) ...
export const updateProfile = async (data) => { return { success: true }; };
export const changePassword = async (data) => { return { success: true }; };
export const updateSystemSettings = async (data) => { return { success: true }; };