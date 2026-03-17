# ✈️ Travel-mood

Travel-mood is a modern, dynamic React application designed to help users discover and explore travel destinations. The project features a premium glassmorphic UI, responsive design, and an integrated search system managed via React Context.

## ✨ Features

- **Destination Discovery**: Browse through a curated list of travel destinations globally.
- **Premium UI/UX**: High-end aesthetics featuring glassmorphism, dynamic animations, and carefully selected typography.
- **Search & Filtering**: Real-time destination filtering using a centralized Context API.
- **Robust Testing**: Configured with Jest and React Testing Library for reliable component testing.
- **Fast Build System**: Powered by Vite for lightning-fast HMR and optimized builds.

## 🛠️ Tech Stack

- **Core**: React 18, React Router v7
- **Language**: TypeScript / JavaScript
- **Build Tool**: Vite
- **Styling**: Vanilla CSS with modern flexbox/grid layouts and CSS animations
- **Icons**: Lucide React
- **Testing**: Jest, React Testing Library, JSDOM

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository (if applicable) or navigate to the project directory:
   ```bash
   cd Travel-mood
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will typically be available at `http://localhost:5173`.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Builds the application for production to the `dist` folder.
- `npm run lint` - Runs ESLint to catch and report potential errors or stylistic issues.
- `npm run preview` - Boots up a local static web server that serves the files from `dist` to preview the production build.
- `npm test` - Runs the Jest test suite to verify component functionality.

## 🗂️ Project Structure

- `src/components/`: Reusable UI components (e.g., `Hero`, `DestinationList`, `DestinationCard`).
- `src/contexts/`: React Context providers for global state management (e.g., `DestinationContext`).
- `src/tests/`: Jest unit test files.
- `src/assets/`: Static files like images and icons.
- `src/types/`: TypeScript interface definitions.
