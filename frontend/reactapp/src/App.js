import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import TeamLeaderDashboard from './pages/teamleader/TeamLeaderDashboard';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import Settings from './pages/Settings';

function App() {
  const { user } = useSelector((state) => state.auth);

  const PrivateRoute = ({ children, allowedRoles }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  };

  return (
    <Routes>
      {/* Home page - accessible without authentication */}
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={
          !user ? (
            <Login />
          ) : (
            <Navigate to="/welcome" />
          )
        }
      />

      {/* Welcome page for authenticated users */}
      <Route
        path="/welcome"
        element={
          <PrivateRoute>
            <Welcome />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <PrivateRoute allowedRoles={['Admin']}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/manager/*"
        element={
          <PrivateRoute allowedRoles={['Manager']}>
            <ManagerDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/team-leader/*"
        element={
          <PrivateRoute allowedRoles={['Team Leader']}>
            <TeamLeaderDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/employee/*"
        element={
          <PrivateRoute allowedRoles={['Employee']}>
            <EmployeeDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />

      <Route
        path="/unauthorized"
        element={
          <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>
            <h1>Unauthorized Access</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default App;