// src/pages/Dashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { saveMood, getMoodTrend } from '../api/api';   

const Dashboard = () => {
  const navigate = useNavigate();

  const [selectedMood, setSelectedMood] = useState(null);
  const [trend, setTrend]               = useState([]);
  const [loading, setLoading]           = useState(true);

  const todayLabel = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    month  : 'long',
    day    : 'numeric',
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getMoodTrend();    
        setTrend(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    try {
      await saveMood({ mood });                    
    } catch (err) {
      console.error(err);
    }
  };

  const btnClass = (mood) =>
    `transition rounded-full ${selectedMood === mood ? 'ring-4 ring-purple-500' : ''}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-pink-100 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, Srishti <span role="img" aria-label="wave">👋</span>
        </h1>
        <p className="text-gray-500 text-lg">{todayLabel}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            How are you feeling today?
          </h2>
          <div className="flex space-x-4 text-3xl">
            {['happy','neutral','sad','angry','crying'].map((m) => (
              <button key={m} onClick={() => handleMoodSelect(m)} className={btnClass(m)}>
                {{
                  happy:   '😊',
                  neutral: '😐',
                  sad:     '😔',
                  angry:   '😤',
                  crying:  '😢',
                }[m]}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white shadow-xl rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Quick Actions</h2>
          <div className="flex flex-col space-y-4">
            <button onClick={() => navigate('/new-entry')}
                    className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition">
              + New Entry
            </button>
            <button onClick={() => navigate('/journal')}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition">
              View Journal
            </button>
            <button onClick={() => navigate('/reflection')}
                    className="bg-pink-100 text-pink-800 py-2 px-4 rounded-lg hover:bg-pink-200 transition">
              Start Reflection
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-xl rounded-xl p-6 md:col-span-2"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Your Mood Trend (Past 7 Days)
          </h2>

          {loading ? (
            <div className="h-48 flex items-center justify-center text-gray-400">
              Loading…
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trend}>
                <XAxis dataKey="date" />
                <YAxis domain={[-1, 1]} hide />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#a855f7" strokeWidth={3} dot />
              </LineChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
