import axiosInstance from "../../../../services/axiosInstance";

export const createContract = (clientId, data) => {
  // Temporary localStorage implementation until backend is ready
  const contracts = JSON.parse(localStorage.getItem('contracts') || '[]');
  const newContract = {
    contractId: Date.now(),
    job: { 
      jobId: data.jobId, 
      title: data.jobTitle || "Untitled Job"
    },
    worker: {
      name: data.applicantName || "Unknown Worker"
    },
    client: { userId: clientId },
    agreedAmount: data.agreedAmount,
    contractTerms: data.contractTerms,
    startDate: data.startDate,
    endDate: data.endDate,
    status: 'DRAFT',
    createdAt: new Date().toISOString()
  };
  contracts.push(newContract);
  localStorage.setItem('contracts', JSON.stringify(contracts));
  return Promise.resolve({ data: newContract });
};

export const getClientContracts = (clientId) => {
  // Get contracts from localStorage
  const contracts = JSON.parse(localStorage.getItem('contracts') || '[]');
  const clientContracts = contracts.filter(c => c.client.userId === clientId);
  return Promise.resolve({ data: clientContracts });
};

export const updateContractStatus = (contractId, status) => {
  // Update contract status in localStorage
  const contracts = JSON.parse(localStorage.getItem('contracts') || '[]');
  const updatedContracts = contracts.map(contract => 
    contract.contractId === contractId 
      ? { ...contract, status }
      : contract
  );
  localStorage.setItem('contracts', JSON.stringify(updatedContracts));
  return Promise.resolve({ data: { contractId, status } });
};
