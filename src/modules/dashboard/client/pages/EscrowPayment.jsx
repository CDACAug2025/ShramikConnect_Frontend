import { toast } from "react-toastify";

const EscrowPayment = () => {
  const payment = {
    jobTitle: "House Plumbing Repair",
    workerName: "Raj Kumar",
    amount: 15000,
    status: "EscrowHeld",
    escrowId: "ESC123456"
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Escrow Payment Management</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h5>{payment.jobTitle}</h5>
          <p><strong>Worker:</strong> {payment.workerName}</p>
          <p><strong>Amount:</strong> ₹{payment.amount}</p>
          <p><strong>Escrow ID:</strong> {payment.escrowId}</p>
          <p><strong>Status:</strong> <span className="badge bg-warning">{payment.status}</span></p>
        </div>
      </div>

      <div className="alert alert-info">
        <h6>How Escrow Works:</h6>
        <ul className="mb-0">
          <li>Payment is held securely until job completion</li>
          <li>Worker gets paid only after your approval</li>
          <li>Dispute resolution available if needed</li>
        </ul>
      </div>

      <div className="d-grid gap-2 d-md-flex">
        {payment.status === "Pending" && (
          <button className="btn btn-primary">Pay & Hold in Escrow</button>
        )}
        {payment.status === "EscrowHeld" && (
          <>
            <button className="btn btn-success">Release Payment</button>
            <button className="btn btn-danger">Raise Dispute</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EscrowPayment;
