import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '@/services/axiosInstance';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    location: '',
    district: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const payload = {
        ...jobData,
        budget: parseFloat(jobData.budget)
      };
      
      await axiosInstance.post('/jobs', payload);
      alert('Job posted successfully!');
      navigate('/organization/home');
    } catch (err) {
      setError('Failed to post job: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Card>
        <Card.Header>
          <h4>Post New Job</h4>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                name="title"
                value={jobData.title}
                onChange={handleChange}
                required
                placeholder="Enter job title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={jobData.description}
                onChange={handleChange}
                required
                placeholder="Enter job description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                value={jobData.category}
                onChange={handleChange}
                required
                placeholder="e.g. Construction, IT, etc."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Budget</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="budget"
                value={jobData.budget}
                onChange={handleChange}
                required
                placeholder="Enter budget amount"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                name="location"
                value={jobData.location}
                onChange={handleChange}
                required
                placeholder="Enter job location"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>District</Form.Label>
              <Form.Control
                name="district"
                value={jobData.district}
                onChange={handleChange}
                required
                placeholder="Enter district"
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Posting...' : 'Post Job'}
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/organization/home')}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostJob;