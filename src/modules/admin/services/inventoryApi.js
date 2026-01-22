// --- MOCK DATA ---
const MOCK_PRODUCTS = [
  { id: 1, name: "Safety Helmet (Yellow)", category: "Safety Gear", price: 450, stock: 120, status: "In Stock" },
  { id: 2, name: "Drill Machine 500W", category: "Tools", price: 2500, stock: 15, status: "Low Stock" },
  { id: 3, name: "Reflective Vest", category: "Safety Gear", price: 300, stock: 0, status: "Out of Stock" },
  { id: 4, name: "Heavy Duty Gloves", category: "Safety Gear", price: 150, stock: 200, status: "In Stock" },
];

export const fetchProducts = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_PRODUCTS), 500));
};

export const addProduct = async (product) => {
  console.log("API: Adding product", product);
  return { success: true, id: Date.now() };
};

export const updateProduct = async (id, updates) => {
  console.log(`API: Updating product ${id}`, updates);
  return { success: true };
};

export const deleteProduct = async (id) => {
  console.log(`API: Deleting product ${id}`);
  return { success: true };
};