import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const username = localStorage.getItem('username') || 'Friend';

const EMOJIS = [
  { label: 'Excited',   icon: '🤩' },
  { label: 'Happy',     icon: '😊' },
  { label: 'Neutral',   icon: '😐' },
  { label: 'Nervous',   icon: '😬' },
  { label: 'Anxious',   icon: '😰' },
  { label: 'Sad',       icon: '😔' },
  { label: 'Angry',     icon: '😤' },
  { label: 'Depressed', icon: '😢' },
];

const AFFIRMATIONS = {
  Excited: [
    'Harness that energy and let it fuel your dreams!',
    'Your enthusiasm is contagious—share it freely.',
    'Great things await when passion meets action.',
    'Ride the wave of excitement; amazing moments are ahead.',
    'Let today’s spark ignite a brilliant journey.',
  ],
  Happy: [
    'Savor this joy—it’s well-deserved!',
    'Your smile lights up more rooms than you know.',
    'Carry this happiness into everything you do today.',
    'Joy is your natural state; keep choosing it.',
    'Celebrate the small wins that led to this feeling.',
  ],
  Neutral: [
    'Peaceful moments create space for growth.',
    'Balance is powerful—embrace the calm.',
    'In stillness, clarity often appears.',
    'Not every day needs fireworks; steady is strong.',
    'Use this neutrality to set mindful intentions.',
  ],
  Nervous: [
    'Nerves mean you care—channel that care wisely.',
    'Deep breaths turn jitters into focus.',
    'Growth begins at the edge of comfort.',
    'You’ve prepared more than you think.',
    'Every step forward lessens uncertainty.',
  ],
  Anxious: [
    'Pause, breathe, release—one moment at a time.',
    'Your worries don’t define your capabilities.',
    'Ground yourself in the present; it’s safe here.',
    'You’ve survived every anxious day so far.',
    'Courage is moving ahead even when fear whispers.',
  ],
  Sad: [
    'It’s okay to feel down; this moment will pass.',
    'Reach out—connection softens sorrow.',
    'Tears water the seeds of future joy.',
    'Treat yourself with the kindness you’d give a friend.',
    'Even cloudy skies hide the sun’s steady glow.',
  ],
  Angry: [
    'Anger signals something matters—listen calmly.',
    'Channel the heat into constructive change.',
    'Pause before reacting; your power is in choice.',
    'You control the flame; let it warm, not burn.',
    'Transform frustration into focused action.',
  ],
  Depressed: [
    'You’re not alone—support is always within reach.',
    'Small steps count; getting up is progress.',
    'Your worth is constant, even when mood dips.',
    'Be gentle with yourself; healing isn’t linear.',
    'Darkness is temporary; dawn always arrives.',
  ],
};

const Dashboard = () => {
  const [selected, setSelected]         = useState(null);
  const [affirmation, setAffirmation]   = useState('');
  const [revealAffirm, setRevealAffirm] = useState(false);

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    month  : 'long',
    day    : 'numeric',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!selected) return;
    setRevealAffirm(false);
    const id = setTimeout(() => {
      const pool = AFFIRMATIONS[selected];
      setAffirmation(pool[Math.floor(Math.random() * pool.length)]);
      setRevealAffirm(true);
    }, 500);
    return () => clearTimeout(id);
  }, [selected]);

  const ring = (label) =>
    selected === label ? 'ring-3 ring-purple-500' : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-pink-100 p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {username}{' '}
          <span role="img" aria-label="wave">👋</span>
        </h1>
        <p className="text-gray-500 text-lg">{today}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            How are you feeling today?
          </h2>

          <div className="flex flex-wrap gap-4 text-3xl">
            {EMOJIS.map(({ label, icon }) => (
              <button
                key={label}
                onClick={() => setSelected(label)}
                aria-label={label}
                className={`group relative transition rounded-full ${ring(label)}`}
              >

                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
                                 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0
                                 group-hover:opacity-100">
                  {label}
                </span>
                {icon}
              </button>
            ))}
          </div>

          {selected && (
            <p className="mt-6 text-purple-700 font-medium">
              You’re feeling <span className="capitalize">{selected.toLowerCase()}</span> today.
            </p>
          )}

          {revealAffirm && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-gray-700 italic"
            >
              “{affirmation}”
            </motion.p>
          )}
        </motion.div>

         <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white shadow-xl rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Quick Actions</h2>
          <div className="flex flex-col space-y-4">
            <button
            onClick={() => navigate('/new-entry')}
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
            >
            + New Entry
            </button>
            <button
            onClick={() => navigate('/journal')}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
            >
            View Journal
            </button>
            <button 
            onClick={() => navigate('/reflection')}
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
          <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            [Graph Placeholder]
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
