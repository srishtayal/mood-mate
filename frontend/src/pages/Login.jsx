import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-indigo-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">Login</button>
        <p className="text-sm text-center">Don't have an account? <a href="/signup" className="text-indigo-600">Sign up</a></p>
      </form>
    </div>
  );
};

export default Login;
