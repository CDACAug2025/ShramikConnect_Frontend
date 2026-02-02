import React, { useState } from 'react';
import useInventory from '../hooks/useInventory';
import { Container, Row, Col, Card, Form, Button, Table, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axiosInstance from '@/services/axiosInstance';

const InventoryPage = () => {
  const { products, loading, fetchInventory, handleDeleteProduct } = useInventory();
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', category: 'Tools', price: '', stock: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // ✅ Create the product JSON part as a Blob with 'application/json' type
    // This solves the 'HttpMediaTypeNotSupportedException' on the backend
    const productBlob = new Blob(
      [JSON.stringify({
        name: newItem.name,
        category: newItem.category,
        price: Number(newItem.price),
        stock: Number(newItem.stock)
      })], 
      { type: 'application/json' }
    );

    const handleRestock = async (productId, newStock) => {
    try {
        await axiosInstance.put(`/admin/products/${productId}/restock`, { stock: newStock });
        toast.success("Inventory updated!");
        fetchProducts(); // Refresh list
    } catch (err) {
        toast.error("Failed to update stock");
    }
};
    formData.append("product", productBlob);
    if (selectedFile) formData.append("imageFile", selectedFile);

    try {
      if (isEditing) {
        await axiosInstance.put(`/admin/products/${editId}`, formData);
      } else {
        await axiosInstance.post('/admin/products', formData);
      }
      toast.success("Inventory synchronized successfully.");
      fetchInventory(); // Refresh the list
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Action failed. Check console for details.");
    }
  };

  const handleEditClick = (product) => {
    setNewItem({ 
      name: product.name, 
      category: product.category, 
      price: product.price, 
      stock: product.stock 
    });
    setIsEditing(true);
    setEditId(product.productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setNewItem({ name: '', category: 'Tools', price: '', stock: '' });
    setSelectedFile(null);
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <Container className="py-5 bg-light min-vh-100">
      <h2 className="fw-bold text-dark mb-4">Logistics Management</h2>
      
      <Card className="border-0 shadow-sm rounded-4 p-4 mb-5">
        <Form onSubmit={onSubmit}>
          <Row className="g-3">
            <Col md={3}>
              <Form.Label className="small fw-bold">ASSET NAME</Form.Label>
              <Form.Control value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required />
            </Col>
            <Col md={3}>
              <Form.Label className="small fw-bold">CLASSIFICATION</Form.Label>
              <Form.Select value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
                <option>Tools</option><option>Safety Gear</option><option>Raw Material</option>
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Label className="small fw-bold">HARDWARE VISUAL</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={e => setSelectedFile(e.target.files[0])} />
            </Col>
            <Col md={4}><Form.Control type="number" placeholder="Price (₹)" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} required /></Col>
            <Col md={4}><Form.Control type="number" placeholder="Stock" value={newItem.stock} onChange={e => setNewItem({...newItem, stock: e.target.value})} required /></Col>
            <Col md={4}>
              <Button type="submit" variant={isEditing ? "warning" : "primary"} className="w-100 fw-bold rounded-pill">
                {isEditing ? "SYNC CHANGES" : "ADD TO REGISTRY"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        <Table hover align="middle" className="mb-0">
          <thead className="bg-dark text-white">
            <tr><th className="ps-4">ASSET</th><th>CATEGORY</th><th>VALUATION</th><th>STATUS</th><th className="text-end pe-4">ACTIONS</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.productId}>
                <td className="ps-4">
                  <img src={p.image || 'https://via.placeholder.com/40'} alt="" className="rounded-circle me-3" style={{width:'40px', height:'40px', objectFit:'cover'}} />
                  <span className="fw-bold">{p.name}</span>
                </td>
                <td><Badge bg="light" text="dark" className="border">{p.category}</Badge></td>
                <td>₹{p.price}</td>
                <td>
                  <Badge bg={p.stock > 10 ? "success" : "danger"}>
                    {p.stock > 10 ? "IN STOCK" : `LOW (${p.stock})`}
                  </Badge>
                </td>
                <td className="text-end pe-4">
                  <Button variant="outline-dark" size="sm" className="me-2" onClick={() => handleEditClick(p)}>EDIT</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDeleteProduct(p.productId)}>DELETE</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default InventoryPage;