// import React, { useState } from 'react';
// import useSettings from '../hooks/useSettings';

// const SettingsPage = () => {
//   const { 
//     profile, setProfile, system, policies, setPolicies, templates, loading,
//     handleProfileUpdate, handleSystemToggle, handlePasswordChange,
//     handlePolicyUpdate, handleTemplateSave, handleBroadcast
//   } = useSettings();

//   const [activeTab, setActiveTab] = useState('profile');
//   const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
//   const [broadcastMsg, setBroadcastMsg] = useState("");

//   if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

//   return (
//     <div className="container-fluid bg-light min-vh-100 py-5">
//       <div className="container">
//         <h2 className="fw-bold text-dark mb-4">Configuration Center</h2>

//         <div className="row">
//           {/* Sidebar Navigation */}
//           <div className="col-md-3 mb-4">
//             <div className="list-group shadow-sm">
//               <button className={`list-group-item list-group-item-action ${activeTab === 'profile' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('profile')}>👤 Profile & Security</button>
//               <button className={`list-group-item list-group-item-action ${activeTab === 'policies' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('policies')}>📜 Policy & Rules</button>
//               <button className={`list-group-item list-group-item-action ${activeTab === 'notifications' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('notifications')}>🔔 Notifications</button>
//               <button className={`list-group-item list-group-item-action ${activeTab === 'system' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('system')}>⚙️ System Toggles</button>
//             </div>
//           </div>

//           {/* Content Area */}
//           <div className="col-md-9">
//             <div className="card border-0 shadow-sm p-4">
              
//               {/* --- 1. PROFILE & SECURITY --- */}
//               {activeTab === 'profile' && (
//                 <div>
//                   <h5 className="fw-bold mb-3 text-secondary">Admin Profile</h5>
//                   <form onSubmit={handleProfileUpdate} className="mb-5 border-bottom pb-4">
//                     <div className="row g-3">
//                       <div className="col-md-6">
//                         <label className="form-label">Name</label>
//                         <input type="text" className="form-control" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
//                       </div>
//                       <div className="col-md-6">
//                         <label className="form-label">Email</label>
//                         <input type="text" className="form-control" value={profile.email} disabled />
//                       </div>
//                     </div>
//                     <button className="btn btn-primary mt-3">Save Profile</button>
//                   </form>

//                   <h5 className="fw-bold mb-3 text-secondary">Change Password</h5>
//                   <form onSubmit={(e) => { e.preventDefault(); handlePasswordChange(passwords); }}>
//                     <div className="row g-3">
//                       <div className="col-md-4"><input type="password" placeholder="Current" className="form-control" onChange={e => setPasswords({...passwords, current: e.target.value})} /></div>
//                       <div className="col-md-4"><input type="password" placeholder="New" className="form-control" onChange={e => setPasswords({...passwords, new: e.target.value})} /></div>
//                       <div className="col-md-4"><button className="btn btn-danger w-100">Update</button></div>
//                     </div>
//                   </form>
//                 </div>
//               )}

//               {/* --- 2. POLICIES --- */}
//               {activeTab === 'policies' && (
//                 <form onSubmit={handlePolicyUpdate}>
//                   <h5 className="fw-bold mb-3 text-secondary">Dispute Resolution Rules</h5>
//                   <textarea 
//                     className="form-control mb-4" rows="4" 
//                     value={policies.disputeRules}
//                     onChange={(e) => setPolicies({...policies, disputeRules: e.target.value})}
//                   ></textarea>

//                   <h5 className="fw-bold mb-3 text-secondary">Job Posting Limits (Per Month)</h5>
//                   <div className="row g-3 mb-4">
//                     <div className="col-md-4">
//                       <label className="form-label text-muted small fw-bold">Client Limit</label>
//                       <input type="number" className="form-control" value={policies.jobLimits.client} 
//                         onChange={e => setPolicies({...policies, jobLimits: {...policies.jobLimits, client: e.target.value}})} />
//                     </div>
//                     <div className="col-md-4">
//                       <label className="form-label text-muted small fw-bold">Org Limit</label>
//                       <input type="number" className="form-control" value={policies.jobLimits.organization} 
//                         onChange={e => setPolicies({...policies, jobLimits: {...policies.jobLimits, organization: e.target.value}})} />
//                     </div>
//                   </div>
//                   <button className="btn btn-success fw-bold">Save Policies</button>
//                 </form>
//               )}

//               {/* --- 3. NOTIFICATIONS --- */}
//               {activeTab === 'notifications' && (
//                 <div>
//                   <h5 className="fw-bold mb-3 text-secondary">System Broadcast</h5>
//                   <div className="input-group mb-5">
//                     <input type="text" className="form-control" placeholder="Type announcement for all users..." 
//                       value={broadcastMsg} onChange={e => setBroadcastMsg(e.target.value)} />
//                     <button className="btn btn-warning fw-bold" onClick={() => handleBroadcast(broadcastMsg)}>📢 Broadcast</button>
//                   </div>

//                   <h5 className="fw-bold mb-3 text-secondary">Message Templates</h5>
//                   {templates.map(t => (
//                     <div key={t.id} className="mb-3 border rounded p-3 bg-light">
//                       <h6 className="fw-bold text-dark">{t.type}</h6>
//                       <textarea className="form-control mb-2" rows="2" 
//                         defaultValue={t.content} 
//                         onBlur={(e) => handleTemplateSave(t.id, e.target.value)} 
//                       />
//                       <small className="text-muted">Click outside to save automatically.</small>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* --- 4. SYSTEM CONFIG --- */}
//               {activeTab === 'system' && (
//                 <div>
//                   <h5 className="fw-bold mb-3 text-secondary">Feature Toggles</h5>
//                   {Object.keys(system).map(key => (
//                     <div key={key} className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
//                       <span className="text-capitalize fw-bold">{key.replace(/([A-Z])/g, ' $1')}</span>
//                       <div className="form-check form-switch">
//                         <input className="form-check-input" type="checkbox" style={{ transform: 'scale(1.4)', cursor: 'pointer' }}
//                           checked={system[key]} onChange={() => handleSystemToggle(key)} />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;