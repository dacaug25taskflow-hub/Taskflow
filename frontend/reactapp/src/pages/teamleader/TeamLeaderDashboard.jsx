import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Queries from './Queries';
import '../admin/AdminDashboard.css';

const TeamLeaderDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-container">
        <Sidebar role={user.role} />
        <main className="admin-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/queries" element={<Queries />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default TeamLeaderDashboard;
