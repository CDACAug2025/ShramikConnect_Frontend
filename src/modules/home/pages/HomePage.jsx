import { Container, Button } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container className="py-5 text-center">
      <h1 className="fw-bold">Welcome to ShramikConnect</h1>
      <p className="text-muted mt-3">
        Hire trusted local workers or find jobs in your district with secure payments.
      </p>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button variant="primary" size="lg">
          Find Jobs
        </Button>
        <Button variant="outline-primary" size="lg">
          Post a Job
        </Button>
      </div>
    </Container>
  );
};

export default HomePage;
