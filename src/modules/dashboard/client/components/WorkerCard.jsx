const WorkerCard = ({ worker, onSelect, onReject }) => {
  return (
    <div className="border p-3 rounded mb-2">
      <p><b>{worker.name}</b></p>
      <p>Skills: {worker.skills}</p>
      <p>Experience: {worker.experience} yrs</p>
      <p>KYC: {worker.kycVerified ? "Verified" : "Pending"}</p>

      <div className="mt-2">
        <button onClick={onSelect} className="bg-green-500 text-white px-2 py-1 mr-2 rounded">
          Select
        </button>
        <button onClick={onReject} className="bg-red-500 text-white px-2 py-1 rounded">
          Reject
        </button>
      </div>
    </div>
  );
};

export default WorkerCard;
