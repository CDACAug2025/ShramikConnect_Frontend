import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const PublicNavbar = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ShramikConnect
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="public-navbar" />
        <Navbar.Collapse id="public-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          <Nav className="gap-2">
            <Button variant="outline-light" size="sm" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="light" size="sm" onClick={() => navigate('/register')}>
              Register
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicNavbar;