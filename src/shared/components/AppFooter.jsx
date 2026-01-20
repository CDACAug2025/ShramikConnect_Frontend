import { Container, Row, Col } from 'react-bootstrap';

const AppFooter = () => {
  return (
    <footer className="bg-dark text-light mt-auto py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h6>ShramikConnect</h6>
            <p className="small">
              Bridging trust between skilled workers and local clients.
            </p>
          </Col>

          <Col md={4}>
            <h6>Quick Links</h6>
            <ul className="list-unstyled small">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Support</li>
            </ul>
          </Col>

          <Col md={4}>
            <h6>Contact</h6>
            <p className="small">
              Email: support@shramikconnect.in<br />
              Phone: +91-XXXXXXXXXX
            </p>
          </Col>
        </Row>

        <hr className="border-secondary" />
        <p className="text-center small mb-0">
          © {new Date().getFullYear()} ShramikConnect. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default AppFooter;
