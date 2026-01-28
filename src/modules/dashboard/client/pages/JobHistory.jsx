const JobHistory = () => {
  const jobs = [
    { id: 1, title: "Kitchen Plumbing Repair", workerName: "Raj Kumar", amount: 12000, status: "Completed", rating: 4.5 },
    { id: 2, title: "Living Room Painting", workerName: "Amit Singh", amount: 18000, status: "Completed", rating: 4.8 },
    { id: 3, title: "Electrical Wiring", workerName: "Suresh Yadav", amount: 25000, status: "Completed", rating: 4.2 }
  ];

  const totalSpent = jobs.reduce((sum, job) => sum + job.amount, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Job History & Records</h2>

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
              <h3>{(jobs.reduce((sum, job) => sum + job.rating, 0) / jobs.length).toFixed(1)}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Completed Jobs</h5>
        </div>
        <div className="card-body">
          {jobs.map(job => (
            <div key={job.id} className="d-flex justify-content-between align-items-center border-bottom py-3">
              <div>
                <h6 className="mb-1">{job.title}</h6>
                <small className="text-muted">{job.workerName}</small>
              </div>
              <div className="text-end">
                <div><strong>₹{job.amount}</strong></div>
                <div><span className="text-warning">★</span> {job.rating}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobHistory;
