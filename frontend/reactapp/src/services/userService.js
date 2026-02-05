import { adminAPI } from './api';

const getAllUsers = async () => {
  const response = await adminAPI.get('/users');
  return response.data;
};

const createUser = async (userData) => {
  const response = await adminAPI.post('/users', userData);
  return response.data;
};

const updateUser = async (uid, userData) => {
  const response = await adminAPI.put(`/users/${uid}`, userData);
  return response.data;
};

const deleteUser = async (uid) => {
  await adminAPI.delete(`/users/${uid}`);
};

const getDashboardCounts = async () => {
  const response = await adminAPI.get('/dashboard/counts');
  return response.data;
};

const userService = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getDashboardCounts,
};

export default userService;
