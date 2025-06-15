import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Sparkle from '../assets/sparkle.svg';
import Spiral from '../assets/spiral-3.svg';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-animation flex items-center justify-center p-6">
      {/* doodle accents */}
      <img src={Sparkle} className="absolute top-4 left-4 w-24 opacity-30" alt="" aria-hidden />
      <img src={Spiral} className="absolute bottom-0 right-0 w-40 opacity-20" alt="" aria-hidden />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="glass max-w-3xl w-full text-center py-16 px-8 md:px-16 relative z-10 rounded-3xl"
      >
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight text-gray-800">
          MoodMate<span className="text-purple-600">.</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-10">
          AI-powered journaling to track emotions, reveal patterns, and grow mindfully.
        </p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(168, 85, 247, .4)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/signup')}
          className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Landing;
