import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardContent from '../components/DashboardContent';
import ManageEmployees from '../components/ManageEmployees';

const AdminDashboard = () => {
  const [menu, setMenu] = useState('dashboard');

  const renderContent = () => {
  if (menu === 'dashboard') return <DashboardContent />;
  if (menu === 'employees') return <ManageEmployees />;
};

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onMenuChange={setMenu} />
      <div style={{ flex: 1 }}>{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
