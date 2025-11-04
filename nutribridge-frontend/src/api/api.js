import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

export const loginUser = async (email, password) => {
  try {
    const res = await API.post('/auth/login', { email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Login failed';
  }
};

