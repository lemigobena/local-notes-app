# Shadow Notes 🚀

An offline-first, end-to-end encrypted markdown notes application built with React and Electron.

## ✨ Features

- **Offline-First Architecture**: Work fully offline with local storage using IndexedDB (Dexie.js).
- **End-to-End Encryption**: AES-256 encryption ensures your notes never leave your device unencrypted.
- **Markdown Editor**: Rich markdown support with GFM, live preview, and a modern toolbar.
- **Version History**: Track every change with an automated snapshot system (Git-like history).
- **Delta Sync Engine**: Optimized background synchronization logic.
- **Glassmorphism UI**: A premium, high-fidelity design system with dark mode and smooth animations.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite
- **Desktop**: Electron
- **Database**: Dexie.js (IndexedDB)
- **Security**: CryptoJS (AES-256 + PBKDF2)
- **Styling**: Vanilla CSS (Modern Design System)
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/local-notes-app.git
   cd local-notes-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development mode:
   ```bash
   npm run electron:dev
   ```

4. Build for production:
   ```bash
   npm run electron:build
   ```

## 🔐 Encryption Workflow

1. **Local Encryption**: All note content is encrypted using AES-256 before being stored in IndexedDB.
2. **Key Derivation**: Keys are derived locally using PBKDF2 with 10,000 iterations.
3. **Zero Knowledge**: The sync engine only handles encrypted blobs.

## 🏗 Project Structure

```txt
electron/         # Main process and preload scripts
src/
  core/           # Business logic (encryption, sync, storage, versioning)
  editor/         # Markdown editor components
  components/     # UI components (Sidebar, Toolbar, etc.)
  styles/         # Global design system
```

## 📜 License

MIT
