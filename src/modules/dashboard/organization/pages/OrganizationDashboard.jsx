import React from 'react';
import { useOrgData } from '../hooks/useOrgData';

const OrganizationDashboard = () => {
    const { orgName } = useOrgData();

    return (
        <div className="org-dashboard">
            <main style={{ padding: '20px' }}>
                <h1>Organization Dashboard</h1>
                <p>Welcome, {orgName}!</p>
                <p>Select an option from the navbar to get started.</p>
            </main>
        </div>
    );
};

export default OrganizationDashboard;