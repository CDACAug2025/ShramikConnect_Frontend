import React from 'react';

const AdminUserTable = ({ users, onStatusChange, onRoleChange }) => {
  if (!users || users.length === 0) {
    return <div className="p-4 text-gray-500">No users found.</div>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Role</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <div className="font-bold text-gray-800">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </td>
              <td className="p-4">
                <select
                  value={user.role}
                  onChange={(e) => onRoleChange(user.id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm bg-white"
                >
                  <option value="Worker">Worker</option>
                  <option value="Client">Client</option>
                  <option value="Organization">Organization</option>
                  <option value="Supervisor">Supervisor</option>
                </select>
              </td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-xs font-bold
                  ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 
                    user.status === 'Blocked' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                  {user.status}
                </span>
              </td>
              <td className="p-4">
                {user.status === 'Blocked' ? (
                  <button
                    onClick={() => onStatusChange(user.id, 'Active')}
                    className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                  >
                    Activate
                  </button>
                ) : (
                  <button
                    onClick={() => onStatusChange(user.id, 'Blocked')}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
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
  );
};

export default AdminUserTable;