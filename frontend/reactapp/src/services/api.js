import axios from 'axios';

const AUTH_BASE_URL = 'http://localhost:8080/auth';
const ADMIN_BASE_URL = 'http://localhost:8081/admin';
const MANAGER_BASE_URL = 'http://localhost:8082/manager';
const TL_BASE_URL = 'http://localhost:8083/tl';
const EMPLOYEE_BASE_URL = 'http://localhost:7123/api/employee';

export const authAPI = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const adminAPI = axios.create({
  baseURL: ADMIN_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const managerAPI = axios.create({
  baseURL: MANAGER_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const tlAPI = axios.create({
  baseURL: TL_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const employeeAPI = axios.create({
  baseURL: EMPLOYEE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add token to requests
const addTokenInterceptor = (apiInstance) => {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

[adminAPI, managerAPI, tlAPI, employeeAPI].forEach(addTokenInterceptor);

// Handle 401 errors
const addResponseInterceptor = (apiInstance) => {
  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

[adminAPI, managerAPI, tlAPI, employeeAPI].forEach(addResponseInterceptor);
