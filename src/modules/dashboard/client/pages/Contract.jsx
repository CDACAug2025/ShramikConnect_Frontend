import { toast } from "react-toastify";

const Contract = () => {
  const contract = {
    jobTitle: "House Plumbing Repair",
    workerName: "Raj Kumar",
    amount: 15000,
    deadline: "2024-02-15",
    status: "Active",
    terms: "Work must be completed within the specified timeline. Payment will be released upon successful completion.",
    clientSigned: true,
    workerSigned: true
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Digital Contract</h2>

      <div className="card">
        <div className="card-header">
          <h5>Contract Details</h5>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <p><strong>Job:</strong> {contract.jobTitle}</p>
              <p><strong>Worker:</strong> {contract.workerName}</p>
              <p><strong>Amount:</strong> ₹{contract.amount}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Deadline:</strong> {contract.deadline}</p>
              <p><strong>Status:</strong> <span className="badge bg-success">{contract.status}</span></p>
            </div>
          </div>
          
          <div className="mb-3">
            <h6>Terms & Conditions</h6>
            <div className="alert alert-light">
              {contract.terms}
            </div>
          </div>
          
          <div className="mb-3">
            <h6>Signatures</h6>
            <div className="row">
              <div className="col-md-6">
                <span className={contract.clientSigned ? 'text-success' : 'text-danger'}>
                  {contract.clientSigned ? '✓' : '✗'} Client Signature
                </span>
              </div>
              <div className="col-md-6">
                <span className={contract.workerSigned ? 'text-success' : 'text-danger'}>
                  {contract.workerSigned ? '✓' : '✗'} Worker Signature
                </span>
              </div>
            </div>
          </div>
          
          <div className="btn-group">
            <button className="btn btn-primary">Download PDF</button>
            <button className="btn btn-secondary">View History</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contract;
