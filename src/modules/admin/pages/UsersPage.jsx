import React, { useState } from 'react';
import useUserManagement from '../hooks/useUserManagement'; // Import the Hook

const UsersPage = () => {
  // Use the Hook to get REAL data from Spring Boot
  const { users, loading, error, updateUserStatus, updateUserRole } = useUserManagement();

  // Local state for filtering (Search/Role)
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Filter Logic (Runs on the Frontend for speed)
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'ALL' || user.role === filterRole;
    const matchesStatus = filterStatus === 'ALL' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="container">
        
        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold text-dark">User Management</h2>
          <p className="text-muted">Manage user access, roles, and account security.</p>
        </div>

        {/* Search & Filter Bar */}
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
              <option value="BLOCKED">Blocked</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light text-secondary">
                <tr>
                  <th className="ps-4">USER</th>
                  <th>ROLE</th>
                  <th>STATUS</th>
                  <th className="text-end pe-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <tr key={user.id}>
                      {/* Name & Email */}
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold me-3" style={{ width: '40px', height: '40px' }}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-bold text-dark">{user.name}</div>
                            <small className="text-muted">{user.email}</small>
                          </div>
                        </div>
                      </td>

                      {/* Role Dropdown */}
                      <td>
                        <select 
                          className="form-select form-select-sm border-0 bg-light" 
                          style={{ width: '120px' }}
                          value={user.role}
                          onChange={(e) => updateUserRole(user.id, e.target.value)}
                        >
                          <option value="WORKER">Worker</option>
                          <option value="CLIENT">Client</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      </td>

                      {/* Status Badge */}
                      <td>
                        <span className={`badge px-3 py-2 rounded-pill ${
                          user.status === 'ACTIVE' ? 'bg-success bg-opacity-10 text-success' : 
                          user.status === 'BLOCKED' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-secondary'
                        }`}>
                          {user.status}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="text-end pe-4">
                        {user.status === 'BLOCKED' ? (
                          <button 
                            className="btn btn-sm btn-success fw-bold px-3"
                            onClick={() => updateUserStatus(user.id, 'ACTIVE')}
                          >
                            Activate
                          </button>
                        ) : (
                          <button 
                            className="btn btn-sm btn-outline-danger fw-bold px-3"
                            onClick={() => updateUserStatus(user.id, 'BLOCKED')}
                          >
                            Block
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-5 text-muted">No users found.</td>
                  </tr>
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