import { Container, Row, Col } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="fw-bold mb-4 text-center">About ShramikConnect</h2>

          <p className="text-muted">
            ShramikConnect is a digital platform designed to bring trust,
            transparency, and accountability to the unorganized labor sector.
            We connect skilled blue-collar workers with local clients through
            verified profiles, secure contracts, and protected payments.
          </p>

          <p className="text-muted">
            Our mission is to empower workers by helping them build a digital
            identity, access consistent work opportunities, and receive fair
            payments without delays or disputes.
          </p>

          <p className="text-muted">
            For clients and organizations, ShramikConnect ensures reliable
            hiring through verified workers, district-based matching, and
            escrow-backed payments that protect both parties.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
