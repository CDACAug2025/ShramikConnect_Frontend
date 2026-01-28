import { useState, useEffect, useMemo } from 'react';
import AdminService from '../../../services/AdminService';

const usePayments = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalHeld: 0, totalReleased: 0, failedCount: 0 });

    // Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            const res = await AdminService.getTransactions();
            setTransactions(res.data);
            calculateStats(res.data);
        } catch (err) { console.error(err); } 
        finally { setLoading(false); }
    };

    const calculateStats = (data) => {
        const held = data.filter(t => t.status === 'Held in Escrow').reduce((sum, t) => sum + t.amount, 0);
        const released = data.filter(t => t.status === 'Released' || t.status === 'Completed').reduce((sum, t) => sum + t.amount, 0);
        const failed = data.filter(t => t.status === 'Failed').length;
        setStats({ totalHeld: held, totalReleased: released, failedCount: failed });
    };

    const handleRelease = async (id) => {
        if (!window.confirm("Release payment?")) return;
        try {
            await AdminService.releaseEscrow(id);
            const updated = transactions.map(t => t.id === id ? { ...t, status: "Released" } : t);
            setTransactions(updated);
            calculateStats(updated);
        } catch (err) { alert("Release failed"); }
    };

    const handleDownloadReport = () => { alert("Report download started..."); };

    // Filtering Logic
    const filteredTransactions = useMemo(() => {
        return transactions.filter(txn => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = txn.id?.toLowerCase().includes(searchLower) || txn.client?.toLowerCase().includes(searchLower);
            const matchesStatus = statusFilter === 'All' || txn.status === statusFilter;
            const matchesType = typeFilter === 'All' || txn.type === typeFilter;
            return matchesSearch && matchesStatus && matchesType;
        });
    }, [transactions, searchQuery, statusFilter, typeFilter]);

    return { 
        transactions: filteredTransactions, stats, loading, handleRelease, handleDownloadReport,
        searchQuery, setSearchQuery, statusFilter, setStatusFilter, typeFilter, setTypeFilter 
    };
};

export default usePayments;