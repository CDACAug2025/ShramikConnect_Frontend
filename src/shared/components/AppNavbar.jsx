import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, clearAuth } from '@/shared/utils/authUtils';
import { clearToken } from '@/shared/utils/tokenUtils';
import axiosInstance from '@/services/axiosInstance';

const AppNavbar = () => {
  const navigate = useNavigate();
  const { token, role, name } = getAuth();
  const [notifications, setNotifications] = useState([]);

  // ✅ FIXED: Fetch alerts without double '/api' prefix
  const fetchAlerts = async () => {
    if (!token) return;
    try {
      const res = await axiosInstance.get('/notifications/unread');
      setNotifications(res.data || []);
    } catch (err) {
      console.error("Alert sync failed:", err);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60000);
    return () => clearInterval(interval);
  }, [token]);

  const handleLogout = () => {
    clearToken();
    clearAuth();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">ShramikConnect</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {/* ---------- PUBLIC ---------- */}
            {!token && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              </>
            )}

            {/* ---------- WORKER ---------- */}
            {role === 'WORKER' && (
              <>
                <Nav.Link as={Link} to="/worker/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/worker/active-jobs">Active Jobs</Nav.Link>
                <Nav.Link as={Link} to="/worker/my-applications">My Applications</Nav.Link>
                
               
                <Nav.Link as={Link} to="/worker/find-jobs">Find Job</Nav.Link>
                
                <Nav.Link as={Link} to="/worker/wallet">Wallet</Nav.Link>
                <Nav.Link as={Link} to="/worker/history">History</Nav.Link>
              </>
            )}

            {/* ---------- CLIENT / ORGANIZATION (Add others as needed) ---------- */}
            {role === 'CLIENT' && (
              <>
                <Nav.Link as={Link} to="/client/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/client/post-job">Post Job</Nav.Link>
                <Nav.Link as={Link} to="/client/contracts">Contracts</Nav.Link>
              </>
            )}
            
            {/* ... other roles (Admin, Supervisor) remain the same ... */}
          </Nav>

          <Nav className="align-items-center gap-3">
            {token && (
              <>
                {/* 🔔 NOTIFICATION BELL */}
                <Dropdown align="end">
                  <Dropdown.Toggle variant="transparent" className="p-0 border-0 position-relative no-caret">
                    <i className="bi bi-bell-fill fs-5 text-white-50"></i>
                    {notifications.length > 0 && (
                      <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle border border-2 border-dark" style={{ fontSize: '0.6rem' }}>
                        {notifications.length}
                      </Badge>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="shadow-lg border-0 mt-3" style={{ width: '280px' }}>
                    <div className="p-3 border-bottom fw-bold small">Notifications</div>
                    {notifications.length > 0 ? notifications.map(n => (
                      <Dropdown.Item key={n.id} className="p-3 small border-bottom text-wrap">{n.message}</Dropdown.Item>
                    )) : <div className="p-3 text-center text-muted small">No new messages</div>}
                  </Dropdown.Menu>
                </Dropdown>

                <NavDropdown title={name || 'Account'} align="end">
                  <NavDropdown.Item as={Link} to={`/${role?.toLowerCase()}/profile`}>Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="text-danger">Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {!token && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <style>{`.no-caret::after { display: none !important; }`}</style>
    </Navbar>
  );
};

export default AppNavbar;