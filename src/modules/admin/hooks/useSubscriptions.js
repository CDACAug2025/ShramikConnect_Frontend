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

  const handleUpdatePrice = async (id, newPrice) => {
    await updatePlan(id, { price: newPrice });
    setPlans(plans.map(p => p.id === id ? { ...p, price: newPrice } : p));
  };

  const handleToggleStatus = async (id) => {
    // Find current status and toggle it
    const plan = plans.find(p => p.id === id);
    const newStatus = !plan.isActive;
    
    await updatePlan(id, { isActive: newStatus });
    setPlans(plans.map(p => p.id === id ? { ...p, isActive: newStatus } : p));
  };

  const handleCreatePlan = async (planData) => {
    const res = await createPlan(planData);
    setPlans([...plans, { ...planData, id: res.id, isActive: true }]);
  };

  return { plans, subscriptions, loading, handleUpdatePrice, handleToggleStatus, handleCreatePlan };
};

export default useSubscriptions;