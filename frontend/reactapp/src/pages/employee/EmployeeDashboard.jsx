import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Dashboard from './Dashboard';
import TaskKanban from './TaskKanban';
import Queries from './Queries';
import '../admin/AdminDashboard.css';

const EmployeeDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-container">
        <Sidebar role={user.role} />
        <main className="admin-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/task/:taskId" element={<TaskKanban />} />
            <Route path="/queries" element={<Queries />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
