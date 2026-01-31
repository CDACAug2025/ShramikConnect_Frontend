import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  Badge,
  Button,
  Modal,
  Form,
  Alert,
} from 'react-bootstrap';
import { useOrgData } from '../hooks/useOrgData';
import axiosInstance from '@/services/axiosInstance';

const OrganizationHome = () => {
  const { orgName } = useOrgData();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMyJobs, setShowMyJobs] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const endpoint = showMyJobs ? '/jobs/my-jobs' : '/jobs/all';
      const response = await axiosInstance.get(endpoint);
      setJobs(response.data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [showMyJobs]);

  const isMyJob = (job) => {
    const userId = localStorage.getItem('userId');
    return job.postedByUserId === parseInt(userId);
  };

  const handleEdit = (job) => {
    setEditingJob({ ...job });
    setShowEditModal(true);
    setError(null);
    setSuccess(null);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/jobs/${editingJob.jobId}`, {
        title: editingJob.title,
        description: editingJob.description,
        category: editingJob.category,
        budget: parseFloat(editingJob.budget),
        location: editingJob.location,
        district: editingJob.district,
      });
      setSuccess('Job updated successfully!');
      setShowEditModal(false);
      fetchJobs();
    } catch (err) {
      setError('Failed to update job');
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axiosInstance.delete(`/organization/jobs/${jobId}`);
        setSuccess('Job deleted successfully!');
        fetchJobs();
      } catch (err) {
        setError('Failed to delete job');
      }
    }
  };

  const handleInputChange = (e) => {
    setEditingJob({ ...editingJob, [e.target.name]: e.target.value });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN':
        return 'success';
      case 'IN_PROGRESS':
        return 'warning';
      case 'COMPLETED':
        return 'info';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <h1 className="display-4 mb-4">Welcome to ShramikConnect</h1>
        <h2 className="mb-4">Hello, {orgName}!</h2>
        <p className="lead">
          Manage your organization, post jobs, and connect with skilled workers.
        </p>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{showMyJobs ? 'My Jobs' : 'All Jobs'}</h3>
        <div>
          <Button
            variant={showMyJobs ? 'primary' : 'outline-primary'}
            className="me-2"
            onClick={() => setShowMyJobs(true)}
          >
            My Jobs
          </Button>
          <Button
            variant={!showMyJobs ? 'primary' : 'outline-primary'}
            onClick={() => setShowMyJobs(false)}
          >
            All Jobs
          </Button>
        </div>
      </div>
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <Row>
          {jobs.map((job) => (
            <Col md={6} lg={4} key={job.jobId} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Text>{job.description}</Card.Text>
                  <div className="mb-2">
                    <small className="text-muted">
                      <strong>Category:</strong> {job.category}
                      <br />
                      <strong>Budget:</strong> ₹{job.budget}
                      <br />
                      <strong>Location:</strong> {job.location}, {job.district}
                    </small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Badge bg={getStatusColor(job.status)}>{job.status}</Badge>
                    {(showMyJobs || isMyJob(job)) && (
                      <div>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="me-2"
                          onClick={() => handleEdit(job)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDelete(job.jobId)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Edit Job Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingJob && (
            <Form onSubmit={handleSaveEdit}>
              <Form.Group className="mb-3">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  name="title"
                  value={editingJob.title}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={editingJob.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  name="category"
                  value={editingJob.category}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Budget</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="budget"
                  value={editingJob.budget}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  name="location"
                  value={editingJob.location}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>District</Form.Label>
                <Form.Control
                  name="district"
                  value={editingJob.district}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <div className="d-flex gap-2">
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OrganizationHome;
