import { useState, useEffect } from "react";
import { useClientProfile } from "../hooks/useClientProfile";
import { toast } from "react-toastify";

const ClientProfile = () => {
  const { profile, loading, saveProfile } = useClientProfile();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    district: "",
    bankAccount: ""
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name,
        email: profile.email,
        mobile: profile.mobile,
        district: profile.district,
        bankAccount: profile.bankAccount
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await saveProfile(form);
    toast.success("Profile updated successfully");
  };

  if (loading) return <div className="container mt-4"><p>Loading...</p></div>;

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Client Profile Management</h2>
          
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <input
                  className="form-control"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-3">
                <input
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-3">
                <input
                  className="form-control"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={form.mobile}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-3">
                <input
                  className="form-control"
                  name="district"
                  placeholder="District"
                  value={form.district}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-3">
                <input
                  className="form-control"
                  name="bankAccount"
                  placeholder="Bank / Payment Details"
                  value={form.bankAccount}
                  onChange={handleChange}
                />
              </div>
              
              <p className="text-muted small">
                KYC Status: {" "}
                <span className={profile?.kycVerified ? "text-success" : "text-danger"}>
                  <strong>{profile?.kycVerified ? "Verified" : "Pending"}</strong>
                </span>
              </p>
              
              <button
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
