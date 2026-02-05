import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardCounts } from '../../redux/slices/userSlice';
import { getAllProjects } from '../../redux/slices/projectSlice';
import { Users, FolderKanban, UserCog, UserCheck } from 'lucide-react';
import Loading from '../../components/Loading';
import BackButton from '../../components/BackButton';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardCounts, isLoading } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(getDashboardCounts());
    dispatch(getAllProjects());
  }, [dispatch]);

  if (isLoading) {
    return <Loading fullScreen />;
  }

  const stats = [
    {
      title: 'Total Users',
      value: dashboardCounts?.totalUsers || 0,
      icon: <Users size={32} />,
      color: '#6366f1',
    },
    {
      title: 'Managers',
      value: dashboardCounts?.managers || 0,
      icon: <UserCog size={32} />,
      color: '#8b5cf6',
    },
    {
      title: 'Team Leaders',
      value: dashboardCounts?.teamLeaders || 0,
      icon: <UserCheck size={32} />,
      color: '#ec4899',
    },
    {
      title: 'Total Projects',
      value: projects?.length || 0,
      icon: <FolderKanban size={32} />,
      color: '#06b6d4',
    },
  ];

  return (
    <div className="dashboard-page">
      <BackButton to="/admin" />
      <div className="dashboard-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Manage your organization</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div 
              className="stat-icon" 
              style={{ background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)` }}
            >
              {stat.icon}
            </div>
            <div className="stat-info">
              <p className="stat-label">{stat.title}</p>
              <h2 className="stat-value">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="activity-card">
          <h3>Recent Activity</h3>
          <p className="text-secondary">Manage users, projects, and domains from the sidebar</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
