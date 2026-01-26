import { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { fetchPendingKycs, decideKyc } from '../services/kycApi';

const KycListPage = () => {
  const [kycs, setKycs] = useState([]);

  const loadKycs = async () => {
    const res = await fetchPendingKycs();
    setKycs(res.data);
  };

  useEffect(() => {
    loadKycs();
  }, []);

  const handleDecision = async (kycId, decision) => {
    await decideKyc(kycId, decision);
    loadKycs();
  };

  return (
    <Container className="py-4">
      <h4>Pending KYC Requests</h4>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Document</th>
            <th>Document No</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {kycs.map(k => (
            <tr key={k.kycId}>
              <td>{k.userName}</td>
              <td>{k.email}</td>
              <td>{k.documentType}</td>
              <td>{k.documentNumber}</td>
              <td className="d-flex gap-2">
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => handleDecision(k.kycId, 'APPROVED')}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDecision(k.kycId, 'REJECTED')}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default KycListPage;
