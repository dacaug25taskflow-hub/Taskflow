import axios from "axios";

const API_URL = "http://localhost:8080/taskflow";
// change port/path as per authservice backend

export const login = (data) => {
  return axios.post(`${API_URL}/login`, data);
};

export const register = (data) => {
  return axios.post(`${API_URL}/register`, data);
};
