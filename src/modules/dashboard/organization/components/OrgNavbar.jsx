import React from 'react';

const OrgNavbar = ({ orgName }) => {
    return (
        <nav style={styles.navbar}>
            <div className="welcome-msg">Welcome, {orgName}!</div>
            <div className="nav-buttons">
                <button onClick={() => console.log("Profile Clicked")}>Profile</button>
                <button onClick={() => console.log("Post Job Clicked")}>Post Jobs</button>

            </div>
        </nav>
    );
};

const styles = {
    navbar: { 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '1rem', 
        background: '#f4f4f4',
        position: 'fixed',
        top: '56px',
        left: 0,
        right: 0,
        zIndex: 1000
    }
};

export default OrgNavbar;