import { useEffect, useState } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ViewJournal = () => {
  const [entries, setEntries]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [openCard, setOpenCard] = useState({}); 
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('https://mood-mate-lx9i.onrender.com/api/entries', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setEntries(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Fetch error →', err);
        setEntries([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const moodCounts = entries.reduce((acc, e) => {
    if (e.mood) acc[e.mood] = (acc[e.mood] || 0) + 1;
    return acc;
  }, {});

  const toggleCard = (id) =>
    setOpenCard((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">

      <button
        onClick={() => navigate('/dashboard')}
        className="absolute top-6 right-6 bg-purple-600 text-white py-2 px-4 rounded-full shadow
                   hover:bg-purple-700 transition"
      >
        Dashboard
      </button>

      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Your Journal Entries
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading entries…</p>
      ) : entries.length === 0 ? (
        <p className="text-gray-500">No entries found.</p>
      ) : (
        <>
          <div className="mb-6 p-5 bg-white rounded-xl shadow-md border border-purple-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Summary</h2>
            <p className="text-gray-600">Total entries: {entries.length}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {Object.entries(moodCounts).map(([mood, count]) => (
                <span
                  key={mood}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium capitalize"
                >
                  {mood}: {count}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {entries.map((entry) => {
              const show = !!openCard[entry._id];
              return (
                <div
                  key={entry._id}
                  className="bg-white p-6 rounded-xl shadow-lg border-l-8 border-purple-500
                             hover:shadow-2xl transition-shadow duration-300"
                >

                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        {new Date(entry.date).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                      {entry.mood && (
                        <span className="text-purple-700 font-semibold capitalize bg-purple-100 px-2 py-0.5 rounded text-sm">
                          {entry.mood}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleCard(entry._id)}
                      className="text-purple-600 text-sm font-medium hover:underline"
                    >
                      {show ? 'Hide insights' : 'Show insights'}
                    </button>
                  </div>

                  {entry.text && (
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-3">
                      {entry.text}
                    </p>
                  )}

                  <AnimatePresence initial={false}>
                    {show && (
                      <motion.div
                        key="insights"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        {entry.summary && (
                          <div className="bg-purple-100 p-2 rounded-lg">
                            <h3 className="text-md font-semibold text-gray-800 my-2">
                              AI Summary
                            </h3>
                            <p className="text-gray-600 whitespace-pre-wrap">
                              {entry.summary}
                            </p>
                          </div>
                        )}

                        {entry.tips && entry.tips.length > 0 && (
                          <>
                            <h3 className="text-md font-semibold text-gray-800 mt-3">
                              AI Tips
                            </h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                              {entry.tips.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                              ))}
                            </ul>
                          </>
                        )}

                        {!entry.summary &&
                          (!entry.tips || entry.tips.length === 0) && (
                            <p className="italic text-gray-400">
                              No AI insights generated for this entry.
                            </p>
                          )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {entry.tags && (
                    <p className="text-xs text-gray-400 mt-4">Tags: {entry.tags}</p>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewJournal;
