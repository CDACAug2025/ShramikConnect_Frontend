import { useState, useEffect } from 'react';

const useSettings = () => {
  // 1. Profile State
  const [profile, setProfile] = useState({ 
    name: 'Admin User', 
    email: 'admin@shramik.com', 
    phone: '9876543210' 
  });

  // 2. System Toggles (Real requirements)
  const [system, setSystem] = useState({ 
    maintenanceMode: false, 
    emailNotifications: true,
    allowNewRegistrations: true,
    enableEscrow: true 
  });

  // 3. Policy Rules (Real requirements)
  const [policies, setPolicies] = useState({ 
    disputeTimeout: 48, // hours
    maxJobsPerWorker: 5,
    commissionRate: 10, // %
    refundPolicy: 'Standard' 
  });

  // 4. Notification Templates
  const [templates, setTemplates] = useState({
    welcomeEmail: "Welcome to ShramikConnect! We are glad to have you.",
    jobAlert: "New Job Alert: A job matching your skills is available."
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  // --- HANDLERS ---

  // Handle Profile Inputs
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert("✅ Profile Updated Successfully (Mock)");
  };

  // Handle System Switches
  const handleSystemToggle = (key) => {
    setSystem(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle Policy Inputs
  const updatePolicy = (key, value) => {
    setPolicies(prev => ({ ...prev, [key]: value }));
  };

  const savePolicies = () => {
    alert(`✅ Policies Saved:\nCommission: ${policies.commissionRate}%\nDispute Time: ${policies.disputeTimeout}h`);
  };

  // Handle Template Inputs
  const updateTemplate = (key, value) => {
    setTemplates(prev => ({ ...prev, [key]: value }));
  };

  const saveTemplates = () => {
    alert("✅ Notification Templates Saved!");
  };

  return { 
    profile, setProfile, handleProfileUpdate,
    system, handleSystemToggle,
    policies, updatePolicy, savePolicies,
    templates, updateTemplate, saveTemplates,
    loading
  };
};

export default useSettings;