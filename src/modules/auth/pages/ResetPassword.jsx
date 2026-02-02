import React, { useState } from "react";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/services/axiosInstance";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token"); // Extracts token from URL

  const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setLoading(true);
    try {
      await axiosInstance.post("/auth/reset-password", {
        token,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      });
      toast.success("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      toast.error(err.response?.data || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <Container style={{ maxWidth: "450px" }}>
        <Card className="shadow-lg border-0 rounded-4 p-4">
          <Card.Body>
            <h3 className="fw-bold text-center mb-4">Set New Password</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">New Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-muted">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </Form.Group>
              <Button type="submit" className="w-100 py-2 fw-bold" disabled={loading}>
                {loading ? "Updating..." : "Reset Password"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ResetPassword;