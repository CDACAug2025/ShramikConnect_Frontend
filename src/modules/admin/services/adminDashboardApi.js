import axiosInstance from '../../../services/axiosInstance';

// --- MOCK DATA ---
const MOCK_MONITORING_STATS = {
  activeUsers: 142,
  activeJobs: 35,
  totalTransactions: 1250,
  serverStatus: "Healthy"
};

const MOCK_SYSTEM_LOGS = [
  { id: 101, level: "Error", message: "Payment Gateway Timeout", module: "Payments", timestamp: "2026-01-22 10:30 AM" },
  { id: 102, level: "Warning", message: "High Memory Usage (85%)", module: "Server", timestamp: "2026-01-22 11:15 AM" },
  { id: 103, level: "Info", message: "New Supervisor Registered", module: "Auth", timestamp: "2026-01-22 12:00 PM" },
  { id: 104, level: "Error", message: "SMS API Failed", module: "Notifications", timestamp: "2026-01-22 01:45 PM" },
];

export const fetchMonitoringStats = async () => {
  // Simulate API delay
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_MONITORING_STATS), 500));
};

export const fetchSystemLogs = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_SYSTEM_LOGS), 500));
};