import React from 'react';
import useUserManagement from '../hooks/useUserManagement';


import AdminUserTable from '../components/AdminUserTable.jsx'; 

const UsersPage = () => {
  const { users, loading, error, handleStatusChange, handleRoleChange } = useUserManagement();

  // Loading Spinner
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Error Alert
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger shadow-sm" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        
        {/* Page Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">User Management</h2>
            <p className="text-muted mb-0">Manage roles, permissions, and account status.</p>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="row g-4 mb-4">
          {/* Total Users Card */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted text-uppercase small fw-bold mb-2">Total Users</h6>
                <div className="d-flex align-items-center">
                  <h3 className="mb-0 fw-bold text-primary">{users.length}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Active Users Card */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted text-uppercase small fw-bold mb-2">Active Accounts</h6>
                <div className="d-flex align-items-center">
                  <h3 className="mb-0 fw-bold text-success">
                    {users.filter(u => u.status === 'Active').length}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section - Passing data to the Bootstrap Table */}
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