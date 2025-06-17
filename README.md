# 🌈 MoodMate – AI-Powered Mood Tracker & Journal

**MoodMate** is your mental health companion — track your mood, jot down journal entries, and get uplifting affirmations and AI-powered insights. A minimalist yet powerful app to help you reflect and grow emotionally.

---

## ✨ Features
 
- 📈 **Mood Graphs** – See weekly emotion fluctuations and patterns  
- 🤖 **AI Assistant** – Reflect with a friendly AI  
- ✍️ **Journal Entries** – Securely write and view emotional logs  
- 💡 **Affirmations** – Instant motivation based on your feelings  
- 🧘‍♀️ **Quick Actions** – Start reflection or journaling in a tap  

---

## 🛠️ Tech Stack

**Frontend**  
- React.js + Tailwind CSS  
- Framer Motion for smooth animations  
- Axios for API requests

**Backend**  
- Node.js + Express.js  
- MongoDB (with Mongoose) for data storage  
- HuggingFace Inference API for AI conversations  
- JWT for authentication

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB
- HuggingFace API Key

### Installation

```bash
# Clone the repo
git clone https://github.com/srishtayal/moodmate.git
cd moodmate

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
````

### Environment Setup

Create `.env` files in `backend` directory:

**backend/.env**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
HF_API_KEY=your_huggingface_api_key
```

---

### Run App

```bash
# Run backend
cd backend
npm run dev

# Run frontend
cd ../frontend
npm run dev
```

---

## 🧠 Inspiration

Built to promote emotional mindfulness and help users check in with themselves more often. Everyone deserves a moment of clarity and kindness — MoodMate is that friend who listens.

