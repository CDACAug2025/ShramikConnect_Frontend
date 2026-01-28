import React from 'react';

const ProductTable = ({ products, onDelete, onUpdateStock, onEdit }) => {

  // ✅ SMART IMAGE HELPER
  // This fixes the image string if it's missing the "data:" prefix
  const getValidImage = (imgString) => {
    if (!imgString) return null;
    if (imgString.includes('via.placeholder')) return null; // Ignore bad placeholders
    
    if (imgString.startsWith('http')) return imgString; // Normal URL
    if (imgString.startsWith('data:')) return imgString; // Perfect Base64
    
    // If it looks like raw Base64 (like your DB data), add the missing header
    return `data:image/png;base64,${imgString}`;
  };

  return (
    <div className="card shadow border-0 rounded-3 overflow-hidden">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="bg-light">
            <tr>
              <th className="ps-4">Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th className="text-end pe-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              const productId = item.id || item.productId || item._id;
              
              // Use the helper to get a renderable URL
              const imageUrl = getValidImage(item.image);

              return (
                <tr key={productId || index}>
                  <td className="ps-4">
                    <div className="d-flex align-items-center">
                      
                      {/* Image Display */}
                      {imageUrl ? (
                        <img 
                          src={imageUrl} 
                          alt="product" 
                          className="rounded border me-3" 
                          width="40" 
                          height="40" 
                          style={{ objectFit: 'cover' }}
                          // If it still fails, hide it and show "Err"
                          onError={(e) => {
                            e.target.style.display = 'none'; 
                            e.target.parentNode.innerHTML = '<div class="rounded border me-3 d-flex align-items-center justify-content-center bg-secondary text-white small fw-bold" style="width: 40px; height: 40px; font-size: 10px;">Err</div>';
                          }} 
                        />
                      ) : (
                        // Fallback "IMG" Box
                        <div 
                          className="rounded border me-3 d-flex align-items-center justify-content-center bg-secondary text-white small fw-bold"
                          style={{ width: '40px', height: '40px', fontSize: '10px' }}
                        >
                          IMG
                        </div>
                      )}

                      <div>
                        <div className="fw-bold text-dark">{item.name}</div>
                        <div className="text-muted small" style={{maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                          {item.description || "No description"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.category}</td>
                  <td className="fw-medium text-success">₹{item.price}</td>
                  
                  <td>
                    <input 
                      type="number" 
                      className="form-control form-control-sm" 
                      style={{ width: '80px' }}
                      value={item.stock}
                      onChange={(e) => {
                         const val = parseInt(e.target.value);
                         if(!isNaN(val) && productId) onUpdateStock(productId, val);
                      }}
                    />
                  </td>

                  <td>
                    <span className={`badge rounded-pill px-3 py-2 ${
                      item.stock === 0 ? 'bg-danger bg-opacity-10 text-danger' : 
                      item.stock < 20 ? 'bg-warning bg-opacity-10 text-warning' : 
                      'bg-success bg-opacity-10 text-success'
                    }`}>
                      {item.stock === 0 ? 'Out' : item.stock < 20 ? 'Low' : 'In Stock'}
                    </span>
                  </td>

                  <td className="pe-4 text-end">
                    <button 
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => productId && onDelete(productId)} 
                      className="btn btn-sm btn-outline-danger"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;