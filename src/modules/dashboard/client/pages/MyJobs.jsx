import { useState } from "react";
import { useJobs } from "../hooks/useJobs";
import { toast } from "react-toastify";
import { Container, Row, Col, Card, Badge, Button, Form, Alert } from "react-bootstrap";

const MyJobs = () => {
  const { jobs, removeJob, editJob } = useJobs();
  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({});

  const districts = ["MUMBAI_CITY", "MUMBAI_SUBURBAN", "THANE", "PALGHAR", "RAIGAD", "PUNE", "SATARA", "SOLAPUR", "KOLHAPUR", "SANGLI", "NASHIK", "AHMEDNAGAR", "DHULE", "JALGAON", "NANDURBAR", "AURANGABAD", "JALNA", "BEED", "OSMANABAD", "LATUR", "NANDED", "PARBHANI", "HINGOLI", "AKOLA", "AMRAVATI", "BULDHANA", "WASHIM", "YAVATMAL", "NAGPUR", "WARDHA", "BHANDARA", "GONDIA", "CHANDRAPUR", "GADCHIROLI", "RATNAGIRI", "SINDHUDURG"];

  const handleEdit = (job) => {
    setEditingJob(job.jobId);
    setEditForm({ ...job });
  };

  const handleSaveEdit = async () => {
    try {
      await editJob(editingJob, editForm);
      setEditingJob(null);
      toast.success("Professional record updated.");
    } catch {
      toast.error("Update failed.");
    }
  };

  const handleDelete = async (id, status, title) => {
    if (status !== "OPEN") {
      return toast.error("Active contracts cannot be deleted.");
    }
    if (window.confirm(`Permanently remove posting: ${title}?`)) {
      try {
        await removeJob(id);
        toast.success("Posting removed.");
      } catch {
        toast.error("Decline failed.");
      }
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'OPEN': return { bg: 'primary-subtle', text: 'text-primary', label: '● ACCEPTING PROPOSALS' };
      case 'IN_PROGRESS': return { bg: 'warning-subtle', text: 'text-warning', label: '● WORK IN PROGRESS' };
      case 'COMPLETED': return { bg: 'success-subtle', text: 'text-success', label: '● PROJECT FINISHED' };
      default: return { bg: 'secondary-subtle', text: 'text-secondary', label: status };
    }
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h2 className="fw-bold text-dark mb-1">My Posted Jobs</h2>
            <p className="text-muted mb-0">Manage your active requirements and track project statuses.</p>
          </div>
          <Badge bg="dark" className="px-3 py-2 rounded-pill shadow-sm">
            {jobs.length} Requirements Found
          </Badge>
        </div>

        {jobs.length === 0 ? (
          <Card className="border-0 shadow-sm rounded-4 text-center p-5">
            <i className="bi bi-folder2-open display-1 text-muted opacity-25"></i>
            <h4 className="text-muted mt-3">No active postings</h4>
            <Button href="/client/post-job" variant="warning" className="mt-3 px-4 fw-bold rounded-pill">Post First Requirement</Button>
          </Card>
        ) : (
          <Row className="g-4">
            {jobs.map(job => (
              <Col xs={12} key={job.jobId}>
                <Card className="border-0 shadow-sm rounded-4 overflow-hidden card-hover-subtle">
                  <Card.Body className="p-4 p-lg-5">
                    {editingJob === job.jobId ? (
                      /* --- EDIT MODE --- */
                      <Form>
                        <Row className="g-3">
                          <Col md={6}><Form.Control value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="bg-light border-0 py-2 fw-bold" /></Col>
                          <Col md={6}>
                            <Form.Select value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} className="bg-light border-0 py-2">
                              {["Plumbing", "Painting", "Electrical", "Cleaning", "Carpentry", "Gardening"].map(c => <option key={c} value={c}>{c}</option>)}
                            </Form.Select>
                          </Col>
                          <Col md={12}><Form.Control as="textarea" rows={3} value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} className="bg-light border-0" /></Col>
                          <Col md={3}><Form.Control type="number" value={editForm.budget} onChange={e => setEditForm({ ...editForm, budget: e.target.value })} className="bg-light border-0" /></Col>
                          <Col md={3}><Form.Control value={editForm.duration} onChange={e => setEditForm({ ...editForm, duration: e.target.value })} className="bg-light border-0" /></Col>
                          <Col md={3}><Form.Control value={editForm.location} onChange={e => setEditForm({ ...editForm, location: e.target.value })} className="bg-light border-0" /></Col>
                          <Col md={3}>
                            <Form.Select value={editForm.district} onChange={e => setEditForm({ ...editForm, district: e.target.value })} className="bg-light border-0">
                              {districts.map(d => <option key={d} value={d}>{d.replace('_', ' ')}</option>)}
                            </Form.Select>
                          </Col>
                        </Row>
                        <div className="mt-4 pt-3 border-top d-flex gap-2">
                          <Button variant="success" size="sm" className="px-4 rounded-pill fw-bold" onClick={handleSaveEdit}>Save Changes</Button>
                          <Button variant="light" size="sm" className="px-4 rounded-pill fw-bold" onClick={() => setEditingJob(null)}>Cancel</Button>
                        </div>
                      </Form>
                    ) : (
                      /* --- VIEW MODE --- */
                      <Row className="align-items-center">
                        <Col lg={8}>
                          <div className="d-flex align-items-center gap-3 mb-3">
                            <Badge className={`${getStatusStyles(job.status).bg} ${getStatusStyles(job.status).text} px-3 py-2 rounded-pill extra-small fw-bold`}>
                              {getStatusStyles(job.status).label}
                            </Badge>
                            <span className="text-muted small"><i className="bi bi-clock me-1"></i> Posted {new Date(job.createdAt).toLocaleDateString('en-IN')}</span>
                          </div>
                          <h4 className="fw-bold text-dark mb-3">{job.title}</h4>
                          <Row className="small text-muted g-3 mb-4">
                            <Col sm={4}><i className="bi bi-tag-fill text-primary me-2"></i><strong>Category:</strong> {job.category}</Col>
                            <Col sm={4}><i className="bi bi-currency-rupee text-success me-1"></i><strong>Budget:</strong> ₹{job.budget.toLocaleString('en-IN')}</Col>
                            <Col sm={4}><i className="bi bi-geo-alt-fill text-danger me-2"></i><strong>Location:</strong> {job.district.replace('_', ' ')}</Col>
                          </Row>
                          <p className="text-secondary mb-0 line-clamp-2">{job.description}</p>
                        </Col>
                        <Col lg={4} className="text-lg-end mt-4 mt-lg-0">
                          <div className="btn-group shadow-sm rounded-pill overflow-hidden bg-white border">
                            {job.status === "OPEN" && (
                              <>
                                <Button variant="white" className="border-end px-4 py-2 small fw-bold text-dark hover-warning" onClick={() => handleEdit(job)}>
                                  <i className="bi bi-pencil-square me-2"></i>Edit
                                </Button>
                                <Button variant="white" className="px-4 py-2 small fw-bold text-danger hover-danger-bg" onClick={() => handleDelete(job.jobId, job.status, job.title)}>
                                  <i className="bi bi-trash3 me-2"></i>Delete
                                </Button>
                              </>
                            )}
                            {job.status !== "OPEN" && (
                              <Button variant="white" disabled className="px-4 py-2 small fw-bold text-muted">
                                <i className="bi bi-lock-fill me-2"></i>Contract Active
                              </Button>
                            )}
                          </div>
                        </Col>
                      </Row>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <style>{`
        .extra-small { font-size: 0.7rem; letter-spacing: 0.5px; }
        .hover-warning:hover { background-color: #facc15 !important; color: #000 !important; }
        .hover-danger-bg:hover { background-color: #dc3545 !important; color: #fff !important; }
        .card-hover-subtle { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card-hover-subtle:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.05) !important; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
};

export default MyJobs;