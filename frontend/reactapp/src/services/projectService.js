import { adminAPI, managerAPI } from './api';

const getAllProjects = async () => {
  const response = await adminAPI.get('/projects');
  return response.data;
};

const getProjectsByManager = async (managerId) => {
  const response = await managerAPI.get(`/projects/manager/${managerId}`);
  return response.data;
};

const createProject = async (projectData) => {
  const response = await adminAPI.post('/projects', projectData);
  return response.data;
};

const updateProject = async (pid, projectData) => {
  const response = await adminAPI.put(`/projects/${pid}`, projectData);
  return response.data;
};

const deleteProject = async (pid) => {
  await adminAPI.delete(`/projects/${pid}`);
};

const projectService = {
  getAllProjects,
  getProjectsByManager,
  createProject,
  updateProject,
  deleteProject,
};

export default projectService;
