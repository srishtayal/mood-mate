const { summarizeText, detectEmotion } = require('../utils/huggingface');

exports.analyzeJournal = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) return res.status(400).json({ message: 'Text is required' });

    const [summary, emotion] = await Promise.all([
      summarizeText(text),
      detectEmotion(text),
    ]);

    res.json({ summary, emotion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to analyze journal' });
  }
};


