// --- MOCK DATA ---
const MOCK_SETTINGS = {
  profile: { name: "Admin User", email: "admin@shramik.com", phone: "+91 9876543210" },
  system: { maintenanceMode: false, emailNotifications: true, smsAlerts: true },
};

export const fetchSettings = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_SETTINGS), 500));
};

export const updateProfile = async (profileData) => {
  console.log("API: Updating Profile", profileData);
  return { success: true };
};

export const updateSystemSettings = async (settingsData) => {
  console.log("API: Updating System Settings", settingsData);
  return { success: true };
};

export const changePassword = async (passwordData) => {
  console.log("API: Changing Password", passwordData);
  return { success: true };
};