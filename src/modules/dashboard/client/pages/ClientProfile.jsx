import { useEffect, useState } from "react";
import { useClientProfile } from "../hooks/useClientProfile";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ClientProfile = () => {
  const { profile, loading, saveProfile, deleteAccount } = useClientProfile();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    district: "",
    address: ""
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name,
        mobile: profile.mobile,
        district: profile.district,
        address: profile.address
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

  const handleDelete = async () => {
    if (!window.confirm("Are you sure? Your account will be blocked.")) return;
    await deleteAccount();
    toast.success("Account blocked");
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Client Profile</h2>

      <input
        className="form-control mb-2"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        name="mobile"
        placeholder="Mobile"
        value={form.mobile}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        name="district"
        placeholder="District"
        value={form.district}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      />

      <p>
        KYC Status:{" "}
        <b className={profile?.kycVerified ? "text-success" : "text-danger"}>
          {profile?.kycVerified ? "Verified" : "Pending"}
        </b>
      </p>

      <button className="btn btn-primary me-2" onClick={handleSubmit}>
        Update Profile
      </button>

      <button className="btn btn-danger" onClick={handleDelete}>
        Delete Account
      </button>
    </div>
  );
};

export default ClientProfile;
