# Markdown Blog Editor

A feature-rich, web-based Markdown editor built with Next.js and Tailwind CSS, designed for a seamless writing and drafting experience.

## About The Project

This project is a client-side Markdown editor that allows users to create, manage, and export multiple drafts. It features a live preview pane, a collapsible sidebar for draft management, and various export options. The focus is on providing a clean, intuitive, and efficient environment for writing Markdown content.

## Key Features

- **Real-time Editing & Preview:** Write Markdown on one side and see the rendered HTML update live on the other.
- **Multiple Draft Management:** Create, switch, delete, and manage multiple drafts with ease. Includes active draft highlighting and a confirmation step for deletions.
- **Collapsible Draft Sidebar:** Maximize writing space with a collapsible sidebar for draft navigation.
- **Resizable Editor/Preview Panes:** Adjust pane widths with a draggable resize handle.
- **Comprehensive Export Options:** Export as .md, .html, or copy as rich text.
- **Share via Link:** Generate a shareable link for drafts (uses an in-memory store).
- **Modern & Intuitive UI:**
    - Clean and focused user interface built with `shadcn/ui`.
    - Light and Dark Mode support with an easy-to-use theme toggle.
    - Enhanced text selection visibility.
    - User-friendly empty state.

## UI Refinements

The editor's UI has been recently updated using [shadcn/ui](https://ui.shadcn.com/) for a modern, consistent look and feel. It now includes a dark mode, implemented with [next-themes](https://github.com/pacocoursey/next-themes) and a theme toggle in the header. Theming is managed via CSS variables, ensuring visual consistency across themes and components. Numerous styling adjustments have been made for improved readability and aesthetics.

## Tech Stack

- **Core Framework:** [Next.js](https://nextjs.org/) (v13+ with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
    - `@tailwindcss/typography` for Markdown content.
    - `tailwindcss-animate` for UI animations.
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Markdown Rendering:** `react-markdown`, `remark-gfm`
- **Icons:** [Lucide React](https://lucide.dev/)
- **Resizable Panels:** `react-resizable-panels`
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/), [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

To get a local copy up and running:

### Prerequisites

- Node.js (v16.x+)
- npm or yarn

### Installation

1. Clone repo: `git clone https://your-repository-link.git && cd markdown-editor`
2. Install packages: `npm install` or `yarn install`

### Running Locally

`npm run dev` or `yarn dev`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Future Enhancements

- Persistent draft storage (LocalStorage or backend).
- Cloud sync.
- Robust sharing with a backend.
- Advanced editor features (toolbar, shortcuts).
- Fix hidden rename functionality & scroll jump issue.

---

_This README summarizes the project's current state._ 
