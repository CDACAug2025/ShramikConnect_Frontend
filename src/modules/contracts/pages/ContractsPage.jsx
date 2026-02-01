import { useEffect, useState } from 'react';
import {
  getMyContractsApi,
  updateContractStatusApi,
} from '../services/contractApi';
import { getAuth } from '@/shared/utils/authUtils';

const ContractsPage = () => {
  const { role } = getAuth();
  const [contracts, setContracts] = useState([]);

  const load = async () => {
    const res = await getMyContractsApi();
    setContracts(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await updateContractStatusApi(id, status);
    load();
  };

  return (
    <div className="container mt-4">
      <h3>My Contracts</h3>

      {contracts.map((c) => (
        <div key={c.contractId} className="card p-3 mb-3">
          <h5>{c.jobTitle}</h5>
          <p>Worker: {c.workerName}</p>
          <p>Status: <b>{c.status}</b></p>
          <p>Amount: ₹{c.agreedAmount}</p>

          {/* ───────── WORKER ACTIONS ───────── */}
          {role === 'WORKER' && c.status === 'NEGOTIATION' && (
            <button
              className="btn btn-success btn-sm"
              onClick={() => updateStatus(c.contractId, 'SIGNED')}
            >
              Sign Contract
            </button>
          )}

          {role === 'WORKER' && c.status === 'ACTIVE' && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => updateStatus(c.contractId, 'COMPLETED')}
            >
              Mark Work Completed
            </button>
          )}

          {/* ───────── ORGANIZATION ACTIONS ───────── */}
          {role === 'ORGANIZATION' && c.status === 'SIGNED' && (
            <button
              className="btn btn-warning btn-sm"
              onClick={() => updateStatus(c.contractId, 'ACTIVE')}
            >
              Confirm & Start Work
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContractsPage;
