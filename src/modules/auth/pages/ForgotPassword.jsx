import React, { useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { forgotPasswordApi } from "../services/authApi";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPasswordApi(email);
      toast.success("Reset link sent to your email!");
    } catch (err) {
      toast.error("Account not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3" style={{ background: '#f8fafc' }}>
      <div className="bg-white p-5 shadow-lg text-center" style={{ maxWidth: '450px', borderRadius: '40px' }}>
        <div className="bg-warning bg-opacity-25 rounded-circle d-inline-flex p-3 mb-3">
          <i className="bi bi-key-fill fs-3 text-warning"></i>
        </div>
        <h3 className="fw-bold">Password Recovery</h3>
        <p className="text-muted small mb-4">Enter your email and we'll help you get back in.</p>
        
        <Form onSubmit={submit}>
          <InputGroup className="bg-light rounded-3 p-1 mb-4">
            <InputGroup.Text className="bg-transparent border-0"><i className="bi bi-envelope"></i></InputGroup.Text>
            <Form.Control type="email" className="bg-transparent border-0 py-2" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </InputGroup>
          <Button type="submit" className="w-100 py-3 fw-bold border-0" style={{ background: '#facc15', color: '#000', borderRadius: '15px' }}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </Form>
        <Link to="/login" className="d-block mt-4 text-decoration-none small fw-bold">Back to Sign In</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;