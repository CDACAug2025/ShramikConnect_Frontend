import React, { useState } from 'react';
import useSubscriptions from '../hooks/useSubscriptions';
import PlanCard from '../components/PlanCard';
import SubscriptionTable from '../components/SubscriptionTable';

const SubscriptionsPage = () => {
  const { plans, subscriptions, loading, handleUpdatePrice, handleToggleStatus, handleCreatePlan } = useSubscriptions();
  
  // Quick "Add Plan" local state
  const [newPlanName, setNewPlanName] = useState("");

  const onAddPlan = (e) => {
    e.preventDefault();
    if(!newPlanName) return;
    handleCreatePlan({ name: newPlanName, price: 99, interval: 'Monthly', features: ['New Feature'] });
    setNewPlanName("");
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">Subscription Management</h2>
            <p className="text-muted mb-0">Manage premium plans and revenue.</p>
          </div>
        </div>

        {/* Plans Grid */}
        <h5 className="fw-bold text-secondary mb-3">Premium Plans</h5>
        <div className="row g-4 mb-5">
          {plans.map((plan) => (
            <div className="col-md-4" key={plan.id}>
              <PlanCard 
                plan={plan} 
                onUpdatePrice={handleUpdatePrice} 
                onToggleStatus={handleToggleStatus} 
              />
            </div>
          ))}
          
          {/* Simple "Create Plan" Card */}
          <div className="col-md-4">
            <div className="card h-100 border-2 border-dashed border-secondary bg-transparent d-flex justify-content-center align-items-center p-4">
              <form onSubmit={onAddPlan} className="w-100 text-center">
                <h6 className="text-muted mb-3">Create New Plan</h6>
                <input 
                  type="text" 
                  className="form-control form-control-sm mb-2" 
                  placeholder="Plan Name (e.g. Gold)"
                  value={newPlanName}
                  onChange={e => setNewPlanName(e.target.value)}
                />
                <button type="submit" className="btn btn-sm btn-outline-primary w-100">
                  + Add Plan
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Active Subscriptions List */}
        <h5 className="fw-bold text-secondary mb-3">Active Subscriptions</h5>
        <SubscriptionTable subscriptions={subscriptions} />

      </div>
    </div>
  );
};

export default SubscriptionsPage;