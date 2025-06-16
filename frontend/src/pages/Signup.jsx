import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signup } from '../api/api';

import Sparkle from '../assets/sparkle.svg';
import Spiral  from '../assets/spiral-3.svg';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-animation flex items-center justify-center p-6">
      {/* doodle accents */}
      <img src={Sparkle} className="absolute top-4 left-4 w-24 opacity-30" alt="" aria-hidden />
      <img src={Spiral}  className="absolute bottom-0 right-0 w-40 opacity-20" alt="" aria-hidden />

      {/* glassy signup form */}
      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        onSubmit={handleSubmit}
        className="glass w-full max-w-md p-10 space-y-6 rounded-3xl shadow-xl backdrop-blur-lg"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Create your account</h2>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* CTA with micro-interaction */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(168,85,247,.4)' }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-full font-semibold"
        >
          Sign Up
        </motion.button>

        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:underline">
            Log in
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Signup;
