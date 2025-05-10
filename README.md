# Markdown Blog Editor

A feature-rich, web-based Markdown editor built with Next.js and Tailwind CSS, designed for a seamless writing and drafting experience.

## About The Project

This project is a client-side Markdown editor that allows users to create, manage, and export multiple drafts. It features a live preview pane, a collapsible sidebar for draft management, and various export options. The focus is on providing a clean, intuitive, and efficient environment for writing Markdown content.

## Key Features

- **Real-time Editing & Preview:** Write Markdown on one side and see the rendered HTML update live on the other.
- **Multiple Draft Management:**
    - Create and manage an unlimited number of drafts.
    - Easily switch between drafts with a single click.
    - Active draft highlighted for clarity.
    - Delete drafts with a confirmation modal to prevent accidental loss.
    - (Draft renaming functionality is implemented but temporarily hidden due to a minor UI bug).
    - Displays a running count of total drafts.
- **Collapsible Draft Sidebar:**
    - Efficiently manage drafts in a sidebar that can be collapsed to maximize writing space.
    - Smooth animations for UI elements during collapse/expand transitions.
    - Numbered draft list for easy identification, even when collapsed.
- **Resizable Editor/Preview Panes:**
    - Adjust the width of the editor and preview panes using a draggable resize handle.
- **Comprehensive Export Options:**
    - **Download as .md:** Export your raw Markdown content.
    - **Download as .html:** Export the rendered HTML output.
    - **Copy Rich Text:** Copy the content to your clipboard as rich text for pasting into other applications.
- **Share via Link:**
    - Generate a shareable link for a draft (current implementation uses an in-memory store for shared content).
    - Visual feedback (Copied/Failed) for the link generation process.
- **Modern & Intuitive UI:**
    - Clean and focused user interface.
    - Consistent styling for interactive elements using a custom `Button` component with multiple variants.
    - Enhanced text selection visibility across the application.
    - User-friendly empty state when no draft is active.

## Tech Stack

- **Core Framework:** [Next.js](https://nextjs.org/) (v13+ with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
    - Includes `@tailwindcss/typography` for Markdown content styling.
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Markdown Rendering:** 
    - `react-markdown`
    - `remark-gfm` (for GitHub Flavored Markdown support)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Resizable Panels:** `react-resizable-panels`
- **UI Components:** Custom-built reusable components for buttons, modals, sidebar, header, etc.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v16.x or later recommended)
- npm or yarn

### Installation

1. Clone the repo:
   ```sh
   git clone https://your-repository-link.git
   cd markdown-editor
   ```
2. Install NPM packages:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the Development Server

```sh
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Future Enhancements (Potential)

- Persistent storage for drafts (e.g., LocalStorage, or a backend database).
- Cloud synchronization.
- More robust sharing mechanism with a proper backend.
- Advanced editor features (e.g., toolbar, keyboard shortcuts).
- Full theme customization (beyond current color scheme adjustments).
- Fix for the temporarily hidden rename functionality and scroll jump issue.

---

_This README provides a summary of the project's current state, technologies, and functionalities based on its development progress._ 
