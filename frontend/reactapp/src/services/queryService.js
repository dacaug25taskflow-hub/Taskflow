import { managerAPI, tlAPI, employeeAPI } from './api';

const getQueriesByManager = async (uid) => {
  const response = await managerAPI.get(`/queries/manager/${uid}`);
  return response.data;
};

const getQueriesByTeam = async (teamId) => {
  const response = await managerAPI.get(`/queries/team/${teamId}`);
  return response.data;
};

const getQueriesByProject = async (pid) => {
  const response = await managerAPI.get(`/queries/project/${pid}`);
  return response.data;
};

const createQuery = async (queryData, role) => {
  let response;

  if (role === 'Team Leader') {
    response = await tlAPI.post(`/query/${queryData.tlUid}`, queryData);
  } else if (role === 'Employee') {
    response = await employeeAPI.post('/tasks/query', {
      query: queryData.query,
      qname: queryData.qname,
      teamId: queryData.teamId,
      projectId: queryData.projectId,
      managerUid: queryData.managerUid,
      raisedByUid: queryData.raisedByUid
    });
  }

  return response.data;
};

const respondToQuery = async (qid, responseText) => {
  const response = await managerAPI.put(
    `/queries/${qid}/respond?response=${encodeURIComponent(responseText)}`
  );
  return response.data;
};

const getQueriesForTeamLeader = async (tlUid) => {
  const response = await tlAPI.get(`/query/team-leader/${tlUid}`);
  return response.data;
};

const getMyQueriesEmployee = async (uid) => {
  const response = await employeeAPI.get(`/tasks/queries?uid=${uid}`);
  return response.data;
};

const getQueryOptionsEmployee = async (uid) => {
  const response = await employeeAPI.get(`/tasks/query-options?uid=${uid}`);
  return response.data;
};

const respondToQueryTL = async (qid, response, tlUid) => {
  const response_ = await tlAPI.put(
    `/query/${qid}/respond?response=${encodeURIComponent(response)}&tlUid=${tlUid}`
  );
  return response_.data;
};

const createQueryTL = async (queryData, tlUid) => {
  const response = await tlAPI.post(`/query/${tlUid}`, queryData);
  return response.data;
};

const queryService = {
  getQueriesByManager,
  getQueriesByTeam,
  getQueriesByProject,
  getQueriesForTeamLeader,
  getMyQueriesEmployee,
  getQueryOptionsEmployee,
  createQuery,
  createQueryTL,
  respondToQuery,
  respondToQueryTL,
};

export default queryService;
