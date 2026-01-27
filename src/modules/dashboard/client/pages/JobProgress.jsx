import { toast } from "react-toastify";

const JobProgress = () => {
  const progress = {
    jobTitle: "House Plumbing Repair",
    workerName: "Raj Kumar",
    status: "In Progress",
    completionPercentage: 65,
    milestones: [
      { id: 1, title: "Initial Assessment", completed: true },
      { id: 2, title: "Material Purchase", completed: true },
      { id: 3, title: "Pipe Installation", completed: true },
      { id: 4, title: "Testing & Cleanup", completed: false },
      { id: 5, title: "Final Inspection", completed: false }
    ]
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Job Progress Tracking</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h5>{progress.jobTitle}</h5>
          <p><strong>Worker:</strong> {progress.workerName}</p>
          <p><strong>Status:</strong> <span className="badge bg-primary">{progress.status}</span></p>
          
          <div className="mb-3">
            <label className="form-label">Progress: {progress.completionPercentage}%</label>
            <div className="progress">
              <div className="progress-bar" style={{width: `${progress.completionPercentage}%`}}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Milestones</h5>
        </div>
        <div className="card-body">
          {progress.milestones.map(milestone => (
            <div key={milestone.id} className="d-flex align-items-center mb-2">
              <span className={`badge me-2 ${
                milestone.completed ? 'bg-success' : 'bg-secondary'
              }`}>
                {milestone.completed ? '✓' : '○'}
              </span>
              <span>{milestone.title}</span>
            </div>
          ))}
          
          <button className="btn btn-success mt-3">
            Mark as Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobProgress;
