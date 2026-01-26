import { Navbar, Nav, Container, Button } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';
import { getToken, clearToken } from '@/shared/utils/tokenUtils';


const AppNavbar = () => {
const navigate = useNavigate();
  const token = getToken(); // 🔐 check login status

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ShramikConnect
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            
          </Nav>

          <Nav>
            <Nav.Link as={Link} to="/supervisor/dashboard">Supervisor Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/supervisor/kyc-list">KYC Requests</Nav.Link>
            <Nav.Link as={Link} to="/supervisor/disputes">Disputes</Nav.Link>
            <Nav.Link as={Link} to="/kyc-pending">KYC Pending</Nav.Link>
          </Nav>

          <Nav>
            {!token ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            ) : (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
