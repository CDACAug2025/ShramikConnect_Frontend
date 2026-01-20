import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ContactPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="fw-bold mb-4 text-center">Contact Us</h2>

          <Form>
            <Form.Group className="mb-3">
              <Form.Control placeholder="Your Name" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email Address" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control as="textarea" rows={4} placeholder="Your Message" required />
            </Form.Group>

            <Button type="submit" className="w-100">
              Send Message
            </Button>
          </Form>

          <p className="text-muted text-center mt-4">
            Email: support@shramikconnect.in <br />
            Phone: +91-XXXXXXXXXX
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
