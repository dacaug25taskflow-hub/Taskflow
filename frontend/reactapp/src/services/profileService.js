import { adminAPI, managerAPI, tlAPI, employeeAPI } from './api';

const getProfile = async (uid, role) => {
  let response;
  if (role === 'Admin') {
    response = await adminAPI.get(`/users/${uid}`);
  } else if (role === 'Manager') {
    response = await managerAPI.get(`/users/${uid}`);
  } else if (role === 'Team Leader') {
    response = await tlAPI.get(`/users/${uid}`);
  } else if (role === 'Employee') {
    response = await employeeAPI.get(`/users/${uid}`);
  } else {
    throw new Error('Invalid role');
  }
  return response.data;
};

const updateProfile = async (uid, data, role) => {
  let response;
  if (role === 'Admin') {
    response = await adminAPI.put(`/users/${uid}/profile`, data);
  } else if (role === 'Manager') {
    response = await managerAPI.put(`/users/${uid}/profile`, data);
  } else if (role === 'Team Leader') {
    response = await tlAPI.put(`/users/${uid}/profile`, data);
  } else if (role === 'Employee') {
    response = await employeeAPI.put(`/users/${uid}/profile`, data);
  } else {
    throw new Error('Invalid role');
  }
  return response.data;
};

export default { getProfile, updateProfile };
