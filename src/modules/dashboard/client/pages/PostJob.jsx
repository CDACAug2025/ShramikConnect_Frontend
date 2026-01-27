import { useState } from "react";
import { useJobs } from "../hooks/useJobs";
import { toast } from "react-toastify";

const PostJob = () => {
  const { addJob } = useJobs();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    budget: "",
    duration: "",
    location: "",
    district: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addJob(form);
      toast.success("Job posted successfully!");

      setForm({
        title: "",
        category: "",
        description: "",
        budget: "",
        duration: "",
        location: "",
         district: ""
      });
    } catch {
      toast.error("Failed to post job!");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Post New Job</h2>

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input 
                    name="title" 
                    placeholder="Job Title"
                    className="form-control"
                    value={form.title}
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <select 
                    name="category"
                    className="form-select"
                    value={form.category}
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Painting">Painting</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Gardening">Gardening</option>
                  </select>
                </div>

                <div className="mb-3">
                  <textarea 
                    name="description"
                    placeholder="Job Description"
                    className="form-control"
                    rows="3"
                    value={form.description}
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <input 
                    name="budget" 
                    type="number"
                    placeholder="Budget (₹)"
                    className="form-control"
                    value={form.budget}
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <input 
                    name="duration"
                    placeholder="Work Duration (e.g., 2 days, 1 week)"
                    className="form-control"
                    value={form.duration}
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <input 
                    name="location"
                    placeholder="Location"
                    className="form-control"
                    value={form.location}
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <input 
                    name="district"
                    placeholder="district"
                    className="form-control"
                    value={form.district}
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Post Job
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
