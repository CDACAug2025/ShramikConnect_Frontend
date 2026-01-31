import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPasswordApi } from "../services/authApi";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const ResetPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = () => {
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();

    const validationError = validatePassword();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await resetPasswordApi(token, password, confirmPassword);
      alert("Password reset successful. Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Invalid or expired token");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-3">Reset Password</h3>

      <form onSubmit={submit}>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <ul className="small text-muted mb-3">
          <li>Minimum 8 characters</li>
          <li>At least 1 uppercase letter</li>
          <li>At least 1 number</li>
          <li>At least 1 special character</li>
        </ul>

        <button className="btn btn-success w-100">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
