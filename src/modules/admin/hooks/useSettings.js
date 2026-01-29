import { useState, useEffect } from 'react';
<<<<<<< HEAD
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
=======
import AdminService from '../../../services/AdminService';

const useSettings = () => {
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [system, setSystem] = useState({});
    const [policies, setPolicies] = useState({ disputeRules: '', jobLimits: {} });
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            const res = await AdminService.getSettings();
            // Assuming backend returns: { profile: {}, system: {}, policies: {}, templates: [] }
            setProfile(res.data.profile || {});
            setSystem(res.data.system || {});
            setPolicies(res.data.policies || { jobLimits: {} });
            setTemplates(res.data.templates || []);
        } catch (err) { console.error(err); } 
        finally { setLoading(false); }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try { await AdminService.updateProfile(profile); alert("Profile Saved"); } catch(e) { alert("Error"); }
    };

    const handleSystemToggle = async (key) => {
        const newSystem = { ...system, [key]: !system[key] };
        setSystem(newSystem);
        try { await AdminService.updateSystemSettings(newSystem); } catch(e) { alert("Error"); }
    };

    const handlePolicyUpdate = async (e) => {
        e.preventDefault();
        try { await AdminService.updatePolicies(policies); alert("Policies Saved"); } catch(e) { alert("Error"); }
    };

    const handleBroadcast = async (msg) => {
        if(!msg) return;
        try { await AdminService.sendBroadcast(msg); alert("Broadcast Sent"); } catch(e) { alert("Error"); }
    };

    // Placeholder for password/templates as logic is similar
    const handlePasswordChange = () => {}; 
    const handleTemplateSave = () => {};

    return { 
        profile, setProfile, system, policies, setPolicies, templates, loading,
        handleProfileUpdate, handleSystemToggle, handlePolicyUpdate, handleBroadcast,
        handlePasswordChange, handleTemplateSave
    };
>>>>>>> main
};

export default useSettings;