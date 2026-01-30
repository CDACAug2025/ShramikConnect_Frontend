import React, { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout'; 
import usePayments from '../hooks/usePayments';

const PaymentsPage = () => {
  const { transactions, escrowFunds, loading, downloadReport, releaseEscrow } = usePayments();
  const [activeTab, setActiveTab] = useState('all'); 

  if (loading) return <AdminLayout><div className="p-5 text-center">Loading Financial Data...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="w-100">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">Financial Oversight</h2>
            <p className="text-muted mb-0">Track revenue, escrow holdings, and payment history.</p>
          </div>
          <button onClick={downloadReport} className="btn btn-dark fw-bold shadow-sm">
            <i className="bi bi-file-earmark-spreadsheet me-2"></i> Export Report
          </button>
        </div>

        {/* --- TABS --- */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button 
                  className={`nav-link fw-bold px-4 ${activeTab === 'all' ? 'active text-primary border-bottom-primary' : 'text-secondary border-0'}`}
                  onClick={() => setActiveTab('all')}
                >
                  All Transactions
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link fw-bold px-4 ${activeTab === 'escrow' ? 'active text-primary border-bottom-primary' : 'text-secondary border-0'}`}
                  onClick={() => setActiveTab('escrow')}
                >
                  Escrow Management 🛡️
                </button>
              </li>
            </ul>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light text-secondary text-uppercase small">
                  {activeTab === 'all' ? (
                    <tr>
                      <th className="ps-4 py-3">Transaction ID</th>
                      <th>Date</th>
                      <th>User</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  ) : (
                    <tr>
                      <th className="ps-4 py-3">Escrow ID</th>
                      <th>Related Job</th>
                      <th>Release Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th className="text-end pe-4">Action</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {/* --- TAB 1: ALL TRANSACTIONS --- */}
                  {activeTab === 'all' && transactions.map((txn) => (
                    <tr key={txn.id}>
                      <td className="ps-4 fw-bold text-primary">{txn.id}</td>
                      <td>{txn.date}</td>
                      <td>{txn.user}</td>
                      <td><span className="badge bg-light text-dark border">{txn.type}</span></td>
                      <td className="fw-bold">₹{txn.amount.toLocaleString()}</td>
                      <td>
                        <span className={`badge rounded-pill px-3 ${
                          txn.status === 'COMPLETED' ? 'bg-success bg-opacity-10 text-success' : 
                          txn.status === 'PENDING' ? 'bg-warning bg-opacity-10 text-warning' : 'bg-danger bg-opacity-10 text-danger'
                        }`}>
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {/* --- TAB 2: ESCROW --- */}
                  {activeTab === 'escrow' && escrowFunds.map((esc) => (
                    <tr key={esc.id}>
                      <td className="ps-4 fw-bold">{esc.id}</td>
                      <td>{esc.job}</td>
                      <td className="text-muted small">{esc.releaseDate}</td>
                      <td className="fw-bold">₹{esc.amount.toLocaleString()}</td>
                      <td>
                        <span className={`badge rounded-pill px-3 ${esc.status === 'HELD' ? 'bg-warning bg-opacity-10 text-warning' : 'bg-success bg-opacity-10 text-success'}`}>
                          {esc.status}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        {esc.status === 'HELD' ? (
                          <button onClick={() => releaseEscrow(esc.id)} className="btn btn-sm btn-success fw-bold px-3">Release</button>
                        ) : (
                          <span className="text-muted small"><i className="bi bi-check2-all text-success me-1"></i> Released</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PaymentsPage;