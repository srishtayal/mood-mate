const Entry = require('../models/Entry');
const { summarizeText, detectEmotion } = require('../utils/huggingface');
const mongoose = require('mongoose');

exports.createEntry = async (req, res) => {
  try {
    const { text, mood, tags } = req.body;
    const userId = req.user.id;

    const summary = await summarizeText(text);
    const emotion = await detectEmotion(text);

    const newEntry = await Entry.create({
      userId,
      date: new Date(),
      text,
      mood: mood || emotion,
      tags: tags || [emotion],
      summary,
      affirmations: generateAffirmations(emotion),
    });

    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEntries = async (req, res) => {
  try {
    const userId = req.user.id;
    const entries = await Entry.find({ userId }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getWeeklySummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const entries = await Entry.find({
      userId,
      date: { $gte: oneWeekAgo }
    });

    const combinedText = entries.map(e => e.text).join('\n\n');
    const summary = await summarizeText(combinedText);

    res.json({ summary, entriesCount: entries.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const generateAffirmations = (emotion) => {
  const suggestions = {
    Happy: ['Keep spreading positivity!', 'Celebrate your joy!'],
    Sad: ['It’s okay to feel down. You’re not alone.', 'This too shall pass.'],
    Angry: ['Take a deep breath. You are in control.', 'Let it go, you got this.'],
    Anxious: ['You are safe. You are strong.', 'Everything will be okay.'],
    Neutral: ['Keep going. Balance is power.', 'Steady progress is still progress.'],
  };

  return suggestions[emotion] || ['Take care of your mental space.'];
};
