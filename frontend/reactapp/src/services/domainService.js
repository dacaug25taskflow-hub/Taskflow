import { adminAPI } from './api';

const getAllDomains = async () => {
  const response = await adminAPI.get('/domain');
  return response.data;
};

const createDomain = async (domainData) => {
  const response = await adminAPI.post('/domain', domainData);
  return response.data;
};

const domainService = {
  getAllDomains,
  createDomain,
};

export default domainService;
