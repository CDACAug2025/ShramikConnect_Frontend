// import React, { useState } from 'react';
// import useInventory from '../hooks/useInventory';
// import ProductTable from '../components/ProductTable';
// import OrderTable from '../components/OrderTable'; // Import new table

// const InventoryPage = () => {
//   const { products, orders, loading, handleAddProduct, handleDeleteProduct, handleUpdateStock } = useInventory();
//   const [activeTab, setActiveTab] = useState('products');
  
//   // Updated Form State
//   const [newItem, setNewItem] = useState({ name: '', category: 'Tools', price: '', stock: '', description: '' });

//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (!newItem.name || !newItem.price) return;
//     handleAddProduct({ ...newItem, price: Number(newItem.price), stock: Number(newItem.stock) });
//     setNewItem({ name: '', category: 'Tools', price: '', stock: '', description: '' });
//   };

//   if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

//   return (
//     <div className="container-fluid bg-light min-vh-100 py-5">
//       <div className="container">
        
//         <h2 className="fw-bold text-dark mb-4">Store Management</h2>

//         {/* Tabs */}
//         <ul className="nav nav-pills mb-4">
//           <li className="nav-item">
//             <button 
//               className={`nav-link fw-bold ${activeTab === 'products' ? 'active' : 'bg-white text-secondary border'}`}
//               onClick={() => setActiveTab('products')}
//             >
//               📦 Inventory & Products
//             </button>
//           </li>
//           <li className="nav-item ms-3">
//             <button 
//               className={`nav-link fw-bold ${activeTab === 'orders' ? 'active' : 'bg-white text-secondary border'}`}
//               onClick={() => setActiveTab('orders')}
//             >
//               🛒 Purchase History
//             </button>
//           </li>
//         </ul>

//         {/* --- TAB 1: PRODUCTS --- */}
//         {activeTab === 'products' && (
//           <>
//             {/* Add Product Form */}
//             <div className="card shadow-sm border-0 mb-4">
//               <div className="card-header bg-white fw-bold text-primary pt-3">+ Add New Item</div>
//               <div className="card-body">
//                 <form onSubmit={onSubmit}>
//                   <div className="row g-3">
//                     <div className="col-md-3">
//                       <label className="form-label small fw-bold">Product Name</label>
//                       <input type="text" className="form-control" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required />
//                     </div>
//                     <div className="col-md-2">
//                       <label className="form-label small fw-bold">Category</label>
//                       <select className="form-select" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
//                         <option>Tools</option><option>Safety Gear</option><option>Uniforms</option>
//                       </select>
//                     </div>
//                     <div className="col-md-2">
//                       <label className="form-label small fw-bold">Price (₹)</label>
//                       <input type="number" className="form-control" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} required />
//                     </div>
//                     <div className="col-md-2">
//                       <label className="form-label small fw-bold">Stock</label>
//                       <input type="number" className="form-control" value={newItem.stock} onChange={e => setNewItem({...newItem, stock: e.target.value})} required />
//                     </div>
//                     <div className="col-md-3">
//                       <label className="form-label small fw-bold">Product Image</label>
//                       <input type="file" className="form-control" accept="image/*" />
//                     </div>
//                     <div className="col-12">
//                       <label className="form-label small fw-bold">Description</label>
//                       <textarea className="form-control" rows="2" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})}></textarea>
//                     </div>
//                     <div className="col-12 text-end">
//                       <button type="submit" className="btn btn-primary fw-bold px-4">Add Product</button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>

//             <ProductTable products={products} onDelete={handleDeleteProduct} onUpdateStock={handleUpdateStock} />
//           </>
//         )}

//         {/* --- TAB 2: ORDERS --- */}
//         {activeTab === 'orders' && <OrderTable orders={orders} />}

//       </div>
//     </div>
//   );
// };

// export default InventoryPage;