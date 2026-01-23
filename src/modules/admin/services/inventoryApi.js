import axiosInstance from '../../../services/axiosInstance';

// --- UPDATED MOCK PRODUCTS (With Images & Desc) ---
const MOCK_PRODUCTS = [
  { id: 1, name: "Safety Helmet", category: "Safety Gear", price: 450, stock: 120, image: "https://via.placeholder.com/40", description: "Heavy duty industrial helmet." },
  { id: 2, name: "Drill Machine", category: "Tools", price: 2500, stock: 15, image: "https://via.placeholder.com/40", description: "500W power drill with bits." },
  { id: 3, name: "Reflective Vest", category: "Safety Gear", price: 300, stock: 0, image: "https://via.placeholder.com/40", description: "High visibility vest for night work." },
];

// --- NEW: MOCK ORDERS (Purchase History) ---
const MOCK_ORDERS = [
  { id: "ORD-901", worker: "Rohan Das", product: "Safety Helmet", qty: 2, date: "2026-01-20", total: 900, status: "Delivered" },
  { id: "ORD-902", worker: "Suresh R", product: "Drill Machine", qty: 1, date: "2026-01-21", total: 2500, status: "Processing" },
  { id: "ORD-903", worker: "Manoj K", product: "Gloves", qty: 5, date: "2026-01-22", total: 750, status: "Shipped" },
];

export const fetchProducts = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_PRODUCTS), 500));
};

export const fetchOrders = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_ORDERS), 500));
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