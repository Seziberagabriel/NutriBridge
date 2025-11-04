import { loginUser } from '../api';

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const data = await loginUser(email, password);
    localStorage.setItem('token', data.token);
    alert('✅ Login successful!');
    window.location.href = '/dashboard'; // redirect to dashboard or home
  } catch (err) {
    alert(`❌ Login failed: ${err}`);
  }
};

