import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
