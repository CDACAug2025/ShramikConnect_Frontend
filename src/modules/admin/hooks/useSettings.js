import { useState, useEffect } from 'react';
import { fetchSettings, updateProfile, updateSystemSettings, changePassword } from '../services/settingsApi';

const useSettings = () => {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
  const [system, setSystem] = useState({ maintenanceMode: false, emailNotifications: true, smsAlerts: true });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchSettings();
      setProfile(data.profile);
      setSystem(data.system);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    await updateProfile(profile);
    alert("Profile updated successfully!");
  };

  const handleSystemToggle = async (key) => {
    const newSystem = { ...system, [key]: !system[key] };
    setSystem(newSystem);
    await updateSystemSettings(newSystem);
  };

  const handlePasswordChange = async (passwords) => {
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }
    await changePassword(passwords);
    alert("Password changed successfully!");
  };

  return { profile, setProfile, system, loading, handleProfileUpdate, handleSystemToggle, handlePasswordChange };
};

export default useSettings;