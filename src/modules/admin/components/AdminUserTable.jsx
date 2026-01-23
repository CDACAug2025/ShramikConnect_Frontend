import React from 'react';

const AdminUserTable = ({ users, onStatusChange, onRoleChange }) => {
  if (!users || users.length === 0) {
    return <div className="alert alert-info text-center m-4">No users found.</div>;
  }

  return (
    <div className="card shadow border-0 rounded-3 overflow-hidden">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="bg-light">
            <tr>
              <th className="ps-4 py-3 text-secondary text-uppercase small fw-bold">User</th>
              <th className="py-3 text-secondary text-uppercase small fw-bold">Role</th>
              <th className="py-3 text-secondary text-uppercase small fw-bold">Status</th>
              <th className="pe-4 py-3 text-end text-secondary text-uppercase small fw-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                {/* User Name & Email */}
                <td className="ps-4 py-3">
                  <div className="d-flex align-items-center">
                    <div 
                      className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold me-3"
                      style={{ width: '40px', height: '40px' }}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="fw-bold text-dark">{user.name}</div>
                      <div className="text-muted small">{user.email}</div>
                    </div>
                  </div>
                </td>

                {/* Role Dropdown */}
                <td>
                  <select
                    className="form-select form-select-sm border-0 bg-light fw-medium text-dark"
                    style={{ width: '130px', cursor: 'pointer' }}
                    value={user.role}
                    onChange={(e) => onRoleChange(user.id, e.target.value)}
                  >
                    <option value="Worker">Worker</option>
                    <option value="Client">Client</option>
                    <option value="Organization">Org</option>
                    <option value="Supervisor">Supervisor</option>
                  </select>
                </td>

                {/* Status Badge */}
                <td>
                  <span
                    className={`badge rounded-pill px-3 py-2 ${
                      user.status === 'Active' ? 'bg-success bg-opacity-10 text-success' :
                      user.status === 'Blocked' ? 'bg-danger bg-opacity-10 text-danger' :
                      'bg-warning bg-opacity-10 text-warning'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="pe-4 text-end">
                  {user.status === 'Blocked' ? (
                    <button
                      onClick={() => onStatusChange(user.id, 'Active')}
                      className="btn btn-sm btn-success fw-bold px-3"
                    >
                      Activate
                    </button>
                  ) : (
                    <button
                      onClick={() => onStatusChange(user.id, 'Blocked')}
                      className="btn btn-sm btn-outline-danger fw-bold px-3"
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserTable;