# 📚 Study Assistant

A beautiful, feature-rich study assistant application built with React, Vite, TailwindCSS, and Zustand.

![Study Assistant](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan?logo=tailwindcss)

## ✨ Features

### 📊 Dashboard
- Study statistics at a glance
- Track your study streak 🔥
- GitHub-style study heatmap calendar
- Quick action buttons

### 📚 Flashcard System
- Create unlimited decks with custom colors
- Add flashcards with questions and answers
- Flip animation for Q&A reveal
- Previous/Next navigation through cards
- Delete decks and cards with confirmation

### ⏱️ Pomodoro Timer
- 25-minute focus sessions
- 5-minute break intervals
- Visual circular progress indicator
- Session counter and stats

### 💾 Data Persistence
- All data saved to localStorage
- Survives browser refresh
- No account needed

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/study-assistant.git
cd study-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

The production files will be in the `dist/` folder.

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Zustand** - State management
- **Lucide React** - Icons
- **date-fns** - Date utilities

## 📁 Project Structure

```
study-assistant/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Dashboard.jsx
│   │   ├── StudyHeatmap.jsx
│   │   ├── FlashcardDeck.jsx
│   │   ├── FlashcardCard.jsx
│   │   ├── CreateDeckModal.jsx
│   │   └── PomodoroTimer.jsx
│   ├── store.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 📝 License

MIT License - feel free to use this project for your own learning!

## 🙏 Acknowledgments

Built with ❤️ for students everywhere.
