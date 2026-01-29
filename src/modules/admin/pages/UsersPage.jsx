import React, { useState } from 'react';
import useUserManagement from '../hooks/useUserManagement';

const ROLES = [
  { id: 1, name: 'ADMIN' },
  { id: 2, name: 'SUPERVISOR' },
  { id: 3, name: 'WORKER' },
  { id: 4, name: 'CLIENT' },
  { id: 5, name: 'ORGANIZATION' },
];

const UsersPage = () => {
  const {
    users,
    loading,
    error,
    updateUserStatus,
    updateUserRole,
  } = useUserManagement();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredUsers = users.filter(user => {
    const q = search.toLowerCase();

    const matchesSearch =
      (user.fullName ?? '').toLowerCase().includes(q) ||
      (user.email ?? '').toLowerCase().includes(q);

    const matchesRole =
      roleFilter === 'ALL' ||
      user.role?.roleName === roleFilter;

    const matchesStatus =
      statusFilter === 'ALL' ||
      user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading)
    return <div className="text-center py-5"><div className="spinner-border text-primary" /></div>;

  if (error)
    return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">

        <h2 className="fw-bold mb-4">User Management</h2>

        {/* FILTER BAR */}
        <div className="card shadow-sm mb-4">
          <div className="card-body d-flex gap-3 flex-wrap">
            <input
              className="form-control"
              placeholder="Search name or email"
              style={{ maxWidth: 260 }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <select
              className="form-select"
              style={{ maxWidth: 180 }}
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
            >
              <option value="ALL">All Roles</option>
              {ROLES.map(r => (
                <option key={r.id} value={r.name}>{r.name}</option>
              ))}
            </select>

            <select
              className="form-select"
              style={{ maxWidth: 160 }}
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="BLOCKED">BLOCKED</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-5">
                      No users found
                    </td>
                  </tr>
                )}

                {filteredUsers.map(user => (
                  <tr key={user.userId}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle bg-primary bg-opacity-10 text-primary fw-bold me-3 d-flex align-items-center justify-content-center"
                             style={{ width: 40, height: 40 }}>
                          {(user.fullName ?? '?')[0]}
                        </div>
                        <div>
                          <div className="fw-bold">{user.fullName}</div>
                          <small className="text-muted">{user.email}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={user.role?.roleId}
                        onChange={e =>
                          updateUserRole(user.userId, Number(e.target.value))
                        }
                      >
                        {ROLES.map(r => (
                          <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                      </select>
                    </td>

                    <td>
                      <span className={`badge rounded-pill px-3 py-2 ${
                        user.status === 'ACTIVE'
                          ? 'bg-success bg-opacity-10 text-success'
                          : 'bg-danger bg-opacity-10 text-danger'
                      }`}>
                        {user.status}
                      </span>
                    </td>

                    <td className="text-end pe-4">
                      {user.status === 'BLOCKED' ? (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() =>
                            updateUserStatus(user.userId, 'ACTIVE')
                          }
                        >
                          Activate
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            updateUserStatus(user.userId, 'BLOCKED')
                          }
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

      </div>
    </div>
  );
};

export default UsersPage;
