import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createContract } from "../services/clientContractService";
import { toast } from "react-toastify";
import { getAuth } from "@/shared/utils/authUtils";

const CreateClientContract = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = getAuth(); // Get actual client ID from auth
  const clientId = userId || 1; // fallback to 1 if not available

  const [form, setForm] = useState({
    jobId: "",
    workerId: "",
    agreedAmount: "",
    contractTerms: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (location.state) {
      setForm(prev => ({
        ...prev,
        jobId: location.state.jobId || "",
        workerId: location.state.workerId || ""
      }));
    }
  }, [location.state]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Creating contract with data:', form);
      console.log('Location state:', location.state);
      console.log('Client ID:', clientId);
      
      // Include job title and applicant name from navigation state
      const contractData = {
        ...form,
        jobTitle: location.state?.jobTitle || `Job ${form.jobId}`,
        applicantName: location.state?.applicantName || `Worker ${location.state?.workerId || 'Unknown'}`
      };
      
      console.log('Contract data being sent:', contractData);
      
      await createContract(clientId, contractData);
      toast.success("Contract created successfully!");
      navigate('/client/contracts');
    } catch (error) {
      console.error('Contract creation error:', error.response?.data || error.message);
      toast.error("Failed to create contract!");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Create Contract</h3>
      {location.state && (
        <div className="alert alert-info mb-3">
          <strong>Job:</strong> {location.state.jobTitle} | <strong>Worker:</strong> {location.state.applicantName}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Agreed Amount</label>
          <input 
            name="agreedAmount" 
            type="number"
            value={form.agreedAmount}
            className="form-control" 
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input 
            name="startDate" 
            type="date" 
            value={form.startDate}
            className="form-control" 
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input 
            name="endDate" 
            type="date" 
            value={form.endDate}
            className="form-control" 
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contract Terms</label>
          <textarea
            name="contractTerms"
            value={form.contractTerms}
            className="form-control"
            rows="4"
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">Create Contract</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/client/applications')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateClientContract;
