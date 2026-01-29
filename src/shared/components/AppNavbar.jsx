// shared/components/AppNavbar.jsx
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, clearAuth } from '@/shared/utils/authUtils';
import { clearToken } from '@/shared/utils/tokenUtils';

const AppNavbar = () => {
  const navigate = useNavigate();
  const { token, role, name } = getAuth();

  const handleLogout = () => {
    clearToken();
    clearAuth();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ShramikConnect
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">

            {/* ---------- PUBLIC ---------- */}
            {!token && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              </>
            )}

            {/* ---------- ADMIN ---------- */}
            {role === 'ADMIN' && (
              <>
                <Nav.Link as={Link} to="/admin/users">Users</Nav.Link>
                <Nav.Link as={Link} to="/admin/monitoring">Monitoring</Nav.Link>
                <Nav.Link as={Link} to="/admin/inventory">Inventory</Nav.Link>
                <Nav.Link as={Link} to="/admin/payments">Payments</Nav.Link>
                <Nav.Link as={Link} to="/admin/subscriptions">Subscriptions</Nav.Link>
                <Nav.Link as={Link} to="/admin/settings">Settings</Nav.Link>
              </>
            )}

            {/* ---------- SUPERVISOR ---------- */}
            {role === 'SUPERVISOR' && (
              <>
                <Nav.Link as={Link} to="/supervisor/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/supervisor/kyc-list">KYC Requests</Nav.Link>
                <Nav.Link as={Link} to="/supervisor/disputes">Disputes</Nav.Link>
              </>
            )}

            {/* ---------- ORGANIZATION ---------- */}
            {role === 'ORGANIZATION' && (
              <>
                <Nav.Link as={Link} to="/organization/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/organization/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/organization/profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="/organization/post-job">Post Job</Nav.Link>
              </>
            )}

            {/* ---------- CLIENT ---------- */}
            {role === 'CLIENT' && (
              <>
                <Nav.Link as={Link} to="/client/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/client/profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="/client/post-job">Post Job</Nav.Link>
                <Nav.Link as={Link} to="/client/my-jobs">My Jobs</Nav.Link>
                <Nav.Link as={Link} to="/client/applications">Applications</Nav.Link>
              </>
            )}
          </Nav>

          {/* ---------- RIGHT SIDE ---------- */}
          <Nav>
            {!token ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            ) : (
              <NavDropdown title={name || 'Account'} align="end">
                <NavDropdown.Item as={Link} to={`/${role?.toLowerCase()}/profile`}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={handleLogout}
                  className="text-danger"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
