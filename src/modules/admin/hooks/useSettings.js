import { useState, useEffect } from 'react';
import { 
  fetchSettings, updateProfile, updateSystemSettings, changePassword,
  updatePolicies, updateTemplate, sendBroadcast
} from '../services/settingsApi';

const useSettings = () => {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
  const [system, setSystem] = useState({});
  const [policies, setPolicies] = useState({ disputeRules: '', jobLimits: {} });
  const [templates, setTemplates] = useState([]);
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
      setPolicies(data.policies);
      setTemplates(data.templates);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers ---
  const handleSystemToggle = async (key) => {
    const newSystem = { ...system, [key]: !system[key] };
    setSystem(newSystem);
    await updateSystemSettings(newSystem);
  };

  const handlePolicyUpdate = async (e) => {
    e.preventDefault();
    await updatePolicies(policies);
    alert("Policies updated successfully.");
  };

  const handleTemplateSave = async (id, newContent) => {
    await updateTemplate(id, newContent);
    setTemplates(templates.map(t => t.id === id ? { ...t, content: newContent } : t));
    alert("Template saved.");
  };

  const handleBroadcast = async (message) => {
    if(!message.trim()) return;
    if(window.confirm("Send this message to ALL users?")) {
      await sendBroadcast(message);
      alert("Broadcast sent successfully!");
    }
  };

  // Keep existing handlers
  const handleProfileUpdate = async (e) => { e.preventDefault(); await updateProfile(profile); alert("Saved"); };
  const handlePasswordChange = async (pw) => { await changePassword(pw); alert("Password Changed"); };

  return { 
    profile, setProfile, system, policies, setPolicies, templates, loading,
    handleProfileUpdate, handleSystemToggle, handlePasswordChange,
    handlePolicyUpdate, handleTemplateSave, handleBroadcast
  };
};

export default useSettings;