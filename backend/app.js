const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const entryRoutes = require('./routes/entry');
const ai = require('./routes/ai');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/ai', ai);

app.get('/', (req, res) => {
  res.send('MoodMate API is running 🚀');
});

module.exports = app;