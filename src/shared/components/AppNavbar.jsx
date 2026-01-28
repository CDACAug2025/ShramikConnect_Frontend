// components/AppNavbar.jsx
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

            {/* WORKER */}
            {role === 'WORKER' && (
              <Nav.Link as={Link} to="/dashboard/worker">Dashboard</Nav.Link>
            )}

            {/* CLIENT */}
            {role === 'CLIENT' && (
              <>
                <Nav.Link as={Link} to="/dashboard/client">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/client/post-job">Post Job</Nav.Link>
                <Nav.Link as={Link} to="/client/my-jobs">My Jobs</Nav.Link>
                <Nav.Link as={Link} to="/client/applications">Applications</Nav.Link>
              </>
            )}

            {/* ORGANIZATION */}
            {role === 'ORGANIZATION' && (
              <>
                <Nav.Link as={Link} to="/dashboard/organization">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/organization/post-job">Post Job</Nav.Link>
                <Nav.Link as={Link} to="/organization/jobs">My Jobs</Nav.Link>
              </>
            )}

            {/* SUPERVISOR */}
            {role === 'SUPERVISOR' && (
              <>
                <Nav.Link as={Link} to="/supervisor/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/supervisor/kyc-list">KYC</Nav.Link>
                <Nav.Link as={Link} to="/supervisor/disputes">Disputes</Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            {!token ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            ) : (
              <NavDropdown title={name || 'Account'} align="end">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">
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
