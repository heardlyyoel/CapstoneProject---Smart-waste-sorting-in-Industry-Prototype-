import React from 'react';

const DashboardContent = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>System Dashboard</h2>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{
          flex: 1,
          backgroundColor: '#ecf0f1',
          padding: '20px',
          borderRadius: '10px'
        }}>
          <h4>Camera Feed (Dummy)</h4>
          <div style={{
            width: '100%',
            height: '200px',
            backgroundColor: '#bdc3c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#7f8c8d'
          }}>
            [Camera Stream]
          </div>
        </div>
        <div style={{
          flex: 1,
          backgroundColor: '#ecf0f1',
          padding: '20px',
          borderRadius: '10px'
        }}>
          <h4>Trash Analysis</h4>
          <p>Organik: 60%</p>
          <p>Anorganik: 40%</p>
        </div>
        <div style={{
          flex: 1,
          backgroundColor: '#ecf0f1',
          padding: '20px',
          borderRadius: '10px'
        }}>
          <h4>System Status</h4>
          <p>Status: 🟢 Running</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
