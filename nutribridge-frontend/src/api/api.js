import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

// Example: get user info
export const getUser = async (id) => {
  const res = await API.get(`/users/${id}`);
  return res.data;
};

// Example: update user info
export const updateUser = async (id, data) => {
  const res = await API.put(`/users/${id}`, data);
  return res.data;
};

// You can add more API functions here, e.g., login, register, etc.

