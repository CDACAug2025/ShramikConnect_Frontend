import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createContractApi } from '@/modules/contracts/services/contractApi';
import { toast } from 'react-toastify';

const ContractWelcome = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [amount, setAmount] = useState('');
  const [terms, setTerms] = useState('');

  const handleCreate = async () => {
    try {
      await createContractApi({
        jobId: applicationId,       // backend resolves job
        workerId: applicationId,    // backend resolves worker
        agreedAmount: amount,
      });

      toast.success('Contract created in negotiation');
      navigate('/organization/contracts');
    } catch (e) {
      toast.error('Failed to create contract');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Create Contract</h3>

      <div className="mb-3">
        <label>Agreed Amount</label>
        <input
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Contract Terms</label>
        <textarea
          className="form-control"
          rows="4"
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={handleCreate}>
        Create Contract
      </button>
    </div>
  );
};

export default ContractWelcome;
