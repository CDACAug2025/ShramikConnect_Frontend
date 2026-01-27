import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const WorkerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/worker/dashboard">
          ShramikConnect
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="worker-navbar" />
        <Navbar.Collapse id="worker-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/worker/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/worker/find-jobs">Find Jobs</Nav.Link>
            <Nav.Link as={Link} to="/worker/my-applications">Applications</Nav.Link>
            <Nav.Link as={Link} to="/worker/active-jobs">Active Jobs</Nav.Link>
            <Nav.Link as={Link} to="/worker/job-history">History</Nav.Link>
            <Nav.Link as={Link} to="/worker/notifications">Notifications</Nav.Link>
          </Nav>

          <Nav>
            <NavDropdown title="Account" id="worker-account-dropdown">
              <NavDropdown.Item as={Link} to="/worker/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/worker/skills">Skills</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/worker/earnings">Earnings</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/worker/ratings">Ratings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default WorkerNavbar;