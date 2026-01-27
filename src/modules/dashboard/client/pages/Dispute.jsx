import { useState } from "react";
import { toast } from "react-toastify";

const Dispute = () => {
  const [reason, setReason] = useState("");
  
  const dispute = {
    jobTitle: "House Plumbing Repair",
    workerName: "Raj Kumar",
    reason: "Work was not completed as per specifications. Pipes are still leaking.",
    status: "Under Review",
    createdDate: "2024-01-15"
  };

  const handleSubmit = () => {
    if (reason.trim()) {
      toast.success("Dispute raised successfully");
      setReason("");
    } else {
      toast.error("Please enter dispute reason");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dispute Management</h2>

      {dispute ? (
        <div className="card">
          <div className="card-header">
            <h5>{dispute.jobTitle}</h5>
          </div>
          <div className="card-body">
            <p><strong>Worker:</strong> {dispute.workerName}</p>
            <p><strong>Status:</strong> <span className="badge bg-warning">{dispute.status}</span></p>
            <p><strong>Created:</strong> {dispute.createdDate}</p>
            
            <div className="mt-3">
              <h6>Dispute Reason:</h6>
              <div className="alert alert-light">
                {dispute.reason}
              </div>
            </div>
            
            {dispute.status === 'Under Review' && (
              <div className="alert alert-warning">
                ⚠️ Your dispute is being reviewed by our supervisors.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <h5>Raise a New Dispute</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Describe the issue:</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Please provide detailed information about the issue..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            
            <div className="alert alert-info">
              <h6>Before raising a dispute:</h6>
              <ul className="mb-0">
                <li>Try to resolve the issue directly with the worker</li>
                <li>Provide clear evidence and documentation</li>
                <li>Be specific about what went wrong</li>
              </ul>
            </div>
            
            <button onClick={handleSubmit} className="btn btn-danger">
              Raise Dispute
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dispute;
