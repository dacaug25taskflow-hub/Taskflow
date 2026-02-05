import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { LogOut, Settings, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>TaskFlow</h1>
          <span className="role-badge">{user?.role}</span>
        </div>

        <div className="navbar-actions">
          <div className="user-menu">
            <div className="user-avatar">
              <User size={20} />
            </div>
            <div className="user-info">
              <span className="user-name">{user?.uname}</span>
              <span className="user-email">{user?.email}</span>
            </div>
          </div>

          <button className="nav-icon-btn" onClick={() => navigate('/settings')}>
            <Settings size={20} />
          </button>

          <button className="nav-icon-btn logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
