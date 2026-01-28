import { useState, useEffect } from 'react';
import { fetchPlans, fetchSubscriptions, updatePlan, createPlan } from '../services/subscriptionApi';

const useSubscriptions = () => {
  const [plans, setPlans] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [plansData, subsData] = await Promise.all([fetchPlans(), fetchSubscriptions()]);
      setPlans(plansData);
      setSubscriptions(subsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- UPDATED: Generic Update Function ---
  const handleUpdatePlan = async (id, updates) => {
    // Optimistic Update
    setPlans(plans.map(p => p.id === id ? { ...p, ...updates } : p));
    await updatePlan(id, updates);
  };

  const handleCreatePlan = async (planData) => {
    const res = await createPlan(planData);
    setPlans([...plans, { ...planData, id: res.id, isActive: true }]);
  };

  return { plans, subscriptions, loading, handleUpdatePlan, handleCreatePlan };
};

export default useSubscriptions;