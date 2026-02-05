import { managerAPI, tlAPI, employeeAPI } from './api';

const getTasksByProject = async (pid) => {
  const response = await managerAPI.get(`/tasks/project/${pid}`);
  return response.data;
};

const getManagerPersonalTasks = async (uid) => {
  const response = await managerAPI.get(`/tasks/manager/${uid}`);
  return response.data;
};

const getTasksByProjectTL = async (pid) => {
  const response = await tlAPI.get(`/tasks/project/${pid}`);
  return response.data;
};

const getProjectsForTL = async (tlUid) => {
  const response = await tlAPI.get(`/team/projects/${tlUid}`);
  return response.data;
};

const getTasksAssignedToTL = async (tlUid) => {
  const response = await tlAPI.get(`/tasks/assigned/${tlUid}`);
  return response.data;
};

const getTasksByEmployee = async (uid) => {
  const response = await employeeAPI.get(`/tasks?uid=${uid}`);
  return response.data;
};

const createTask = async (taskData) => {
  const response = await managerAPI.post('/tasks', taskData);
  return response.data;
};

const assignTask = async (taskId, uid) => {
  const response = await managerAPI.put(`/tasks/${taskId}/assign/${uid}`);
  return response.data;
};

const updateTaskStatus = async (taskId, status, role, uid) => {
  let response;

  if (role === 'Manager') {
    response = await managerAPI.put(
      `/tasks/${taskId}/status?status=${status}`
    );
  } else if (role === 'Team Leader') {
    response = await tlAPI.put(`/tasks/${taskId}/status?status=${status}`);
  } else if (role === 'Employee') {
    response = await employeeAPI.put(
      `/tasks/${taskId}/status?status=${encodeURIComponent(status)}&uid=${uid || ''}`
    );
  }

  return response.data;
};

const taskService = {
  getTasksByProject,
  getManagerPersonalTasks,
  getTasksByProjectTL,
  getProjectsForTL,
  getTasksAssignedToTL,
  getTasksByEmployee,
  createTask,
  assignTask,
  updateTaskStatus,
};

export default taskService;
