import { managerAPI } from './api';

const getTeamLeaders = async () => {
  const response = await managerAPI.get('/team/team-leaders');
  return response.data;
};

const getTeamsByProject = async (pid) => {
  const response = await managerAPI.get(`/team/project/${pid}`);
  return response.data;
};

const createTeam = async (pid, domainId, tlUid) => {
  const response = await managerAPI.post('/team/create', { pid, domainId, tlUid });
  return response.data;
};

const addMember = async (pid, uid) => {
  const response = await managerAPI.post(`/team/add?pid=${pid}&uid=${uid}`);
  return response.data;
};

const removeMember = async (pid, uid) => {
  await managerAPI.delete(`/team/remove?pid=${pid}&uid=${uid}`);
};

const deleteTeam = async (teamId) => {
  await managerAPI.delete(`/team/${teamId}`);
};

export default {
  getTeamLeaders,
  getTeamsByProject,
  createTeam,
  addMember,
  removeMember,
  deleteTeam,
};
