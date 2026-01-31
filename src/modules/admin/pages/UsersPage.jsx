import React, { useState } from 'react';
// import AdminLayout from '../layouts/AdminLayout';
import useUserManagement from '../hooks/useUserManagement';

const UsersPage = () => {
  const { users, loading, error, handleToggleStatus } = useUserManagement();
  
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user => {
    if (!user) return false;
    const term = searchTerm.toLowerCase();
    const roleName = typeof user.role === 'object' ? user.role?.roleName : user.role;
    
    return (
        user.name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        roleName?.toLowerCase().includes(term)
    );
  });

  if (loading) return (
    
      <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary"></div>
      </div>
    
  );

  if (error) return (
     
         <div className="alert alert-danger m-4">{error}</div>
     
  );

  return (
    
      <div className="w-100">
        <h3 className="fw-bold text-dark mb-4">User Management</h3>

        <div className="card border-0 shadow-sm rounded-3 mb-4">
          <div className="card-body p-3">
             <input 
               type="text" 
               className="form-control border-0 bg-light" 
               placeholder="🔍 Search by Name, Email or Role..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
        </div>

        <div className="card border-0 shadow-sm rounded-3 overflow-hidden w-100">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 text-nowrap w-100">
              <thead className="bg-light text-secondary small text-uppercase">
                <tr>
                  <th className="ps-4 py-3">User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                  <tr key={user.userId || user.id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3 fw-bold" 
                             style={{ width: '40px', height: '40px' }}>
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{user.name}</div>
                          <div className="text-muted small">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {typeof user.role === 'object' ? user.role?.roleName : user.role}
                      </span>
                    </td>
                    <td>
                      {user.status === 'ACTIVE' ? (
                        <span className="badge bg-success bg-opacity-10 text-success">ACTIVE</span>
                      ) : (
                        <span className="badge bg-danger bg-opacity-10 text-danger">BLOCKED</span>
                      )}
                    </td>
                    <td className="text-end pe-4">
                      <button 
                        onClick={() => handleToggleStatus(user.userId || user.id, user.status)}
                        className={`btn btn-sm ${user.status === 'ACTIVE' ? 'btn-outline-danger' : 'btn-outline-success'}`}
                        style={{ minWidth: '80px' }}
                      >
                        {user.status === 'ACTIVE' ? 'Block' : 'Unblock'}
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="4" className="text-center py-5 text-muted">No users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
  );
};

export default UsersPage;