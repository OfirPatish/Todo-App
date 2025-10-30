## Todo App

A modern, responsive todo application providing a clean, theme-aware UI with smooth motion and local storage persistence. Built with Next.js, TypeScript, Tailwind CSS, and DaisyUI.

## 🌐 Live Site

Visit the app → https://opdev-todo.vercel.app/

## 👇 About

Quickly add, complete, and manage tasks with real-time stats and subtle animations. The app is optimized for speed, accessibility, and a consistent experience across devices.

## ✨ Key Features

- **Add/complete/delete todos**: Simple, intuitive task management
- **Real-time stats**: Progress and completion insights
- **Relative timestamps**: e.g., "2 hours ago"
- **Theme-aware UI**: Beautiful dark mode with DaisyUI
- **Responsive**: Mobile-first layout that scales smoothly
- **Smooth animations**: Subtle motion for state changes
- **Local persistence**: Automatically saved to localStorage

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, DaisyUI 5
- **Icons**: React Icons
- **State**: use-local-storage-state
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Clone and install
git clone https://github.com/OfirPatish/Todo-App.git
cd Todo-App
npm install

# Start development server
npm run dev
```

Open http://localhost:3000

### Build & Start (production)

```bash
npm run build
npm run start
```

## 📦 Scripts

- `npm run dev`: Start the development server
- `npm run build`: Create a production build
- `npm run start`: Run the production server
- `npm run lint`: Lint the codebase

## 📁 Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # UI components
│   ├── TodoInput.tsx
│   ├── TodoItem.tsx
│   ├── TodoList.tsx
│   └── TodoStats.tsx
├── hooks/            # Custom React hooks
│   └── useTodos.ts
├── types/            # TypeScript type definitions
│   └── todo.ts
└── utils/            # Utility functions
    └── dateFormat.ts
```

## ☁️ Deployment

Deploy with Vercel from your repository, or via CLI:

```bash
npm i -g vercel
vercel
```

## 📄 License

MIT — see `LICENSE` for details.

## 👤 Author

**Ofir Patish**

- GitHub: https://github.com/OfirPatish

---

Built with ❤️ using Next.js and DaisyUI
