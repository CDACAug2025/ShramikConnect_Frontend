import React, { useState, useEffect } from "react";
import { Container, Table, Badge, Spinner, Alert } from "react-bootstrap";
import { workerApi } from "../services/workerDashboardApi";

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await workerApi.getMyApplications();
        setApplications(res.data || []);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Failed to load applications from the database.");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Status badge helper (UNCHANGED)
  const getStatusBadge = (status) => {
    switch (status) {
      case "SHORTLISTED":
        return <Badge bg="warning" text="dark">Shortlisted</Badge>;
      case "REJECTED":
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="primary">Applied</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Syncing with database...</p>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>My Applications</h3>
        <Badge bg="dark">Total: {applications.length}</Badge>
      </div>

      <Table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Job Title</th>
            <th>Location</th>
            <th>Budget</th>
            <th>Applied Date</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {applications.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-muted py-4">
                You haven't applied to any jobs yet.
              </td>
            </tr>
          )}

          {applications.map((app) => (
            <tr key={app.application_id}>
              <td>{app.application_id}</td>

              <td>
                <div className="fw-semibold">
                  {app.title || "Job Title Not Found"}
                </div>
              </td>

              <td>{app.location || "N/A"}</td>

              <td className="fw-bold text-success">
                ₹{app.budget?.toLocaleString("en-IN") || "0"}
              </td>

              <td>
                {app.applied_at
                  ? new Date(app.applied_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "N/A"}
              </td>

              <td className="text-center">
                {getStatusBadge(app.status)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MyApplicationsPage;
