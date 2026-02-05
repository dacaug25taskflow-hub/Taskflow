import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import ProjectManagement from './ProjectManagement';
import DomainManagement from './DomainManagement';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-container">
        <Sidebar role={user.role} />
        <main className="admin-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/projects" element={<ProjectManagement />} />
            <Route path="/domains" element={<DomainManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
