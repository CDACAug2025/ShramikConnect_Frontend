import React from 'react';
import useUserManagement from '../hooks/useUserManagement';
import AdminUserTable from '../components/AdminUserTable.jsx';

const UsersPage = () => {
  const { 
    users, loading, error, 
    handleStatusChange, handleRoleChange,
    searchQuery, setSearchQuery,
    roleFilter, setRoleFilter,
    statusFilter, setStatusFilter
  } = useUserManagement();

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        
        <div className="mb-4">
          <h2 className="fw-bold text-dark mb-1">User Management</h2>
          <p className="text-muted">Manage user access, roles, and account security.</p>
        </div>

        {/* --- NEW: Search & Filter Toolbar --- */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-3">
            <div className="row g-3">
              {/* Search Bar */}
              <div className="col-md-4">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="🔍 Search by name or email..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Role Filter */}
              <div className="col-md-3">
                <select 
                  className="form-select"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="All">All Roles</option>
                  <option value="Worker">Worker</option>
                  <option value="Client">Client</option>
                  <option value="Organization">Organization</option>
                  <option value="Supervisor">Supervisor</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="col-md-3">
                <select 
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              {/* Reset Button (Optional but useful) */}
              <div className="col-md-2 d-grid">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => { setSearchQuery(''); setRoleFilter('All'); setStatusFilter('All'); }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <AdminUserTable 
          users={users} 
          onStatusChange={handleStatusChange} 
          onRoleChange={handleRoleChange} 
        />
      </div>
    </div>
  );
};

export default UsersPage;