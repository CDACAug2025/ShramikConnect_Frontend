import React, { useState } from 'react';
import useInventory from '../hooks/useInventory';
import AdminLayout from '../layouts/AdminLayout';

const InventoryPage = () => {
  const { products, loading, handleDeleteProduct, handleAddProduct, handleUpdateProduct } = useInventory();
  
  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Form State
  const [newItem, setNewItem] = useState({ name: '', category: 'Tools', price: '', stock: '' });

  // 1. Handle Edit Click
  const handleEditClick = (product) => {
    setNewItem({ 
      name: product.name, 
      category: product.category, 
      price: product.price, 
      stock: product.stock 
    });
    setIsEditing(true);
    setEditId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 2. Cancel Edit
  const handleCancelEdit = () => {
    setNewItem({ name: '', category: 'Tools', price: '', stock: '' });
    setIsEditing(false);
    setEditId(null);
  };

  // 3. Submit Form (Add or Update)
  const onSubmit = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    const productData = {
      ...newItem,
      price: Number(newItem.price),
      stock: Number(newItem.stock)
    };

    if (isEditing) {
      handleUpdateProduct(editId, productData);
      handleCancelEdit();
    } else {
      handleAddProduct(productData);
      setNewItem({ name: '', category: 'Tools', price: '', stock: '' });
    }
  };

  if (loading) return (
    <AdminLayout>
      <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary"></div>
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="w-100">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold text-dark mb-1">Inventory Management</h3>
            <p className="text-muted mb-0">Manage your stock and products.</p>
          </div>
          <button className="btn btn-primary shadow-sm fw-bold">
            Export Report
          </button>
        </div>

        {/* --- FORM SECTION --- */}
        <div className={`card border-0 shadow-sm rounded-3 mb-4 w-100 ${isEditing ? 'border-primary border-2' : ''}`}>
          <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
             <h6 className={`fw-bold m-0 ${isEditing ? 'text-primary' : 'text-dark'}`}>
                {isEditing ? 'Edit Item' : 'Add New Item'}
             </h6>
             {isEditing && (
               <button onClick={handleCancelEdit} className="btn btn-sm btn-secondary">Cancel</button>
             )}
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-3">
                  <label className="form-label small fw-bold text-secondary">Product Name</label>
                  <input type="text" className="form-control" placeholder="e.g. Helmet" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required />
                </div>
                <div className="col-12 col-md-3">
                  <label className="form-label small fw-bold text-secondary">Category</label>
                  <select className="form-select" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
                    <option>Tools</option><option>Safety Gear</option><option>Raw Material</option>
                  </select>
                </div>
                <div className="col-6 col-md-2">
                  <label className="form-label small fw-bold text-secondary">Price (₹)</label>
                  <input type="number" className="form-control" placeholder="0" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} required />
                </div>
                <div className="col-6 col-md-2">
                  <label className="form-label small fw-bold text-secondary">Stock</label>
                  <input type="number" className="form-control" placeholder="0" value={newItem.stock} onChange={e => setNewItem({...newItem, stock: e.target.value})} required />
                </div>
                <div className="col-12 col-md-2 d-flex align-items-end">
                  <button type="submit" className={`btn fw-bold w-100 ${isEditing ? 'btn-success' : 'btn-primary'}`}>
                    {isEditing ? 'Update' : 'Add'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* --- TABLE SECTION --- */}
        <div className="card border-0 shadow-sm rounded-3 overflow-hidden w-100">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 text-nowrap w-100">
              <thead className="bg-light text-secondary small text-uppercase">
                <tr>
                  <th className="ps-4 py-3">Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? products.map((product) => (
                  <tr key={product.id} className={editId === product.id ? "table-active" : ""}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <div className="bg-light rounded-3 d-flex align-items-center justify-content-center me-3" 
                            style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                          {product.image ? <img src={product.image} alt="" className="rounded-3" style={{width:'100%'}} /> : <span>📦</span>}
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{product.name}</div>
                          {editId === product.id && <span className="badge bg-primary">Editing</span>}
                        </div>
                      </div>
                    </td>
                    <td><span className="badge bg-light text-secondary border">{product.category}</span></td>
                    <td className="fw-bold">₹{product.price}</td>
                    <td>
                      {product.stock > 10 ? <span className="badge bg-success bg-opacity-10 text-success">In Stock</span> : 
                      <span className="badge bg-danger bg-opacity-10 text-danger">Low Stock</span>}
                    </td>
                    <td className="text-end pe-4">
                      
                      {/* ✅ BUTTONS WITH TEXT (So they are always visible) */}
                      <button 
                        onClick={() => handleEditClick(product)} 
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Edit
                      </button>

                      <button 
                        onClick={() => handleDeleteProduct(product.id)} 
                        className="btn btn-sm btn-outline-danger"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="5" className="text-center py-5 text-muted">No items found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default InventoryPage;