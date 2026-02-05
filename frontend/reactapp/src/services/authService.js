import { authAPI, adminAPI, managerAPI, tlAPI, employeeAPI } from './api';

const login = async (credentials) => {
  const response = await authAPI.post('/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem(
      'user',
      JSON.stringify({
        uid: response.data.uid,
        uname: response.data.uname,
        email: response.data.email,
        role: response.data.role,
      })
    );
  }
  return {
    token: response.data.token,
    user: {
      uid: response.data.uid,
      uname: response.data.uname,
      email: response.data.email,
      role: response.data.role,
    },
  };
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const changePassword = async (uid, currentPassword, newPassword, role) => {
  let response;

  if (role === 'Admin') {
    response = await adminAPI.put(`/users/${uid}/password`, {
      currentPassword,
      newPassword,
    });
  } else if (role === 'Manager') {
    response = await managerAPI.put(`/users/${uid}/password`, {
      currentPassword,
      newPassword,
    });
  } else if (role === 'Team Leader') {
    response = await tlAPI.put(`/users/${uid}/password`, {
      currentPassword,
      newPassword,
    });
  } else if (role === 'Employee') {
    response = await employeeAPI.put(`/users/${uid}/password`, {
      currentPassword,
      newPassword,
    });
  }

  return response.data;
};

const authService = {
  login,
  logout,
  changePassword,
};

export default authService;
