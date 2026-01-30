import React, { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import useSettings from '../hooks/useSettings';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const { 
    profile, setProfile, handleProfileUpdate,
    system, handleSystemToggle,
    policies, updatePolicy, savePolicies,
    templates, updateTemplate, saveTemplates,
    loading 
  } = useSettings();

  if (loading) return <AdminLayout><div className="p-5 text-center">Loading Settings...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="w-100">
        <h2 className="fw-bold text-dark mb-4">Configuration Center</h2>

        <div className="row g-4">
          
          {/* LEFT SIDEBAR MENU */}
          <div className="col-md-3">
            <div className="card border-0 shadow-sm overflow-hidden">
              <div className="list-group list-group-flush">
                {[
                  { id: 'profile', icon: 'person-fill', label: 'Profile & Security' },
                  { id: 'policy', icon: 'file-earmark-text-fill', label: 'Policy & Rules' },
                  { id: 'notifications', icon: 'bell-fill', label: 'Notifications' },
                  { id: 'system', icon: 'gear-fill', label: 'System Toggles' }
                ].map(item => (
                  <button 
                    key={item.id}
                    className={`list-group-item list-group-item-action border-0 py-3 ${activeTab === item.id ? 'bg-primary text-white fw-bold' : 'text-secondary'}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <i className={`bi bi-${item.icon} me-2`}></i> {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="col-md-9">
            <div className="card border-0 shadow-sm p-4">
              
              {/* --- TAB 1: PROFILE --- */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileUpdate}>
                  <h5 className="fw-bold text-secondary mb-4">Admin Profile</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary">Name</label>
                      <input type="text" className="form-control" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary">Email</label>
                      <input type="email" className="form-control bg-light" value={profile.email} disabled />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary">Phone</label>
                      <input type="text" className="form-control" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
                    </div>
                  </div>
                  <button className="btn btn-primary px-4 fw-bold">Save Profile</button>
                  
                  <hr className="my-5 text-muted" />
                  
                  <h5 className="fw-bold text-secondary mb-4">Change Password</h5>
                  <div className="row g-3 align-items-end">
                    <div className="col-md-4"><input type="password" className="form-control" placeholder="Current Password" /></div>
                    <div className="col-md-4"><input type="password" className="form-control" placeholder="New Password" /></div>
                    <div className="col-md-4"><button type="button" className="btn btn-danger w-100 fw-bold">Update</button></div>
                  </div>
                </form>
              )}

              {/* --- TAB 2: POLICY (Now Functional) --- */}
              {activeTab === 'policy' && (
                <div>
                  <h5 className="fw-bold text-secondary mb-4">Platform Rules</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Dispute Resolution (Hours)</label>
                      <input type="number" className="form-control" value={policies.disputeTimeout} onChange={(e) => updatePolicy('disputeTimeout', e.target.value)} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Platform Commission (%)</label>
                      <div className="input-group">
                        <input type="number" className="form-control" value={policies.commissionRate} onChange={(e) => updatePolicy('commissionRate', e.target.value)} />
                        <span className="input-group-text">%</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Max Active Jobs (Per Worker)</label>
                      <input type="number" className="form-control" value={policies.maxJobsPerWorker} onChange={(e) => updatePolicy('maxJobsPerWorker', e.target.value)} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Refund Policy Mode</label>
                      <select className="form-select" value={policies.refundPolicy} onChange={(e) => updatePolicy('refundPolicy', e.target.value)}>
                        <option>Standard (Admin Review)</option>
                        <option>Automatic (Under ₹500)</option>
                        <option>Strict (No Refunds)</option>
                      </select>
                    </div>
                  </div>
                  <button onClick={savePolicies} className="btn btn-success px-4 fw-bold">Update Policies</button>
                </div>
              )}

              {/* --- TAB 3: NOTIFICATIONS (Now Functional) --- */}
              {activeTab === 'notifications' && (
                <div>
                  <h5 className="fw-bold text-secondary mb-4">Email Templates</h5>
                  
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-primary">Welcome Email</label>
                    <textarea 
                      className="form-control" rows="3" 
                      value={templates.welcomeEmail}
                      onChange={(e) => updateTemplate('welcomeEmail', e.target.value)}
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold text-primary">New Job Alert</label>
                    <textarea 
                      className="form-control" rows="3" 
                      value={templates.jobAlert}
                      onChange={(e) => updateTemplate('jobAlert', e.target.value)}
                    ></textarea>
                  </div>

                  <button onClick={saveTemplates} className="btn btn-primary px-4 fw-bold">Save Templates</button>
                </div>
              )}

               {/* --- TAB 4: SYSTEM TOGGLES (Now Functional) --- */}
               {activeTab === 'system' && (
                <div>
                  <h5 className="fw-bold text-secondary mb-4">System Controls</h5>
                  <div className="list-group">
                    {/* Toggle Item Helper */}
                    {[
                      { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'If active, only Admins can log in.' },
                      { key: 'allowNewRegistrations', label: 'Allow New Registrations', desc: 'Pause new sign-ups during high load.' },
                      { key: 'enableEscrow', label: 'Enable Escrow Payments', desc: 'Secure payments between workers and clients.' },
                      { key: 'emailNotifications', label: 'Send Email Notifications', desc: 'Global switch for outgoing emails.' }
                    ].map(toggle => (
                      <div key={toggle.key} className="list-group-item d-flex justify-content-between align-items-center py-3">
                        <div>
                          <h6 className="mb-0 fw-bold">{toggle.label}</h6>
                          <small className="text-muted">{toggle.desc}</small>
                        </div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input fs-4" type="checkbox" 
                            checked={system[toggle.key]}
                            onChange={() => handleSystemToggle(toggle.key)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="alert alert-warning mt-4 small border-0 bg-warning bg-opacity-10 text-dark">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Changes to system controls take effect immediately.
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;