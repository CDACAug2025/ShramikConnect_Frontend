import React, { useState } from 'react';
import useSubscriptions from '../hooks/useSubscriptions';
import PlanCard from '../components/PlanCard';
import SubscriptionTable from '../components/SubscriptionTable';

const SubscriptionsPage = () => {
  const { plans, subscriptions, loading, handleUpdatePlan, handleCreatePlan } = useSubscriptions();
  
  // New Plan State
  const [newPlan, setNewPlan] = useState({ name: '', price: '', interval: 'Monthly', features: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!newPlan.name || !newPlan.price) return;

    // Convert comma-separated string to array
    const featureArray = newPlan.features.split(',').map(f => f.trim()).filter(f => f !== "");
    
    handleCreatePlan({ 
      ...newPlan, 
      price: Number(newPlan.price), 
      features: featureArray 
    });
    
    setNewPlan({ name: '', price: '', interval: 'Monthly', features: '' }); // Reset
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        
        <div className="mb-4">
          <h2 className="fw-bold text-dark mb-1">Subscription Management</h2>
          <p className="text-muted">Create plans, define features, and manage validity.</p>
        </div>

        {/* --- CREATE PLAN FORM --- */}
        <div className="card shadow-sm border-0 mb-5">
          <div className="card-header bg-white fw-bold text-primary pt-3">+ Create New Subscription Plan</div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label small fw-bold">Plan Name</label>
                  <input 
                    type="text" className="form-control" placeholder="e.g. Gold Tier"
                    value={newPlan.name} onChange={e => setNewPlan({...newPlan, name: e.target.value})} required 
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label small fw-bold">Price (₹)</label>
                  <input 
                    type="number" className="form-control" placeholder="199"
                    value={newPlan.price} onChange={e => setNewPlan({...newPlan, price: e.target.value})} required 
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label small fw-bold">Validity</label>
                  <select 
                    className="form-select"
                    value={newPlan.interval} onChange={e => setNewPlan({...newPlan, interval: e.target.value})}
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
                <div className="col-md-5">
                  <label className="form-label small fw-bold">Features (comma separated)</label>
                  <input 
                    type="text" className="form-control" placeholder="Priority Support, No Ads, Badge..."
                    value={newPlan.features} onChange={e => setNewPlan({...newPlan, features: e.target.value})} 
                  />
                </div>
                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-primary fw-bold px-4">Create Plan</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* --- EXISTING PLANS --- */}
        <div className="row g-4 mb-5">
          {plans.map((plan) => (
            <div className="col-md-4" key={plan.id}>
              <PlanCard plan={plan} onUpdate={handleUpdatePlan} />
            </div>
          ))}
        </div>

        {/* --- SUBSCRIBERS TABLE --- */}
        <h5 className="fw-bold text-secondary mb-3">Active Subscribers</h5>
        <SubscriptionTable subscriptions={subscriptions} />

      </div>
    </div>
  );
};

export default SubscriptionsPage;