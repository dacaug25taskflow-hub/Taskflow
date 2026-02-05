import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ListTodo,
  Briefcase,
  MessageSquare,
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ role }) => {
  const getMenuItems = () => {
    switch (role) {
      case 'Admin':
        return [
          { path: '/admin', icon: <LayoutDashboard />, label: 'Dashboard' },
          { path: '/admin/users', icon: <Users />, label: 'Users' },
          { path: '/admin/projects', icon: <FolderKanban />, label: 'Projects' },
          { path: '/admin/domains', icon: <Briefcase />, label: 'Domains' },
        ];

      case 'Manager':
        return [
          { path: '/manager', icon: <LayoutDashboard />, label: 'Dashboard' },
          { path: '/manager/projects', icon: <FolderKanban />, label: 'Projects' },
          { path: '/manager/teams', icon: <Users />, label: 'Create Team' },
          { path: '/manager/queries', icon: <MessageSquare />, label: 'Queries' },
        ];

      case 'Team Leader':
        return [
          { path: '/team-leader', icon: <LayoutDashboard />, label: 'Dashboard' },
          { path: '/team-leader/tasks', icon: <ListTodo />, label: 'My Tasks' },
          { path: '/team-leader/queries', icon: <MessageSquare />, label: 'Queries' },
        ];

      case 'Employee':
        return [
          { path: '/employee', icon: <LayoutDashboard />, label: 'Dashboard' },
          { path: '/employee/queries', icon: <MessageSquare />, label: 'Queries' },
        ];

      default:
        return [];
    }
  };

  return (
    <aside className="sidebar">
      <nav>
        {getMenuItems().map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
