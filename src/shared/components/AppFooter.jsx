import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppFooter = () => (
  <footer className="mt-auto py-5" style={{ background: '#0f172a', color: '#94a3b8 border-top: 1px solid #1e293b' }}>
    <Container>
      <Row className="gy-4">
        {/* 🏢 Brand Column */}
        <Col lg={4} md={6}>
          <h5 className="text-white fw-bold mb-3">ShramikConnect</h5>
          <p className="small lh-lg" style={{ color: '#94a3b8' }}>
            Building a digital identity for India's skilled workforce. 
            We provide trust, transparency, and secure payments for every hand that builds our nation.
          </p>
          <div className="d-flex gap-3 mt-3">
            <a href="#" className="text-white-50 fs-5"><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-white-50 fs-5"><i className="bi bi-twitter-x"></i></a>
            <a href="#" className="text-white-50 fs-5"><i className="bi bi-linkedin"></i></a>
          </div>
        </Col>

        {/* 🔗 Quick Links */}
        <Col lg={2} md={6} className="ps-lg-5">
          <h6 className="text-white fw-bold mb-3">Platform</h6>
          <ul className="list-unstyled small d-grid gap-2">
            <li><Link to="/about" className="text-decoration-none text-reset hover-link">About Us</Link></li>
            <li><Link to="/contact" className="text-decoration-none text-reset hover-link">Contact Support</Link></li>
            <li><Link to="/worker/find-jobs" className="text-decoration-none text-reset hover-link">Find Work</Link></li>
          </ul>
        </Col>

        {/* ⚖️ Legal */}
        <Col lg={2} md={6}>
          <h6 className="text-white fw-bold mb-3">Legal</h6>
          <ul className="list-unstyled small d-grid gap-2">
            <li><span className="hover-link cursor-pointer">Privacy Policy</span></li>
            <li><span className="hover-link cursor-pointer">Terms of Service</span></li>
            <li><span className="hover-link cursor-pointer">Escrow Rules</span></li>
          </ul>
        </Col>

        {/* 📞 Contact Info */}
        <Col lg={4} md={6}>
          <h6 className="text-white fw-bold mb-3">Get in Touch</h6>
          <div className="small d-grid gap-2" style={{ color: '#94a3b8' }}>
            <div className="d-flex align-items-center">
              <i className="bi bi-envelope-at me-2 text-warning"></i>
              <span>support@shramikconnect.in</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-telephone me-2 text-warning"></i>
              <span>+91-XXXXXXXXXX</span>
            </div>
            <div className="d-flex align-items-start mt-2">
              <i className="bi bi-geo-alt me-2 text-warning"></i>
              <span>Pune, Maharashtra,<br />India - 411001</span>
            </div>
          </div>
        </Col>
      </Row>

      <hr className="my-5" style={{ borderColor: '#1e293b' }} />

      <Row className="align-items-center small pb-2">
        <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
          <p className="mb-0">© {new Date().getFullYear()} ShramikConnect. श्रम ही शक्ति है।</p>
        </Col>
        <Col md={6} className="text-center text-md-end">
          <span className="me-3">Proudly made in India 🇮🇳</span>
        </Col>
      </Row>
    </Container>

    <style>{`
      .hover-link:hover {
        color: #facc15 !important;
        transition: color 0.2s ease-in-out;
        cursor: pointer;
      }
      footer i:hover {
        color: #facc15 !important;
      }
    `}</style>
  </footer>
);

export default AppFooter;