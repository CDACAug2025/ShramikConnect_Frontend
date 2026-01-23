import React, { useState } from 'react';
import useSettings from '../hooks/useSettings';

const SettingsPage = () => {
  const { profile, setProfile, system, loading, handleProfileUpdate, handleSystemToggle, handlePasswordChange } = useSettings();
  const [activeTab, setActiveTab] = useState('profile');
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        <h2 className="fw-bold text-dark mb-4">Settings & Configurations</h2>

        <div className="row">
          {/* Sidebar Tabs */}
          <div className="col-md-3 mb-4">
            <div className="list-group shadow-sm">
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'profile' ? 'active fw-bold' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                👤 Profile Settings
              </button>
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'security' ? 'active fw-bold' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                🔒 Security
              </button>
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'system' ? 'active fw-bold' : ''}`}
                onClick={() => setActiveTab('system')}
              >
                ⚙️ System Config
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="col-md-9">
            <div className="card border-0 shadow-sm p-4">
              
              {/* --- Profile Tab --- */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileUpdate}>
                  <h5 className="fw-bold mb-3 text-secondary">Admin Profile</h5>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" value={profile.email} disabled />
                    <div className="form-text">Email cannot be changed.</div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
                  </div>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
              )}

              {/* --- Security Tab --- */}
              {activeTab === 'security' && (
                <form onSubmit={(e) => { e.preventDefault(); handlePasswordChange(passwords); }}>
                  <h5 className="fw-bold mb-3 text-secondary">Change Password</h5>
                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input type="password" className="form-control" required 
                      onChange={(e) => setPasswords({...passwords, current: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input type="password" className="form-control" required 
                      onChange={(e) => setPasswords({...passwords, new: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" className="form-control" required 
                      onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} />
                  </div>
                  <button type="submit" className="btn btn-danger">Update Password</button>
                </form>
              )}

              {/* --- System Tab --- */}
              {activeTab === 'system' && (
                <div>
                  <h5 className="fw-bold mb-3 text-secondary">System Configurations</h5>
                  
                  <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                    <div>
                      <h6 className="fw-bold mb-0">Maintenance Mode</h6>
                      <small className="text-muted">Disable access for all non-admin users.</small>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" style={{ transform: 'scale(1.4)' }}
                        checked={system.maintenanceMode} onChange={() => handleSystemToggle('maintenanceMode')} />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                    <div>
                      <h6 className="fw-bold mb-0">Email Notifications</h6>
                      <small className="text-muted">Receive emails for new job postings.</small>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" style={{ transform: 'scale(1.4)' }}
                        checked={system.emailNotifications} onChange={() => handleSystemToggle('emailNotifications')} />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h6 className="fw-bold mb-0">SMS Alerts</h6>
                      <small className="text-muted">Receive SMS for critical system errors.</small>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" style={{ transform: 'scale(1.4)' }}
                        checked={system.smsAlerts} onChange={() => handleSystemToggle('smsAlerts')} />
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;