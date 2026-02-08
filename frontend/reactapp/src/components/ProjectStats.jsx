import React from 'react';
import { CheckCircle, Clock, AlertTriangle, Layout } from 'lucide-react';
import './ProjectStats.css';

const ProjectStats = ({ tasks = [] }) => {
  // Logic to calculate stats from the tasks array
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => ['DONE', 'COMPLETED'].includes(t.status?.toUpperCase())).length,
    inProgress: tasks.filter(t => ['IN_PROGRESS', 'INPROGRESS'].includes(t.status?.toUpperCase())).length,
    urgent: tasks.filter(t => ['HIGH', 'CRITICAL'].includes(t.priority?.toUpperCase()) && t.status !== 'DONE').length
  };

  const statCards = [
    { label: 'Total Tasks', value: stats.total, icon: Layout, color: 'blue' },
    { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'orange' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'green' },
    { label: 'Urgent Pending', value: stats.urgent, icon: AlertTriangle, color: 'red' },
  ];

  return (
    <div className="stats-grid">
      {statCards.map((stat, index) => (
        <div key={index} className={`stat-card border-${stat.color}`}>
          <div className={`icon-wrapper bg-${stat.color}`}>
            <stat.icon size={24} color="white" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;