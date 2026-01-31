import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const OrgNavbar = ({ orgName }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/organization/dashboard">
          ShramikConnect (Org)
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="org-navbar" />
        <Navbar.Collapse id="org-navbar">
          <Nav className="me-auto">
            <Nav.Link
              as={NavLink}
              to="/organization/dashboard"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Dashboard
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/organization/post-job"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Post Job
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/organization/applications"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Applications
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/organization/payments"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Payments
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default OrgNavbar;
