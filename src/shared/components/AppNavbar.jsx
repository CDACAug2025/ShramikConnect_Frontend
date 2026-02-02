import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Dropdown
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, clearAuth } from '@/shared/utils/authUtils';
import { clearToken } from '@/shared/utils/tokenUtils';
import axiosInstance from '@/services/axiosInstance';

const AppNavbar = () => {
  const navigate = useNavigate();
  const { token, role, name } = getAuth();
  const [notifications, setNotifications] = useState([]);

  // 🔔 Fetch unread notifications
  const fetchNotifications = async () => {
    if (!token) return;
    try {
      const res = await axiosInstance.get('/notifications/unread');
      setNotifications(res.data || []);
    } catch (err) {
      console.error('Notification fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
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
        <Navbar.Brand as={Link} to="/">
          <strong>Shramik</strong>Connect
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>

          {/* ================= LEFT LINKS ================= */}
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
                <Nav.Link as={Link} to="/worker/find-jobs">Find Jobs</Nav.Link>
                <Nav.Link as={Link} to="/worker/my-applications">Applications</Nav.Link>
                <Nav.Link as={Link} to="/worker/active-jobs">Active Jobs</Nav.Link>
                <Nav.Link as={Link} to="/worker/contracts">Contracts</Nav.Link>
                <Nav.Link as={Link} to="/worker/wallet">Wallet</Nav.Link>
                <Nav.Link as={Link} to="/worker/history">History</Nav.Link>
              </>
            )}

            {/* ---------- ORGANIZATION ---------- */}
            {role === 'ORGANIZATION' && (
              <>
                <Nav.Link as={Link} to="/organization/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/organization/post-job">Post Job</Nav.Link>
                <Nav.Link as={Link} to="/organization/applications">Applications</Nav.Link>
                <Nav.Link as={Link} to="/organization/contracts">Contracts</Nav.Link>
                <Nav.Link as={Link} to="/organization/payments">Payments</Nav.Link>
              </>
            )}

            {/* ---------- CLIENT ---------- */}
            {role === 'CLIENT' && (
              <>
                <Nav.Link as={Link} to="/client/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/client/post-job">Post Job</Nav.Link>
                <Nav.Link as={Link} to="/client/my-jobs">My Jobs</Nav.Link>
                <Nav.Link as={Link} to="/client/applications">Applications</Nav.Link>
                <Nav.Link as={Link} to="/client/contracts">Contracts</Nav.Link>
                <Nav.Link as={Link} to="/client/job-history">History</Nav.Link>
              </>
            )}

            {/* ---------- ADMIN ---------- */}
            {role === 'ADMIN' && (
              <>
                <Nav.Link as={Link} to="/admin/users">Users</Nav.Link>
                <Nav.Link as={Link} to="/admin/monitoring">Monitoring</Nav.Link>
                <Nav.Link as={Link} to="/admin/payments">Payments</Nav.Link>
                <Nav.Link as={Link} to="/admin/settings">Settings</Nav.Link>
              </>
            )}
          </Nav>

          {/* ================= RIGHT SIDE ================= */}
          <Nav className="align-items-center gap-3">

            {/* 🔔 NOTIFICATIONS */}
            {token && (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="transparent"
                  className="p-0 border-0 position-relative no-caret"
                >
                  <i className="bi bi-bell-fill fs-5 text-white-50"></i>
                  {notifications.length > 0 && (
                    <Badge
                      pill
                      bg="danger"
                      className="position-absolute top-0 start-100 translate-middle"
                      style={{ fontSize: '0.6rem' }}
                    >
                      {notifications.length}
                    </Badge>
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow border-0 mt-3" style={{ width: 280 }}>
                  <div className="px-3 py-2 fw-bold border-bottom small">
                    Notifications
                  </div>

                  {notifications.length > 0 ? (
                    notifications.map(n => (
                      <Dropdown.Item key={n.id} className="small text-wrap border-bottom">
                        {n.message}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <div className="p-3 text-center text-muted small">
                      No new notifications
                    </div>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}

            {/* 👤 ACCOUNT */}
            {token ? (
              <NavDropdown title={name || 'Account'} align="end">
                <NavDropdown.Item as={Link} to={`/${role?.toLowerCase()}/profile`}>
                  Profile
                </NavDropdown.Item>

                {role === 'WORKER' && (
                  <NavDropdown.Item as={Link} to="/worker/raise-dispute">
                    Raise Dispute
                  </NavDropdown.Item>
                )}

                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={handleLogout}
                  className="text-danger"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* remove caret arrow from bell */}
      <style>{`.no-caret::after { display: none !important; }`}</style>
    </Navbar>
  );
};

export default AppNavbar;
