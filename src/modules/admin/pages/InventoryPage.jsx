import React, { useState } from 'react';
import useInventory from '../hooks/useInventory';
import ProductTable from '../components/ProductTable';

const InventoryPage = () => {
  const { products, loading, error, handleAddProduct, handleDeleteProduct, handleUpdateStock } = useInventory();
  
  // Local state for the "Add Product" form
  const [newItem, setNewItem] = useState({ name: '', category: 'Tools', price: '', stock: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;
    handleAddProduct({ ...newItem, price: Number(newItem.price), stock: Number(newItem.stock) });
    setNewItem({ name: '', category: 'Tools', price: '', stock: '' }); // Reset Form
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        
        <div className="mb-4">
          <h2 className="fw-bold text-dark">Inventory Management</h2>
          <p className="text-muted">Manage store products, update stock, and prices.</p>
        </div>

        {/* Add Product Form Card */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-white fw-bold text-primary border-bottom-0 pt-3">
            + Add New Product
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit} className="row g-3">
              <div className="col-md-4">
                <input 
                  type="text" className="form-control" placeholder="Product Name"
                  value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})}
                  required 
                />
              </div>
              <div className="col-md-2">
                <select 
                  className="form-select"
                  value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}
                >
                  <option value="Tools">Tools</option>
                  <option value="Safety Gear">Safety Gear</option>
                  <option value="Uniforms">Uniforms</option>
                </select>
              </div>
              <div className="col-md-2">
                <input 
                  type="number" className="form-control" placeholder="Price (₹)"
                  value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})}
                  required 
                />
              </div>
              <div className="col-md-2">
                <input 
                  type="number" className="form-control" placeholder="Stock"
                  value={newItem.stock} onChange={e => setNewItem({...newItem, stock: e.target.value})}
                  required 
                />
              </div>
              <div className="col-md-2 d-grid">
                <button type="submit" className="btn btn-primary fw-bold">Add Item</button>
              </div>
            </form>
          </div>
        </div>

        {/* Product Table */}
        <ProductTable 
          products={products} 
          onDelete={handleDeleteProduct} 
          onUpdateStock={handleUpdateStock}
        />

      </div>
    </div>
  );
};

export default InventoryPage;