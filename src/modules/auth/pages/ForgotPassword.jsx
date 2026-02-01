import { useState } from "react";
import { forgotPasswordApi } from "../services/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPasswordApi(email);
      alert("Password reset link sent to email");
    } catch (err) {
      alert(err.response?.data || "Error sending email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Forgot Password</h3>

      <form onSubmit={submit}>
        <input
          className="form-control mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;