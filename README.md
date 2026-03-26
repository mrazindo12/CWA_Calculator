# KNUST CWA Predictor

A production-grade, responsive academic planning application designed specifically for students at the Kwame Nkrumah University of Science and Technology (KNUST). 

Project your Cumulative Weighted Average (CWA) in real-time using official university grading formulas.

## ✨ Features

- **Official KNUST Grading:** Precision-engineered 0–100 grading formula for both fresh and continuing students.
- **Real-Time Simulation:** Instant CWA recalculation as you adjust your expected scores.
- **Scenario Modeling:** Save, load, and manage multiple "what-if" academic scenarios (e.g., Best Case vs. Worst Case).
- **Target Mode:** Calculates the specific semester average required to reach a target CWA.
- **Impact Analysis:** Automatically identifies courses with the highest impact on your academic standing.
- **Shareable Links:** URL-encoded scenario sharing using `lz-string` compression.
- **Dark Mode Support:** Seamless theme switching with system preference detection.
- **PWA Ready:** Installable on mobile home screens as a native-like application.
- **Export to CSV:** Download your academic projections for offline record-keeping.

## 🚀 Getting Started

### Development
First, install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

### Production Build
To prepare the application for deployment:
```bash
npm run build
```

The application is optimized for static hosting (Vercel, Netlify, GitHub Pages, etc.).

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **State Management:** Zustand (with Persist middleware)
- **Icons:** Lucide React
- **Theming:** next-themes
- **Compression:** lz-string

## ⚖️ Security & Performance
- **Zero Vulnerabilities:** Passed `npm audit` with no reported risks.
- **Type-Safe:** Fully implemented in TypeScript for robust data handling.
- **Fast:** Optimized build output with static generation.
- **Private:** All data is stored locally in your browser's `localStorage`. No data is uploaded to a server.

---
Made for students of Kwame Nkrumah University of Science and Technology.

