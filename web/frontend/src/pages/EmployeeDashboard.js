import React, { useState } from 'react';
import SidebarEmployee from '../components/SidebarEmployee';
import DashboardEmployeeContent from '../components/DashboardEmployeeContent';

const EmployeeDashboard = () => {
  const [menu, setMenu] = useState('dashboard');

  const renderContent = () => {
    if (menu === 'dashboard') return <DashboardEmployeeContent />;
    return null;
  };

  return (
    <div style={{ display: 'flex' }}>
      <SidebarEmployee setMenu={setMenu} />
      <div style={{ flex: 1 }}>{renderContent()}</div>
    </div>
  );
};

export default EmployeeDashboard;
