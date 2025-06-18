// src/pages/StartReflection.jsx
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import axios from 'axios';
import Sparkle from '../assets/sparkle.svg';
import Spiral  from '../assets/spiral-3.svg';

const StartReflection = () => {
  const [journal, setJournal]   = useState('');
  const [summary, setSummary]   = useState('');
  const [emotion, setEmotion]   = useState('');
  const [loading, setLoading]   = useState(false);

  const handleAnalyze = async () => {
    if (!journal.trim()) {
      toast.error('Please enter your reflection first.');
      return;
    }

    setSummary('');
    setEmotion('');
    setLoading(true);
    try {
      const { data } = await axios.post(
        'https://mood-mate-lx9i.onrender.com/api/ai/analyze',
        { text: journal },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setSummary(data.summary);
      setEmotion(data.emotion);
    } catch (err) {
      console.error(err);
      toast.error('Failed to analyze your reflection. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-animation flex items-center justify-center p-6">
      {/* doodle accents */}
      <img src={Sparkle} className="absolute top-4 left-4 w-24 opacity-30" alt="" aria-hidden />
      <img src={Spiral}  className="absolute bottom-0 right-0 w-40 opacity-20" alt="" aria-hidden />

      {/* glass card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="glass w-full max-w-2xl p-10 rounded-3xl shadow-xl backdrop-blur-lg relative z-10"
      >
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
          Start Your Reflection<span className="text-purple-600">.</span>
        </h1>

        <textarea
          className="w-full h-56 p-4 border border-gray-300 rounded-lg resize-none
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Write about your day, how you're feeling, what you're thinking..."
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(168,85,247,.35)' }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAnalyze}
          disabled={loading}
          className={`mt-5 w-full bg-purple-600 text-white py-3 rounded-full font-semibold
                     transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
        >
          {loading ? 'Analyzing…' : 'Analyze with AI'}
        </motion.button>

        {(summary || emotion) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 bg-gray-100/70 p-6 rounded-xl border shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">AI Insights</h2>

            {summary && (
              <div className="mb-4">
                <h3 className="font-medium">Summary</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
              </div>
            )}

            {emotion && (
              <div>
                <h3 className="font-medium">Detected Emotion</h3>
                <p className="text-gray-700 capitalize">
                  {emotion.split(', ').join(' & ')}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default StartReflection;
