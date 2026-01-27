import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const ClientNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/client/dashboard">
          ShramikConnect
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="client-navbar" />
        <Navbar.Collapse id="client-navbar">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/client/dashboard"
              active={location.pathname === '/client/dashboard'}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/client/post-job"
              active={location.pathname === '/client/post-job'}
            >
              Post Job
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/client/my-jobs"
              active={location.pathname === '/client/my-jobs'}
            >
              My Jobs
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/client/applications"
              active={location.pathname === '/client/applications'}
            >
              Applications
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/client/job-progress"
              active={location.pathname === '/client/job-progress'}
            >
              Progress
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/client/contract"
              active={location.pathname === '/client/contract'}
            >
              Contract
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/client/chat"
              active={location.pathname === '/client/chat'}
            >
              Chat
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/client/history"
              active={location.pathname === '/client/history'}
            >
              History
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/client/notifications"
              active={location.pathname === '/client/notifications'}
            >
              Notifications
            </Nav.Link>
          </Nav>

          <Nav>
            <NavDropdown title="Account" id="account-dropdown">
              <NavDropdown.Item as={Link} to="/client/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/client/escrow">Escrow</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/client/dispute">Dispute</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ClientNavbar;
