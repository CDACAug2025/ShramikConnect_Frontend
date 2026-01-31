import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getOrganizationApplications,
  updateApplicationStatus,
} from '../services/organizationApplicationService';
import { toast } from 'react-toastify';

const OrganizationApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await getOrganizationApplications();
      setApplications(data);
    } catch (err) {
      toast.error('Failed to load applications');
      console.error(err);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      toast.success(`Application ${status}`);
      loadApplications();
    } catch (err) {
      toast.error('Action failed');
    }
  };

  const handleMakeContract = (id) => {
    navigate(`/organization/contract/${id}`);
  };

  return (
    <div className="container mt-4">
      <h3>Organization Applications</h3>

      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Worker</th>
            <th>Status</th>
            <th style={{ width: '260px' }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.applicationId}>
              <td>{app.applicationId}</td>
              <td>{app.workerName || 'N/A'}</td>
              <td>{app.status || 'PENDING'}</td>

              <td>
                {/* SHORTLISTED */}
                {app.status === 'SHORTLISTED' ? (
                  <>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleMakeContract(app.applicationId)}
                    >
                      Make Contract
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleStatus(app.applicationId, 'REJECTED')
                      }
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  /* PENDING or REJECTED */
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() =>
                        handleStatus(app.applicationId, 'SHORTLISTED')
                      }
                    >
                      Shortlist
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleStatus(app.applicationId, 'REJECTED')
                      }
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrganizationApplications;
