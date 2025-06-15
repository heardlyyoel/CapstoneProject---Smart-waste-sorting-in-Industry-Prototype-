import React from 'react';
import { useNavigate } from 'react-router-dom';

const SidebarEmployee = ({ setMenu }) => {
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
      color: '#fff',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <h3>Employee Menu</h3>
      <button onClick={() => setMenu('dashboard')} style={{ marginTop: '10px' }}>
        📊 Dashboard
      </button>

      <div
        onClick={logout}
        style={{
          cursor: 'pointer',
          marginTop: '30px',
          color: 'lightcoral'
        }}
      >
        🔓 Logout
      </div>
    </div>
  );
};

export default SidebarEmployee;
