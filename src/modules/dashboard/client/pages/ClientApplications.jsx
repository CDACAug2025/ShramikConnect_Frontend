import { useEffect, useState } from "react";
import {
  getClientApplications,
  updateClientApplicationStatus,
} from "../services/clientApplicationService";
import CreateContractModal from "../../../contracts/components/CreateContractModal";
import { toast } from "react-toastify";
import { CheckCircle, FilePlus, User, Briefcase, Info, AlertCircle } from "lucide-react"; // Modern Icons

const ClientApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await getClientApplications();
      setApplications(data || []);
    } catch (err) {
      toast.error("Failed to load applications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateClientApplicationStatus(id, status);
      toast.success(`Application updated to ${status}`);
      loadApplications();
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  const openContractModal = (app) => {
    if (app.status !== "SHORTLISTED") {
      toast.error("Please shortlist the worker before creating a contract");
      return;
    }
    setSelectedApp(app);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "APPLIED": return <span className="badge rounded-pill bg-info bg-opacity-10 text-info border border-info px-3">Applied</span>;
      case "SHORTLISTED": return <span className="badge rounded-pill bg-warning bg-opacity-10 text-warning border border-warning px-3">Shortlisted</span>;
      case "CONTRACTED": return <span className="badge rounded-pill bg-success bg-opacity-10 text-success border border-success px-3">Contracted</span>;
      default: return <span className="badge rounded-pill bg-secondary bg-opacity-10 text-secondary border border-secondary px-3">{status || "Pending"}</span>;
    }
  };

  return (
    <div className="container py-5">
      {/* Header & Stats Section */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-6">
          <h2 className="fw-bold text-dark">Application Management</h2>
          <p className="text-muted">Review worker applications and initiate contracts</p>
        </div>
        <div className="col-md-6 d-flex justify-content-md-end gap-3">
            <div className="p-3 bg-white shadow-sm rounded-4 border text-center" style={{ minWidth: "120px" }}>
                <small className="text-muted d-block fw-bold text-uppercase">Total</small>
                <span className="h4 fw-bold mb-0 text-primary">{applications.length}</span>
            </div>
            <div className="p-3 bg-white shadow-sm rounded-4 border text-center" style={{ minWidth: "120px" }}>
                <small className="text-muted d-block fw-bold text-uppercase">New</small>
                <span className="h4 fw-bold mb-0 text-info">{applications.filter(a => a.status === 'APPLIED').length}</span>
            </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light text-muted small text-uppercase">
              <tr>
                <th className="ps-4 py-3">Reference</th>
                <th className="py-3">Job Title</th>
                <th className="py-3">Worker Profile</th>
                <th className="py-3">Current Status</th>
                <th className="text-end pe-4 py-3">Next Step</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                  <tr><td colSpan="5" className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></td></tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <AlertCircle size={40} className="text-light mb-2" />
                    <p className="text-muted">No active applications currently available.</p>
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.applicationId} className="transition-all">
                    <td className="ps-4">
                        <span className="fw-bold text-dark">#APP-{app.applicationId}</span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Briefcase size={16} className="text-primary me-2" />
                        <span className="fw-semibold">{app.jobTitle}</span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="bg-secondary bg-opacity-10 p-2 rounded-circle me-2 text-secondary">
                          <User size={16} />
                        </div>
                        <span>{app.workerName || "Anonymous Worker"}</span>
                      </div>
                    </td>
                    <td>{getStatusBadge(app.status)}</td>
                    <td className="text-end pe-4">
                      {app.status === "APPLIED" && (
                        <button
                          className="btn btn-outline-success btn-sm rounded-pill px-3 shadow-sm"
                          onClick={() => handleStatus(app.applicationId, "SHORTLISTED")}
                        >
                          <CheckCircle size={14} className="me-1" /> Shortlist
                        </button>
                      )}

                      {app.status === "SHORTLISTED" && (
                        <button
                          className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm"
                          onClick={() => openContractModal(app)}
                        >
                          <FilePlus size={14} className="me-1" /> Create Contract
                        </button>
                      )}

                      {app.status !== "APPLIED" && app.status !== "SHORTLISTED" && (
                        <span className="text-muted small italic">Processing complete</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Helper Info */}
      <div className="mt-4 d-flex align-items-center p-3 bg-primary bg-opacity-10 rounded-4 text-primary border border-primary border-opacity-25">
        <Info size={20} className="me-2" />
        <small className="fw-medium">Workers must be shortlisted before a contract can be legally generated.</small>
      </div>

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