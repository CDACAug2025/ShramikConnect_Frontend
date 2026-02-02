import { useJobHistory } from "../hooks/useJobHistory";

const JobHistory = () => {
  const { jobs, contracts, payments, loading } = useJobHistory();

  const totalSpent = payments.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );

  const avgRating =
    jobs.length > 0
      ? (
          jobs.reduce((sum, job) => sum + (job.rating || 0), 0) / jobs.length
        ).toFixed(1)
      : "0.0";

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <h5>Loading job history...</h5>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Job History & Records</h2>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h5>Total Jobs</h5>
              <h3>{jobs.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h5>Total Spent</h5>
              <h3>₹{totalSpent}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h5>Avg Rating</h5>
              <h3>{avgRating}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Completed Jobs */}
      <div className="card">
        <div className="card-header">
          <h5>Completed Jobs</h5>
        </div>

        <div className="card-body">
          {jobs.length === 0 ? (
            <p className="text-muted text-center mb-0">
              No completed jobs found.
            </p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="d-flex justify-content-between align-items-center border-bottom py-3"
              >
                <div>
                  <h6 className="mb-1">{job.title}</h6>
                  <small className="text-muted">
                    {job.workerName || "Worker"}
                  </small>
                </div>

                <div className="text-end">
                  <div>
                    <strong>₹{job.amount}</strong>
                  </div>
                  {job.rating && (
                    <div>
                      <span className="text-warning">★</span> {job.rating}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobHistory;
