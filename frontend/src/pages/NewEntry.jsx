import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sparkle from '../assets/sparkle.svg';
import Spiral  from '../assets/spiral-3.svg';

const moods = [
  'Happy',
  'Sad',
  'Angry',
  'Anxious',
  'Excited',
  'Neutral',
  'Nervous',
  'Grateful',
  'Tired',
];

const NewEntry = () => {
  const navigate = useNavigate();
  const [mood, setMood] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://mood-mate-lx9i.onrender.com/api/entries',
        { mood, text, tags },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      );
      alert('Entry saved!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-animation p-6 flex justify-center">
      <img src={Sparkle} className="absolute top-4 left-4 w-24 opacity-30" alt="" aria-hidden />
      <img src={Spiral}  className="absolute bottom-0 right-0 w-40 opacity-20" alt="" aria-hidden />

      <form
        onSubmit={handleSubmit}
        className="glass w-full max-w-xl p-8 rounded-3xl shadow-xl backdrop-blur-lg relative z-10"
      >
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
          New Journal Entry<span className="text-purple-600">.</span>
        </h2>

        <label className="block mb-2 font-medium text-gray-600">Mood</label>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        >
          <option value="">Select mood</option>
          {moods.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <label className="block mb-2 font-medium text-gray-600">Your Thoughts</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full mb-6 p-3 border border-gray-300 rounded h-40 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Write about your day..."
          required
        />

        <label className="block mb-2 font-medium text-gray-600">Tags (optional)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full mb-8 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="e.g., stress, work, gratitude"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-full font-semibold hover:bg-purple-700 transition"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
};

export default NewEntry;
