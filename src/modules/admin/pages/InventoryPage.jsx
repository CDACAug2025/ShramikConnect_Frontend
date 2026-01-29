import React, { useState } from 'react';
import useInventory from '../hooks/useInventory';
import ProductTable from '../components/ProductTable';
<<<<<<< HEAD
import OrderTable from '../components/OrderTable'; // Import new table

const InventoryPage = () => {
  const { products, orders, loading, handleAddProduct, handleDeleteProduct, handleUpdateStock } = useInventory();
  const [activeTab, setActiveTab] = useState('products');
  
  // Updated Form State
  const [newItem, setNewItem] = useState({ name: '', category: 'Tools', price: '', stock: '', description: '' });
=======

const InventoryPage = () => {
  const { products, loading, handleAddProduct, handleDeleteProduct, handleUpdateStock, handleUpdateProduct } = useInventory();
  const [activeTab, setActiveTab] = useState('products');
  
  // Form State
  const [newItem, setNewItem] = useState({ name: '', category: 'Tools', price: '', stock: '', description: '', image: '' });
  const [editingId, setEditingId] = useState(null);

  // File to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
>>>>>>> main

  const onSubmit = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;
<<<<<<< HEAD
    handleAddProduct({ ...newItem, price: Number(newItem.price), stock: Number(newItem.stock) });
    setNewItem({ name: '', category: 'Tools', price: '', stock: '', description: '' });
=======

    const productData = { ...newItem, price: Number(newItem.price), stock: Number(newItem.stock) };

    if (editingId) {
      handleUpdateProduct(editingId, productData);
      setEditingId(null);
    } else {
      handleAddProduct(productData);
    }
    
    // Reset
    setNewItem({ name: '', category: 'Tools', price: '', stock: '', description: '', image: '' });
    if(document.getElementById("fileInput")) document.getElementById("fileInput").value = ""; 
  };

  const startEdit = (product) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setEditingId(product.id);
    setNewItem({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        description: product.description,
        image: product.image || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewItem({ name: '', category: 'Tools', price: '', stock: '', description: '', image: '' });
    if(document.getElementById("fileInput")) document.getElementById("fileInput").value = ""; 
>>>>>>> main
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
<<<<<<< HEAD
        
        <h2 className="fw-bold text-dark mb-4">Store Management</h2>

        {/* Tabs */}
        <ul className="nav nav-pills mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link fw-bold ${activeTab === 'products' ? 'active' : 'bg-white text-secondary border'}`}
              onClick={() => setActiveTab('products')}
            >
              📦 Inventory & Products
            </button>
          </li>
          <li className="nav-item ms-3">
            <button 
              className={`nav-link fw-bold ${activeTab === 'orders' ? 'active' : 'bg-white text-secondary border'}`}
              onClick={() => setActiveTab('orders')}
            >
              🛒 Purchase History
            </button>
          </li>
        </ul>

        {/* --- TAB 1: PRODUCTS --- */}
        {activeTab === 'products' && (
          <>
            {/* Add Product Form */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-white fw-bold text-primary pt-3">+ Add New Item</div>
              <div className="card-body">
                <form onSubmit={onSubmit}>
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label className="form-label small fw-bold">Product Name</label>
                      <input type="text" className="form-control" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label small fw-bold">Category</label>
                      <select className="form-select" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
                        <option>Tools</option><option>Safety Gear</option><option>Uniforms</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label className="form-label small fw-bold">Price (₹)</label>
                      <input type="number" className="form-control" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} required />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label small fw-bold">Stock</label>
                      <input type="number" className="form-control" value={newItem.stock} onChange={e => setNewItem({...newItem, stock: e.target.value})} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label small fw-bold">Product Image</label>
                      <input type="file" className="form-control" accept="image/*" />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">Description</label>
                      <textarea className="form-control" rows="2" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})}></textarea>
                    </div>
                    <div className="col-12 text-end">
                      <button type="submit" className="btn btn-primary fw-bold px-4">Add Product</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <ProductTable products={products} onDelete={handleDeleteProduct} onUpdateStock={handleUpdateStock} />
          </>
        )}

        {/* --- TAB 2: ORDERS --- */}
        {activeTab === 'orders' && <OrderTable orders={orders} />}

=======
        <h2 className="fw-bold text-dark mb-4">Store Management</h2>
        
        {/* ADD FORM */}
        <div className={`card shadow-sm border-0 mb-4 ${editingId ? 'border-primary border-2' : ''}`}>
          <div className="card-header bg-white fw-bold text-primary pt-3 d-flex justify-content-between align-items-center">
            <span>{editingId ? '✏️ Edit Product' : '+ Add New Item'}</span>
            {editingId && <button onClick={cancelEdit} className="btn btn-sm btn-secondary">Cancel</button>}
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label small fw-bold">Name</label>
                  <input type="text" className="form-control" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required />
                </div>
                <div className="col-md-2">
                  <label className="form-label small fw-bold">Category</label>
                  <select className="form-select" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
                    <option>Tools</option><option>Safety Gear</option><option>Uniforms</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label small fw-bold">Price</label>
                  <input type="number" className="form-control" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} required />
                </div>
                <div className="col-md-2">
                  <label className="form-label small fw-bold">Stock</label>
                  <input type="number" className="form-control" value={newItem.stock} onChange={e => setNewItem({...newItem, stock: e.target.value})} required />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-bold">Image</label>
                  <input type="file" id="fileInput" className="form-control" accept="image/*" onChange={handleImageUpload} />
                </div>
                {newItem.image && <div className="col-12"><img src={newItem.image} alt="Preview" style={{height:'50px'}}/></div>}
                <div className="col-12 text-end">
                  <button type="submit" className={`btn fw-bold px-4 ${editingId ? 'btn-warning' : 'btn-primary'}`}>{editingId ? 'Update' : 'Add'}</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <ProductTable products={products} onDelete={handleDeleteProduct} onUpdateStock={handleUpdateStock} onEdit={startEdit} />
>>>>>>> main
      </div>
    </div>
  );
};

export default InventoryPage;