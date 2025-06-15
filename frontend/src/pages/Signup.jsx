import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/api';

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signup(form);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Create Account</button>
        <p className="text-sm text-center">Already have an account? <a href="/login" className="text-blue-600">Log in</a></p>
      </form>
    </div>
  )
};

export default Signup;