const ProgressCard = ({ status, onComplete }) => {
  return (
    <div className="border p-3 rounded">
      <p>Status: {status}</p>

      {status !== "Completed" && (
        <button
          onClick={onComplete}
          className="bg-green-600 text-white px-3 py-1 mt-2 rounded"
        >
          Mark Completed
        </button>
      )}
    </div>
  );
};

export default ProgressCard;
