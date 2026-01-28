import { useState, useEffect } from 'react';
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
};

export default useSettings;