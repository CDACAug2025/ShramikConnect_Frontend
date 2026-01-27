import { useState } from "react";
import { useJobs } from "../hooks/useJobs";
import { toast } from "react-toastify";

const MyJobs = () => {
  const { jobs, removeJob, editJob } = useJobs();
  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (job) => {
    setEditingJob(job.jobId);
    setEditForm({
      title: job.title,
      category: job.category,
      description: job.description,
      budget: job.budget,
      duration: job.duration,
      location: job.location,
      district: job.district
    });
  };

  const handleSaveEdit = async () => {
    try {
      await editJob(editingJob, editForm);
      setEditingJob(null);
      toast.success("Job updated successfully!");
    } catch {
      toast.error("Failed to update job!");
    }
  };

  const handleDelete = async (id, status, title) => {
    if (status !== "OPEN") {
      return toast.error("Cannot delete job that is in progress or completed!");
    }

    if (window.confirm(`Delete job: ${title}?`)) {
      try {
        await removeJob(id);
        toast.success("Job deleted successfully!");
      } catch {
        toast.error("Failed to delete job!");
      }
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'OPEN': return 'bg-primary';
      case 'IN_PROGRESS': return 'bg-warning';
      case 'COMPLETED': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Posted Jobs</h2>
        <span className="badge bg-info">{jobs.length} Total Jobs</span>
      </div>

      {jobs.length === 0 ? (
        <div className="alert alert-info text-center">
          <h5>No Jobs Posted Yet</h5>
          <p>You haven't posted any jobs. Click "Post Job" to get started!</p>
        </div>
      ) : (
        jobs.map(job => (
          <div key={job.jobId} className="card mb-3">
            <div className="card-body">
              {editingJob === job.jobId ? (
                <div>
                  <input 
                    className="form-control mb-2" 
                    value={editForm.title} 
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                  />
                  <select 
                    className="form-select mb-2" 
                    value={editForm.category} 
                    onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Painting">Painting</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Gardening">Gardening</option>
                  </select>
                  <textarea 
                    className="form-control mb-2" 
                    value={editForm.description} 
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  />
                  <input 
                    type="number" 
                    className="form-control mb-2" 
                    value={editForm.budget} 
                    onChange={(e) => setEditForm({...editForm, budget: e.target.value})}
                  />
                  <input 
                    className="form-control mb-2" 
                    value={editForm.duration} 
                    onChange={(e) => setEditForm({...editForm, duration: e.target.value})}
                  />
                  <input 
                    className="form-control mb-2" 
                    value={editForm.location} 
                    onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                  />
                  <input 
                    className="form-control mb-2" 
                    value={editForm.district} 
                    onChange={(e) => setEditForm({...editForm, district: e.target.value})}
                  />
                  <button className="btn btn-success btn-sm me-2" onClick={handleSaveEdit}>Save</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setEditingJob(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title">{job.title}</h5>
                    <span className={`badge ${getStatusBadge(job.status)}`}>
                      {job.status}
                    </span>
                  </div>
                  
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p className="card-text">
                        <strong>Category:</strong> {job.category}<br/>
                        <strong>Budget:</strong> ₹{job.budget}<br/>
                        <strong>Duration:</strong> {job.duration}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="card-text">
                        <strong>Location:</strong> {job.location}<br/>
                        <strong>District:</strong> {job.district}<br/>
                        <strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <p className="card-text">
                    <strong>Description:</strong> {job.description}
                  </p>
                  
                  <div className="btn-group" role="group">
                    {job.status === "OPEN" && (
                      <>
                        <button 
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleEdit(job)}
                        >
                          Edit Job
                        </button>
                        <button
                          onClick={() => handleDelete(job.jobId, job.status, job.title)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyJobs;
