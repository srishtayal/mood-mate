const fetch = require('node-fetch');

const HF_API_TOKEN = process.env.HF_API_TOKEN;

const HF_HEADERS = {
  Authorization: `Bearer ${HF_API_TOKEN}`,
  'Content-Type': 'application/json',
};

const callHuggingFaceAPI = async (model, inputs) => {
  const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: 'POST',
    headers: HF_HEADERS,
    body: JSON.stringify({ inputs }),
  });

  if (!res.ok) throw new Error(`HF API error: ${res.statusText}`);
  const data = await res.json();
  return data;
};

exports.summarizeText = async (text) => {
  const result = await callHuggingFaceAPI('facebook/bart-large-cnn', text);
  return result?.[0]?.summary_text || '';
};

exports.detectEmotion = async (text) => {
  const result = await callHuggingFaceAPI('j-hartmann/emotion-english-distilroberta-base', text);
  return result?.[0]?.label || 'Neutral';
};
