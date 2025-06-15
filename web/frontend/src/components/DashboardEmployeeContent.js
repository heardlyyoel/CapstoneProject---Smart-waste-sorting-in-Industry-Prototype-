import React from 'react';

const DashboardEmployeeContent = () => {
  const handleReport = () => {
    alert("Report sent to admin (dummy)");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Employee Dashboard</h2>
      <div style={{
        width: '100%',
        height: '300px',
        backgroundColor: '#ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px'
      }}>
        <p>[Camera Stream - Dummy]</p>
      </div>
      <button onClick={handleReport} style={{ marginTop: '20px' }}>
        ⚠️ Report Error to Admin
      </button>
    </div>
  );
};

export default DashboardEmployeeContent;
