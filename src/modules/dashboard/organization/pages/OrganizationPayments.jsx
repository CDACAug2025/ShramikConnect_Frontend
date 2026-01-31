import { useEffect, useState } from 'react';
import OrganizationPaymentTable from '../components/OrganizationPaymentTable';
import { getAllPayments } from '../services/organizationPaymentService';

const OrganizationPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await getAllPayments();
      setPayments(response.data);
    } catch (error) {
      console.error('Failed to load payments', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading payments...</p>;

  return (
    <div className="page-container">
      <h2>Organization Payments</h2>
      <OrganizationPaymentTable payments={payments} />
    </div>
  );
};

export default OrganizationPayments;
