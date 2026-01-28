import { Navbar, Nav, Container, Button } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';
import { getToken, clearToken } from '@/shared/utils/tokenUtils';


const AppNavbar = () => {
const navigate = useNavigate();
  const token = getToken(); // 🔐 check login status

  const handleLogout = () => {
    clearToken();
    navigate('/login');
// import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import axiosInstance from '@/services/axiosInstance';

// const AppNavbar = () => {
//   const token = localStorage.getItem('token');
//   const userRole = localStorage.getItem('userRole');
//   const userName = localStorage.getItem('userName');
  
//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleDeleteAccount = async () => {
//     if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
//       try {
//         await axiosInstance.delete('/api/user/delete');
//         localStorage.clear();
//         alert('Account deleted successfully');
//         window.location.href = '/login';
//       } catch (error) {
//         alert('Failed to delete account: ' + (error.response?.data || error.message));
//       }
//     }
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
            {token && userRole === 'ORGANIZATION' && (
              <>
                <Nav.Link as={Link} to="/organization/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/organization/profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="/organization/post-job">Post Jobs</Nav.Link>

              </>
            )}
          </Nav>

          <Nav>
            {token ? (
              <NavDropdown title={userName || 'Account'} id="user-dropdown" align="end">
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleDeleteAccount} className="text-danger">
                  Delete Account
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
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
