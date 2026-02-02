import { useState } from "react";
import { useJobs } from "../hooks/useJobs";
import { toast } from "react-toastify";
// ✅ Fixed: Added Alert to the imports below
import { Container, Row, Col, Card, Form, Button, InputGroup, Badge, Alert } from "react-bootstrap";

const PostJob = () => {
  const { addJob } = useJobs();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    budget: "",
    duration: "",
    location: "",
    district: ""
  });

  const districts = ["MUMBAI_CITY", "MUMBAI_SUBURBAN", "THANE", "PALGHAR", "RAIGAD", "PUNE", "SATARA", "SOLAPUR", "KOLHAPUR", "SANGLI", "NASHIK", "AHMEDNAGAR", "DHULE", "JALGAON", "NANDURBAR", "AURANGABAD", "JALNA", "BEED", "OSMANABAD", "LATUR", "NANDED", "PARBHANI", "HINGOLI", "AKOLA", "AMRAVATI", "BULDHANA", "WASHIM", "YAVATMAL", "NAGPUR", "WARDHA", "BHANDARA", "GONDIA", "CHANDRAPUR", "GADCHIROLI", "RATNAGIRI", "SINDHUDURG"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addJob(form);
      toast.success("Requirement published successfully!");
      setForm({
        title: "", category: "", description: "", budget: "",
        duration: "", location: "", district: ""
      });
    } catch {
      toast.error("Failed to publish requirement.");
    }
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          {/* ℹ️ Left Side: Info & Guidelines */}
          <Col lg={4} className="mb-4">
            <div className="sticky-top" style={{ top: '100px' }}>
              <h2 className="fw-bold text-dark mb-3">Hire Skilled Hands</h2>
              <p className="text-muted lh-base mb-4">
                Describe your requirement clearly to attract the best-verified professionals in your district.
              </p>
              
              <Card className="border-0 shadow-sm rounded-4 mb-3" style={{ background: '#0f172a', color: '#fff' }}>
                <Card.Body className="p-4">
                  <h6 className="text-warning fw-bold mb-3"><i className="bi bi-shield-check me-2"></i>Secure Hiring</h6>
                  <ul className="list-unstyled small opacity-75 d-grid gap-2">
                    <li><i className="bi bi-check2-circle text-warning me-2"></i>Verified Worker Profiles</li>
                    <li><i className="bi bi-check2-circle text-warning me-2"></i>Escrow Payment Protection</li>
                    <li><i className="bi bi-check2-circle text-warning me-2"></i>District-wise Talent Match</li>
                  </ul>
                </Card.Body>
              </Card>

              {/* ✅ This component now works because it is imported */}
              <Alert variant="warning" className="border-0 rounded-4 small shadow-sm">
                <i className="bi bi-info-circle-fill me-2"></i>
                <strong>Pro-tip:</strong> Including a detailed description reduces the time to hire by 40%.
              </Alert>
            </div>
          </Col>

          {/* 📝 Right Side: The Form */}
          <Col lg={7}>
            <Card className="border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white">
              <Form onSubmit={handleSubmit}>
                <h5 className="fw-bold text-dark mb-4">Requirement Details</h5>
                
                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold text-muted">JOB TITLE</Form.Label>
                  <Form.Control 
                    name="title" 
                    placeholder="e.g. Need Expert Plumber for Kitchen renovation"
                    className="py-2 border-light bg-light rounded-3 shadow-none"
                    value={form.title}
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="small fw-bold text-muted">CATEGORY</Form.Label>
                      <Form.Select 
                        name="category"
                        className="py-2 border-light bg-light rounded-3 fw-bold shadow-none"
                        value={form.category}
                        onChange={handleChange} 
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Painting">Painting</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Carpentry">Carpentry</option>
                        <option value="Gardening">Gardening</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="small fw-bold text-muted">BUDGET (₹)</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light border-light text-muted">₹</InputGroup.Text>
                        <Form.Control 
                          name="budget" 
                          type="number"
                          placeholder="Amount"
                          className="py-2 border-light bg-light rounded-end-3 shadow-none"
                          value={form.budget}
                          onChange={handleChange} 
                          required 
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold text-muted">DESCRIPTION</Form.Label>
                  <Form.Control 
                    as="textarea"
                    name="description"
                    placeholder="Explain the work in detail..."
                    className="py-2 border-light bg-light rounded-3 shadow-none"
                    rows={4}
                    value={form.description}
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="small fw-bold text-muted">DISTRICT</Form.Label>
                      <Form.Select 
                        name="district"
                        className="py-2 border-light bg-light rounded-3 shadow-none"
                        value={form.district}
                        onChange={handleChange} 
                        required
                      >
                        <option value="">Select District</option>
                        {districts.map(d => <option key={d} value={d}>{d.replace('_', ' ')}</option>)}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="small fw-bold text-muted">EXPECTED DURATION</Form.Label>
                      <Form.Control 
                        name="duration"
                        placeholder="e.g. 3 days"
                        className="py-2 border-light bg-light rounded-3 shadow-none"
                        value={form.duration}
                        onChange={handleChange} 
                        required 
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-5">
                  <Form.Label className="small fw-bold text-muted">EXACT LOCATION</Form.Label>
                  <Form.Control 
                    name="location"
                    placeholder="Area, Landmark, City"
                    className="py-2 border-light bg-light rounded-3 shadow-none"
                    value={form.location}
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Button type="submit" variant="warning" className="w-100 py-3 fw-bold rounded-pill shadow-sm">
                  Publish Requirement
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostJob;