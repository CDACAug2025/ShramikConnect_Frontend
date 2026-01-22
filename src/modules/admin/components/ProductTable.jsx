import React from 'react';

const ProductTable = ({ products, onDelete, onUpdateStock }) => {
  if (!products || products.length === 0) {
    return <div className="alert alert-info text-center m-4">No products in inventory.</div>;
  }

  return (
    <div className="card shadow border-0 rounded-3 overflow-hidden">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="bg-light">
            <tr>
              <th className="ps-4 py-3 text-secondary text-uppercase small fw-bold">Product Name</th>
              <th className="py-3 text-secondary text-uppercase small fw-bold">Category</th>
              <th className="py-3 text-secondary text-uppercase small fw-bold">Price</th>
              <th className="py-3 text-secondary text-uppercase small fw-bold">Stock (Qty)</th>
              <th className="py-3 text-secondary text-uppercase small fw-bold">Status</th>
              <th className="pe-4 py-3 text-end text-secondary text-uppercase small fw-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td className="ps-4 fw-bold text-dark">{item.name}</td>
                <td className="text-muted small">{item.category}</td>
                <td className="fw-medium text-success">₹{item.price}</td>
                
                {/* Editable Stock Input */}
                <td>
                  <input 
                    type="number" 
                    className="form-control form-control-sm border-secondary border-opacity-25" 
                    style={{ width: '80px' }}
                    value={item.stock}
                    onChange={(e) => onUpdateStock(item.id, parseInt(e.target.value) || 0)}
                  />
                </td>

                {/* Status Badge */}
                <td>
                  <span className={`badge rounded-pill px-3 py-2 ${
                    item.stock === 0 ? 'bg-danger bg-opacity-10 text-danger' : 
                    item.stock < 20 ? 'bg-warning bg-opacity-10 text-warning' : 
                    'bg-success bg-opacity-10 text-success'
                  }`}>
                    {item.stock === 0 ? 'Out of Stock' : item.stock < 20 ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>

                {/* Delete Action */}
                <td className="pe-4 text-end">
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="btn btn-sm btn-outline-danger"
                    title="Remove Item"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;