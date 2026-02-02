import { useEffect, useState } from "react";
import {
  getClientApplications,
  updateClientApplicationStatus,
} from "../services/clientApplicationService";
import CreateContractModal from "../../../contracts/components/CreateContractModal";
import { toast } from "react-toastify";

const ClientApplications = () => {
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await getClientApplications();
      setApplications(data || []);
    } catch (err) {
      toast.error("Failed to load applications");
      console.error(err);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateClientApplicationStatus(id, status);
      toast.success(`Application ${status}`);
      loadApplications();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const openContractModal = (app) => {
    if (app.status !== "SHORTLISTED") {
      toast.error("Application must be shortlisted first");
      return;
    }
    setSelectedApp(app);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h3>Client Applications</h3>

      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Job</th>
            <th>Worker</th>
            <th>Status</th>
            <th style={{ width: "260px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {applications.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No applications found
              </td>
            </tr>
          )}

          {applications.map((app) => (
            <tr key={app.applicationId}>
              <td>{app.applicationId}</td>
              <td>{app.jobTitle}</td>
              <td>{app.workerName || "N/A"}</td>
              <td>
                <span className="badge bg-secondary">
                  {app.status || "PENDING"}
                </span>
              </td>

              <td>
                {app.status === "APPLIED" && (
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() =>
                      handleStatus(app.applicationId, "SHORTLISTED")
                    }
                  >
                    Shortlist
                  </button>
                )}

                {app.status === "SHORTLISTED" && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => openContractModal(app)}
                  >
                    Create Contract
                  </button>
                )}

                {app.status !== "APPLIED" &&
                  app.status !== "SHORTLISTED" && (
                    <span className="text-muted">No actions</span>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CreateContractModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setSelectedApp(null);
          loadApplications();
        }}
        application={selectedApp}
      />
    </div>
  );
};

export default ClientApplications;
