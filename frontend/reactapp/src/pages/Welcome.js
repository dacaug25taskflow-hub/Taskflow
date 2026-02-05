import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import './Welcome.css';

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to respective dashboard based on role
          switch (user?.role) {
            case 'Admin':
              navigate('/admin');
              break;
            case 'Manager':
              navigate('/manager');
              break;
            case 'Team Leader':
              navigate('/team-leader');
              break;
            case 'Employee':
              navigate('/employee');
              break;
            default:
              navigate('/login');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, user]);

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'Admin':
        return 'Administrator';
      case 'Manager':
        return 'Manager';
      case 'Team Leader':
        return 'Team Leader';
      case 'Employee':
        return 'Employee';
      default:
        return 'User';
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-icon">
          <CheckCircle size={80} />
        </div>
        <h1 className="welcome-title">Welcome Back!</h1>
        <p className="welcome-message">
          Hello, <span className="user-name">{user?.fname} {user?.lname}</span>!
        </p>
        <p className="role-message">
          You are logged in as <span className="role-badge">{getRoleDisplayName(user?.role)}</span>
        </p>
        <div className="countdown-container">
          <div className="countdown-circle">
            <span className="countdown-number">{countdown}</span>
          </div>
          <p className="countdown-text">Redirecting to your dashboard...</p>
        </div>
        <button 
          className="skip-button" 
          onClick={() => {
            switch (user?.role) {
              case 'Admin':
                navigate('/admin');
                break;
              case 'Manager':
                navigate('/manager');
                break;
              case 'Team Leader':
                navigate('/team-leader');
                break;
              case 'Employee':
                navigate('/employee');
                break;
              default:
                navigate('/login');
            }
          }}
        >
          Skip to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Welcome;
