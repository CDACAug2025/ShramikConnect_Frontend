import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken } from '../../../shared/utils/tokenUtils'; // Adjust path if needed

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container fluid>
        <Navbar.Brand as={Link} to="/admin">Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/admin/users">Users</Nav.Link>
            <Nav.Link as={Link} to="/admin/inventory">Inventory</Nav.Link>
            <Nav.Link as={Link} to="/admin/monitoring">Monitoring</Nav.Link>
            <Nav.Link as={Link} to="/admin/payments">Payments</Nav.Link>
            <Nav.Link as={Link} to="/admin/subscriptions">Plans</Nav.Link> 
            <Nav.Link as={Link} to="/admin/settings">Settings</Nav.Link>
          </Nav>
          
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;