import React, { useState } from 'react';
import useUserManagement from '../hooks/useUserManagement'; 

const UsersPage = () => {
  const { users, loading, error, updateUserStatus } = useUserManagement();

  // Local State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // --- SAFE FILTER LOGIC ---
  const filteredUsers = (users || []).filter(user => {
    if (!user) return false;

    // Resolve Name Safely
    const displayName = user.name 
        || user.fullName 
        || (user.firstName ? `${user.firstName} ${user.lastName || ''}` : '') 
        || '';

    // ✅ FIX 1: Safely Extract Role Name for Filtering
    // If user.role is an object {roleId: 1, roleName: "ADMIN"}, get roleName. Otherwise use string.
    const userRoleStr = (typeof user.role === 'object' && user.role !== null) 
        ? (user.role.roleName || '') 
        : (user.role || '');

    const name = displayName.toLowerCase();
    const email = (user.email || '').toLowerCase();
    const search = searchTerm.toLowerCase();

    // Run checks
    const matchesSearch = name.includes(search) || email.includes(search);
    // Compare against the extracted role string
    const matchesRole = filterRole === 'ALL' || userRoleStr === filterRole;
    const matchesStatus = filterStatus === 'ALL' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="container">
        
        <div className="mb-4">
          <h2 className="fw-bold text-dark">User Management</h2>
          <p className="text-muted">Manage user access, roles, and account security.</p>
        </div>

        {/* --- FILTERS --- */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body d-flex gap-3 flex-wrap">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search by name or email..." 
              style={{ maxWidth: '300px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select className="form-select" style={{ maxWidth: '150px' }} value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
              <option value="ALL">All Roles</option>
              <option value="WORKER">Worker</option>
              <option value="CLIENT">Client</option>
              <option value="ADMIN">Admin</option>
            </select>
            <select className="form-select" style={{ maxWidth: '150px' }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="BLOCKED">Blocked</option>
            </select>
          </div>
        </div>

        {/* --- TABLE --- */}
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light text-secondary">
                <tr>
                  <th className="ps-4">USER</th>
                  <th>ROLE</th>
                  <th>STATUS</th>
                  <th className="text-end pe-4">CHANGE STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => {
                    const userId = user.id || user.userId || user._id;

                    // Smart Name Display
                    const finalName = user.name 
                        || user.fullName 
                        || (user.firstName ? `${user.firstName} ${user.lastName || ''}` : null) 
                        || 'Unknown User';

                    // ✅ FIX 2: Safely Extract Role Name for Display
                    // Check if 'user.role' is an object (from DB) or just a string
                    const roleDisplay = (typeof user.role === 'object' && user.role !== null) 
                        ? user.role.roleName 
                        : user.role;

                    return (
                      <tr key={userId || index}>
                        <td className="ps-4">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold me-3" style={{ width: '40px', height: '40px' }}>
                              {finalName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="fw-bold text-dark">{finalName}</div>
                              <small className="text-muted">{user.email || 'No Email'}</small>
                            </div>
                          </div>
                        </td>
                        
                        {/* ROLE COLUMN */}
                        <td>
                          <span className="fw-bold text-secondary text-uppercase" style={{ fontSize: '0.9rem' }}>
                            {roleDisplay || 'WORKER'}
                          </span>
                        </td>

                        {/* STATUS BADGE */}
                        <td>
                          <span className={`badge px-3 py-2 rounded-pill ${
                            user.status === 'ACTIVE' ? 'bg-success bg-opacity-10 text-success' : 
                            user.status === 'BLOCKED' ? 'bg-danger bg-opacity-10 text-danger' : 
                            'bg-warning bg-opacity-10 text-warning'
                          }`}>
                            {user.status || 'UNKNOWN'}
                          </span>
                        </td>

                        {/* CHANGE STATUS DROPDOWN */}
                        <td className="text-end pe-4">
                           <select
                              className={`form-select form-select-sm d-inline-block fw-bold ${
                                user.status === 'ACTIVE' ? 'border-success text-success' :
                                user.status === 'BLOCKED' ? 'border-danger text-danger' :
                                'border-warning text-warning'
                              }`}
                              style={{ width: '130px' }}
                              value={user.status || 'INACTIVE'}
                              onChange={(e) => {
                                if (userId) updateUserStatus(userId, e.target.value);
                              }}
                           >
                             <option value="ACTIVE">✅ Active</option>
                             <option value="INACTIVE">⚠️ Inactive</option>
                             <option value="BLOCKED">🚫 Block</option>
                           </select>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr><td colSpan="4" className="text-center py-5 text-muted">No users match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UsersPage;