# Todo App

A modern, responsive todo application built with Next.js, TypeScript, and DaisyUI. Features a beautiful dark mode interface with smooth animations and local storage persistence.

## 🚀 Live Demo

[**View Live Demo**](https://opdev-todo.vercel.app)

## ✨ Features

- ✅ Add, complete, and delete todos
- 📱 Fully responsive design (mobile-first)
- 🎨 Beautiful dark mode theme with DaisyUI
- 💾 Local storage persistence
- ⚡ Smooth animations and transitions
- 🔍 Real-time statistics and progress tracking
- ⏰ Relative timestamps ("2 hours ago")

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + DaisyUI
- **Icons:** React Icons (Heroicons)
- **State Management:** use-local-storage-state
- **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/OfirPatish/Todo-App.git

# Navigate to project directory
cd Todo-App

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
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

## 🎯 Key Features Explained

- **Local Storage:** Todos persist automatically in browser localStorage
- **Responsive Design:** Optimized for all screen sizes
- **Type Safety:** Full TypeScript coverage
- **Performance:** Optimized with Next.js static generation

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ofir Patish**

- GitHub: [@OfirPatish](https://github.com/OfirPatish)

---

Built with ❤️ using Next.js and DaisyUI
