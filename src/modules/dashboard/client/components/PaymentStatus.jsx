const PaymentStatus = ({ status }) => {
  return (
    <div className="border p-3 rounded">
      <p>Payment Status: <b>{status}</b></p>
    </div>
  );
};

export default PaymentStatus;
