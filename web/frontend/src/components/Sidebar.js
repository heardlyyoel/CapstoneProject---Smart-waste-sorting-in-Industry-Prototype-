import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onMenuChange }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{
      width: '200px',
      height: '100vh',
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <h3>Admin Panel</h3>
      <div style={{ marginTop: '30px' }}>
        <div onClick={() => onMenuChange('employees')} style={{ cursor: 'pointer', marginBottom: '15px' }}>
          👥 Manage Employees
        </div>
        <div onClick={() => onMenuChange('dashboard')} style={{ cursor: 'pointer', marginBottom: '15px' }}>
          📊 Open Dashboard
        </div>
        <div onClick={logout} style={{ cursor: 'pointer', marginTop: '30px', color: 'lightcoral' }}>
          🔓 Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
