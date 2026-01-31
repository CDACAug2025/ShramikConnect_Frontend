import useClientContracts from "../hooks/useClientContracts";
import ClientContractCard from "../components/ClientContractCard";
import { getAuth } from "@/shared/utils/authUtils";

const ClientContracts = () => {
  const { userId } = getAuth();
  const clientId = userId || 1;
  const { contracts, loading, changeStatus } = useClientContracts(clientId);

  if (loading) return <p>Loading contracts...</p>;

  return (
    <div className="container mt-4">
      <h3>My Contracts</h3>

      {contracts.length === 0 && <p>No contracts found</p>}

      {contracts.map((contract) => (
        <ClientContractCard
          key={contract.contractId}
          contract={contract}
          onStatusChange={changeStatus}
        />
      ))}
    </div>
  );
};

export default ClientContracts;
