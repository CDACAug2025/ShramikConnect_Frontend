import React, { useState } from 'react';

const PlanCard = ({ plan, onUpdatePrice, onToggleStatus }) => {
  const [price, setPrice] = useState(plan.price);
  const [isEditing, setIsEditing] = useState(false);

  const savePrice = () => {
    onUpdatePrice(plan.id, Number(price));
    setIsEditing(false);
  };

  return (
    <div className={`card shadow-sm h-100 border-0 ${!plan.isActive ? 'bg-light opacity-75' : ''}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="fw-bold text-dark mb-0">{plan.name}</h5>
          {/* Enable/Disable Switch */}
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              checked={plan.isActive}
              onChange={() => onToggleStatus(plan.id)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-3">
          <label className="text-muted small text-uppercase fw-bold">Price (₹)</label>
          <div className="d-flex align-items-center mt-1">
            {isEditing ? (
              <>
                <input 
                  type="number" 
                  className="form-control form-control-sm me-2" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ width: '80px' }}
                />
                <button onClick={savePrice} className="btn btn-sm btn-success py-0">✓</button>
              </>
            ) : (
              <>
                <h3 className="mb-0 text-primary me-2">₹{plan.price}</h3>
                <button onClick={() => setIsEditing(true)} className="btn btn-link btn-sm p-0 text-muted">
                  ✏️
                </button>
              </>
            )}
            <span className="text-muted small ms-2">/ {plan.interval}</span>
          </div>
        </div>

        {/* Features List */}
        <ul className="list-unstyled mb-0 small text-secondary">
          {plan.features.map((feat, idx) => (
            <li key={idx} className="mb-1">
              <span className="me-2 text-success">●</span>{feat}
            </li>
          ))}
        </ul>
        
        {!plan.isActive && <div className="mt-3 badge bg-secondary">Disabled</div>}
      </div>
    </div>
  );
};

export default PlanCard;