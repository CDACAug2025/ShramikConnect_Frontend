const DisputeCard = ({ dispute }) => {
  return (
    <div className="border p-3 rounded">
      <p>Reason: {dispute.reason}</p>
      <p>Status: {dispute.status}</p>
      {dispute.decision && <p>Decision: {dispute.decision}</p>}
    </div>
  );
};

export default DisputeCard;
