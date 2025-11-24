# Todo App

A modern, professional todo application built with Next.js 16, React 19, and DaisyUI. Features a clean, theme-aware UI with local storage persistence and comprehensive type safety.

**🌐 Live Site:** [https://opdev-todo.vercel.app](https://opdev-todo.vercel.app)

## 🚀 Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **State Management:** Zustand
- **Styling:** Tailwind CSS 4, DaisyUI 5
- **Validation:** Zod

## ✨ Features

- ✅ Add, edit, delete, and complete todos
- 🎯 Priority levels (High, Medium, Low) with visual indicators
- 🔍 Real-time search with instant filtering
- 🗂️ Filter todos (All, Active, Completed) with count badges
- 📊 Progress tracking and statistics (completion percentage, total, completed, remaining)
- 🔄 Sort options (Newest, Oldest, Alphabetical, Priority)
- 🎨 Light/Dark theme support with system preference detection
- ⌨️ Keyboard shortcuts (Ctrl/Cmd + / for search, Ctrl/Cmd + . for add todo)
- 💾 Local storage persistence for data retention
- 📤 Export/Import todos (JSON format)
- 🧹 Clear completed todos (bulk action)
- ✏️ Input validation (prevents leading spaces, max length enforcement)
- 🚨 Error handling with user-friendly error messages
- 📱 Fully responsive design (mobile-first, optimized for all screen sizes)

## 🏃 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components
│   ├── todo/         # Todo-specific components
│   │   ├── features/ # Core features (Input, Item, List, Stats, Search)
│   │   ├── filters/  # Filter and sort components
│   │   ├── actions/  # Export/Import actions
│   │   ├── feedback/ # Error display and loading states
│   │   └── layout/   # Layout components
│   └── ui/           # Shared UI components
├── store/            # Zustand store (state management)
├── hooks/            # Custom React hooks
├── lib/              # Utilities (validation, storage, schemas, constants)
└── types/            # TypeScript type definitions
```

## 🛠️ Development

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - Run ESLint

## 📝 License

See [LICENSE](LICENSE) file for details.
