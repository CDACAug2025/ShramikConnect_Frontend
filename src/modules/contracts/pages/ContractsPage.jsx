import { useEffect, useState } from 'react';
import {
  getMyContractsApi,
  updateContractStatusApi,
} from '../services/contractApi';
import { getAuth } from '@/shared/utils/authUtils';

const ContractsPage = () => {
  const { role } = getAuth();
  const [contracts, setContracts] = useState([]);

  const loadContracts = async () => {
    const res = await getMyContractsApi();
    setContracts(res.data || []);
  };

  useEffect(() => {
    loadContracts();
  }, []);

  const updateStatus = async (id, status) => {
    await updateContractStatusApi(id, status);
    loadContracts();
  };

  return (
    <div className="container mt-4">
      <h3>My Contracts</h3>

      {contracts.length === 0 && (
        <p className="text-muted">No contracts found</p>
      )}

      {contracts.map((c) => (
        <div key={c.contractId} className="card p-3 mb-3">
          <h5>{c.jobTitle}</h5>
          <p>Status: <b>{c.status}</b></p>
          <p>Amount: ₹{c.agreedAmount}</p>

          {/* WORKER */}
          {role === 'WORKER' && c.status === 'NEGOTIATION' && (
            <button
              className="btn btn-success btn-sm"
              onClick={() => updateStatus(c.contractId, 'SIGNED')}
            >
              Sign Contract
            </button>
          )}

          {/* ORGANIZATION
          {role === 'ORGANIZATION' && c.status === 'SIGNED' && (
            <button
              className="btn btn-warning btn-sm"
              onClick={() => updateStatus(c.contractId, 'ACTIVE')}
            >
              Start Work
            </button>
          )} */}

          {(role === 'ORGANIZATION' || role === 'CLIENT') && c.status === 'ACTIVE' && (
            <span className="badge bg-success">Work in progress</span>
          )}


          {/* 
          {role === 'CLIENT' && c.status === 'SIGNED' && (
            <button
              className="btn btn-warning btn-sm"
              onClick={() => updateStatus(c.contractId, 'ACTIVE')}
            >
              Start Work
            </button>
          )} */}

          {/* WORKER */}
          {role === 'WORKER' && c.status === 'ACTIVE' && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => updateStatus(c.contractId, 'COMPLETED')}
            >
              Mark Completed
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContractsPage;
