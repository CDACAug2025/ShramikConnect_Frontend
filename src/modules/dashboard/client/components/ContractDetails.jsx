const ContractDetails = ({ contract }) => {
  return (
    <div className="border p-4 rounded">
      <p>Amount: ₹{contract.amount}</p>
      <p>Deadline: {contract.deadline}</p>
      <p>Status: {contract.status}</p>
    </div>
  );
};

export default ContractDetails;
