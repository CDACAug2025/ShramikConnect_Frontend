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
    const data = await getClientApplications();
    setApplications(data || []);
  };

  const handleStatus = async (id, status) => {
    await updateClientApplicationStatus(id, status);
    loadApplications();
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

      {applications.map((app) => (
        <div key={app.applicationId} className="card p-3 mb-2">
          <p><b>{app.jobTitle}</b></p>
          <p>Worker: {app.workerName}</p>
          <p>Status: {app.status}</p>

          {app.status === "APPLIED" && (
            <button
              className="btn btn-success btn-sm"
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
        </div>
      ))}

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
