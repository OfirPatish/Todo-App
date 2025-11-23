# Todo App

A modern, responsive todo application providing a clean, theme-aware UI with smooth motion and local storage persistence. Built with Next.js, TypeScript, Tailwind CSS, and DaisyUI.

**🌐 Live Site:** [https://opdev-todo.vercel.app](https://opdev-todo.vercel.app)

## 🚀 Tech Stack

**Frontend:** Next.js 16, React 19, TypeScript  
**Styling:** Tailwind CSS 4, DaisyUI 5  
**Icons:** React Icons  
**State Management:** use-local-storage-state  
**Deployment:** Vercel

## ✨ Key Features

- **Task Management:** Add, complete, and delete todos with intuitive interface
- **Real-time Stats:** Progress and completion insights
- **Relative Timestamps:** e.g., "2 hours ago"
- **Theme-aware UI:** Beautiful dark mode with DaisyUI
- **Responsive Design:** Mobile-first layout that scales smoothly
- **Smooth Animations:** Subtle motion for state changes
- **Local Persistence:** Automatically saved to localStorage

## 🏃 Quick Start

### Prerequisites

- Node.js 18+

### Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
todo-app/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # UI components
│   │   ├── TodoInput.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoList.tsx
│   │   └── TodoStats.tsx
│   ├── hooks/            # Custom React hooks
│   │   └── useTodos.ts
│   ├── types/            # TypeScript type definitions
│   │   └── todo.ts
│   └── utils/            # Utility functions
│       └── dateFormat.ts
└── public/               # Static assets
```

## 🔒 Data Persistence

- Local storage for automatic data persistence
- No backend required - fully client-side application
- Data persists across browser sessions
